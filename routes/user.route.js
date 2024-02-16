const express = require('express')
const app = express()
app.use(express.json())
const userController = require('../controllers/user.controller')

// Mendapatkan semua data User
app.get("/", userController.getAllUser)

// Mendapatkan data User dengan filter
app.get("/:key", userController.findUser)

// Post User
app.post("/", userController.addUser)

// Update User berdasarkan ID
app.put("/:id", userController.updateDataUser)

// Update / Reset passsword User berdasarkan ID
app.put("/reset/:id", userController.resetPasswordUser)

// Delete User berdasarkan ID
app.delete("/:id", userController.deleteUser)

module.exports = app
