import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser

# User model with a custom user manager and related fields
class User(AbstractUser):
    bank = models.ForeignKey('Bank', on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    role = models.ForeignKey('Role', on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    # Additional fields inherited from AbstractUser, including username and password

# Bank model with a total fund attribute and related users and loan funds
class Bank(models.Model):
    name = models.CharField(max_length=50)
    total_funds = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    # The `related_name` is used to access related objects more conveniently
    def __str__(self):
        return self.name

# Role model for specifying roles of users
class Role(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

# LoanProvider model
class LoanProvider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='loan_provider')
    total_funds = models.DecimalField(max_digits=15, decimal_places=2)
    # List of loan funds can be accessed via related_name on the LoanFund model

# LoanFund model with various attributes, relationships with loan providers, and customers
class LoanFund(models.Model):
    loan_type = models.CharField(max_length=100)
    providers = models.ManyToManyField(LoanProvider, through='TotalFunds', related_name='loan_funds')
    customers = models.ManyToManyField('LoanCustomer', related_name='loan_funds', blank=True)
    min_amount = models.DecimalField(max_digits=15, decimal_places=2)
    max_amount = models.DecimalField(max_digits=15, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    min_duration = models.IntegerField(help_text="Minimum duration in months")
    max_duration = models.IntegerField(help_text="Maximum duration in months")
    bank_personnel = models.ForeignKey('BankPersonnel', on_delete=models.CASCADE, related_name='created_loan_funds')
    bank = models.ForeignKey('Bank', on_delete=models.CASCADE, related_name='loan_funds')
    is_active = models.BooleanField(default=True)

# BankPersonnel model with a reference to the User model
class BankPersonnel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='bank_personnel')
    # Related fields for created loan funds and loans

# LoanCustomer model with a reference to the User model and list of loans
class LoanCustomer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='loan_customer')
    monthly_income = models.DecimalField(max_digits=15, decimal_places=2)
    # List of loans can be accessed via related_name on the Loan model

# TotalFunds model for managing contributions to loan funds by loan providers
class TotalFunds(models.Model):
    loan_provider = models.ForeignKey(LoanProvider, on_delete=models.CASCADE)
    loan_fund = models.ForeignKey(LoanFund, on_delete=models.CASCADE)
    fund_amount = models.DecimalField(max_digits=15, decimal_places=2)
    fund_date = models.DateField(default=datetime.date.today)

# Loan model with various attributes and relationships to other models
class Loan(models.Model):
    PENDING = 'Pending'
    APPROVED = 'Approved'
    REJECTED = 'Rejected'

    LOAN_STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (APPROVED, 'Approved'),
        (REJECTED, 'Rejected'),
    ]
    loan_fund = models.ForeignKey(LoanFund, on_delete=models.CASCADE, related_name='loans')
    max_amount = models.DecimalField(max_digits=15, decimal_places=2)
    min_amount = models.DecimalField(max_digits=15, decimal_places=2)
    customer = models.ForeignKey(LoanCustomer, on_delete=models.CASCADE, related_name='loans')
    min_duration = models.IntegerField(help_text="Minimum duration in years")
    max_duration = models.IntegerField(help_text="Maximum duration in years")
    is_totally_paid = models.BooleanField(default=False)
    requested_amount = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    requested_duration = models.IntegerField(help_text="Requested duration in years", null=True, blank=True)
    bank_personnel = models.ForeignKey(BankPersonnel, on_delete=models.CASCADE, related_name='created_loans')
    is_params_defined = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20,
        choices=LOAN_STATUS_CHOICES,
        default=PENDING,
        help_text="Current status of the loan"
    )
