from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from ..models import LoanFund, Loan, Bank, TotalFunds, LoanCustomer
from ..permissions import IsLoanCustomer
from ..serializers import LoanFundSerializer, LoanSerializer
from django.shortcuts import get_object_or_404
from ..helpers import calculate_amortization_helper

@api_view(['GET'])
@permission_classes([IsLoanCustomer])
def get_loan_funds_by_bank(request):
    bank = request.user.bank

    if not bank:
        return Response({"error": "This user is not attached to a bank"}, status=status.HTTP_404_NOT_FOUND)

    loan_funds = LoanFund.objects.filter(bank=bank, is_active=True)

    loan_funds_with_sufficient_funds = []

    for loan_fund in loan_funds:
        total_fund = TotalFunds.objects.filter(loan_fund=loan_fund).aggregate(total_fund_sum=Sum('fund_amount'))['total_fund_sum'] or 0
        
        if total_fund > loan_fund.max_amount:
            loan_funds_with_sufficient_funds.append(loan_fund)

    serializer = LoanFundSerializer(loan_funds_with_sufficient_funds, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsLoanCustomer])
def request_loan(request):
    customer = request.user.loan_customer
    requested_amount = request.data.get("requested_amount")
    requested_duration = request.data.get("requested_duration")
    loan_fund_id = request.data.get("loan_fund_id")
    print(loan_fund_id)

    try:
        loan_fund = LoanFund.objects.get(id=loan_fund_id)
    except LoanFund.DoesNotExist:
        return Response({"error": "Loan fund not found"}, status=status.HTTP_404_NOT_FOUND)

    if loan_fund.min_amount <= requested_amount <= loan_fund.max_amount and loan_fund.min_duration <= requested_duration <= loan_fund.max_duration:
        loan = Loan.objects.create(
            loan_fund=loan_fund,
            max_amount=loan_fund.max_amount,
            min_amount=loan_fund.min_amount,
            customer=customer,
            min_duration=loan_fund.min_duration,
            max_duration=loan_fund.max_duration,
            requested_amount=requested_amount,
            requested_duration=requested_duration,
            bank_personnel=loan_fund.bank_personnel,
            is_params_defined=False
        )
        return Response({"status": "Loan requested successfully", "loan_id": loan.id}, status=status.HTTP_201_CREATED)
    return Response({"error": "Loan request does not meet the loan fund conditions"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsLoanCustomer])
def get_customer_requested_loans_status(request):
    customer = request.user.loan_customer

    loans = Loan.objects.filter(customer=customer).order_by('-id')

    serializer = LoanSerializer(loans, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsLoanCustomer])
def customer_requested_loans_defined_params(request):
    customer = request.user.loan_customer
    loans = Loan.objects.filter(customer=customer, status=Loan.PENDING, is_params_defined=True).order_by('-id')
    serializer = LoanSerializer(loans, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsLoanCustomer])
def request_loan_after_params_defined(request):
    data = request.data

    try:
        loan = Loan.objects.get(id=data.get('loan_id'))
    except Loan.DoesNotExist:
        return Response({"error": "Loan not found."}, status=status.HTTP_404_NOT_FOUND)

    requested_amount = data.get('requested_amount')
    requested_duration = data.get('requested_duration')

    if not (loan.min_amount <= requested_amount <= loan.max_amount):
        return Response({"error": "Requested amount out of range."}, status=status.HTTP_400_BAD_REQUEST)
    if not (loan.min_duration <= requested_duration <= loan.max_duration):
        return Response({"error": "Requested duration out of range."}, status=status.HTTP_400_BAD_REQUEST)

    loan.requested_amount = requested_amount
    loan.requested_duration = requested_duration
    loan.is_params_defined = False
    loan.save()

    serializer = LoanSerializer(loan)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsLoanCustomer])
def amortization_schedule(request):
    try:
        principal = float(request.data.get('requested_amount'))
        annual_rate = float(request.data.get('interest_rate'))
        duration_years = int(request.data.get('requested_duration'))

        if principal <= 0 or annual_rate < 0 or duration_years <= 0:
            return Response(
                {"error": "Invalid input values. Ensure all inputs are positive."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        schedule = calculate_amortization_helper(principal, annual_rate, duration_years)
        return Response({"schedule": schedule}, status=status.HTTP_200_OK)

    except (ValueError, TypeError) as e:
        return Response({"error": f"Invalid input: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)