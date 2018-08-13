var mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/todo-api");

// Allows us to use promise syntax instead of callbacks.
mongoose.Promise = Promise;