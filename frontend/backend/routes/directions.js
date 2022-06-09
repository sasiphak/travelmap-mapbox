const Direction = require("../models/Direction");
const router = require("express").Router();

router.get('/', async (req, res) => {
    console.log("GET Direction")
    Direction = await Direction.find({})
    res.send(Direction)
})





module.exports = router;