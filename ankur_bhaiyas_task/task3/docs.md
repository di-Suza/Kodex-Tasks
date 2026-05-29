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
  - Array of objects
  - Each object stores `url` and `fileId`
  - Default empty array

Purpose:

- Store ecommerce product data.
- Support multiple image uploads.
- Support ImageKit file deletion later using `fileId`.
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
- Return uploaded image URL and ImageKit file id for saving in product document.

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
- `validateProductId`
- `validateUpdateProduct`

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

Product id rules:

- `id`
  - Required in route params
  - Must be a valid MongoDB ObjectId

At the end, it uses `handleValidationErrors` middleware.

Update product rules:

- `id`
  - Required in route params
  - Must be a valid MongoDB ObjectId

- `name`
  - Optional
  - Trimmed
  - Minimum 2 characters if provided

- `price`
  - Optional
  - Must be greater than 0 if provided
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
- `GET /:id`
- `POST /`
- `PUT /:id`

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

Get product by id route pipeline:

```js
productRouter.get("/:id", validateProductId, getProductById);
```

Meaning:

1. Product id route param is validated.
2. If id is valid, controller fetches product by id.
3. If product does not exist, global error handler sends not found response.
4. If validation fails, global error handler sends response.

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

Update product route pipeline:

```js
productRouter.put(
  "/:id",
  authMiddleware,
  upload.array("images"),
  validateUpdateProduct,
  updateProduct,
);
```

Meaning:

1. First auth middleware verifies the logged-in user.
2. Multer accepts new product images from `images` field if provided.
3. Product id and body fields are validated.
4. Service checks product existence and ownership.
5. Text fields are updated if provided.
6. If new images are provided, old ImageKit files are deleted and new images are uploaded.
7. If validation fails, global error handler sends response.

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
5. Save uploaded image URL and file id in `images` array.
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
- Return uploaded image URL and file id.

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
        {
          "url": "https://ik.imagekit.io/example/image1.jpg",
          "fileId": "IMAGEKIT_FILE_ID_1"
        },
        {
          "url": "https://ik.imagekit.io/example/image2.jpg",
          "fileId": "IMAGEKIT_FILE_ID_2"
        }
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
          {
            "url": "https://ik.imagekit.io/example/image1.jpg",
            "fileId": "IMAGEKIT_FILE_ID_1"
          }
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

## 14. Get Product By ID API

### Endpoint

`GET /api/v1/products/:id`

### Purpose

Fetch a single product by its MongoDB product id.

### Authentication Required

No.

This API is public because a product detail page can be viewed without login.

### Route Parameters

- `id`
  - Required
  - Must be a valid MongoDB ObjectId

### Example Request

```http
GET /api/v1/products/665f1d2c3b4a9d0012ab3456
```

### End-to-End Flow

#### Step 1: Request Comes To Route

File:

`src/routes/product.route.js`

The request first reaches:

```js
GET /api/v1/products/:id
```

The route uses:

- `validateProductId`
- `getProductById`

#### Step 2: Param Validation Runs

File:

`src/validations/product.validation.js`

Validation checks:

- `id` must be a valid MongoDB ObjectId.

If validation fails:

- `handleValidationErrors` creates an `AppError`.
- Error is passed to global error handler.
- Request does not reach the controller.

#### Step 3: Controller Runs

File:

`src/controllers/product.controller.js`

Controller function:

```js
getProductById
```

Controller responsibility:

- Read product id from `req.params.id`.
- Call `getProductByIdService`.
- Send product data in response.

#### Step 4: Service Fetches Product

File:

`src/services/product.service.js`

Service function:

```js
getProductByIdService
```

Service responsibility:

1. Receive product id from controller.
2. Find product using `Products.findById(productId)`.
3. If product does not exist, throw `AppError(404, "Product not found")`.
4. Return product to controller.

#### Step 5: Response Is Sent

Success response:

Status code:

`200 OK`

Example response:

```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "product": {
      "_id": "PRODUCT_ID",
      "user": "USER_ID",
      "name": "Wireless Headphones",
      "description": "Noise cancelling bluetooth headphones",
      "price": 2999,
      "category": "electronics",
      "images": [
        {
          "url": "https://ik.imagekit.io/example/image1.jpg",
          "fileId": "IMAGEKIT_FILE_ID_1"
        }
      ],
      "createdAt": "DATE",
      "updatedAt": "DATE"
    }
  }
}
```

### Error Responses

#### Invalid Product ID

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Invalid product id"
}
```

#### Product Not Found

Status:

`404 Not Found`

Example:

```json
{
  "success": false,
  "message": "Product not found"
}
```

## 15. Update Product API

### Endpoint

`PUT /api/v1/products/:id`

### Purpose

Update a product owned by the logged-in user. This API supports text-only updates and image replacement updates.

### Authentication Required

Yes.

This API needs the `token` cookie. The auth middleware verifies the token and attaches the logged-in user to `req.user`.

### Content Type

`multipart/form-data`

### Route Parameters

- `id`
  - Required
  - Must be a valid MongoDB ObjectId

### Optional Fields

- `name`
- `description`
- `price`
- `category`
- `images`

At least one text field or one image must be provided.

Allowed category values:

- `electronics`
- `clothing`
- `books`
- `home`
- `beauty`
- `sports`

### Update Behavior

#### Text-Only Update

If the request contains only text fields:

- Product existence is checked.
- Product ownership is checked.
- Only provided text fields are updated.
- Old `images` array stays unchanged.

#### Image Update

If the request contains new images:

- Product existence is checked.
- Product ownership is checked.
- Old images are deleted from ImageKit using saved `fileId`.
- New images are uploaded to ImageKit.
- Product `images` array is replaced with new `{ url, fileId }` objects.

ImageKit folder path:

```js
/${user._id}/${product._id}
```

### Example Request Body

Form-data fields for text-only update:

```json
{
  "name": "Updated Headphones",
  "price": 3499,
  "category": "electronics"
}
```

Form-data fields for image update:

```json
{
  "images": ["new-image1.jpg", "new-image2.jpg"]
}
```

### End-to-End Flow

#### Step 1: Request Comes To Route

File:

`src/routes/product.route.js`

The request first reaches:

```js
PUT /api/v1/products/:id
```

The route uses:

- `authMiddleware`
- `upload.array("images")`
- `validateUpdateProduct`
- `updateProduct`

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

- Accept new image files if provided.
- Put uploaded files inside `req.files`.
- Reject non-image files using `AppError`.
- Limit each file size to 5MB.

#### Step 4: Validation Runs

File:

`src/validations/product.validation.js`

Validation checks:

- `id` must be a valid MongoDB ObjectId.
- `name` must be at least 2 characters if provided.
- `price` must be greater than 0 if provided.
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
updateProduct
```

Controller responsibility:

- Read product id from `req.params.id`.
- Read text fields from `req.body`.
- Read uploaded files from `req.files`.
- Read logged-in user from `req.user`.
- Call `updateProductService`.
- Send final success response.

#### Step 6: Service Checks Product

File:

`src/services/product.service.js`

Service function:

```js
updateProductService
```

Product checks:

1. Find product using `Products.findById(productId)`.
2. If product does not exist, throw `AppError(404, "Product not found")`.
3. Compare `product.user` with `req.user._id`.
4. If product does not belong to logged-in user, throw `AppError(403, "You are not allowed to update this product")`.
5. If no text fields and no images are provided, throw `AppError(400, "Please provide product data to update")`.

#### Step 7: Text Fields Are Updated

Only provided fields are updated:

- `name`
- `description`
- `price`
- `category`

If a field is not provided, old value remains unchanged.

#### Step 8: Images Are Replaced If Provided

If `req.files` has new images:

1. Old product images are deleted from ImageKit using their saved `fileId`.
2. New images are uploaded to ImageKit in parallel using `Promise.all`.
3. Product `images` array is replaced with new image objects.

Old image delete logic:

```js
const deletePromises = product.images.map((image) => {
  return deleteImageFromImageKit(image.fileId);
});

await Promise.all(deletePromises);
```

New image upload logic:

```js
const uploadPromises = files.map((file) => {
  return uploadImageToImageKit(file, folder);
});

product.images = await Promise.all(uploadPromises);
```

#### Step 9: Product Is Saved

After text/image updates:

```js
await product.save();
```

#### Step 10: Response Is Sent

Success response:

Status code:

`200 OK`

Example response:

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "product": {
      "_id": "PRODUCT_ID",
      "user": "USER_ID",
      "name": "Updated Headphones",
      "description": "Noise cancelling bluetooth headphones",
      "price": 3499,
      "category": "electronics",
      "images": [
        {
          "url": "https://ik.imagekit.io/example/new-image1.jpg",
          "fileId": "NEW_IMAGEKIT_FILE_ID_1"
        }
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

#### Invalid Product ID

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Invalid product id"
}
```

#### No Update Data

Status:

`400 Bad Request`

Example:

```json
{
  "success": false,
  "message": "Please provide product data to update"
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

#### Product Not Found

Status:

`404 Not Found`

Example:

```json
{
  "success": false,
  "message": "Product not found"
}
```

#### Product Does Not Belong To User

Status:

`403 Forbidden`

Example:

```json
{
  "success": false,
  "message": "You are not allowed to update this product"
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

## 16. Logout API

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
