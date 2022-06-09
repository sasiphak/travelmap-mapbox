const Bus = require("../models/Bus");
const router = require("express").Router();
const multer =require('multer')

//upload img Bus
const storage =multer.diskStorage({
    destination:(req,file,callback) =>{
      callback(null,"../frontend/public/Bus");
    },
    filename:(req,file,callback)=>{
      callback(null,file.originalname);
    }
  })
  const upload = multer({storage: storage});
  
router.get('/', async (req, res) => {
    console.log("GET BUS")
    bus = await Bus.find({})
    res.send(bus)
})





module.exports = router;