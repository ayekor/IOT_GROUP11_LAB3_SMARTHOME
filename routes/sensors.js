const {sensors } = require("../resources/model");
const express = require("express");
const sensors_router = new express.Router();

 
sensors_router.get("/subsystem/2", async (req, res) => { 
        res.render('smartTemp',{title: 'Smart Temp', sensors})
  });
 

module.exports = sensors_router;