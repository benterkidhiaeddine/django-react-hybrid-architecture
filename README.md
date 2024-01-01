# Installation

1. First install pipenv in your global python installation if you don't have it

```
pip install pipenv --user

```

2. run the following command to start a virtualenv and install dependancies

```
pipenv install

```

3. Enter in the django directory and Run the installation command for the frontend app

```
npm install

```

4. If you do any modification to the js Code make sure you to be running the npm run dev to recompile the js bundle served

```
npm run dev

```

5. To run the django server first cd in the project directory "crm" then run the following command to run the migrations

```
python manage.py migrate

```

6. Create a super user because this application has protected routes for the API

```
python manage.py createsuperuser

```

7. Then you can run the developement server and acess the react app on "127.0.0.1/employees"

```
python manage.py runserver

```

# Installation with Docker

- Make sure you have Docker installed and the Docker engine is running for your operating system

1. Run the build command at the root of your project

```
docker build -t django-react .
```

2. Run the docker image as a container

```
docker run -i --rm -p 8000:8000 django-react
```

3. Go to the admin route to login so you can access the react crud app and the API

- the admin route is 127.0.0.1:8000/admin

The admin credentials are set in the settings file under the ADMINS variable so you can change , add a tuple to specify other admins to the django application

```
#List of admins

ADMINS =[

    ("admin" , "admin@email.com")
]
```

The password is setup hardcoded inside the managment directory under initadmin.py file inside the employees app as "admin" , you can change it by setting up to get
the password from an .env File

4. Once you are logged in you can acess the react application under 127.0.0.1:8000/employees , or test the api under 127.0.0.1:8000/api
