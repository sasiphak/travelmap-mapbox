const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema(
  {
    idbus : {
      type: Number,
     // required: true,
    },
    namebusth: {
      type: String,
      //required: true,
     
    },
    namebusen: {
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

module.exports = mongoose.model("Bus", BusSchema);
