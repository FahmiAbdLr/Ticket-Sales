const express = require('express')
const app = express()
app.use(express.json())
const eventController =  require('../controllers/event.controller')

app.get("/", eventController.getAllEvent)

app.put("/:id", eventController.updateEvent)

app.delete("/:id", eventController.deleteEvent)

app.get("/:key", eventController.findEvent)

app.post("/", eventController.addEvent)

module.exports = app

