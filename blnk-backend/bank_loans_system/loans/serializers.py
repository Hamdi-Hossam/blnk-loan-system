from rest_framework import serializers
from .models import Bank, User, Role, LoanProvider, LoanFund, BankPersonnel, LoanCustomer, TotalFunds, Loan
from django.contrib.auth.hashers import make_password



# Serializer for the Bank model
class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ['id', 'name', 'total_funds']

# Serializer for the Role model
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'bank_id', 'first_name', 'last_name', 'username', 'role_id', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """
        Override the create method to handle foreign key fields and hash the password.
        """
        # Pop foreign key IDs from the validated data
        bank_id = validated_data.pop('bank_id', None)
        role_id = validated_data.pop('role_id', None)

        # Hash the password
        validated_data['password'] = make_password(validated_data['password'])

        # Retrieve the foreign key instances
        bank = Bank.objects.get(id=bank_id) if bank_id else None
        role = Role.objects.get(id=role_id) if role_id else None

        # Create the User instance with foreign keys
        user = User.objects.create(
            bank=bank,
            role=role,
            **validated_data
        )

        return user

# Serializer for the LoanProvider model
class LoanProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanProvider
        fields = ['id', 'user', 'total_funds']

# Serializer for the LoanFund model
class LoanFundSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanFund
        fields = [
            'id', 'loan_type', 'providers', 'customers', 'min_amount', 'max_amount',
            'interest_rate', 'min_duration', 'max_duration', 'bank_personnel', 'is_active', "bank"
        ]

    def to_representation(self, instance):
        # Get the default representation from the parent serializer
        representation = super().to_representation(instance)

        # Replace the 'bank' field with the bank's name
        representation['bank'] = instance.bank.name if instance.bank else None

        # Remove unwanted fields
        representation.pop('is_active', None)
        representation.pop('providers', None)
        representation.pop('customers', None)
        representation.pop('bank_personnel', None)

        return representation

    def create(self, validated_data):
        # Ensure the bank field is correctly set
        bank = validated_data.pop("bank")
        loan_fund = LoanFund.objects.create(bank=bank, **validated_data)
        return loan_fund

# Serializer for the BankPersonnel model
class BankPersonnelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankPersonnel
        fields = ['id', 'user']

# Serializer for the LoanCustomer model
class LoanCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanCustomer
        fields = ['id', 'user', 'monthly_income']

# Serializer for TotalFunds model
class TotalFundsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalFunds
        fields = ['id', 'loan_provider', 'loan_fund', 'fund_amount', 'fund_date']

# Serializer for the Loan model
class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = [
            'id', 'loan_fund', 'max_amount', 'min_amount', 'customer', 'min_duration',
            'max_duration', 'is_totally_paid', 'requested_amount', 'requested_duration', 
            'bank_personnel', 'status','is_params_defined'
        ]
        read_only_fields = ['requested_amount', 'requested_duration']
    def to_representation(self, instance):
        # Get the default representation from the parent serializer
        representation = super().to_representation(instance)
        representation['loan_fund'] = instance.loan_fund.loan_type if instance.loan_fund else None
        representation['interest_rate'] = instance.loan_fund.interest_rate if instance.loan_fund else None
        representation['monthly_income'] = instance.customer.monthly_income if instance.customer else None
        # Remove unwanted fields
        representation.pop('providers', None)
        representation.pop('customer', None)
        representation.pop('bank_personnel', None)
        representation.pop('is_totally_paid', None)

        return representation
