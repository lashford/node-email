
# Node Email

A simple Node Express app packaged in a docker image, that exposes a simple rest api for sending emails.

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
docker run -p 8080:8080 -d lashford/node-email
```
