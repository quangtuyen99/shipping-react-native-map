var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb+srv://eman:0911655922aA@shippingapp.nnjcd.mongodb.net/shippingApp?retryWrites=true&w=majority", ["bookings"]);

// Lấy dữ liệu từ collection bookings
router.get("/bookings", function (req, res, next) {
    db.bookings.find(function (err, bookings) {
        if (err) {
            res.send(err);
        }
        res.json(bookings);
    })
});

router.post("/bookings", function (req, res, next) {
    var booking = req.body.data;

    if (!booking.userName) {
        res.status(400);
        res.json({
            error: "Bad data"
        })
    } else {
        db.booking.save(booking, function (err, savedBooking) {
            if (err) {
                res.send(err);
            }
            res.json(savedBooking)
        })
    }
})

module.exports = router;