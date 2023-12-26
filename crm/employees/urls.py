from django.urls import path, include
from .views import Home, EmployeeView, EmployeeViewSet

from rest_framework import routers

router = routers.DefaultRouter()

# Register the EmployeeViewSet in the default router to provide sensible default api url generation
router.register(r"employees", EmployeeViewSet, basename="employee")


urlpatterns = [
    # other patterns here
    path("", Home.as_view(template_name="employees/index.html"), name="react-app"),
    path("employees/", EmployeeView.as_view(), name="react-app"),
    path("employees/<path:path>", EmployeeView.as_view(), name="react-app-with-path"),
    path("api/", include(router.urls)),
]
