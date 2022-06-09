const Temple = require("../models/Temple");
const router = require("express").Router();
const multer =require('multer')

//upload img Temple
const storage =multer.diskStorage({
    destination:(req,file,callback) =>{
      callback(null,"../frontend/public/Temple");
    },
    filename:(req,file,callback)=>{
      callback(null,file.originalname);
    }
  })
  const upload = multer({storage: storage});

router.get('/', async (req, res) => {
    console.log("GET TEMPLE")
    temple = await Temple.find({})
    res.send(temple)
})


module.exports = router;



