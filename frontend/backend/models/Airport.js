const mongoose = require("mongoose");

const AirportSchema = new mongoose.Schema(
  {
    idairport : {
      type: Number,
     // required: true,
    },
    nameairportth: {
      type: String,
      //required: true,
     
    },
    nameairporten: {
      type: String,
     // required: true,
     
    },
    long: {
        type: Number,
       // required: true,
      },
    lat: {
      type: Number,
      //required: true,
    },
    
    description: {
        type: String,
        //required: true,
        
      },
      
  },
);

module.exports = mongoose.model("Airport", AirportSchema);
