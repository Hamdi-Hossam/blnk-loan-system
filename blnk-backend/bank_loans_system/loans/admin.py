from django.contrib import admin
from .models import Bank, Role,User, LoanProvider, LoanCustomer, BankPersonnel
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _



@admin.register(Bank)
class BankAdmin(admin.ModelAdmin):
    list_display = ('name', 'total_funds')
    search_fields = ('name',)
    list_filter = ('name',)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'bank', 'role')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'bank', 'role')
    search_fields = ('username', 'email', 'first_name', 'last_name')

    fieldsets = (
        (None, {'fields': ('username', 'password', 'first_name', 'last_name')}),
        (_('Personal info'), {'fields': ('email',)}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('Additional info'), {'fields': ('bank', 'role')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'first_name', 'last_name', 'bank', 'role'),
        }),
    )

    ordering = ('username',)

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        if obj.role:
            if obj.role.name == 'provider':
                LoanProvider.objects.create(user=obj, total_funds=0.0)
            elif obj.role.name == 'personnel':
                BankPersonnel.objects.create(user=obj)
            elif obj.role.name == 'customer':
                LoanCustomer.objects.create(user=obj, monthly_income=0.0)

admin.site.register(User, CustomUserAdmin)

