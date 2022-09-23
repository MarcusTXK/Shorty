# Shorty [![Build Status](https://app.travis-ci.com/MarcusTXK/url-shortener.svg?branch=main)](https://app.travis-ci.com/MarcusTXK/url-shortener)

Shorty is url shortener that aims to create unique shortened urls from longer urls. A random shortened url will be created if no ‘customUrl’ is specified (minimum length of 1, maximum of length 10). All shortened urls/custom urls have to be unique. When the user visits the shortened url, the goal is to provide them with the original url so that they can visit the original url with just the shortened url.

A shortened url will also have an option of being password protected with a password with a minimum of length 5. If a shortened url has a password, the user will be unable to get the original url from just the id, but must post the correct password to get access to the original url.

## Running the app

For development, run backend in watch mode and database seperately

```bash
# Run cassandra seperately
$ docker-compose -f docker-compose.dev.yml up

# Run backend in watch mode
$ cd backend
$ npm run start:dev
```

Alternatively, run the backend in one go with

```bash
$ docker-compose up --build
```

For frontend

```bash
# Run frontend in watch mode
$ cd frontend
$ npm run dev
```

![image](https://user-images.githubusercontent.com/50147457/191753523-3df5c153-09f3-4a6f-9253-f8a841dc9bf2.png)
![image](https://user-images.githubusercontent.com/50147457/191753534-0c6ced1a-fe76-4827-ae81-cddcd9b75c8e.png)
