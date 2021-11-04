# Authentication microservice

## Build the image

`docker build -t authentication .`

## Run the container

`docker run -p 3000:3000 -e GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID> -e GOOGLE_SECRET=<GOOGLE_SECRET> authentication`
