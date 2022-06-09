const Port = require("../models/Port");
const router = require("express").Router();
const multer =require('multer')

//upload img Port
const storage =multer.diskStorage({
  destination:(req,file,callback) =>{
    callback(null,"../frontend/public/Port");
  },
  filename:(req,file,callback)=>{
    callback(null,file.originalname);
  }
})
const upload = multer({storage: storage});
router.get('/', async (req, res) => {
    console.log("GET PORT")
    port = await Port.find({})
    res.send(port)
})


module.exports = router;