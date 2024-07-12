const { Booking } = require("../models/index");
const { StatusCodes } = require('http-status-codes')
const { AppError, ValidationError } = require("../utils/error/index");

class BookingRepository {
  async create(data) {
    try {
          const booking = await Booking.create(data)
          return booking;
    } catch (error) {
      if (error.name == "SequelizeValidatonError") {
        throw new ValidationError(error);
      }
      throw new AppError('ResponsiveError',
           'Can not create booking',
           'There is some issue creating the booking, please try again later',
           StatusCodes.INTERNAL_SERVER_ERROR
          );
    }
  }

  

}

module.exports = BookingRepository;
