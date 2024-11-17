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
    # Retrieve the bank_id from the query parameters
    bank = request.user.bank

    # If no bank_id is provided, return all loan funds from all banks
    if not bank:
        return Response({"error": "This user is not attached to a bank"}, status=status.HTTP_404_NOT_FOUND)

    loan_funds = LoanFund.objects.filter(bank=bank, is_active=True)

    # Filter loan funds where total funds > max_amount
    loan_funds_with_sufficient_funds = []

    for loan_fund in loan_funds:
        # Calculate total funds for the loan fund by summing up related TotalFunds
        total_fund = TotalFunds.objects.filter(loan_fund=loan_fund).aggregate(total_fund_sum=Sum('fund_amount'))['total_fund_sum'] or 0
        
        # If total funds are greater than the max amount, add the loan fund to the result list
        if total_fund > loan_fund.max_amount:
            loan_funds_with_sufficient_funds.append(loan_fund)

    # Serialize the filtered loan funds
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

    # Check if customer has any active loans (loans that are not fully paid)
    # active_loans = Loan.objects.filter(customer=customer, is_totally_paid=False)
    # if active_loans.exists():
    #     return Response({"error": "You have active loans. Please pay off your previous loans before requesting a new one."}, status=status.HTTP_400_BAD_REQUEST)

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

# @api_view(['GET'])
# @permission_classes([IsLoanCustomer])
# def loan_customer_amortization(request):
#     loan_id = request.query_params.get("loan_id")
#     try:
#         loan = Loan.objects.get(id=loan_id, customer=request.user.loan_customer)
#     except Loan.DoesNotExist:
#         return Response({"error": "Loan not found"}, status=status.HTTP_404_NOT_FOUND)
#     amortization_schedule = calculate_amortization(loan)
#     return Response(amortization_schedule, status=status.HTTP_200_OK)

# def calculate_amortization(loan):
#     principal = loan.requested_amount
#     annual_rate = loan.loan_fund.interest_rate
#     duration_years = loan.requested_duration
    
#     # Convert the duration from years to months
#     duration_months = duration_years * 12
    
#     # Convert annual interest rate to monthly rate
#     monthly_rate = (annual_rate / 100) / 12
    
#     # Calculate the monthly payment using the formula
#     if monthly_rate > 0:
#         monthly_payment = principal * (monthly_rate * (1 + monthly_rate)**duration_months) / ((1 + monthly_rate)**duration_months - 1)
#     else:
#         monthly_payment = principal / duration_months  # If no interest, simply divide principal by duration

#     # Generate the amortization schedule
#     schedule = []
#     balance = principal

#     for month in range(1, duration_months + 1):
#         interest_payment = balance * monthly_rate
#         principal_payment = monthly_payment - interest_payment
#         balance -= principal_payment

#         # Round to two decimal places for currency
#         schedule.append({
#             "month": month,
#             "payment": round(monthly_payment, 2),
#             "interest_payment": round(interest_payment, 2),
#             "principal_payment": round(principal_payment, 2),
#             "remaining_balance": round(balance, 2)
#         })

#     return schedule

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

    # Validate loan ID
    try:
        loan = Loan.objects.get(id=data.get('loan_id'))
    except Loan.DoesNotExist:
        return Response({"error": "Loan not found."}, status=status.HTTP_404_NOT_FOUND)

    requested_amount = data.get('requested_amount')
    requested_duration = data.get('requested_duration')

    # Validate ranges
    if not (loan.min_amount <= requested_amount <= loan.max_amount):
        return Response({"error": "Requested amount out of range."}, status=status.HTTP_400_BAD_REQUEST)
    if not (loan.min_duration <= requested_duration <= loan.max_duration):
        return Response({"error": "Requested duration out of range."}, status=status.HTTP_400_BAD_REQUEST)

    # Update loan request
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