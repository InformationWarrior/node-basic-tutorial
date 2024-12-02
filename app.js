const express = require("express"); //Q1
const cors = require("cors"); //Q2
const tutorialRoute = require("./app/routes/tutorial.routes");
const dbConnect = require("./app/config/dbConnect");

const app = express();
dbConnect();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/tutorials", tutorialRoute);

app.get("/", (req, res) => {
  res.json({ message: "Information Warrior welcomes you." });
});

module.exports = app;

//****************************************************//

/** File Flow
 * Import Required Modules
 * Create an Express Application
 * Connect to the Database
 * Define CORS Options
 * Use Middleware
 * Define Routes
 * Export the Express Application
 */

//****************************************************//

/** Q1 const app = express();
 * The line const app = express(); is a key part of setting up an Express.js application.

1. What is Express?
Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
It simplifies the process of building a web server and handling HTTP requests and responses.

2. What Does express() Do?
express() is a function provided by the Express module that creates an Express application.
When you call express(), it returns an instance of an Express application, typically referred to as app.

3. Purpose of app:
The app object represents your Express application and is the central object for configuring and running the server.
Through the app object, you can:
Define routes that specify how your server should respond to different HTTP requests (GET, POST, PUT, PATCH, DELETE, etc.).
Apply middleware functions to modify the request and response objects, log information, handle errors, and more.
Set up the server to listen on a specific port and handle incoming requests.

4. Example Usage:
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

Route Definition:
app.get("/", (req, res) => {...}) defines a route for the root URL ("/"). When a GET request is made to this URL, the server responds with "Hello, World!".

Server Listening:
app.listen(3000, () => {...}) starts the server and makes it listen on port 3000 for incoming requests. The callback function logs a message to the console when the server starts successfully.

5. Summary:
const app = express(); creates an Express application instance, app, which is essential for configuring your server, defining routes, and managing middleware.
This app object is the central point of your Express application, enabling you to handle HTTP requests and responses, set up middleware, and start the server to listen for incoming requests.
*/

//****************************************************//

/** Q2
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

1. CORS Overview:
CORS (Cross-Origin Resource Sharing):
CORS is a security feature implemented by web browsers to restrict web pages from making requests to a domain different from the one that served the web page. This is called a cross-origin request.
CORS allows you to relax the same-origin policy and specify which origins are permitted to access resources on your server.

2. var corsOptions = { origin: "*" };:
This creates an object, corsOptions, that defines the CORS settings for your application.
origin: "*":
The origin property specifies which origins are allowed to access resources on your server.
"*" means that any domain can access your API. This is useful for development or public APIs where you don't need to restrict access.

Example:
var corsOptions = {
  origin: "https://example.com",
};
In this example, only requests coming from https://example.com would be allowed.

3. app.use(cors(corsOptions));:
app.use() is a method to apply middleware in an Express application. Middleware functions are executed in the order they are added, and they can modify the request and response objects or end the request-response cycle.

cors(corsOptions):
This is a middleware function provided by the cors package.
By passing corsOptions to cors(), you configure the CORS middleware to apply the specified options to all incoming requests.
This setup allows your server to handle cross-origin requests according to the rules you've defined in corsOptions.

4. How It Works:
When a request is made to your server, the CORS middleware checks the Origin header in the request.
If the origin matches the allowed origin(s) specified in corsOptions, the server includes CORS headers in its response, which tells the browser that the request is permitted.

5. Example Use Case:
Public API:
If you're building a public API that should be accessible from any domain, you might use origin: "*" to allow requests from any origin.
Restricting Access:
For more secure applications, you might restrict the allowed origins to specific domains to prevent unauthorized access from other domains.

6. Security Considerations:
Allowing All Origins ("*"):
While allowing all origins is convenient, it may not be suitable for production environments where security is a concern.
In production, it’s typically better to restrict access to specific, trusted domains.

Summary:
CORS: A security feature that allows you to control which origins can access resources on your server.
var corsOptions = { origin: "*" };: This sets up a CORS configuration that allows access from any origin.
app.use(cors(corsOptions));: Applies the CORS middleware to your Express application, enabling cross-origin requests according to the specified options.
*/

//****************************************************//

/** Q3
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

The lines app.use(express.json()); and app.use(express.urlencoded({ extended: true })); are middleware functions used in Express.js to parse incoming requests with different content types. Here's a breakdown of each:

1. app.use(express.json());

Purpose:
This middleware is used to parse incoming requests with a JSON payload.
It parses the application/json content-type, meaning it will automatically convert JSON data sent in the body of a request into a JavaScript object that you can access via req.body.

Usage Example:
app.post("/data", (req, res) => {
  console.log(req.body); // Access the parsed JSON data here
  res.send("Data received");
});
If a client sends a POST request with a JSON body like {"name": "John", "age": 30}, req.body will be { name: "John", age: 30 }.

2. app.use(express.urlencoded({ extended: true }));

Purpose:
This middleware is used to parse incoming requests with URL-encoded payloads, typically coming from HTML forms.
It parses the application/x-www-form-urlencoded content-type.
extended: true
 
Explanation:
extended: true: Allows for rich objects and arrays to be encoded into the URL-encoded format using the qs library.
Example: It allows nested objects, like {"user": {"name": "John", "age": 30}}, to be properly parsed into a JavaScript object.
extended: false: Uses the querystring library, which does not support nested objects.

Usage Example:
app.post("/form", (req, res) => {
  console.log(req.body); // Access the parsed URL-encoded data here
  res.send("Form data received");
});
If a client submits an HTML form with inputs named name="John" and age="30", req.body will be { name: "John", age: "30" }.

3. Why Use These Middlewares:
Express JSON Middleware:

When you're dealing with APIs or applications that communicate using JSON, this middleware is essential. It ensures that any JSON data sent in the request body is automatically parsed and available in req.body.

Express URL-Encoded Middleware:

This middleware is particularly useful for handling form submissions. When a form is submitted with method POST, the data is sent in the request body in a URL-encoded format. This middleware parses that data so you can easily access it in your server-side code.

4. Summary:
app.use(express.json());: Parses incoming JSON requests and makes the data available in req.body.
app.use(express.urlencoded({ extended: true }));: Parses incoming URL-encoded requests (e.g., from forms) and makes the data available in req.body. The extended: true option allows for parsing nested objects in the request body.
These middlewares are commonly used in modern Express applications to handle different types of request payloads seamlessly.
*/

//****************************************************//

/** app.use()
 * app.use() is a method in Express.js used to apply middleware functions or routes to your application. It allows you to define middleware that runs for every request, or for specific routes.

Key points:
Middleware: Functions that have access to the request (req), response (res), and next function in the request-response cycle.

Routes: You can mount specific routes or route handlers.

Syntax:
app.use([path], middlewareFunction/Route);
[path] (optional): The base path where the middleware or route should be applied. If omitted, it applies to all routes.
middlewareFunction: The function or route that will be executed when the path matches.

Example:
// Applying middleware to all routes
app.use((req, res, next) => {
  console.log('A request was made');
  next();
});

// Mounting routes for a specific path
app.use("/api", apiRoutes);
In summary, app.use() is a versatile method for applying middleware or mounting routes at any path within your Express.js app.
*/
//****************************************************//

/** app.use()
 * The app.use() method in Express.js is a powerful tool for applying middleware functions to your application. Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. Here's an in-depth look at what app.use() does and how it works:

1. Middleware in Express.js:
Middleware Functions:
Middleware functions can perform a variety of tasks, such as logging, authentication, parsing request bodies, modifying the request or response, and handling errors.
Each middleware function can either end the request-response cycle or pass control to the next middleware function using the next() function.

2. How app.use() Works:
Syntax:
app.use([path], callback)
path (optional):

Specifies the base path for the middleware function. If a path is provided, the middleware function will only execute for requests that match the path.
If no path is provided, the middleware function is executed for every request, regardless of the URL.
callback:
This is the middleware function itself. It can take three arguments: req (request), res (response), and next (a function that passes control to the next middleware).

General Flow:
When a request is made to the server, Express checks the middleware stack in the order they are defined using app.use().
If a middleware function matches the request path, it gets executed.
If the middleware function calls next(), control is passed to the next middleware in the stack.
If the middleware does not call next() or does not send a response, the request will hang and eventually time out.

3. Example Usage:
Global Middleware:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
This middleware logs every request method and URL to the console. Since no path is specified, it runs for every request.

Path-Specific Middleware:
app.use('/admin', (req, res, next) => {
  console.log("Admin area");
  next();
});
This middleware only runs for routes that start with /admin. For example, it will execute for /admin/dashboard but not for /user/profile.

Using Third-Party Middleware:
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
Here, app.use(cors()) applies the CORS middleware to the entire application, allowing cross-origin requests.

Applying Multiple Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
In this example, one middleware is used to parse JSON request bodies, and another to parse URL-encoded request bodies.

4. Chaining Middleware:
Middleware functions can be chained by calling next():
app.use((req, res, next) => {
  console.log("First middleware");
  next();
});

app.use((req, res, next) => {
  console.log("Second middleware");
  next();
});

app.get('/', (req, res) => {
  res.send("Hello, World!");
});
When a request is made, it will pass through both middleware functions before reaching the route handler.

5. Error Handling Middleware:
Error-handling middleware functions take four arguments: (err, req, res, next):
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
This middleware catches errors passed to next(err) and handles them, preventing them from crashing the server.

6. Summary:
app.use() is used to add middleware to an Express application.
Middleware functions can be applied globally (to all routes) or to specific paths.
Middleware can modify requests and responses, perform tasks like logging or authentication, and manage the flow of the request-response cycle by calling next().
It's an essential part of structuring an Express application and managing complex request-handling logic.
 */

//=================================================

/**How to define multiple domains in CORS options
  
  const allowedDomains = ["https://domain1.com", "https://domain2.com"];
  
  var corsOptions = {
    origin: function (origin, callback) {
    // If no origin (for example, in non-browser clients like Postman) or origin is in allowedDomains
    if (!origin || allowedDomains.includes(origin)) {
      // The origin is allowed, so we call the callback with `null` (no error) and `true`
      callback(null, true);
    } else {
      // The origin is not allowed, so we pass an error to the callback
      callback(new Error("Not allowed by CORS"));
    }
  },
};

 */