# TLI Assignment

## Table of contents
  - [Development Environment](#development-environment)
  - [Build & Run](#build&run)
  - [Docker](#docker)
  - [Environment](#env)

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

## Build & Run

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

## Environment
There is two variable that must config in `.env`

- MONGO_URI
- API_PORT (optional)

```sh
# Mock database created for assignment. Don't include sensitive information.
MONGO_URI=mongodb+srv://admin:311441@cluster0.hcajioe.mongodb.net/?retryWrites=true&w=majority;

```