from re import template
from typing import Any
from django.shortcuts import render
from django.views.generic.base import TemplateView

from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from rest_framework import permissions, viewsets


from .serializers import EmployeeSerializer
from .models import Employee
from .permissions import IsOwnerOrReadOnly

# Create your views here.


class Home(TemplateView):
    template_name = "employees/index.html"


@method_decorator(login_required, name="dispatch")
class EmployeeView(TemplateView):
    template_name = "employees/employee.html"

    def get_context_data(self, **kwargs):
        return {
            "department_choices": [
                {"id": c[0], "name": c[1]} for c in Employee.DEPARTMENT_CHOICES
            ]
        }


class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        # filter queryset based on logged in user
        return self.request.user.employees.all()

    def perform_create(self, serializer):
        # ensure current user is correctly populated on new objects
        serializer.save(user=self.request.user)

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
