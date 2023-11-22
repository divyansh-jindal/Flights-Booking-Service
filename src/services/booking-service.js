const axios = require('axios');

const { ServerConfig } = require('../config');
const { BookingRepository } = require('../repositories');
const db = require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

async function createBooking(data) {
    return new Promise((resolve,reject)=>{
        const result = db.sequelize.transaction(async function bookingImpl(t){
            const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
            console.log(typeof flight);
            const FlightData = flight.data.data;
            if(data.noOfSeats>FlightData.totalSeats){
                reject (new AppError('Not enough seats available', StatusCodes.BAD_REQUEST));
            }
            // console.log(flight.data);
            resolve (true);
        });
    })    
    // try {
    //     const result = db.sequelize.transaction(async function bookingImpl(t){
    //         const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
    //         const FlightData = flight.data.data;
    //         if(data.noOfSeats>FlightData.totalSeats){
    //             throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
    //         }
    //         console.log(flight.data);
    //         return true;
    //     });
    // } catch(error) {
    //     console.log(error);
    //     // throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    //     throw error;
    // }
    
}

module.exports={
    createBooking
}