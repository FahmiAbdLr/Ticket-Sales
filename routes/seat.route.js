const express = require('express')
const app = express()
app.use(express.json())
const seatController =  require('../controllers/seat.controller')

app.get("/", seatController.getAllSeat)

app.post("/", seatController.addSeat)

// app.put("/:id", eventController.updateEvent)
//
// app.delete("/:id", eventController.deleteEvent)
//
// app.get("/:key", eventController.findEvent)

module.exports = app
