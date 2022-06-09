const Hotel = require("../models/Hotel");
const router = require("express").Router();
const multer =require('multer')

//upload img Hotel
const storage =multer.diskStorage({
  destination:(req,file,callback) =>{
    callback(null,"../frontend/public/Hotel");
  },
  filename:(req,file,callback)=>{
    callback(null,file.originalname);
  }
})
const upload = multer({storage: storage});

router.get('/', async (req, res) => {
    console.log("GET HOTEL")
    hotel = await Hotel.find({})
    res.send(hotel)
})





module.exports = router;