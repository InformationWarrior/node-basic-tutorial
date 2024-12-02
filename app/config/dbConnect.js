require('dotenv').config();
const mongoose = require("mongoose");
const log = console.log;
const DB_URL = process.env.DB_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log("Connected to the database.");
  }
  catch (error) {
    log("Cannot connect to the database - ", error);
    process.exit(1);
  }
};

module.exports = dbConnect;

//****************************************************//

/** File flow
 * Load environment variables
 * Import mongoose
 * Construct the MongoDB Connection URL
 * Define and export the dbConnect Function
 */

//****************************************************//

/**
await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

This line of code is responsible for connecting your Node.js application to a MongoDB database using Mongoose.

1. await mongoose.connect(url, {...}):

await:
This keyword is used to pause the execution of the function until the promise returned by mongoose.connect() is resolved or rejected. It is only used inside async functions.
This ensures that the connection attempt completes before the code continues, making it easier to handle success or failure.

mongoose.connect(url, {...}):
This is the function that initiates a connection to the MongoDB database specified by the url.
url: This is the connection string that specifies the location of the MongoDB server and the name of the database. It looks something like mongodb://0.0.0.0:27017/database_name.

2. Connection Options:
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
useNewUrlParser: true:
This option instructs Mongoose to use the new MongoDB connection string parser.
MongoDB introduced a new connection string parser in MongoDB 3.6, which is more robust and provides better error handling. By setting this option to true, you are opting into using this new parser.

useUnifiedTopology: true:
This option tells Mongoose to use the new unified topology engine, introduced in MongoDB 3.2.
The unified topology engine is designed to provide more stable and reliable connections by consolidating the connection management mechanisms.
It also removes support for several deprecated connection options, simplifying the connection configuration and improving performance.

Why These Options Matter:
Stability and Compatibility: Both options are recommended for ensuring that your application is compatible with the latest MongoDB server versions and that the connection handling is as stable and efficient as possible.

Simplified Configuration: By using these options, you avoid potential issues with older, deprecated connection mechanisms.

Summary:
Purpose: The code attempts to establish a connection to a MongoDB database using Mongoose.

Options Used:
useNewUrlParser: true: Uses the new URL parser for better error handling and compatibility.

useUnifiedTopology: true: Uses the new unified topology engine for better connection management.

await ensures that the connection is established before proceeding, allowing you to handle the outcome appropriately within an async function.
*/

//****************************************************//

/**
 * The process.exit(); function in Node.js is used to immediately terminate the running Node.js process. Here’s what it does and when it might be used:

1. What It Does:
process.exit();:
This function stops the execution of the Node.js process.
When called, the Node.js process ends and no more code is executed after this point.

2. Exit Codes:
You can optionally pass an exit code to process.exit():

process.exit(0);: A code of 0 indicates that the process exited successfully, without errors.
process.exit(1);: A code of 1 (or any non-zero number) indicates that the process exited with an error.
If no code is provided, process.exit() defaults to 0.

3. When to Use process.exit();:
Error Handling: If a critical error occurs (like failing to connect to a database), you might want to terminate the application since it cannot function properly without resolving the issue.
Graceful Shutdown: In some cases, you may want to perform clean-up operations before exiting, such as closing database connections or saving data, and then call process.exit() to end the process.
Command-Line Tools: For command-line scripts, process.exit() is often used to signal the completion of a task, either successfully or with an error.

4. Example in Context:
In the code you provided:

const dbConnect = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log("Connected to the database.");
  } catch (error) {
    log("Cannot connect to the database - ", error);
    process.exit(1);  // Exits the process with an error code
  }
};
What Happens: If the connection to the database fails, the catch block logs the error and calls process.exit(1);. This immediately stops the application with an exit code of 1, indicating that it exited due to an error.

5. Why Use process.exit(); Carefully:
Abrupt Termination: process.exit(); terminates the process immediately, without finishing any remaining work or pending operations, like ongoing network requests or open file streams.
Unclean Shutdown: It can prevent proper resource clean-up, so it should be used cautiously and generally only when necessary.

Summary:
process.exit(); stops the Node.js process immediately.
Exit Codes: 0 for success, 1 (or other non-zero) for errors.
Use Cases: Handling critical errors, signaling task completion in scripts.
Caution: It terminates the process abruptly, so avoid using it where ongoing operations need to complete.
 */

//****************************************************//

/** Q1 What is a promise?
 * A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises provide a way to handle asynchronous operations, such as API calls, file I/O, or database queries, without getting stuck in callback hell (deeply nested callbacks).

Key Concepts of a Promise:
States of a Promise:

Pending: The initial state. The operation is not yet complete, and the promise is neither fulfilled nor rejected.
Fulfilled: The operation completed successfully, and the promise has a value.
Rejected: The operation failed, and the promise has a reason (typically an error) for the failure.

Promise Methods:

.then(onFulfilled, onRejected):
Attaches callbacks for the fulfillment and rejection cases.
onFulfilled: Called when the promise is fulfilled, with the result as its argument.
onRejected: Called when the promise is rejected, with the reason (error) as its argument.

.catch(onRejected):
Attaches a callback for only the rejection case.
Essentially, it's a shorthand for .then(null, onRejected).

.finally(onFinally):
Attaches a callback that will be called when the promise is settled (fulfilled or rejected), regardless of the outcome.
Useful for performing cleanup operations.

Creating a Promise:

A promise is created using the new Promise constructor, which takes an executor function with two arguments: resolve and reject.

const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  if (// operation succeeds ) {
    resolve("Success!");
  } else {
    reject("Failure!");
  }
});
resolve(value): Called to fulfill the promise with the given value.
reject(reason): Called to reject the promise with the given reason (typically an error).

Example of a Promise:

const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation (e.g., API call)
    setTimeout(() => {
      const data = { name: "John", age: 30 };
      resolve(data); // Fulfill the promise with the data
    }, 2000);
  });
};

fetchData()
  .then((data) => {
    console.log("Data received:", JSON.stringify(data));
  })
  .catch((error) => {
    console.error("Error:", error);
  });

Using await with Promises:
When you use await with a promise, it pauses the execution of the function until the promise is settled (either fulfilled or rejected).
If the promise is fulfilled, await returns the value. If the promise is rejected, await throws the error, which can be caught using a try...catch block.

Example with await:

const fetchDataAsync = async () => {
  try {
    const data = await fetchData(); // Waits for the promise to be fulfilled
    console.log("Data received:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

fetchDataAsync();

Summary:
A Promise is an object representing the eventual result of an asynchronous operation.
It can be in one of three states: pending, fulfilled, or rejected.
Promises allow you to write cleaner, more manageable asynchronous code compared to using callbacks.
The await keyword allows you to work with promises in a more synchronous-like fashion within async functions.
 */