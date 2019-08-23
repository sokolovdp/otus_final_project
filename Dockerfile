FROM python:3.7-slim-buster

RUN  apt update && apt install build-essential -y

ADD . /django
WORKDIR /django
RUN pip install -r requirements.txt

CMD [ "python", "./manage.py", "runserver", "0.0.0.0:8000" ]