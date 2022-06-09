const mongoose = require("mongoose");

const NaturalSchema = new mongoose.Schema(
  {
    idnatural: {
      type: Number,
      //required: true,
    },
    namenatth: {
      type: String,
     // required: true,
     
    },
    namenat: {
      type: String,
     // required: true,
     
    },
    lat: {
        type: Number,
      //  required: true,
      },
    long: {
      type: Number,
     // required: true,
    },
  },
);

module.exports = mongoose.model("Natural", NaturalSchema);
