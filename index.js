const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
app.use(cors())
app.use(express.static(__dirname))

const userRoute = require('./routes/user.route.js')
const eventRoute = require('./routes/event.route')
const seatRoute = require('./routes/seat.route')

app.use(`/user`, userRoute)
app.use(`/event`, eventRoute)
app.use(`/seat`, seatRoute)


app.listen(PORT, () => {
    console.log(`Server Ticket Sales runs on port ${PORT}`)
})
