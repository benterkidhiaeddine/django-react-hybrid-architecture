from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Employee(models.Model):
    DEPARTMENT_CHOICES = [
        ("hr", "Human Resources"),
        ("finance", "Finance"),
        ("engineering", "Engineering"),
        ("marketing", "Marketing"),
        ("sales", "Sales"),
    ]
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="employees")
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
    salary = models.PositiveIntegerField()
