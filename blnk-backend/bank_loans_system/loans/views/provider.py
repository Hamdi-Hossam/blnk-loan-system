from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from ..models import Bank, LoanFund, TotalFunds
from ..serializers import LoanFundSerializer, TotalFundsSerializer, BankSerializer
from ..permissions import IsLoanProvider


@api_view(['POST'])
@permission_classes([IsLoanProvider])
def loan_provider_fund_loan(request):
    loan_provider = request.user.loan_provider
    loan_fund_id = request.data.get("loan_fund_id")
    fund_amount = request.data.get("fund_amount")
    bank = request.user.bank

    try:
        if fund_amount <= 0:
            return Response({"error": "Fund amount must be positive"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({"error": "Invalid fund amount"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        loan_fund = LoanFund.objects.get(id=loan_fund_id)
    except LoanFund.DoesNotExist:
        return Response({"error": "Loan fund not found"}, status=status.HTTP_404_NOT_FOUND)

    total_fund = TotalFunds.objects.create(
        loan_provider=loan_provider,
        loan_fund=loan_fund,
        fund_amount=fund_amount
    )

    loan_provider.total_funds += fund_amount
    bank.total_funds += fund_amount
    bank.save()
    loan_provider.save()

    serializer = TotalFundsSerializer(total_fund)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsLoanProvider]) 
def get_all_loan_funds(request):
    bank = request.user.bank
    loan_funds = LoanFund.objects.filter(bank=bank)
    if not loan_funds.exists():
        return Response({"message": "No loan funds found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = LoanFundSerializer(loan_funds, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
