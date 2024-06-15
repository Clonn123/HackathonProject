from django.urls import path
from .views import LoginAPIView, RegistrationAPIView, SettingsProfile, UserAPIView

urlpatterns = [
    path('api/login/', LoginAPIView.as_view(), name='login_api_view'),
    path('api/register/', RegistrationAPIView.as_view(), name='register_api_view'),
    path('api/settings/', SettingsProfile.as_view(), name='settings_profile'), 
    path('api/user/<int:user_id>/', UserAPIView.as_view(), name='user_api'),
]
