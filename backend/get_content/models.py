from django.db import models
import uuid

class Users(models.Model):
    GENDER_CHOICES = [
        ('Мужской', 'Мужской'),
        ('Женский', 'Женский'),
        ('Альтернативный', 'Альтернативный'),
    ]
    
    id = models.IntegerField(primary_key=True)
    identifier = models.CharField(max_length=32, default=uuid.uuid4)
    name = models.TextField()
    surname = models.TextField()
    username = models.TextField()
    patronymic = models.TextField(null=True, blank=True)
    password = models.TextField()
    email = models.TextField()
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default='Другое')
    age = models.IntegerField(default=0)
    birthdate = models.DateField()
    photo = models.ImageField(upload_to='users_photos/', null=True, blank=True)
    role_id = models.IntegerField(default='0')

    class Meta:
        db_table = 'users'

class UserProfile(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='user_photos/', null=True, blank=True) 

    class Meta:
        db_table = 'user_profile'

    def __str__(self):
        return self.user.username
    
class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    role = models.TextField()

    class Meta:
        db_table = 'role'

class UserSchedule(models.Model):
    schedule_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(unique=True)

    class Meta:
        db_table = 'schedules'


class Events(models.Model):
    event_id = models.AutoField(primary_key=True)
    schedule_id = models.IntegerField()
    event_date = models.DateField()
    duration = models.DurationField()

    class Meta:
        db_table = 'events'


class Themes(models.Model):
    theme_id = models.AutoField(primary_key=True)
    theme_name = models.CharField(max_length=200)
    theme_type = models.CharField(max_length=20)

    class Meta:
        db_table = 'themes'


class Appointments(models.Model):
    appointment_id = models.AutoField(primary_key=True)
    schedule_id = models.IntegerField()
    user_id = models.IntegerField()
    appointment_date = models.DateField()
    appointment_duration = models.DurationField()
    entry_datetime = models.DateTimeField()
    theme_id = models.IntegerField()
    status = models.TextField()
    kind = models.TextField()

    class Meta:
        db_table = 'appointments'