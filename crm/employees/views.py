from re import template
from django.shortcuts import render
from django.views.generic.base import TemplateView

from django.contrib.auth.decorators import login_required

# Create your views here.


class Home(TemplateView):
    template_name = "employees/index.html"


class EmployeeView(TemplateView):
    template_name = "employees/employee.html"
