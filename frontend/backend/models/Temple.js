const mongoose = require("mongoose");

const TempleSchema = new mongoose.Schema(
  {
    idtemple: {
      type: Number,
     // required: true,
    },
    nametemth: {
      type: String,
    //  required: true,
     
    },
    nametemen: {
      type: String,
    //  required: true,
     
    },
    lat: {
        type: Number,
      //  required: true,
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
      businesshours: {
        type: String,
       // required: true,

      },
      web: {
        type: String,
     //   required: true,
      },

      tel: {
        type: String,
     //   required: true,
      },
      
  },
);

module.exports = mongoose.model("Temple", TempleSchema);
