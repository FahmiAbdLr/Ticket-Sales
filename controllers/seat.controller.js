const seatModel = require('../models/index').seat
const eventModel = require('../models/index').event
const Op = require('sequelize').Op

/** create function for read all data */
exports.getAllSeat = async (request, response) => {

    /** call findAll() to get all data */
    let seats = await seatModel.findAll()

    return response.json({
        success: true,
        data: seats,
        message: `All seats have been loaded`
    })
}

/** create function to add new event */
exports.addSeat = (request, response) => {
    let eventID = request.body.eventID;

    // Cari event dengan eventID yang diberikan
    eventModel.findOne({ where: { eventID: eventID } })
        .then(event => {
            if (!event) {
                // Jika eventID tidak ditemukan, kirim pesan error
                return response.json({
                    success: false,
                    message: `Event with ID ${eventID} does not exist.`
                });
            }

            // Jika eventID ditemukan, tambahkan seat ke tabel seat
            let newSeat = {
                eventID: eventID,
                rowNum: request.body.rowNum,
                seatNum: request.body.seatNum,
                status: request.body.status ? 1 : 0,
            };

            return seatModel.create(newSeat);
        })
        .then(result => {
            // Jika penambahan seat berhasil
            return response.json({
                success: true,
                data: result,
                message: `New seat has been inserted for event ${eventID}.`
            });
        })
        .catch(error => {
            // Jika terjadi kesalahan
            return response.json({
                success: false,
                message: error.message
            });
        });

}
