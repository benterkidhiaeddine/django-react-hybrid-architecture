from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Employee


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ""


class EmployeeSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault()
    )
    department = serializers.ChoiceField(choices=Employee.DEPARTMENT_CHOICES)

    class Meta:
        model = Employee
        fields = ("id", "user", "name", "department", "salary")
