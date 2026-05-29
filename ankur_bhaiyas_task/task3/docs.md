# Simple E-commerce Product API Documentation

This document explains the project setup, folder flow, utilities, middleware, and APIs built so far.

## 1. Project Setup

I started by creating a basic Express server setup for the ecommerce API.

### Main Files

- `server.js`
  - Starts the server.
  - Connects the application to MongoDB.
  - Reads the port from environment variables.

- `src/app.js`
  - Creates the Express app.
  - Adds global middlewares like JSON parsing and cookie parsing.
  - Mounts user and product routes.
  - Adds the global error handler at the end.

### Libraries Used

- `express`
  - Used to create the HTTP server and API routes.

- `dotenv`
  - Used to load environment variables from `.env`.

- `mongoose`
  - Used to connect and work with MongoDB.

- `cookie-parser`
  - Used to read cookies from incoming requests.

## 2. Database Configuration

MongoDB connection is handled inside:

`src/configs/database.js`

Purpose:

- Connect the app to MongoDB using Mongoose.
- Keep database connection logic separate from server logic.
- Make the project structure clean and scalable.

Environment variable used:

- `MONGO_URI`

## 3. Cache / Redis Configuration

Redis configuration is handled inside:

`src/configs/cache.js`

Purpose:

- Create a Redis client.
- Used for token blacklist checks.
- Helps support logout/session invalidation flow.

Libraries used:

- `ioredis`

## 4. Models

### User Model

File:

`src/models/user.model.js`

Fields:

- `name`
  - String
  - Required
  - Trimmed

- `email`
  - String
  - Required
  - Unique
  - Trimmed
  - Lowercase
  - Email format validation

- `password`
  - String
  - Required
  - Minimum 8 characters
  - `select: false` so password is not returned by default

Extra setup:

- `timestamps: true`
  - Adds `createdAt` and `updatedAt`.

- `toJSON` and `toObject` transform
  - Removes `password` from response.
  - Removes `__v` from response.
  - This avoids manually deleting password in services/controllers.

### Product Model

File:

`src/models/product.model.js`

Fields:

- `name`
  - String
  - Required
  - Trimmed

- `description`
  - String
  - Trimmed

- `price`
  - Number
  - Required

- `category`
  - String
  - Enum values:
    - `electronics`
    - `clothing`
    - `books`
    - `home`
    - `beauty`
    - `sports`

- `images`
  - Array of strings
  - Default empty array

Purpose:

- Store ecommerce product data.
- Support multiple image URLs.
- Support category filtering later.

## 5. Utilities

### AppError Utility

File:

`src/utils/appError.js`

Purpose:

- Create custom operational errors.
- Send proper status code and message to the global error handler.
- Avoid writing manual error responses everywhere.

Example use:

```js
throw new AppError(400, "Invalid email format");
```

### CatchAsync Utility

File:

`src/utils/catchAsync.js`

Purpose:

- Wrap async controllers and middleware.
- Automatically forwards async errors to `next()`.
- Avoids repetitive `try/catch` blocks in every controller.

### Password Utility

File:

`src/utils/password.js`

Purpose:

- Hash plain passwords using bcrypt.
- Compare plain passwords with hashed passwords.

Library used:

- `bcrypt`

Functions:

- `generateHash`
  - Converts plain password into hashed password.

- `compareHash`
  - Compares login password with stored hash.

### Token Utility

File:

`src/utils/token.js`

Purpose:

- Generate JWT tokens.
- Verify JWT tokens.
- Keeps token logic separate from controllers and services.

Library used:

- `jsonwebtoken`

Current setup:

- Uses `RS256` algorithm.
- Uses private and public keys from environment variables.

Environment variables used:

- `PRIVATE_JWT_KEY_BS64`
- `PUBLIC_JWT_KEY_BS64`

## 6. Middleware

### Global Error Handler

File:

`src/middlewares/globalErrorHandler.middleware.js`

Purpose:

- Central place for handling all application errors.
- Sends detailed errors in development.
- Sends safe messages in production.

### Auth Middleware

File:

`src/middlewares/auth.middleware.js`

Purpose:

- Read auth token from cookies.
- Check if token is blacklisted in Redis.
- Verify token using `verifyToken` utility.
- Attach logged-in user data to `req.user`.

Cookie names supported:

- `token`

Flow:

1. Read token from cookies.
2. If token is missing, throw unauthorized error.
3. Check token in Redis blacklist.
4. If blacklisted, block request.
5. Verify token using token utility.
6. Attach decoded user data to `req.user`.
7. Continue to next middleware/controller.

### Multer Middleware

File:

`src/middlewares/multer.middleware.js`

Purpose:

- Handle image uploads.
- Uses memory storage.
- Allows only image files.
- Limits file size to 5MB.

Library used:

- `multer`

This will be used later for product image upload APIs.

### Validation Middleware

File:

`src/middlewares/validate.middleware.js`

Purpose:

- Handle validation errors from `express-validator`.
- Sends the first validation error to the global error handler.
- Keeps validation error handling reusable for all validation files.

Library used:

- `express-validator`

Function:

- `handleValidationErrors`

Why this was created:

- I do not want to repeat validation error handling in every validation file.
- Any validation file can import and use this middleware at the end of its validation array.

## 7. Validations

### Auth Validation

File:

`src/validations/auth.validation.js`

Purpose:

- Store validation rules for auth-related APIs.

Current validation:

- `validateRegister`

Rules:

- `name`
  - Required
  - Trimmed
  - Minimum 2 characters

- `email`
  - Required
  - Must be valid email
  - Normalized

- `password`
  - Required
  - Minimum 8 characters

At the end, it uses `handleValidationErrors` middleware.

## 8. Routes

### User Routes

File:

`src/routes/user.route.js`

Base path:

`/api/v1/users`

Current route:

- `POST /register`

Route pipeline:

```js
userRouter.post("/register", validateRegister, register);
```

Meaning:

1. First request body is validated.
2. If validation passes, controller runs.
3. If validation fails, global error handler sends response.

### Product Routes

File:

`src/routes/product.route.js`

Base path:

`/api/v1/products`

Currently product routes are not added yet. They will be documented when created.

## 9. Register API

### Endpoint

`POST /api/v1/users/register`

### Purpose

Create a new user account and return an auth token.

### Authentication Required

No.

This API is public because a new user must be able to register before login/authentication.

### Required Fields

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### End-to-End Flow

#### Step 1: Request Comes To Route

File:

`src/routes/user.route.js`

The request first reaches:

```js
POST /api/v1/users/register
```

The route uses:

- `validateRegister`
- `register`

#### Step 2: Validation Runs

File:

`src/validations/auth.validation.js`

Validation checks:

- `name` must exist and must be at least 2 characters.
- `email` must exist and must be a valid email.
- `password` must exist and must be at least 8 characters.

If validation fails:

- `handleValidationErrors` creates an `AppError`.
- Error is passed to global error handler.
- Request does not reach the controller.

#### Step 3: Controller Runs

File:

`src/controllers/auth.controller.js`

Controller function:

```js
register
```

Controller responsibility:

- Receive validated request body.
- Call `registerUserService`.
- Set token in an httpOnly cookie.
- Send final success response.

Cookie setup:

- Cookie name: `token`
- `httpOnly: true`
- `secure: true` only in production
- `sameSite: strict`
- Expiry: 1 hour

#### Step 4: Service Handles Business Logic

File:

`src/services/auth.service.js`

Service function:

```js
registerUserService
```

Service responsibility:

1. Receive `name`, `email`, and `password`.
2. Check if user already exists using email.
3. If user exists, throw `AppError(409, "User already exists")`.
4. Hash password using `generateHash`.
5. Create new user in MongoDB.
6. Generate JWT token using `generateToken`.
7. Return user and token to controller.

#### Step 5: Password Is Hashed

File:

`src/utils/password.js`

Function used:

```js
generateHash(password)
```

Purpose:

- Never store plain password in database.
- Store only bcrypt hashed password.

#### Step 6: Token Is Generated

File:

`src/utils/token.js`

Function used:

```js
generateToken(payload)
```

Payload:

```js
{
  id: user._id,
  email: user.email
}
```

Purpose:

- Create JWT token for the registered user.
- Token is sent in response and also stored in cookie.

#### Step 7: Response Is Sent

Success response:

Status code:

`201 Created`

Example response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "DATE",
      "updatedAt": "DATE"
    },
    "token": "JWT_TOKEN"
  }
}
```

Password is not returned because the user model removes it using `toJSON` and `toObject` transforms.

### Error Responses

#### Missing Name, Email, Or Password

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Name is required"
}
```

#### Invalid Email

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Invalid email format"
}
```

#### Short Password

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Password must be at least 8 characters"
}
```

#### User Already Exists

Status:

`409 Conflict`

Example:

```json
{
  "success": false,
  "message": "User already exists"
}
```
