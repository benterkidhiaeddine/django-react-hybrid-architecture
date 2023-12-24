from re import template
from django.shortcuts import render
from django.views.generic.base import TemplateView


from rest_framework import permissions, viewsets


from .serializers import EmployeeSerializer
from .models import Employee
from .permissions import IsOwnerOrReadOnly

# Create your views here.


class Home(TemplateView):
    template_name = "employees/index.html"


class EmployeeView(TemplateView):
    template_name = "employees/employee.html"


class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        # filter queryset based on logged in user
        return self.request.user.employees.all()

    def perform_create(self, serializer):
        # ensure current user is correctly populated on new objects
        serializer.save(user=self.request.user)

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
