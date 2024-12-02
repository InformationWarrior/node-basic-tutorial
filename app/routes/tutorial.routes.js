const router = require("express").Router();
const tutorials = require("../controllers/tutorial.controller.js");

//Create
router.post("/", tutorials.create);

//Read
router.get("/", tutorials.findAll);
router.get("/published", tutorials.findAllPublished);
router.get("/:id", tutorials.findOne);
``
//Update
router.put("/:id", tutorials.update);

//Delete
router.delete("/:id", tutorials.deleteTutorial);
router.delete("/", tutorials.deleteAll);

module.exports = router;

/**
 *  Setting Up the Router:
const router = require("express").Router();
This line imports the Router function from Express and creates a new router instance.
The router object is used to define a set of routes. It's like a mini Express application, without the need to create a separate instance of Express.

2. Importing the Controller:
const tutorials = require("../controllers/tutorial.controller.js");
This line imports the tutorials controller, which contains the logic for handling requests related to tutorials.
The controller typically includes methods for creating, reading, updating, and deleting tutorials.
 */