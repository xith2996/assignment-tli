# TLI Assignment

## Table of contents
  - [Development Environment](#development-environment)
  - [Build and Run](#build-and-run)
  - [Docker](#docker)
  - [Environment](#environment)
  - [APIs](#apis)

## Development Environment

- Node 14+
- Git
- VS Code
- Docker 20+
- Bootstrap
- Express
- EJS

**Database**

- MongoDB

## Build and Run

**Steps**

1. Build module with NodeJS

```sh
npm install
```

3. Run project
Before run the command line below, please make sure the environment configured in files `.env` correctly

```sh
# Production
npm run start

# Developer - run with nodemon
npm run dev
```

## Docker
```sh
# Pull from Docker Hub
docker pull xith/assignment-tli:latest

# Run docker
docker run -p 4000:4000 xith/assignment-tli:latest
```

## Environment
There is two variable that must config in `.env`

- MONGO_URI
- API_PORT (optional)

```sh
# Mock database created for assignment. Don't include sensitive information.
MONGO_URI=mongodb+srv://admin:311441@cluster0.hcajioe.mongodb.net/?retryWrites=true&w=majority;

```

## APIs
```sh
# Index ${URL}:{PORT}/
http://localhost:4000/

# Get Rate ${URL}:{PORT}/getrate
http://localhost:4000/getrate

# Fetch a single 'Customer' ${URL}:{PORT}/api/fetch
# Method: POST 
# Required body object.
http://localhost:4000/api/fetch

# Fetch all 'Customer' ${URL}:{PORT}/api/fetchall
# Method: GET 
http://localhost:4000/api/fetchall

# Add a single 'Customer' with 'Policies' ${URL}:{PORT}/api/add
# Method: POST 
# Required body object.
http://localhost:4000/api/add

# Delete 'Customer' ${URL}:{PORT}/api/delete/:id
# Method: DELETE 
# Required :id.
http://localhost:4000/api/delete/:id

```
**All APIs presents at `app.js` file.**