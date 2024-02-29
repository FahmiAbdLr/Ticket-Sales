const seatModel = require('../models/index').seat
const eventModel = require('../models/index').event
const Op = require('sequelize').Op

/** create function for filter */
exports.findSeat = async (request, response) => {

    /** define keyword to find data */
    let keyword = request.params.key

    /** call findAll() within where clause and operation
     * to find data based on keyword */
    let seats = await seatModel.findAll({
        where: {
            [Op.or]: [
                { rowNum: { [Op.substring]: keyword } },
                { seatNum: { [Op.substring]: keyword } },
                { status: { [Op.substring]: keyword } },
            ]
        }
    })
    return response.json({
        success: true,
        data: seats,
        message: `All Events have been loaded`
    })
}

/** create function for filter */
exports.findEvent = async (request, response) => {

    /** define keyword to find data */
    let keyword = request.params.key

    /** call findAll() within where clause and operation
     * to find data based on keyword */
    let events = await eventModel.findAll({
        where: {
            [Op.or]: [
                { eventName: { [Op.substring]: keyword } },
                { eventDate: { [Op.substring]: keyword } },
                { venue: { [Op.substring]: keyword } },
                { price: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: events,
        message: `All Events have been loaded`
    })
}

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

/** create function to add new seat */
// exports.addSeat = (request, response) => {
//     let eventID = request.body.eventID;
//
//     // Cari event dengan eventID yang diberikan
//     eventModel.findOrCreate({ where: { eventID: eventID } })
//         .then(([event, created]) => {
//             if (!created) {
//                 // Jika eventID sudah ada, kirim pesan error
//                 return response.json({
//                     success: false,
//                     message: `Event with ID ${eventID} is not exist.`
//                 });
//             }
//
//             // Jika eventID baru, tambahkan seat ke tabel seat
//             let newSeat = {
//                 eventID: eventID, // Pastikan eventID dari seat baru adalah sama dengan eventID yang diterima dari permintaan
//                 rowNum: request.body.rowNum,
//                 seatNum: request.body.seatNum,
//                 status: request.body.status === true ? 1 : 0,
//             };
//             return seatModel.create(newSeat);
//         })
//         .then(result => {
//             // Jika penambahan seat berhasil
//             return response.json({
//                 success: true,
//                 data: result,
//                 message: `New seat has been inserted for event ${eventID}.`
//             });
//         })
//         .catch(error => {
//             // Jika terjadi kesalahan
//             return response.json({
//                 success: false,
//                 message: error.message
//             });
//         });
// }

exports.addSeat = (request, response) => {
    // Ambil data dari request body
    let eventID = request.body.eventID;
    eventID = parseInt(eventID);

    // console.log("Received request to add seat with the following data:");
    // console.log("eventID:", eventID);
    // console.log("rowNum:", request.body.rowNum);
    // console.log("seatNum:", request.body.seatNum);
    // console.log("status:", request.body.status);

    // Cari event dengan eventID yang diberikan
    eventModel.findOne({ where: { eventID: eventID } })
        .then(event => {
            if (!event) {
                return response.json({
                    success: false,
                    message: `Seat with ID ${eventID} exist.`
                });
            }

            // Jika eventID ditemukan, tambahkan seat ke tabel seat
            let newSeat = {
                eventID: eventID,
                rowNum: request.body.rowNum,
                seatNum: request.body.seatNum, // Mengubah seatNum menjadi integer
                status: request.body.status === 'true' ? 1 : 0, // Mengubah status menjadi boolean (true/false)
            };

            // Tambahkan seat ke dalam tabel seat
            const result = seatModel.create(newSeat);
            console.log(result);
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

exports.updateSeat = (request, response) => {
    let seatID = request.params.id;
    if (!seatID) {
        return response.status(400).json({
            success: false,
            message: "Seat ID is required"
        });
    }

    let dataSeat = {
        rowNum: request.body.rowNum,
        seatNum: request.body.seatNum,
        status: request.body.status ? 1 : 0,
    }

    /** execute update data based on defined id user */
    seatModel.update(dataSeat, { where: { seatID: seatID } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data seat has been updated`
            });
        })
        .catch(error => {
            /** if update's process fail */
            return response.status(500).json({
                success: false,
                message: error.message
            });
        });
}

/** create function to delete seat */
exports.deleteSeat = (request, response) => {
    let seatID = request.params.id
    seatModel.destroy({ where: { seatID: seatID } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Seat data has been deleted`
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
