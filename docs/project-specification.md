# Project specification — Auth API

## 1. Purpose

Auth API is a REST API that provides the authentication foundation for an
application. It is a backend portfolio project designed to demonstrate
professional development practices: typed code, organised architecture, input
validation, secure password handling, authentication middleware, and API
documentation.

## 2. Target user

An application user who needs to create an account, sign in, and access their
own profile securely.

## 3. Version 1 scope

### User data

Each user will have:

- `name`
- `email`
- `password`

The password will never be returned by the API or stored as plain text.

### Features

| Feature | Description |
| --- | --- |
| Register | Creates a new account with a unique email address. |
| Login | Verifies the user's credentials and returns an access token. |
| Current user | Returns the authenticated user's profile through a protected endpoint. |
| Input validation | Rejects malformed or incomplete requests with clear error responses. |
| Error handling | Uses one consistent error-response format across the API. |
| API documentation | Documents endpoints, request bodies, and responses using Swagger/OpenAPI. |

## 4. Endpoints

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/v1/auth/register` | No | Register a user. |
| `POST` | `/api/v1/auth/login` | No | Authenticate a user and obtain an access token. |
| `GET` | `/api/v1/auth/me` | Bearer token | Retrieve the authenticated user's profile. |

## 5. Security requirements

- Passwords must be hashed with Bcrypt before storage.
- JWTs must be signed with a secret stored in environment variables.
- Protected endpoints must reject missing or invalid tokens.
- Request data must be validated before reaching business logic.
- Database credentials and secrets must never be committed to the repository.

## 6. Not included in version 1

The following features are intentionally deferred so that the first version is
small, complete, and well tested:

- Refresh tokens
- Password reset by email
- Email verification
- Roles and permissions
- Rate limiting
- Docker deployment

## 7. Definition of done

Version 1 is complete when all three endpoints work against MongoDB, invalid
requests receive appropriate errors, the API is documented, and the setup and
usage instructions are present in the README.
