const mongoose = require("mongoose");

const PortSchema = new mongoose.Schema(
  {
    idport : {
      type: Number,
     // required: true,
    },
    nameportth: {
      type: String,
      //required: true,
     
    },
    nameporten: {
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

module.exports = mongoose.model("Port", PortSchema);
