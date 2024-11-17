from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from loans.models import LoanFund, Bank, BankPersonnel
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APITestCase

# Get the custom user model
User = get_user_model()

class LoginUserTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()

    def test_login_user_success(self):
        data = {
            'username': 'testuser',
            'password': 'testpassword',
        }

        response = self.client.post('/api/login/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn('user', response.data)
        self.assertIn('access_token', response.data)
        self.assertIn('refresh_token', response.data)

    def test_login_user_invalid_credentials(self):
        data = {
            'username': 'wronguser',
            'password': 'wrongpassword',
        }

        response = self.client.post('/api/login/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertEqual(response.data, {'error': 'Invalid credentials'})