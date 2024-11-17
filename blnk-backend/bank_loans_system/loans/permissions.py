from rest_framework.permissions import BasePermission

class IsBankPersonnel(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role_id == 3

class IsLoanProvider(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role_id == 1
    
class IsLoanCustomer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role_id == 2
