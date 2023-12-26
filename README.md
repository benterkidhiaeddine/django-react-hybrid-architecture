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
