const Natural = require("../models/Natural");
const router = require("express").Router();
const multer =require('multer')

//upload img Natural
const storage =multer.diskStorage({
    destination:(req,file,callback) =>{
      callback(null,"../frontend/public/Natural");
    },
    filename:(req,file,callback)=>{
      callback(null,file.originalname);
    }
  })
  const upload = multer({storage: storage});

router.get('/', async (req, res) => {
    console.log("GET NATURAL")
    natural = await Natural.find({})
    res.send(natural)
})


module.exports = router;