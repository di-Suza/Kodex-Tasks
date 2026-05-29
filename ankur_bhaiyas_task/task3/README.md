# Simple E-commerce Product API

This is a Node.js, Express, MongoDB ecommerce API for user authentication and product management. It supports JWT authentication through httpOnly cookies, Redis token blacklisting, product CRUD, multiple image uploads, ImageKit storage, validation, and centralized error handling.

For detailed API flow documentation, see `docs.md`.

## Features

- User register, login, get profile, and logout
- JWT auth stored in httpOnly cookies
- Redis blacklist support for logout
- Product create, read, update, and delete
- Product category filtering
- Fixed pagination with 20 products per page
- Multiple image upload using Multer
- Image storage using ImageKit
- Image metadata saved with `url` and `fileId`
- Old product images deleted from ImageKit during update/delete
- Request validation using `express-validator`
- Centralized error handling using custom `AppError`

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Redis
- ImageKit
- Multer
- bcrypt
- express-validator
- cookie-parser
- dotenv

## Folder Structure

```txt
task3/
  docs.md
  package.json
  package-lock.json
  README.md
  server.js
  src/
    app.js
    configs/
      cache.js
      database.js
      storage.js
    controllers/
      auth.controller.js
      product.controller.js
    middlewares/
      auth.middleware.js
      globalErrorHandler.middleware.js
      multer.middleware.js
      validate.middleware.js
    models/
      product.model.js
      user.model.js
    routes/
      product.route.js
      user.route.js
    services/
      auth.service.js
      product.service.js
    utils/
      appError.js
      catchAsync.js
      password.js
      token.js
      uploadImage.js
    validations/
      auth.validation.js
      product.validation.js
```

## Folder Purpose

- `server.js`
  - Loads environment variables.
  - Connects to MongoDB.
  - Starts the Express server.

- `src/app.js`
  - Creates the Express app.
  - Adds global middleware like JSON parser and cookie parser.
  - Mounts user and product routes.
  - Adds global error handler.

- `src/configs`
  - `database.js`: MongoDB connection.
  - `cache.js`: Redis client configuration.
  - `storage.js`: ImageKit configuration.

- `src/models`
  - Mongoose schemas for users and products.

- `src/routes`
  - API route definitions.

- `src/controllers`
  - Handles HTTP request and response logic.

- `src/services`
  - Contains business logic and database operations.

- `src/middlewares`
  - Auth, validation error handling, multer upload, and global error handling.

- `src/utils`
  - Reusable helpers for errors, async handling, password hashing, JWT, and ImageKit upload/delete.

- `src/validations`
  - Request validation rules using `express-validator`.

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the `task3` root.

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string

PRIVATE_JWT_KEY_BS64=your_base64_private_key
PUBLIC_JWT_KEY_BS64=your_base64_public_key

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

IMAGE_KIT_PUBLIC=your_imagekit_public_key
IMAGE_KIT_PRIVATE=your_imagekit_private_key
IMAGE_KIT_URL_ENDPOINT=your_imagekit_url_endpoint

NODE_ENV=development
```

## Running The Project

Development:

```bash
npm run dev
```

Production/start:

```bash
npm start
```

Default base URL:

```txt
http://localhost:8080/api/v1
```

## Packages Used

- `express`
  - Creates API server and routes.

- `mongoose`
  - Connects and interacts with MongoDB.

- `dotenv`
  - Loads `.env` variables.

- `cookie-parser`
  - Reads auth token from cookies.

- `jsonwebtoken`
  - Generates and verifies JWT tokens.

- `bcrypt`
  - Hashes and compares passwords.

- `express-validator`
  - Validates request body, params, and query.

- `multer`
  - Handles multipart form-data and multiple image uploads.

- `imagekit`
  - Uploads and deletes product images from ImageKit storage.

- `ioredis`
  - Handles Redis token blacklist.

## API Routes

### Auth / User Routes

Base path:

```txt
/api/v1/users
```

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/register` | No | Register new user |
| POST | `/login` | No | Login user and set token cookie |
| GET | `/me` | Yes | Fetch logged-in user |
| POST | `/logout` | Yes | Logout user and blacklist token |

### Product Routes

Base path:

```txt
/api/v1/products
```

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/` | No | Get products with pagination and optional category filter |
| GET | `/:id` | No | Get single product by ID |
| POST | `/` | Yes | Create product with multiple images |
| PUT | `/:id` | Yes | Update product and optionally replace images |
| DELETE | `/:id` | Yes | Delete product and its ImageKit images |

## Auth Flow

1. User registers or logs in.
2. Server generates JWT token.
3. Token is stored in an httpOnly cookie named `token`.
4. Protected routes read token from cookies.
5. Auth middleware checks Redis blacklist.
6. Token is verified.
7. User is fetched from database and attached to `req.user`.

## Logout Flow

1. Auth middleware verifies the logged-in user.
2. Logout service adds current token to Redis blacklist.
3. Controller clears the `token` cookie.
4. Any future request with the same token is blocked.

## Product Image Flow

### Create Product

1. Multer accepts multiple images from `images` field.
2. Product service creates a product id before saving.
3. Images upload to ImageKit folder:

```txt
/{userId}/{productId}
```

4. Each image is saved in DB as:

```js
{
  url: "image_url",
  fileId: "imagekit_file_id"
}
```

### Update Product Images

1. Product existence is checked.
2. Product ownership is checked.
3. Old ImageKit files are deleted using saved `fileId`.
4. New images are uploaded.
5. Product `images` array is replaced.

### Delete Product

1. Product existence is checked.
2. Product ownership is checked.
3. All ImageKit files are deleted using saved `fileId`.
4. Product document is deleted from MongoDB.

## Validation

Validation is handled with `express-validator`.

- Auth validation:
  - Register: name, email, password
  - Login: email, password

- Product validation:
  - Create product body
  - Update product body and product id
  - Get products query params
  - Product id params

Validation errors are handled by:

```txt
src/middlewares/validate.middleware.js
```

## Error Handling

Errors are handled through:

```txt
src/middlewares/globalErrorHandler.middleware.js
```

Custom operational errors use:

```txt
src/utils/appError.js
```

Async controllers are wrapped using:

```txt
src/utils/catchAsync.js
```

## Notes

- Token is not sent in response body. It is stored only in an httpOnly cookie.
- Protected routes require the `token` cookie.
- Product listing returns 20 products per page.
- Category filtering supports:
  - `electronics`
  - `clothing`
  - `books`
  - `home`
  - `beauty`
  - `sports`
- Detailed endpoint-by-endpoint flow is maintained in `docs.md`.
