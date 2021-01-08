const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;

let shipSocket = null;
let passengerSocket = null;


io.on("connection", socket => {
    console.log("user connected");
    socket.on("shipRequest", coordinate => {
        passengerSocket = socket;

        console.log("Some one is looking for shipper!")
        if (shipSocket != null) {
            shipSocket.emit("shipRequest", coordinate)

        }

    });

    socket.on("user", user => {

        if (shipSocket != null) {
            shipSocket.emit("user", user)

        }

    });




    // Truyền ngược lại địa chỉ cho user
    socket.on("driverLocation", (driverLocation) => {
        console.log(driverLocation)
        passengerSocket.emit("driverLocation", driverLocation)
    })


    //Tài xế tìm kiếm khách hàng
    socket.on("lookingforPassenger", () => {
        console.log("Some one is looking for passenger");
        shipSocket = socket; // Tìm kiếm khách hàng
    })

});

server.listen(port, () => console.log("server running on " + port))