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

    for (var i = 0; i < Infinity; i++) {
        let value = await ads1115.measure('0+GND')

        console.log("Moisture Value:" + value)

        // Ayekor: is this supposed to be 0 OR 1? or 0 to 100?. change the if condition bellow accordindly then delete the comment
        if(value < 50){
            console.log('Open the irrigation..');
        }
        else{
            console.log('Close the irrigation..');
        }
    
        i--;
    }
    })
 
    //var Gpio = require('onoff').Gpio;
    //var garden = new Gpio(4, 'out');   
    
    //console.log(garden.readSync() );
   
};
  
