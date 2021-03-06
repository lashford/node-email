
# Node Email

A simple Node Express app packaged in a docker image, that exposes a simple rest api for sending emails using the Mailgun api.

This particular implementation is used as a backend for the RSVP form on the lashfordswedding.com

## Prerequisites

* Node / NPM
* Docker

## Dev instructions

Express - The app uses the Express framework to create and expose a REST api (DOCS)[http://expressjs.com/]


### Building and running at app locally

Install the Node dependencies on your local dev machine

```
npm install
```

### Building the Docker Image

```bash
docker build -t lashford/node-email .
```

### Running the Docker Image

```bash
docker run -p 8080:8080 -e apiKey='mailgun-api-key' -e domain='mailgun-domain' lashford/node-email
```

### Example RSVP payload

```curl
curl localhost:8080/rsvp
```
