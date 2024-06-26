# Generated by Django 5.0.2 on 2024-06-17 16:09

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Appointments',
            fields=[
                ('appointment_id', models.AutoField(primary_key=True, serialize=False)),
                ('schedule_id', models.IntegerField()),
                ('user_id', models.IntegerField()),
                ('appointment_date', models.DateField()),
                ('appointment_duration', models.DurationField()),
                ('entry_datetime', models.DateTimeField()),
                ('theme_id', models.IntegerField()),
                ('status', models.TextField()),
                ('kind', models.TextField()),
            ],
            options={
                'db_table': 'appointments',
            },
        ),
        migrations.CreateModel(
            name='Events',
            fields=[
                ('event_id', models.AutoField(primary_key=True, serialize=False)),
                ('schedule_id', models.IntegerField()),
                ('event_date', models.DateField()),
                ('duration', models.DurationField()),
            ],
            options={
                'db_table': 'events',
            },
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('role_id', models.AutoField(primary_key=True, serialize=False)),
                ('role', models.TextField()),
            ],
            options={
                'db_table': 'role',
            },
        ),
        migrations.CreateModel(
            name='Themes',
            fields=[
                ('theme_id', models.AutoField(primary_key=True, serialize=False)),
                ('theme_name', models.CharField(max_length=200)),
                ('theme_type', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'themes',
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('identifier', models.CharField(default=uuid.uuid4, max_length=32)),
                ('name', models.TextField()),
                ('surname', models.TextField()),
                ('username', models.TextField()),
                ('patronymic', models.TextField()),
                ('password', models.TextField()),
                ('email', models.TextField()),
                ('gender', models.CharField(choices=[('Мужской', 'Мужской'), ('Женский', 'Женский'), ('Альтернативный', 'Альтернативный')], default='Другое', max_length=20)),
                ('age', models.IntegerField(default=0)),
                ('birthdate', models.DateField()),
                ('photo', models.ImageField(blank=True, null=True, upload_to='users_photos/')),
                ('role_id', models.IntegerField()),
            ],
            options={
                'db_table': 'users',
            },
        ),
        migrations.CreateModel(
            name='UserSchedule',
            fields=[
                ('schedule_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_id', models.IntegerField(unique=True)),
            ],
            options={
                'db_table': 'schedules',
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='user_photos/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='get_content.users')),
            ],
            options={
                'db_table': 'user_profile',
            },
        ),
    ]
