## Running the app

For development, run backend in watch mode and database seperately

```bash
# Run cassandra seperately
$ docker-compose -f docker-compose.dev.yml up

# Run backend in watch mode
$ cd backend
$ npm run start:dev

```

Alternatively, run it in one go with

```bash
$ docker-compose up --build
```
