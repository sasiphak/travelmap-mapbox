const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const hotelRoute = require("./routes/hotels");
const naturalRoute = require("./routes/naturals");
const templeRoute = require("./routes/temples");
const airportRoute = require("./routes/airports");
const portRoute = require("./routes/ports");
const busRoute = require("./routes/buses");



dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("MongoDB Connected!");
})
.catch((err) => console.log(err));

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/naturals", naturalRoute);
app.use("/api/temples", templeRoute);
app.use("/api/airports", airportRoute);
app.use("/api/ports", portRoute);
app.use("/api/buses", busRoute);

app.listen(8800, () => {
    console.log("Backend server is running!");
  });