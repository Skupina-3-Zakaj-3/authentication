# Authentication microservice

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Build the image

```
docker build -t authentication .
```

## Run the container

```
docker run -p 3000:3000 -e GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID> -e GOOGLE_SECRET=<GOOGLE_SECRET> authentication
```
