const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    try {
        res.status(200).json({message: "This is a Contact routes"});
    } catch (error) {
        res.status(500).json({message: "not found contact route"});
    };
});

router.put("/:id", (req , res) => {
    try {
        res.status(200).json({message: `this is a id route ${req.params.id}`})
    } catch (error) {
        res.status(500).json({message: `not found id route ${req.params.id}`})
    }
})
router.delete("/:id", (req , res) => {
    try {
        res.status(200).json({message: `Delete the id route ${req.params.id}`})
    } catch (error) {
        res.status(500).json({message: `Didn't delete the id route ${req.params.id}`})
    }
})

module.exports = router;