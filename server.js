require('dotenv').config();
const app = require("./app");
const log = console.log;
const PORT = process.env.PORT || 8000;

app.listen(PORT, (error) => {
  if (!error){
    log(`Server is successfully running on port ${PORT}`);
  } 
    
  else 
    log(`Error occurred, server can't start -> , ${error}`);
});

//****************************************************//

/** File Flow
 * It imports an Express app, 
 * Defines the port to run the server on, 
 * Starts the server while handling any potential errors.
 */

//****************************************************//

/** const PORT = process.env.PORT || 8000;
 * What it does: This sets the PORT variable to the value of the PORT environment variable if it's defined, or defaults to 8000 if not.
* Why it’s done: This allows the server to run on a port specified by the environment, which is common in production, or default to port 8000 for local development.
*/

//****************************************************//

/**
 * require('dotenv').config();
 * At the beginning of your main file (e.g., server.js), load the environment variables by requiring dotenv and calling the config method.
 */

//****************************************************//

/** .env flow
 * Install dotenv package
 * Create an .env File
 * Load the .env File in Your Application.
 * Update Server Code
 * Run the Server
 * .gitignore the .env File (Optional but Recommended)
 */