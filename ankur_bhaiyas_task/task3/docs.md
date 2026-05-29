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

- `imagekit`
  - Used to upload product images to ImageKit storage.

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
- Stores logged-out tokens until token expiry.

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

### Upload Image Utility

File:

`src/utils/uploadImage.js`

Purpose:

- Upload a single image file to ImageKit.
- Convert multer memory buffer into base64 before upload.
- Return uploaded image URL for saving in product document.

Function:

- `uploadImageToImageKit`

Why this utility was created:

- Product service can focus on business logic.
- ImageKit upload logic stays reusable for future image upload features.

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
- Find logged-in user from database and attach it to `req.user`.

Cookie names supported:

- `token`

Flow:

1. Read token from cookies.
2. If token is missing, throw unauthorized error.
3. Check token in Redis blacklist.
4. If blacklisted, block request.
5. Verify token using token utility.
6. Find user in database using decoded token id.
7. Attach database user data to `req.user`.
8. Continue to next middleware/controller.

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
For product creation, it is used with:

```js
upload.array("images")
```

This allows the API to receive multiple files in `req.files`.

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
- `validateLogin`

Register rules:

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

### Product Validation

File:

`src/validations/product.validation.js`

Purpose:

- Store validation rules for product-related APIs.

Current validation:

- `validateCreateProduct`
- `validateGetAllProducts`

Create product rules:

- `name`
  - Required
  - Trimmed
  - Minimum 2 characters

- `price`
  - Required
  - Must be greater than 0
  - Converted to number

- `category`
  - Optional
  - Must be one of allowed product categories

- `description`
  - Optional
  - Trimmed

At the end, it uses `handleValidationErrors` middleware.

Get all products rules:

- `category`
  - Optional
  - Must be one of allowed product categories

- `page`
  - Optional
  - Must be a positive number

At the end, it uses `handleValidationErrors` middleware.

Login rules:

- `email`
  - Required
  - Must be valid email
  - Normalized

- `password`
  - Required

At the end, it uses `handleValidationErrors` middleware.

## 8. Routes

### User Routes

File:

`src/routes/user.route.js`

Base path:

`/api/v1/users`

Current route:

- `POST /register`
- `POST /login`
- `GET /me`
- `POST /logout`

Register route pipeline:

```js
userRouter.post("/register", validateRegister, register);
```

Meaning:

1. First request body is validated.
2. If validation passes, controller runs.
3. If validation fails, global error handler sends response.

Login route pipeline:

```js
userRouter.post("/login", validateLogin, login);
```

Meaning:

1. First request body is validated.
2. If validation passes, login controller runs.
3. If validation fails, global error handler sends response.

GetMe route pipeline:

```js
userRouter.get("/me", authMiddleware, getMe);
```

Meaning:

1. First auth middleware checks the token from cookies.
2. If token is valid, logged-in user is attached to `req.user`.
3. Then getMe controller sends the logged-in user data.

Logout route pipeline:

```js
userRouter.post("/logout", authMiddleware, logout);
```

Meaning:

1. First auth middleware checks the token from cookies.
2. If token is valid, logout controller runs.
3. Logout service adds token to Redis blacklist.
4. Controller clears the token cookie.

### Product Routes

File:

`src/routes/product.route.js`

Base path:

`/api/v1/products`

Current route:

- `GET /`
- `POST /`

Get all products route pipeline:

```js
productRouter.get("/", validateGetAllProducts, getAllProducts);
```

Meaning:

1. Product query params are validated.
2. If category is provided, products are filtered by category.
3. If category is not provided, all products are fetched.
4. Only 20 products are returned per page.
5. If validation fails, global error handler sends response.

Create product route pipeline:

```js
productRouter.post(
  "/",
  authMiddleware,
  upload.array("images"),
  validateCreateProduct,
  createProduct,
);
```

Meaning:

1. First auth middleware verifies the logged-in user.
2. Multer accepts multiple product images from `images` field.
3. Product request body is validated.
4. If validation passes, create product controller runs.
5. If validation fails, global error handler sends response.

## 9. Register API

### Endpoint

`POST /api/v1/users/register`

### Purpose

Create a new user account and store the auth token in an httpOnly cookie.

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
7. Return user and token to controller so the controller can set the cookie.

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
- Token is stored only in an httpOnly cookie.

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
    }
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

## 10. Login API

### Endpoint

`POST /api/v1/users/login`

### Purpose

Login an existing user and store the auth token in an httpOnly cookie.

### Authentication Required

No.

This API is public because the user needs to login before accessing protected routes.

### Required Fields

```json
{
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
POST /api/v1/users/login
```

The route uses:

- `validateLogin`
- `login`

#### Step 2: Validation Runs

File:

`src/validations/auth.validation.js`

Validation checks:

- `email` must exist and must be a valid email.
- `password` must exist.

If validation fails:

- `handleValidationErrors` creates an `AppError`.
- Error is passed to global error handler.
- Request does not reach the controller.

#### Step 3: Controller Runs

File:

`src/controllers/auth.controller.js`

Controller function:

```js
login
```

Controller responsibility:

- Receive validated request body.
- Call `loginUserService`.
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
loginUserService
```

Service responsibility:

1. Receive `email` and `password`.
2. Find user by email.
3. Use `.select("+password")` because password is hidden by default in the user model.
4. If user does not exist, throw `AppError(401, "Invalid email or password")`.
5. Compare entered password with saved hash using `compareHash`.
6. If password is wrong, throw `AppError(401, "Invalid email or password")`.
7. Generate JWT token using `generateToken`.
8. Return user and token to controller so the controller can set the cookie.

#### Step 5: Password Is Compared

File:

`src/utils/password.js`

Function used:

```js
compareHash(password, user.password)
```

Purpose:

- Compare plain login password with bcrypt hashed password stored in database.
- Avoid exposing whether email or password was wrong.

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

- Create JWT token for the logged-in user.
- Token is stored only in an httpOnly cookie.

#### Step 7: Response Is Sent

Success response:

Status code:

`200 OK`

Example response:

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "DATE",
      "updatedAt": "DATE"
    }
  }
}
```

Password is not returned because the user model removes it using `toJSON` and `toObject` transforms.

### Error Responses

#### Missing Email

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Email is required"
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

#### Missing Password

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Password is required"
}
```

#### Invalid Credentials

Status:

`401 Unauthorized`

Example:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

## 11. GetMe API

### Endpoint

`GET /api/v1/users/me`

### Purpose

Fetch the currently logged-in user profile.

### Authentication Required

Yes.

This API needs the `token` cookie. The token is verified by auth middleware before the controller runs.

### Required Fields

No request body is required.

### Cookie Required

- `token`

### End-to-End Flow

#### Step 1: Request Comes To Route

File:

`src/routes/user.route.js`

The request first reaches:

```js
GET /api/v1/users/me
```

The route uses:

- `authMiddleware`
- `getMe`

#### Step 2: Auth Middleware Runs

File:

`src/middlewares/auth.middleware.js`

Auth middleware checks:

- Token must exist in cookies.
- Token must not be blacklisted in Redis.
- Token must be valid using `verifyToken`.
- User must exist in MongoDB.

If everything is valid:

- User is fetched from database using decoded token id.
- Full user document is attached to `req.user`.
- Request moves to controller.

If authentication fails:

- `AppError` is passed to global error handler.
- Request does not reach the controller.

#### Step 3: Controller Runs

File:

`src/controllers/auth.controller.js`

Controller function:

```js
getMe
```

Controller responsibility:

- Read logged-in user from `req.user`.
- Call `getMeService`.
- Send final success response.

#### Step 4: Service Handles Response Data

File:

`src/services/auth.service.js`

Service function:

```js
getMeService
```

Service responsibility:

1. Receive logged-in user from controller.
2. Convert Mongoose document to plain object.
3. Return user object to controller.

The password is removed automatically because the user model has `toObject` transform.

#### Step 5: Response Is Sent

Success response:

Status code:

`200 OK`

Example response:

```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "user": {
      "_id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "DATE",
      "updatedAt": "DATE"
    }
  }
}
```

### Error Responses

#### Missing Token

Status:

`401 Unauthorized`

Example:

```json
{
  "success": false,
  "message": "Unauthorized user"
}
```

#### Blacklisted Token

Status:

`401 Unauthorized`

Example:

```json
{
  "success": false,
  "message": "Token has been blacklisted"
}
```

#### User Not Found

Status:

`404 Not Found`

Example:

```json
{
  "success": false,
  "message": "User not found"
}
```

## 12. Create Product API

### Endpoint

`POST /api/v1/products`

### Purpose

Create a new ecommerce product for the logged-in user and upload multiple product images to ImageKit.

### Authentication Required

Yes.

This API needs the `token` cookie. The auth middleware verifies the token and attaches the logged-in user to `req.user`.

### Content Type

`multipart/form-data`

### Required Fields

- `name`
- `price`

### Optional Fields

- `description`
- `category`
- `images`

Allowed category values:

- `electronics`
- `clothing`
- `books`
- `home`
- `beauty`
- `sports`

### Example Request Body

Form-data fields:

```json
{
  "name": "Wireless Headphones",
  "description": "Noise cancelling bluetooth headphones",
  "price": 2999,
  "category": "electronics",
  "images": ["image1.jpg", "image2.jpg"]
}
```

The `images` field accepts multiple files.

### End-to-End Flow

#### Step 1: Request Comes To Route

File:

`src/routes/product.route.js`

The request first reaches:

```js
POST /api/v1/products
```

The route uses:

- `authMiddleware`
- `upload.array("images")`
- `validateCreateProduct`
- `createProduct`

#### Step 2: Auth Middleware Runs

File:

`src/middlewares/auth.middleware.js`

Auth middleware checks:

- Token must exist in cookies.
- Token must not be blacklisted in Redis.
- Token must be valid using `verifyToken`.
- User must exist in MongoDB.

If everything is valid:

- User is fetched from database using decoded token id.
- Full user document is attached to `req.user`.
- Request moves to multer middleware.

#### Step 3: Multer Middleware Runs

File:

`src/middlewares/multer.middleware.js`

Multer setup:

```js
upload.array("images")
```

Purpose:

- Accept multiple image files.
- Store files in memory using `memoryStorage`.
- Put uploaded files inside `req.files`.
- Reject non-image files using `AppError`.
- Limit each file size to 5MB.

#### Step 4: Validation Runs

File:

`src/validations/product.validation.js`

Validation checks:

- `name` must exist and must be at least 2 characters.
- `price` must exist and must be greater than 0.
- `category` must match allowed category values if provided.
- `description` is optional and trimmed.

If validation fails:

- `handleValidationErrors` creates an `AppError`.
- Error is passed to global error handler.
- Request does not reach the controller.

#### Step 5: Controller Runs

File:

`src/controllers/product.controller.js`

Controller function:

```js
createProduct
```

Controller responsibility:

- Receive validated body from `req.body`.
- Receive uploaded files from `req.files`.
- Receive logged-in user from `req.user`.
- Call `createProductService`.
- Send final success response.

#### Step 6: Service Creates Product And Uploads Images

File:

`src/services/product.service.js`

Service function:

```js
createProductService
```

Service responsibility:

1. Create a new product document in memory.
2. Attach logged-in user id to `user` field.
3. Use generated product id before save to build ImageKit folder path.
4. Upload all images to ImageKit in parallel using `Promise.all`.
5. Save uploaded image URLs in `images` array.
6. Save product in MongoDB.
7. Return created product to controller.

ImageKit folder path:

```js
/${user._id}/${product._id}
```

This keeps images organized user-wise and product-wise.

#### Step 7: Images Are Uploaded In Parallel

File:

`src/services/product.service.js`

Upload logic:

```js
const uploadPromises = (files || []).map((file) => {
  return uploadImageToImageKit(file, folder);
});

const imageUrls = await Promise.all(uploadPromises);
```

Why `Promise.all` is used:

- Multiple images upload together.
- It is faster than uploading one image at a time.
- The service waits until all uploads finish before saving product.

#### Step 8: ImageKit Upload Utility Runs

File:

`src/utils/uploadImage.js`

Function used:

```js
uploadImageToImageKit(file, folder)
```

Purpose:

- Convert file buffer to base64.
- Upload image to ImageKit.
- Return uploaded image URL.

#### Step 9: Response Is Sent

Success response:

Status code:

`201 Created`

Example response:

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "product": {
      "_id": "PRODUCT_ID",
      "user": "USER_ID",
      "name": "Wireless Headphones",
      "description": "Noise cancelling bluetooth headphones",
      "price": 2999,
      "category": "electronics",
      "images": [
        "https://ik.imagekit.io/example/image1.jpg",
        "https://ik.imagekit.io/example/image2.jpg"
      ],
      "createdAt": "DATE",
      "updatedAt": "DATE"
    }
  }
}
```

### Error Responses

#### Missing Token

Status:

`401 Unauthorized`

Example:

```json
{
  "success": false,
  "message": "Unauthorized user"
}
```

#### Missing Product Name

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Product name is required"
}
```

#### Missing Product Price

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Product price is required"
}
```

#### Invalid Product Price

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Product price must be greater than 0"
}
```

#### Invalid Category

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Invalid product category"
}
```

#### Invalid File Type

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Please attach only image files!"
}
```

## 13. Get All Products API

### Endpoint

`GET /api/v1/products`

### Purpose

Fetch products with fixed pagination of 20 products per page. If category is provided in query params, only products from that category are returned.

### Authentication Required

No.

This API is public because product listing can be viewed without login.

### Query Parameters

- `category`
  - Optional
  - Filters products by category
  - Must be one of allowed category values

- `page`
  - Optional
  - Default value is `1`
  - Must be a positive number

Allowed category values:

- `electronics`
- `clothing`
- `books`
- `home`
- `beauty`
- `sports`

### Pagination Rule

- Every request returns maximum 20 products.
- If category is provided, only 20 products from that category are returned.
- If category is not provided, 20 products from all products are returned.
- `page` decides which set of 20 products should be fetched.

Examples:

```http
GET /api/v1/products
GET /api/v1/products?page=2
GET /api/v1/products?category=electronics
GET /api/v1/products?category=electronics&page=2
```

### End-to-End Flow

#### Step 1: Request Comes To Route

File:

`src/routes/product.route.js`

The request first reaches:

```js
GET /api/v1/products
```

The route uses:

- `validateGetAllProducts`
- `getAllProducts`

#### Step 2: Query Validation Runs

File:

`src/validations/product.validation.js`

Validation checks:

- `category` must match allowed category values if provided.
- `page` must be a positive number if provided.

If validation fails:

- `handleValidationErrors` creates an `AppError`.
- Error is passed to global error handler.
- Request does not reach the controller.

#### Step 3: Controller Runs

File:

`src/controllers/product.controller.js`

Controller function:

```js
getAllProducts
```

Controller responsibility:

- Read query params from `req.query`.
- Call `getAllProductsService`.
- Send products and pagination data in response.

#### Step 4: Service Builds Query

File:

`src/services/product.service.js`

Service function:

```js
getAllProductsService
```

Service responsibility:

1. Read `category` and `page` from query params.
2. Use page `1` if page is not provided.
3. Keep fixed limit as 20 products per page.
4. Build MongoDB filter object.
5. If category exists, add category to filter.
6. If category does not exist, keep filter empty to fetch all products.
7. Fetch products using `skip` and `limit`.
8. Count total products for pagination metadata.

Pagination calculation:

```js
const page = Number(queryData.page) || 1;
const skip = (page - 1) * 20;
```

MongoDB query:

```js
Products.find(filter)
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(20)
```

#### Step 5: Response Is Sent

Success response:

Status code:

`200 OK`

Example response:

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": {
    "products": [
      {
        "_id": "PRODUCT_ID",
        "user": "USER_ID",
        "name": "Wireless Headphones",
        "description": "Noise cancelling bluetooth headphones",
        "price": 2999,
        "category": "electronics",
        "images": [
          "https://ik.imagekit.io/example/image1.jpg"
        ],
        "createdAt": "DATE",
        "updatedAt": "DATE"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalProducts": 35,
      "totalPages": 2
    }
  }
}
```

### Error Responses

#### Invalid Category

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Invalid product category"
}
```

#### Invalid Page

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Page must be a positive number"
}
```

## 14. Logout API

### Endpoint

`POST /api/v1/users/logout`

### Purpose

Logout the currently logged-in user by clearing the auth cookie and blacklisting the current token in Redis.

### Authentication Required

Yes.

This API needs the `token` cookie. The token is verified by auth middleware before logout logic runs.

### Required Fields

No request body is required.

### Cookie Required

- `token`

### End-to-End Flow

#### Step 1: Request Comes To Route

File:

`src/routes/user.route.js`

The request first reaches:

```js
POST /api/v1/users/logout
```

The route uses:

- `authMiddleware`
- `logout`

#### Step 2: Auth Middleware Runs

File:

`src/middlewares/auth.middleware.js`

Auth middleware checks:

- Token must exist in cookies.
- Token must not already be blacklisted in Redis.
- Token must be valid using `verifyToken`.
- User must exist in MongoDB.

If everything is valid:

- User is fetched from database using decoded token id.
- Full user document is attached to `req.user`.
- Request moves to logout controller.

If authentication fails:

- `AppError` is passed to global error handler.
- Request does not reach the controller.

#### Step 3: Controller Runs

File:

`src/controllers/auth.controller.js`

Controller function:

```js
logout
```

Controller responsibility:

- Read token from cookies.
- Call `logoutUserService`.
- Clear the `token` cookie.
- Send final success response.

#### Step 4: Service Blacklists Token

File:

`src/services/auth.service.js`

Service function:

```js
logoutUserService
```

Service responsibility:

1. Receive current token from controller.
2. If token is missing, throw `AppError(401, "Unauthorized user")`.
3. Store token in Redis blacklist using key format `blacklist:<token>`.
4. Set blacklist expiry to 1 hour, matching current token/cookie lifetime.

Redis blacklist value:

```js
await redisClient.set(`blacklist:${token}`, "true", "EX", 60 * 60);
```

Why Redis blacklist is used:

- Clearing the cookie removes token from browser.
- But the JWT can still be technically valid until expiry.
- Redis blacklist blocks that token if someone tries to reuse it before expiry.

#### Step 5: Cookie Is Cleared

File:

`src/controllers/auth.controller.js`

Cookie cleared:

- Cookie name: `token`
- `httpOnly: true`
- `secure: true` only in production
- `sameSite: strict`

#### Step 6: Response Is Sent

Success response:

Status code:

`200 OK`

Example response:

```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

### Error Responses

#### Missing Token

Status:

`401 Unauthorized`

Example:

```json
{
  "success": false,
  "message": "Unauthorized user"
}
```

#### Already Blacklisted Token

Status:

`401 Unauthorized`

Example:

```json
{
  "success": false,
  "message": "Token has been blacklisted"
}
```

#### User Not Found

Status:

`404 Not Found`

Example:

```json
{
  "success": false,
  "message": "User not found"
}
```
