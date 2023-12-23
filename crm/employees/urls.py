from django.urls import path
from .views import Home

urlpatterns = [
    # other patterns here
    path("", Home.as_view(template_name="employees/index.html"))
]
