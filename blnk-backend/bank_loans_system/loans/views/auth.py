from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import UserSerializer

@api_view(['POST'])
@permission_classes([AllowAny])  # Allow anyone to access the login endpoint
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        serializer = UserSerializer(user)
        return Response({
            'user': serializer.data,
            'access_token': str(access_token),
            'refresh_token': str(refresh),
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
