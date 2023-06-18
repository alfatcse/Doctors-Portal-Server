# Project Support
### Introduction
Project is the backend of cow online shop for Eid-Ul-Adha. This project allows user to create,delete,update and retrive user data.Also create,delete,update and retrive cow profile data. This also support post and get order data.
### Project Support Features
* User Account can created.
* Public (non-authenticated) users can access all cows profile
* Cow profile can be created.
* Cow profile can retrived with pagination , searchTerm , name and loacatin.
* User data can retrived.
* Order can placed
* Order data can be retrived.
### Usage
* Run npm start:dev to start the application.
* Connect to the API using Postman on port 5009.
## Live Link: https://assignment3-silk.vercel.app/
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | api/v1/auth/signup | To sign up a new user account |
| GET |api/v1/users/:id | To retrieve Single user |
| GET |api/v1/users | To retrieve all All users |
| PATCH | api/v1/users/:id |  To Update Single user |
| DELETE | api/v1/users/:id | To delete a single user |
| POST | api/v1/cows |To create a cow profile |
| GET | api/v1/cows/:id |To retrieve single cow profile |
| PATCH | api/v1/cows/:id |To update single cow profile |
| DELETE | api/v1/cows/:id |To delete single cow profile |
| GET | api/v1/cows |To retrieve all cow profile |
| GET | api/v1/cows?page=1&limit=10 |To retrieve all cow profile with pagination |
| GET | api/v1/cows?sortBy=price&sortOrder=asc |To retrieve all cow profile with sorting with price in ascending order|
| GET | api/v1/cows?sortBy=price&sortOrder=desc |To retrieve all cow profile with sorting with price in descending order|
| GET | api/v1/cows?sortBy=weight&sortOrder=asc |To retrieve all cow profile with sorting with price in ascending order|
| GET | api/v1/cows?sortBy=weight&sortOrder=desc |To retrieve all cow profile with sorting with price in descending order|
| GET | api/v1/cows?location=Chattogram |To retrieve all cow profile match with location|
| GET | api/v1/cows?name=kalu |To retrieve all cow profile match with name|
| GET | api/v1/cows?searchTerm=Cha |To retrieve all cow profile match with searchTerm|
| GET | api/v1/cows?minPrice=20000&maxPrice=70000 |To retrieve all cow profile match with price range|
| POST | api/v1/orders  |To create a order |
| GET | api/v1/orders  |To retrieve all orders |
### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.
<hr>
### Sample Data: (Cow)

```json
{
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "ObjectId(609c17fc1281bb001f523456)"
}

```
### Create a new User 

 Route:  /api/v1/auth/signup (POST)
 
 Request body:
 
 ```json
 {
  "password":"abrakadabra",
  "role": "buyer",
   "name": {
     "firstName": "Kopa",
      "lastName": "Samsu"
   },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":30000  // money to buy the cow
  "income":0 // By Default 0
}
```
 
 Response: The newly created user object.
 
 Response Sample Pattern:

```json
 {
      "success": true, 
      "statusCode":200,
      "message": "Users created successfully",
      "data": {}, 
  }
```

           
### Get All Users

 Route:  /api/v1/users (GET)
 
 Request body:
 
 Response: The user's array of objects.
 
 Response Sample Pattern:
 
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Users retrieved successfully",
      "data": [{},{}], 
  }
```


### Get a Single User

Route:  /api/v1/users/:id (GET)

Request Param: :id

Response: The specified user object.

Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "User retrieved successfully",
      "data": {}, 
  }
  ```

### Update a Single User

 Route:  /api/v1/users/:id (PATCH)
 
 Request Param: :id
 
 Response: The updated user object.
 
 Response Sample Pattern:
 
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "User updated successfully",
      "data": {}, 
  }
  ```
  
  ### Delete a User

 Route:  /api/v1/users/:id ( DELETE)
 
 Request Param: :id
 
 Response:  The deleted user object.
 
 Response Sample Pattern:
 
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Uers deleted successfully",
      "data": {}, 
  }
```

### Create a New Cow

 Route:  /api/v1/cows (POST)

Request body:

```json
 {
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "609c17fc1281bb001f523456"
}

```
 
 Response: The newly created cow object.

 Response Sample Pattern:

```json
 {
      "success": true, 
      "statusCode":200,
      "message": "Cow created successfully",
      "data":  {
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "609c17fc1281bb001f523456"
}, 
  }
```
           
### Get All Cows

 Route:  /api/v1/cows (GET)

 Request body:

 Response: The cows array of objects.

 Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cows retrieved successfully",
      "meta": {
        "page": 3,
        "limit": 10,
        "count":1050
        }
      "data": [ {
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "609c17fc1281bb001f523456"
}] , 
  }
  ```
Route:  /api/v1/cows?
Query parameters:  (Case Insensitive)
- page: The page number for pagination (e.g., ?page=1).
- limit: The number of cow listings per page (e.g., ?limit=10).
- sortBy: The field to sort the cow listings (e.g., ?sortBy=price).
- sortOrder : The order of sorting, either 'asc' or 'desc' (e.g., ?sortOrder=asc).
- minPrice: The minimum price for filtering (e.g., ?minPrice=1000).
- maxPrice: The maximum price for filtering (e.g., ?maxPrice=5000).
- location: The location for filtering (e.g., ?location=chattogram).
- searchTerm: The search query string for searching cows (e.g., ?query=Dhaka). (Search Fields should be location, breed, and category) 

Response: An array of cow listing objects that match the provided filters, limited to the specified page and limit.

Response Sample Pattern:
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cows retrieved successfully",
      "meta": {
        "page": 3,
        "limit": 10,
        }
      "data": [{
        "_id": "648d77ca445cd4c1afbe70cb",
        "name": "Manu",
        "age": 7,
        "price": 50000,
        "location": "Rajshahi",
        "breed": "Brahman",
        "weight": 500,
        "label": "for sale",
        "category": "Beef",
        "seller": "648ce0ec4b95c4ff136f6ee6",
        "createdAt": "2023-06-17T09:07:22.425Z",
        "updatedAt": "2023-06-17T09:07:22.425Z",
        "__v": 0,
        "id": "648d77ca445cd4c1afbe70cb"
      },
      {
        "_id": "648ce1294b95c4ff136f6ee9",
        "name": "kalu",
        "age": 7,
        "price": 60000,
        "location": "Dhaka",
        "breed": "Brahman",
        "weight": 400,
        "label": "sold out",
        "category": "Beef",
        "seller": "648ce0ec4b95c4ff136f6ee6",
        "createdAt": "2023-06-16T22:24:41.604Z",
        "updatedAt": "2023-06-16T23:24:01.125Z",
        "__v": 0,
        "id": "648ce1294b95c4ff136f6ee9"
      }], 
  }
```


### Get a Single Cow

Route:  /api/v1/cows/:id (GET)

Request Param: :id

Response: The specified cow object.

Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cow retrieved successfully",
      "data": {
        "_id": "648d77ca445cd4c1afbe70cb",
        "name": "Manu",
        "age": 7,
        "price": 50000,
        "location": "Rajshahi",
        "breed": "Brahman",
        "weight": 500,
        "label": "for sale",
        "category": "Beef",
        "seller": "648ce0ec4b95c4ff136f6ee6",
        "createdAt": "2023-06-17T09:07:22.425Z",
        "updatedAt": "2023-06-17T09:07:22.425Z",
        "__v": 0,
        "id": "648d77ca445cd4c1afbe70cb"
      }, 
  }
```


### Update a Single Cow

 Route:  /api/v1/cows/:id (PATCH)
 
 Request Param: :id
 
 Response: The updated cow object.

 Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cow updated successfully",
      "data": {
        "_id": "648d77ca445cd4c1afbe70cb",
        "name": "Manu",
        "age": 7,
        "price": 50000,
        "location": "Rajshahi",
        "breed": "Brahman",
        "weight": 500,
        "label": "for sale",
        "category": "Beef",
        "seller": "648ce0ec4b95c4ff136f6ee6",
        "createdAt": "2023-06-17T09:07:22.425Z",
        "updatedAt": "2023-06-17T09:07:22.425Z",
        "__v": 0,
        "id": "648d77ca445cd4c1afbe70cb"
      },, 
  }

```  
### Delete a Cow

 Route:  /api/v1/cows/:id ( DELETE)
 
 Request Param: :id
 
 Response: The deleted cow object
 
 Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cow deleted successfully",
      "data": {
        "_id": "648d77ca445cd4c1afbe70cb",
        "name": "Manu",
        "age": 7,
        "price": 50000,
        "location": "Rajshahi",
        "breed": "Brahman",
        "weight": 500,
        "label": "for sale",
        "category": "Beef",
        "seller": "648ce0ec4b95c4ff136f6ee6",
        "createdAt": "2023-06-17T09:07:22.425Z",
        "updatedAt": "2023-06-17T09:07:22.425Z",
        "__v": 0,
        "id": "648d77ca445cd4c1afbe70cb"
      } 
  }
```     


Route:  /api/v1/orders  (POST)

Request body:

```json
{

  "cow":"ObjectId(“6473c6a50c56d0d40b9bb6a3)", // cow reference _id
  "buyer":"ObjectId(“6473c6a50c56d0d40b9bb6a3)", // user reference  _id
}
```

Response: The  newly created order object.

Route:  /api/v1/orders  (GET)

Request body:

Response: The ordered array of objects.

Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Orders retrieved successfully",
      "data": {
      "_id": "648cef11d178487e4466e499",
      "cow": "648ce1294b95c4ff136f6ee9",
      "buyer": "648c64d2ebc40b277ea6df10",
      "createdAt": "2023-06-16T23:24:01.207Z",
      "updatedAt": "2023-06-16T23:24:01.207Z",
      "__v": 0,
      "id": "648cef11d178487e4466e499"
    }, 
  }
```
### Error Handling:
Error Response Object include the following properties:
- success  →  false
- message → Error Type → Validation Error, Cast Error, Duplicate Entry
- errorMessages 
- stack

### Sample Error Response

```json
   {
    "success": false,
    "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }",
    "errorMessages": [
        {
            "path": "",
            "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }"
        }
    ],
    "stack": "MongoServerError: E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }\n    at H:\\next-level-development\\university-management-auth-service\\node_modules\\mongodb\\src\\operations\\insert.ts:85:25\n    at H:\\next-level-development\\university-management-auth-service\\node_modules\\mongodb\\src\\cmap\\connection_pool.ts:574:11\n    at H:\\next-level-development\\university-writeOrBuffer (node:internal/streams/writable:391:12)"
}
```
 
  ### Application Routes:

   #### User
   - api/v1/auth/signup (POST)
   - api/v1/users (GET)
   - api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
   - api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
   - api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database


   #### Cows
   - api/v1/cows (POST)
   - api/v1/cows (GET)
   - api/v1/cows/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
   - api/v1/cows/6177a5b87d32123f08d2f5d4 (PATCH)
   - api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

   ### Pagination and Filtering routes of Cows

   - api/v1/cows?pag=1&limit=10
   - api/v1/cows?sortBy=price&sortOrder=asc
   - api/v1/cows?minPrice=20000&maxPrice=70000
   - api/v1/cows?location=Chattogram
   - api/v1/cows?searchTerm=Cha
     
  
   #### Orders
   - api/v1/orders (POST)
   - api/v1/orders (GET)




