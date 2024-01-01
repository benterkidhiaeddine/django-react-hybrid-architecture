from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from django.conf import settings

class Command(BaseCommand):
    def handle(self, *args, **options):
        if User.objects.count() == 0:
            for user in settings.ADMINS:
                username = user[0].replace(" ", "")
                email = user[1]
                password = "admin"
                print(f"Creating account for user {username} {email}")
                admin = User.objects.create_superuser(email=email ,username=username , password=password)
                admin.is_active = True
                admin.is_staff = True
                admin.save()

        else:
            print("Admin account has been already initialized, you can't initialize more")