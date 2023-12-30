FROM python:3.11

# LABEL about the custom image
LABEL maintainer="benterki.dhiaeddine@gmail.com"
LABEL version="0.1"
LABEL description="This is a custom Docker Image for Running A react app with django as a hybrid architecture"
# Update Ubuntu Software repository
RUN apt update
RUN apt upgrade -y
RUN apt-get install snapd -y

#node
RUN  apt-get install -y ca-certificates curl gnupg \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key |  gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg 

RUN NODE_MAJOR=20 \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" |  tee /etc/apt/sources.list.d/nodesource.list

RUN  apt-get update
RUN  apt-get install nodejs -y

#Make the output of the django cli process be visible when running the docker container
ENV PYTHONUNBUFFERED=1



#specify the project folder
WORKDIR ./crm-project

# Install & use pipenv
COPY Pipfile Pipfile.lock ./
RUN python -m pip install --upgrade pip
RUN pip install pipenv && pipenv install --dev --system --deploy


#Create django superuser
RUN python manage.py createsuperuser

COPY crm .

#Install node modules
RUN npm install

EXPOSE 8000

#CMD ["python" ,"manage.py" ,"runserver"]
CMD ["python", "manage.py", "runserver" ,"0.0.0.0:8000"]
#CMD ["ls"]
