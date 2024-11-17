from django.contrib import admin
from .models import Bank, Role,User, LoanProvider, LoanCustomer, BankPersonnel
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
# Register the Bank model
@admin.register(Bank)
class BankAdmin(admin.ModelAdmin):
    list_display = ('name', 'total_funds')  # Fields to display in the list view
    search_fields = ('name',)  # Fields to search by in the admin
    list_filter = ('name',)  # Fields to filter by in the admin

# Register the Role model
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Fields to display in the list view
    search_fields = ('name',)  # Fields to search by in the admin

class CustomUserAdmin(UserAdmin):
    # Fields to display in the admin panel
    list_display = ('username', 'email', 'first_name', 'last_name', 'bank', 'role')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'bank', 'role')
    search_fields = ('username', 'email', 'first_name', 'last_name')

    # Group fields into sections for clarity
    fieldsets = (
        (None, {'fields': ('username', 'password', 'first_name', 'last_name')}),
        (_('Personal info'), {'fields': ('email',)}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('Additional info'), {'fields': ('bank', 'role')}),
    )

    # Fields shown when adding a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'first_name', 'last_name', 'bank', 'role'),
        }),
    )

    ordering = ('username',)

    # Override save_model to create corresponding records in other models based on the chosen role
    def save_model(self, request, obj, form, change):
        # Save the user first
        super().save_model(request, obj, form, change)

        # After the user is created or updated, check the role and create corresponding model instances
        if obj.role:
            if obj.role.name == 'provider':  # Example for LoanProvider
                LoanProvider.objects.create(user=obj, total_funds=0.0)  # Add default values for new fields
            elif obj.role.name == 'personnel':  # Example for BankPersonnel
                BankPersonnel.objects.create(user=obj)
            elif obj.role.name == 'customer':  # Example for LoanCustomer
                LoanCustomer.objects.create(user=obj, monthly_income=0.0)  # Add default monthly_income or other required fields
            # Add other roles as necessary

admin.site.register(User, CustomUserAdmin)

