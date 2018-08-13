var express = require("express"),
	app		= express(),
	port	= process.env.PORT || 3000;


// Can use res.send or res.json to send json.
// However res.json explicitly will convert whatever
// is passed in to json.

app.get("/", function(req, res) {
	res.send({});
})

app.get("/happy", function(req, res) {
	res.send(":)");
})


app.listen(port, function() {
	console.log("App is running on port 3000.")
});