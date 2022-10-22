const { actuators } = require("../resources/model");
const express = require("express");
const actuators_router = new express.Router();

actuators_router.get("/actuators", async (req, res) => {
      //res.status(200).send(actuators);
        res.render('smart_light',{title: 'Smart Lighting',actuators})
  });

actuators_router.get("/actuators/leds/:id", async (req, res) => {
    const id = req.params.id;
    res.status(200).send(actuators.LEDs[id]);
});

module.exports = actuators_router;