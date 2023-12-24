from django.urls import path
from .views import Home, EmployeeView

urlpatterns = [
    # other patterns here
    path("", Home.as_view(template_name="employees/index.html")),
    path("employees", EmployeeView.as_view()),
]
