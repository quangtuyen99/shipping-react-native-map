var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var bookings = require("./routes/bookings");

var app = express();
var port = 3000;

app.listen(port, function () {
    console.log("server running on ", port);
})


//views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//body parse 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use("/", index);
app.use("/api", bookings);



