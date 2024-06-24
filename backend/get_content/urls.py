from django.urls import path
from .views import LoginAPIView, RegistrationAPIView, SettingsProfile, EventAPIView, TeacherListView, UserAPIView, AppointmentDetailAPIView, AppointmentDetailTeacherAPIView, AppointmentsListView, AppointmentListCreateAPIView

urlpatterns = [
    path('api/login/', LoginAPIView.as_view(), name='login_api_view'),
    path('api/register/', RegistrationAPIView.as_view(), name='register_api_view'),
    path('api/settings/', SettingsProfile.as_view(), name='settings_profile'), 
    path('api/user/<int:user_id>/', UserAPIView.as_view(), name='user_api'),
    path('api/list/teachers/', TeacherListView.as_view(), name='teacher-list'),
    path('api/appointments/', AppointmentListCreateAPIView.as_view(), name='appointment-list-create'),
    path('api/appointments/<int:pk>/', AppointmentDetailAPIView.as_view(), name='appointment-detail'),
    path('api/appointments/<int:pk>/<int:id_teacher>/', AppointmentDetailTeacherAPIView.as_view(), name='appointment-detail'),
    path('api/my_appointments/', AppointmentsListView.as_view(), name='my_appointments'),
    path('api/events/', EventAPIView.as_view(), name='new_event'),
]
