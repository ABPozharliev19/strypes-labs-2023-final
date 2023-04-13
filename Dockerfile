# syntax=docker/dockerfile:1
FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code/
COPY . /code/

RUN mkdir -p images/

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN apt-get install cron -y

COPY crontab /etc/cron.d/my-cronjob
RUN chmod +x /etc/cron.d/my-cronjob
RUN touch /var/log/cron.log

RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction --no-ansi

CMD cron && tail -f /var/log/cron.log