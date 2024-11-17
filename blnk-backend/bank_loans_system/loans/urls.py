from django.urls import path
from .views import (
    auth,
    personnel,
    provider,
    customer
)

urlpatterns = [
    path('login/', auth.login_user, name='login'),
    # provider apis
    path('loan-provider/fund-loan/', provider.loan_provider_fund_loan, name='loan_provider_fund_loan'),
    path('loan-funds/', provider.get_all_loan_funds, name='get_all_loan_funds'),

    # customer apis
    path('request-loan/', customer.request_loan, name='request-loan'),
    path('loan-funds/by-bank/', customer.get_loan_funds_by_bank, name='get_loan_funds_by_bank'),
    path('calculate/amortization/', customer.amortization_schedule, name='amortization_schedule'),
    path('customer-loans/', customer.get_customer_requested_loans_status, name='customer-requested-loans'),
    path('edit-loan/', customer.request_loan_after_params_defined, name='request_loan_after_params_defined'),

    # personnel apis
    path('bank-personnel/create-loan-fund/', personnel.bank_personnel_create_loan_fund, name='bank-personnel-create-loan-fund'),
    path('bank-personnel/create-loan/', personnel.bank_personnel_create_loan, name='bank-personnel-create-loan'),
    path('define-loan-details/<int:loan_id>/', personnel.define_loan_details, name='define-loan-details'),
    path('bank-personnel/status-action-loan/<int:loan_id>/', personnel.bank_personnel_approve_loan, name='bank-personnel-approve-loan'),
    path('retrieve-requested-loans/', personnel.bank_personnel_view_loan_requests, name='retrieve-requested-loans'),

]
