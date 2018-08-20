var express 	= require("express"),
	app			= express(),
	port		= process.env.PORT || 3000,
	bodyParser  = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

var todoRoutes = require("./routes/todos.js")

// Can use res.send or res.json to send json.
// However res.json explicitly will convert whatever
// is passed in to json.

app.get("/", function(req, res) {
	res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);


app.listen(port, function() {
	console.log("App is running on port 3000.")
});