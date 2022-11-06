const { sensors,actuators } = require("../resources/model");  
var localParams = { 'simulate': false, 'frequency': 2000 };

exports.start = function (params) {
    localParams = params; 
    connectHardware(); 
};


function connectHardware() {

    const ADS1115 = require('ads1115')

    const i2c = require('i2c-bus')
    i2c.openPromisified(1).then(async (bus) => {
    const ads1115 = await ADS1115(bus)
    // ads1115.gain = 1

    for (let i = 0; i < 1000; i++) {
        let value = await ads1115.measure('0+GND')
        console.log(value)
    }
    })
 
    var Gpio = require('onoff').Gpio;
    var garden = new Gpio(4, 'out');   
    
    console.log(garden.readSync() );
   
};
  
