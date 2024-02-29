/** load model for `users` table */
const userModel = require(`../models/index`).user
const md5 = require(`md5`)

/** load Operation from Sequelize */
const Op = require(`sequelize`).Op

// Get All User
exports.getAllUser = async (request, response) => {
    /** call findAll() to get all data */
    let users = await userModel.findAll()
    return response.json({
        success: true,
        data: users,
        message: `All users have been loaded`
    })
}

// Filter User
exports.findUser = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.params.key
    /** call findAll() within where clause and operation
     * to find data based on keyword */
    let users = await userModel.findAll({
        where: {
            [Op.or]: [
                { userID: { [Op.substring]: keyword } },
                { firstname: { [Op.substring]: keyword } },
                { lastname: { [Op.substring]: keyword } },
                { email: { [Op.substring]: keyword } },
                { role: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: users,
        message: `All Users have been loaded`
    })
}

// Create User
exports.addUser = (request, response) => {

    let newUser = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        password: md5(request.body.password),
        role: request.body.role
    }

    userModel.create(newUser)
        .then(result => {
            /** if insert's process success */
            return response.json({
                success: true,
                data: result,
                message: `New user has been inserted`
            })
        })
        .catch(error => {
            /** if insert's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

// Update User
exports.updateDataUser = (request, response) => {

    let dataUser = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        role: request.body.role
    }

    let userID = request.params.id
    /** execute update data based on defined id user */
    userModel.update(dataUser, { where: { userID : userID } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data user has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

// Reset password User
exports.resetPasswordUser = (request, response) => {
    let dataUser = {
        password: md5(request.body.password)
    }

    let userID = request.params.id

    userModel.update(dataUser, { where: { userID : userID } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Password user has been Reset`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

// Delete User
exports.deleteUser = (request, response) => {
    let userID = request.params.id
    userModel.destroy({ where: { userID: userID } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data user has been deleted`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}