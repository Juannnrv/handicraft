# Handi Craft

The **Handi Craft** is designed of the development of an application for the purchase and sale of handicrafts, which aims to connect Bucaramanga artisans with buyers interested in authentic and unique handicraft products. Through this platform, it seeks to solve key problems such as the limited visibility of artisans, the complexity of sales management and restricted access to marketing resources. The application will allow artisans to manage their products, promotions and sales efficiently, while buyers will be able to easily browse, purchase and communicate with the creators of the pieces.

The application is developed with MVC architecture and uses the MEVN stack (MongoDB, Express.js, Vue.js, Node.js). For authentication, JWT and Passport.js are used to manage secure access and allow login with social networks. In addition, Socket.io is integrated to provide real-time chat between users and craftsmen, ensuring a smooth, secure and efficient experience.

To install and configure this project, follow these steps:

### **Prerequisites**:

- **Node.js**: Make sure you have Node.js version `18.x` installed.
- **NPM**: Comes installed with Node.js, but make sure you have a recent version.

### Installing dependencies

- Clone the project repository and navigate to the project directory.

  ```bash
  git clone https://github.com/Juannnrv/handicraft.git

  cd handicraft
  ```

- Run the following command to install the production and development dependencies:

  ```bash
  npm install
  ```

### Dependencies versions

- **Production dependencies**:

- `bcrypt@5.1.1` - To encrypt passwords.
- `concurrently@9.1.0` - Execute multiple commands simultaneously.
- `cookie-parser@1.4.7` - Middleware for cookie parsing.
- `cors@2.8.5` - Middleware to enable CORS.
- `express@4.21.1` - Web framework for Node.js.
- `express-jwt@8.4.1` - Middleware for authentication with JWT.
- `express-rate-limit@7.4.1` - Middleware to limit the number of requests.
- `express-session@1.18.1` - Session handling in Express.
- `express-validator@7.2.0` - Data validation in Express.
- `jsonwebtoken@9.0.2` - JWT token generation.
- `mongoose@8.7.2` - ORM for MongoDB.
- `passport@0.7.0` - Authentication middleware for Node.js.
- `passport-discord@0.1.4` - Passport strategy for Discord login.
- `passport-facebook@3.0.0` - Passport strategy for Facebook login.
- `passport-google-oauth20@2.0.0` - Passport strategy for Google login.
- `semver@7.6.3` - Semantic version validation and manipulation.
- `socket.io@4.8.1` - Real-time communication between clients and servers.
- `socket.io-client@4.8.1` - Client-side library for socket.io.
- `vue@3.5.12` - JavaScript framework for building UIs.

**Development Dependencies**:

- `@vitejs/plugin-vue@5.1.4` - Vite plugin for Vue.js.
- `vite@5.4.10` - Build tool and development server.

### Set enviroment variables:

Create an `.env` file in the root of the project and add the necessary environment variables (follow .envTemplate file).

```bash
    MONGO_PROTOCOLO=mongodb+srv://
    MONGO_USER=edwin
    MONGO_PSW=edwin123
    MONGO_DB_NAME=handicraft
    MONGO_HOST=edwingod.pykmytn.mongodb.net
    JWT_SECRET=37ef15b4927b9b7aeeccccf335079d9aa0aa0367c3c74ed0f2de6561cd94d687

    MONGO_PROTOCOLO=mongodb+srv://
    MONGO_USER=edwin
    MONGO_PSW=edwin123
    MONGO_DB_NAME=handicraft
    MONGO_HOST=edwingod.pykmytn.mongodb.net
    JWT_SECRET=37ef15b4927b9b7aeeccccf335079d9aa0aa0367c3c74ed0f2de6561cd94d687

    GOOGLE_CLIENT_ID=930742944452-421ob0sbhso1s3nc6ms8n7lk7adkq77h.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=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

    DISCORD_CLIENT_ID=1300935621199663124
    DISCORD_CLIENT_SECRET=oJT2CEQZg2oZja-E_KrBhNm2Vr3sVVsQ

    FACEBOOK_CLIENT_ID=894385772785638
    FACEBOOK_CLIENT_SECRET=01358c2b25722e0c4865ab6c68870a93
```

### **Start the project**:

- In development, you can use the following command to start the frontend and backend concurrently:

  ```bash
  npm run app
  ```

This will start Vite for the frontend and the backend server (`server.js`) with environment variables defined in `.env`.

- ## Authentication API Documentation

  ### Create Account

  **Method**: `POST`

  **URL**: `http://localhost:5000/auth/create`

  **Auth required**: `False`

  **Limit requests**: 45 every 15 minutes

  #### Headers:

  ```
  {
      "Content-Type": "application/json",
      "x-version": "1.0.0"
  }
  ```

  #### Body:

  ```
  {
      "username": "string",
      "password": "string, minimum 6 characters",
      "email": "valid email",
      "phone": "string, optional",
      "gender": "string, either 'hombre' or 'mujer'",
      "birthday": "MM/DD/YYYY"
  }
  ```

  #### Success Response:

  - **Code**: `201 Created`

  ```
  {
      "status": 201,
      "message": "User account created successfully",
      "data": {
          "username": "sampleUsername",
          "email": "sampleEmail",
          "phone": "samplePhone",
          "gender": "mujer",
          "birthday": "1990-12-31T00:00:00.000Z",
          "userType": "comprador",
          "profilePicture": "https://i.pinimg.com/474x/4c/92/2b/4c922b0a793123bcb292e005b7981df6.jpg"
      }
  }
  ```

  #### Error Responses

  **Code**: `400 Bad Request`

  ```
  {
      "status": 400,
      "message": "Validation errors",
      "data": [
          {
              "msg": "Username is required",
              "param": "username",
              "location": "body"
          }
      ]
  }
  ```

  **Code**: `500 Internal Server Error`

  ```
  {
      "status": 500,
      "message": "Error creating user account",
      "error": "Error message"
  }
  ```

  ------

  ### Log In

  **Method**: `POST`

  **URL**: `http://localhost:5000/auth/login`

  **Auth required**: `False`

  **Limit requests**: 45 every 15 minutes

  #### Headers:

  ```
  {
      "Content-Type": "application/json",
      "x-version": "1.0.0"
  }
  ```

  #### Body:

  ```
  {
      "identifier": "string, either email, username or phone",
      "password": "string"
  }
  ```

  #### Success Response:

  - **Code**: `200 OK`

  ```
  {
      "status": 200,
      "message": "User logged in successfully",
      "data": {
          "token": "JWT_TOKEN"
      }
  }
  ```

  #### Error Responses

  **Code**: `400 Bad Request`

  ```
  {
      "status": 400,
      "message": "Invalid identifier or password, please check and try again"
  }
  ```

  **Code**: `404 Not Found`

  ```
  {
      "status": 404,
      "message": "User not found"
  }
  ```

  **Code**: `500 Internal Server Error`

  ```
  {
      "status": 500,
      "message": "Error logging in user",
      "error": "Error message"
  }
  ```

  ------

  ### Check if User Exists

  **Method**: `POST`

  **URL**: `http://localhost:5000/auth/check`

  **Auth required**: `False`

  #### Headers:

  ```
  {
      "Content-Type": "application/json",
      "x-version": "1.0.0"
  }
  ```

  #### Body:

  ```
  {
      "email": "string, optional",
      "username": "string, optional",
      "phone": "string, optional"
  }
  ```

  #### Success Response:

  - **Code**: `200 OK`

  ```
  {
      "status": 200,
      "message": "User does not exist"
  }
  ```

  - **Code**: `400 Bad Request`

  ```
  {
      "status": 400,
      "message": "Username, phone, or email already exists"
  }
  ```

  #### Error Responses

  **Code**: `500 Internal Server Error`

  ```
  {
      "status": 500,
      "message": "Error checking user existence",
      "error": "Error message"
  }
  ```

  ------

  ### OAuth Login with Google

  **Method**: `GET`

  **URL**: `http://localhost:5000/auth/google`

  **Auth required**: `False`

  #### Success Response:

  - **Code**: `200 OK`

  ```
  {
      "status": 200,
      "message": "Google login successful"
  }
  ```

  ------

  ### OAuth Login with Discord

  **Method**: `GET`

  **URL**: `http://localhost:5000/auth/discord`

  **Auth required**: `False`

  #### Success Response:

  - **Code**: `200 OK`

  ```
  {
      "status": 200,
      "message": "Discord login successful"
  }
  ```

  ------

  ### OAuth Login with Facebook

  **Method**: `GET`

  **URL**: `http://localhost:5000/auth/facebook`

  **Auth required**: `False`

  #### Success Response:

  - **Code**: `200 OK`

  ```
  {
      "status": 200,
      "message": "Facebook login successful"
  }
  ```

## User API Documentation

### Create User Favorite

**Method**: `POST`

**URL**: `http://localhost:5000/user/favorites`

**Auth required**: `True`

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Body:

```
{
    "favoriteId": "ObjectId, either Product or Workshop"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "User favorite added",
    "data": {
        "products": [ ... ],
        "workshops": [ ... ]
    }
}
```

#### Error Responses:

- **Code**: `404 Not Found`

```
{
    "status": 404,
    "message": "Product or Workshop not found"
}
```

- **Code**: `400 Bad Request`

```
{
    "status": 400,
    "message": "Product or Workshop already in favorites"
}
```

- **Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error adding user favorite",
    "error": "Error message"
}
```

------

### Get User Information

**Method**: `GET`

**URL**: `http://localhost:5000/user/`

**Auth required**: `True`

**Limit requests**: 45 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "User found",
    "data": {
        "username": "sampleUsername",
        "email": "sampleEmail",
        "profilePicture": "https://example.com/profile.jpg",
        "userType": "comprador",
        "gender": "mujer",
        "birthday": "1990-12-31T00:00:00.000Z",
        "favorites": { ... },
        "purchases": [ ... ]
    }
}
```

#### Error Responses:

- **Code**: `404 Not Found`

```
{
    "status": 404,
    "message": "User not found"
}
```

- **Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error finding user",
    "error": "Error message"
}
```

------

### Update User Information

**Method**: `PUT`

**URL**: `http://localhost:5000/user/`

**Auth required**: `True`

**Limit requests**: 45 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Body:

```
{
    "username": "string",
    "email": "string, valid email",
    "profilePicture": "string, optional",
    "phone": "string, optional",
    "gender": "string, either 'hombre' or 'mujer'",
    "birthday": "MM/DD/YYYY",
    "password": "string, optional, minimum 6 characters"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "User account updated successfully",
    "data": {
        "username": "updatedUsername",
        "email": "updatedEmail",
        "profilePicture": "https://example.com/updatedProfile.jpg",
        "userType": "artesano",
        "gender": "hombre",
        "birthday": "1985-07-20T00:00:00.000Z"
    }
}
```

#### Error Responses:

- **Code**: `400 Bad Request`

```
{
    "status": 400,
    "message": "Validation errors",
    "data": [
        {
            "msg": "Email is required",
            "param": "email",
            "location": "body"
        }
    ]
}
```

- **Code**: `404 Not Found`

```
{
    "status": 404,
    "message": "User not found"
}
```

- **Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error updating user account",
    "error": "Error message"
}
```

------

### Get User Favorites

**Method**: `GET`

**URL**: `http://localhost:5000/user/favorites`

**Auth required**: `True`

**Limit requests**: 45 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "User favorites found",
    "data": {
        "products": [ products info ],
        "workshops": [ workshops info ]
    }
}
```

#### Error Responses:

- **Code**: `404 Not Found`

```
{
    "status": 404,
    "message": "User not found"
}
```

- **Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error finding user favorites",
    "error": "Error message"
}
```

------

### Delete User Favorite

**Method**: `DELETE`

**URL**: `http://localhost:5000/user/favorites/:id`

**Auth required**: `True`

**Limit requests**: 45 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "User favorite deleted",
    "data": {
        "products": [ ... ],
        "workshops": [ ... ]
    }
}
```

#### Error Responses:

- **Code**: `404 Not Found`

```
{
    "status": 404,
    "message": "Product or Workshop not found"
}
```

- **Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error deleting user favorite",
    "error": "Error message"
}
```

------

### Get User Orders

**Method**: `GET`

**URL**: `http://localhost:5000/user/orders`

**Auth required**: `True`

**Limit requests**: 45 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "User purchases found",
    "data": [ ... ]  // Array of order objects
}
```

#### Error Responses:

- **Code**: `404 Not Found`

```
{
    "status": 404,
    "message": "User not found"
}
```

- **Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error finding user purchases",
    "error": "Error message"
}
```

------

### Get User Coupons

**Method**: `GET`

**URL**: `http://localhost:5000/user/coupons`

**Auth required**: `True`

**Limit requests**: 45 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "User coupons found",
    "data": [ ... ]  // Array of coupon objects
}
```

#### Error Responses:

- **Code**: `404 Not Found`

```
{
    "status": 404,
    "message": "User not found"
}
```

- **Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error finding user coupons",
    "error": "Error message"
}
```

## Products API Documentation

### List products

**Method**: `GET`

**URL**: `http://localhost:5000/product`

**Auth required**: `True`

**Limit requests**: 25 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Query Parameters:

```
{
    "page": "integer, optional, default is 1, page number for pagination",
    "limit": "integer, optional, default is 10, number of products per page",
    "category": "string, optional, filter products by category",
    "minPrice": "float, optional, minimum price for the product filter",
    "maxPrice": "float, optional, maximum price for the product filter",
    "workshopId": "objectId, optional, filter products by associated workshop ID."
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "Products retrieved successfully",
    "data": {
        "products": [
            {
                "id": "60b8d6c6f0e7f62288f1ab7e",
                "name": "Handmade Wooden Chair",
                "description": "A beautiful handcrafted chair.",
                "price": 150.00,
                "category": "Furniture",
                "photos": [
                    "https://example.com/photo1.jpg",
                    "https://example.com/photo2.jpg"
                ],
                "stock": 10,
                "artisanId": "60b8d6c6f0e7f62288f1ab7f",
            }
        ],
        "total": 50,
        "page": 1,
        "pages": 5
    }
}
```

#### Error Responses:

**Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error retrieving products",
    "error": "Error message"
}
```

------

### Get Product By ID

**Method**: `GET`

**URL**: `http://localhost:5000/product/{id}`

**Auth required**: `True`

**Limit requests**: 25 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Path Parameters:

```
{
    "id": "string, required, unique product identifier"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "Product retrieved successfully",
    "data": {
        "id": "60b8d6c6f0e7f62288f1ab7e",
        "name": "Handmade Wooden Chair",
        "description": "A beautiful handcrafted chair.",
        "price": 150.00,
        "category": "Furniture",
        "photos": [
            "https://example.com/photo1.jpg",
            "https://example.com/photo2.jpg"
        ],
        "stock": 10,
        "artisanId": "60b8d6c6f0e7f62288f1ab7f"
    }
}
```

#### Error Responses:

**Code**: `404 Not Found`

```
{
    "status": 404,
    "message": "Product not found"
}
```

**Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error retrieving product",
    "error": "Error message"
}
```

------

### Search Products

**Method**: `GET`

**URL**: `http://localhost:5000/product/search`

**Auth required**: `True`

**Limit requests**: 25 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Query Parameters:

```
{
    "query": "string, required, search query for product name or description"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "Products retrieved successfully",
    "data": [
        {
            "id": "60b8d6c6f0e7f62288f1ab7e",
            "name": "Handmade Wooden Chair",
            "description": "A beautiful handcrafted chair.",
            "price": 150.00,
            "category": "Furniture",
            "photos": [
                "https://example.com/photo1.jpg",
                "https://example.com/photo2.jpg"
            ],
            "stock": 10,
            "artisanId": "60b8d6c6f0e7f62288f1ab7f"
        }
    ]
}
```

#### Error Responses:

**Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error retrieving products",
    "error": "Error message"
}
```

## Workshops API Documentation

### List workshops

**Method**: `GET`

**URL**: `http://localhost:5000/workshop`

**Auth required**: `True`

**Limit requests**: 25 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Query Parameters:

```
{
    "page": "integer, optional, default is 1, page number for pagination",
    "limit": "integer, optional, default is 10, number of workshops per page",
    "modality": "string, optional, filter workshops by modality (e.g., 'Presencial', 'Virtual')",
    "location": "string, optional, filter workshops by location"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "Workshops fetched successfully",
    "data": {
        "workshops": [
            {
                "id": "60b8d6c6f0e7f62288f1ab7e",
                "name": "Ceramic Workshop",
                "description": "A workshop for learning ceramic techniques.",
                "modality": "Presencial",
                "startDate": "2024-12-01T10:00:00.000Z",
                "endDate": "2024-12-05T16:00:00.000Z",
                "duration": "5 days",
                "materialsProvided": ["Clay", "Glaze", "Tools"],
                "materialsRequired": ["Apron", "Notebook"],
                "documentary": "https://example.com/documentary",
                "artisanId": "60b8d6c6f0e7f62288f1ab7f"
            }
        ],
        "total": 50,
        "page": 1,
        "totalPages": 5
    }
}
```

#### Error Responses:

**Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error fetching workshops",
    "error": "Error message"
}
```

------

### Get Workshop By ID

**Method**: `GET`

**URL**: `http://localhost:5000/workshop/{id}`

**Auth required**: `True`

**Limit requests**: 25 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Path Parameters:

```
{
    "id": "string, required, unique workshop identifier"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "Workshop details fetched successfully",
    "data": {
        "id": "60b8d6c6f0e7f62288f1ab7e",
        "name": "Ceramic Workshop",
        "description": "A workshop for learning ceramic techniques.",
        "modality": "Presencial",
        "startDate": "2024-12-01T10:00:00.000Z",
        "endDate": "2024-12-05T16:00:00.000Z",
        "duration": "5 days",
        "materialsProvided": ["Clay", "Glaze", "Tools"],
        "materialsRequired": ["Apron", "Notebook"],
        "documentary": "https://example.com/documentary",
        "artisanId": "60b8d6c6f0e7f62288f1ab7f"
    }
}
```

#### Error Responses:

**Code**: `404 Not Found`

```
{
    "status": 404,
    "message": "Workshop not found"
}
```

**Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error fetching workshop details",
    "error": "Error message"
}
```

------

### Search Workshops

**Method**: `GET`

**URL**: `http://localhost:5000/workshop/search`

**Auth required**: `True`

**Limit requests**: 25 every 15 minutes

**Credentials**: `include`

#### Headers:

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

#### Query Parameters:

```
{
    "name": "string, optional, filter workshops by name",
    "description": "string, optional, filter workshops by description"
}
```

#### Success Response:

- **Code**: `200 OK`

```
{
    "status": 200,
    "message": "Workshops fetched successfully",
    "data": {
        "workshops": [
            {
                "id": "60b8d6c6f0e7f62288f1ab7e",
                "name": "Ceramic Workshop",
                "description": "A workshop for learning ceramic techniques.",
                "modality": "Presencial",
                "startDate": "2024-12-01T10:00:00.000Z",
                "endDate": "2024-12-05T16:00:00.000Z",
                "duration": "5 days",
                "materialsProvided": ["Clay", "Glaze", "Tools"],
                "materialsRequired": ["Apron", "Notebook"],
                "documentary": "https://example.com/documentary",
                "artisanId": "60b8d6c6f0e7f62288f1ab7f"
            }
        ],
        "total": 50,
        "page": 1,
        "totalPages": 5
    }
}
```

#### Error Responses:

**Code**: `500 Internal Server Error`

```
{
    "status": 500,
    "message": "Error fetching workshops",
    "error": "Error message"
}
```

## Orders API documentation

### Create an Order

**Method:** POST

**URL:** `http://localhost:5000/order/create`

**Auth required:** Yes

**Rate Limit:** 45 requests every 15 minutes

**Credentials:** include

**Headers:**

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

**Request Body:**

```
{
    "products": [
        {
            "productId": "ObjectId",  // Product ID
            "quantity": Number,       // Quantity ordered
            "price": Number           // Price of the product
        }
    ],
    "total": Number,                   // Order total
    "date": "DD/MM/YYYY",              // Order date in DD/MM/YYYY format
    "coupons": ["ObjectId", ...]       // Optional array of applied coupon IDs
}
```

**Success Response:**

- **Code:** 201 Created

- Body:

  ```
  {
      "status": 201,
      "message": "Order created successfully",
      "data": {
          "userId": "ObjectId",
          "products": [
              {
                  "productId": "ObjectId",
                  "quantity": Number,
                  "price": Number
              }
          ],
          "total": Number,
          "date": "ISODate",
          "status": "pending", // Order status
          "coupons": ["ObjectId", ...]
      }
  }
  ```

**Error Responses:**

- Code:

   400 Bad Request

  ```
  {
      "status": 400,
      "message": "Validation errors",
      "errors": [
          { "field": "field_name", "error": "error_message" }
      ]
  }
  ```

- Code:

   500 Internal Server Error

  ```
  {
      "status": 500,
      "message": "Error creating user order",
      "error": "Error message"
  }
  ```

------

### Get User Orders

**Method:** GET

**URL:** `http://localhost:5000/order/`

**Auth required:** Yes

**Rate Limit:** 45 requests every 15 minutes

**Credentials:** include

**Headers:**

```
{
    "Content-Type": "application/json",
    "x-version": "1.0.0"
}
```

**Success Response:**

- **Code:** 200 OK

- Body:

  ```
  {
      "status": 200,
      "message": "Orders retrieved successfully",
      "data": [
          {
              "userId": "ObjectId",
              "products": [
                  {
                      "productId": "ObjectId",
                      "quantity": Number,
                      "price": Number
                  }
              ],
              "total": Number,
              "date": "ISODate",
              "status": "pending",
              "coupons": ["ObjectId", ...]
          },
          // Additional orders if they exist
      ]
  }
  ```

**Error Responses:**

- Code:

   404 Not Found

  ```
  {
      "status": 404,
      "message": "User not found"
  }
  ```

- Code:

   500 Internal Server Error

  ```
  {
      "status": 500,
      "message": "Error retrieving orders",
      "error": "Error message"
  }
  ```
