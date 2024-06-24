from rest_framework import serializers
from .models import Users, Appointments, Events

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

    def to_representation(self, instance):
        representation = {
            'id': instance.id,
            'identifier': instance.identifier,
            'name': instance.name,
            'surname': instance.surname,
            'patronymic': instance.patronymic if instance.patronymic else None,
            'username': instance.username,
            'password': instance.password,
            'email': instance.email,
            'gender': instance.gender,
            'age': instance.age,
            'birthdate': instance.birthdate,
            'photo': instance.photo.url if instance.photo else None, 
        }
        return representation

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = '__all__'

    def to_representation(self, instance):
        representation = {     
            'appointment_id': instance.appointment_id,
            'event_id': instance.event_id,
            'user_id': instance.user_id,
            'entry_datetime': instance.entry_datetime,
            'theme_id': instance.theme_id,
            'status': instance.status,
            'description': instance.description,
        }
        return representation
    
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'

    def to_representation(self, instance):
        representation = {     
            'event_id': instance.event_id,
            'teacher_id': instance.teacher_id,
            'event_date': instance.event_date,
            'duration': instance.duration,
        }
        return representation