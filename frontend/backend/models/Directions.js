const mongoose = require("mongoose");

const DirectionSchema = new mongoose.Schema(
    {
        routes: {
            type: String,
            // required: true,
        },
        waypoint: {
            type: Array,
            // required: true,
        },
        code: {
            type: String,
            // required: true,
        },
        uuid: {
            type: String,
            // required: true,
        },

    }
);

module.exports = mongoose.model("Direction", DirectionSchema);
