from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Users
from .models import UserProfile
from .serializer import UserModelSerializer
from django.contrib.auth import get_user_model
from rest_framework.request import Request
from rest_framework.decorators import api_view
from datetime import datetime
from django.db.models import Q
import requests
import time
import sqlite3
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import AccessToken
    
class SettingsProfile(APIView):
    def get(self, request):
        data_list = Users.objects.all()
        serializer = UserModelSerializer(data_list, many=True)
        return Response(serializer.data)
    
    def put(self, request):
        username = request.data.get('username')
        try:
            user_profile = Users.objects.get(username=username)
        except Users.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_102_PROCESSING)
        
        serializer = UserModelSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView): 
    def get(self, request):
        data_list = Users.objects.all()
        serializer = UserModelSerializer(data_list, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate_user(username, password)
        if user:
            # Генерируем access токен для пользователя
            access_token = AccessToken.for_user(user)
            # Добавляем идентификатор пользователя в токен
            access_token['user_id'] = user.id
             # Сериализуем токен
            # token_serializer = TokenObtainPairSerializer(access_token)

            # Возвращаем access токен и данные пользователя
            return Response({
                'access_token': str(access_token),
                # 'refresh_token': token_serializer.data
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

def authenticate_user(username_check, password):
    try:
        user = Users.objects.get(username=username_check)
        if check_password(password, user.password):
            return user
    except Users.DoesNotExist:
        pass
    return None

class UserAPIView(APIView):
    def get(self, request, user_id):
        get_id = user_id
        try:
            user_profile = Users.objects.get(id=get_id)
            serializer = UserModelSerializer(user_profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"message": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)

class RegistrationAPIView(APIView): 
    def post(self, request):
        data = request.data

        # Проверяем уникальность имени пользователя и адреса электронной почты
        username = data['username']
        email = data['email']
        if Users.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_401_UNAUTHORIZED)
        if Users.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Хешируем пароль
        data['password'] = make_password(data['password'])

        data['age'] = self.calculate_age(data.get('birthdate'))
        serializer = UserModelSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def calculate_age(self, birthdate):
        birthdate = datetime.strptime(birthdate, '%Y-%m-%d')
        today = datetime.today()
        age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
        return age