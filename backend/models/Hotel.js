const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    idhotel: {
      type: Number,
      // required: true,
    },
    namehotelth: {
      type: String,
      // required: true,
     
    },
    namehotelen: {
      type: String,
      // required: true,
     
    },
    lat: {
        type: Number,
        // required: true,
      },
    long: {
      type: Number,
      // required: true,
    },

    address: {
        type: String,
        // required: true,

      },
      description: {
        type: String,
        // required: true,
        
      },
      price: {
        type: String,
        // required: true,
        
      },
      grade: {
        type: Number,
        // required: true,
        min: 0,
        max: 5,
      },
      
      web: {
        type: String,
        // required: true,
      },

      tel: {
        type: String,
        // required: true,
      },
      
  }
);

module.exports = mongoose.model("Hotel", HotelSchema);
