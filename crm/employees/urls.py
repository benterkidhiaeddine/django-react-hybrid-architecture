from django.urls import path
from .views import Home

urlpatterns = [
    # other patterns here
    path("hello-webpack/", Home.as_view(template_name="employees/index.html"))
]
