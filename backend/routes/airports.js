const Airport = require("../models/Airport");
const router = require("express").Router();
const multer =require('multer')

//upload img Airport
const storage =multer.diskStorage({
    destination:(req,file,callback) =>{
      callback(null,"../frontend/public/Airport");
    },
    filename:(req,file,callback)=>{
      callback(null,file.originalname);
    }
  })
  const upload = multer({storage: storage});

router.get('/', async (req, res) => {
    console.log("GET AIRPORT")
    airport = await Airport.find({})
    res.send(airport)
})





module.exports = router;