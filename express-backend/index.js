const express = require("express");
const PORT = 4000;
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const authMiddleWare = require("./middleware/auth");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const mongoDBConnectionString = require("./config/mongodb");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/auth", authRouter);
app.use("*", authMiddleWare);
app.use("/users", userRouter); //Đường dẫn sử dụng các phương thức user:
// http:localhost:4000/users

mongoose.connect(mongoDBConnectionString, { useNewUrlParser: true })
    .then(result => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log("Server is listenning from " + PORT)
        });
    })
    .catch(err => {
        console.log("err");
    })


