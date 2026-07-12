# Auth API

A REST API for user authentication, built as a backend portfolio project.

It demonstrates a complete authentication flow: registration, password hashing,
JWT login, protected routes, OpenAPI documentation, and automated integration
tests.

## Features

- User registration with input validation
- Password hashing with Bcrypt
- Login with JSON Web Tokens (JWT)
- Protected endpoint for the authenticated user
- MongoDB persistence through Mongoose
- Consistent error responses
- Interactive Swagger/OpenAPI documentation
- Integration tests using an isolated temporary MongoDB instance

## Tech stack

- Node.js
- TypeScript
- Express
- MongoDB + Mongoose
- Zod
- Bcrypt
- JSON Web Token
- Swagger UI / OpenAPI
- Vitest + Supertest

## Getting started

### Prerequisites

- Node.js
- npm
- MongoDB running locally

### Installation

```bash
git clone https://github.com/CarlosGit0519/auth-api.git
cd auth-api
npm install
```

Create your local environment file:

```powershell
Copy-Item .env.example .env
```

Update `.env` with a secure JWT secret. Example:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/auth-api
JWT_SECRET=replace-with-a-secure-random-secret
JWT_EXPIRES_IN=1h
```

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

## Run with Docker

Docker Compose starts the API and a MongoDB container together:

```bash
docker compose up --build
```

The API is available at `http://localhost:3000` and MongoDB data is persisted
in the `mongo-data` Docker volume. The local `.env` file must include
`JWT_SECRET`; Docker Compose connects the API to the MongoDB container
automatically.

To stop the containers:

```bash
docker compose down
```

## API documentation

With the server running, open [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
to view and test the API interactively through Swagger UI.

## Endpoints

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/v1/auth/register` | No | Register a user. |
| `POST` | `/api/v1/auth/login` | No | Log in and receive a JWT access token. |
| `GET` | `/api/v1/auth/me` | Bearer token | Get the current authenticated user. |
| `GET` | `/health` | No | Check whether the API is running. |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API in development mode. |
| `npm run build` | Compile TypeScript to JavaScript. |
| `npm start` | Run the compiled application. |
| `npm run typecheck` | Check TypeScript types without creating build files. |
| `npm test` | Run the integration test suite. |
| `npm run test:watch` | Run tests in watch mode. |

## Tests

```bash
npm test
```

The suite verifies registration, duplicate-email protection, login, and access
to the protected current-user endpoint. It uses a temporary MongoDB instance, so
it does not modify local development data.

## Project structure

```text
src/
├── config/       # Environment and database configuration
├── docs/         # OpenAPI definition
├── errors/       # Application-specific errors
├── middlewares/  # Error handling and JWT protection
├── modules/      # Authentication and user features
├── types/        # Shared TypeScript declarations
├── app.ts        # Express application configuration
└── server.ts     # Application startup
```

## Security notes

- Passwords are hashed before storage and are never returned by the API.
- JWT secrets are read from environment variables and must not be committed.
- Protected routes require a valid `Authorization: Bearer <token>` header.
- Validation happens before data reaches business logic.

## Future improvements

- Refresh tokens
- Password reset and email verification
- Role-based access control
- Rate limiting
- Docker and CI/CD
