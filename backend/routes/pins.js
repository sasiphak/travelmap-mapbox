const router = require("express").Router();
const Pin = require("../models/Pin");
const multer =require('multer')

//Upload img Pin
const storage =multer.diskStorage({
    destination:(req,file,callback) =>{
      callback(null,"../frontend/public/uploads");
    },
    filename:(req,file,callback)=>{
      callback(null,file.originalname);
    }
  })
  const upload = multer({storage: storage});


//Get all pins
router.get("/", async (req, res) => {
    try {
      const pins = await Pin.find();
      res.status(200).json(pins);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Create a  New pin
router.post("/",upload.single("pinImage"), async (req, res) => {
  const newPin = new Pin({
    username:req.body.username,
    title:req.body.title,
    desc:req.body.desc,
    rating:req.body.rating,
    long:req.body.long,
    lat:req.body.lat,
    pinImage:req.file.originalname});
  try {
    const savedPin =  await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

  //ลบจุด
  router.delete("/delete/:id",upload.single("pinImage"), (req, res) => {
    Pin.findByIdAndRemove(req.params.id).exec((error, deletedItem) => {
      if (error) {
        res.send(error);
      }
      return res.json(deletedItem);
    });
  });
  
  router.put("/update/:id",upload.single("pinImage"),(req,res)=>{
    Pin.findById(req.params.id)
    .then(pin =>{
      pin.title=req.body.title;
      pin.desc=req.body.desc;
      pin.rating =req.body.rating;
      pin.pinImage =req.file.originalname;
  pin
  .save()
  .then(()=>res.json("Updated successfuly!"))
  .catch(err=>res.status(400).json(`Error: ${err}`)); 
    })
    .catch(err=>res.status(400).json(`Error: ${err}`));
  })

module.exports = router;