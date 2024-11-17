from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from ..models import Loan
from ..serializers import LoanSerializer, LoanFundSerializer
from ..permissions import IsBankPersonnel
from django.shortcuts import get_object_or_404


@api_view(['POST'])
@permission_classes([IsBankPersonnel])
def bank_personnel_create_loan_fund(request):
    bank_personnel = request.user.bank_personnel
    data = request.data.copy()
    data["bank_personnel"] = bank_personnel.id
    
    bank=request.user.bank_id
    print(bank)

    data["bank"]=bank

    serializer = LoanFundSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsBankPersonnel])
def bank_personnel_create_loan(request):
    bank_personnel = request.user.bank_personnel
    data = request.data.copy()
    data["bank_personnel"] = bank_personnel.id

    serializer = LoanSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsBankPersonnel])
def bank_personnel_view_loan_requests(request):
    bank_personnel = request.user.bank_personnel
    loan_requests = Loan.objects.filter(bank_personnel=bank_personnel, status=Loan.PENDING, is_params_defined=False)
    serializer = LoanSerializer(loan_requests, many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

# Personnel defines loan details
@api_view(['PUT'])
@permission_classes([IsBankPersonnel])
def define_loan_details(request, loan_id):
    loan = Loan.objects.get(id=loan_id, status=Loan.PENDING, is_params_defined=False)
    # Update the loan details
    loan.min_amount = request.data.get("min_amount", loan.min_amount)
    loan.max_amount = request.data.get("max_amount", loan.max_amount)
    loan.min_duration = request.data.get("min_duration", loan.min_duration)
    loan.max_duration = request.data.get("max_duration", loan.max_duration)
    loan.interest_rate = request.data.get("interest_rate", loan.loan_fund.interest_rate)
    loan.is_params_defined = True
    loan.save()

    serializer = LoanSerializer(loan)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsBankPersonnel])
def bank_personnel_approve_loan(request, loan_id):
    bank_personnel = request.user.bank_personnel
    action = request.data.get("action")

    try:
        loan = Loan.objects.get(id=loan_id, bank_personnel=bank_personnel,is_params_defined=False)
    except Loan.DoesNotExist:
        return Response({"error": "Loan request not found"}, status=status.HTTP_404_NOT_FOUND)

    if action == "approve":
        loan.status = Loan.APPROVED
        loan.loan_fund.bank.total_funds -= loan.requested_amount
        loan.save()
        return Response({"status": "Loan approved"}, status=status.HTTP_200_OK)
    elif action == "decline":
        loan.status = loan.REJECTED
        loan.save()
        return Response({"status": "Loan declined"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
