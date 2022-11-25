const { sensors,actuators } = require("../resources/model");  
var localParams = { 'simulate': false, 'frequency': 2000 };

const Raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;
const ADS1x15 = require('raspi-kit-ads1x15');

const i2c = new I2C();
    
const adc = new ADS1x15({
    i2c,                                    // i2c interface
    chip: ADS1x15.chips.IC_ADS1015,         // chip model
    address: ADS1x15.address.ADDRESS_0x48,  // i2c address on the bus
    
    // Defaults for future readings
    pga: ADS1x15.pga.PGA_4_096V,            // power-gain-amplifier range
    sps: ADS1x15.spsADS1015.SPS_250         // data rate (samples per second)
});

exports.start = function (params) {
    localParams = params; 
    connectHardware(); 
};

function connectHardware() {

    var moisture_handler = setInterval(getMoisture, 5000);

    function getMoisture() {

        adc.readChannel(ADS1x15.channel.CHANNEL_0, (err, value, volts) => {
        
            max_threshold = 1024;
        
            if (err) {
                console.error('Failed to fetch value from ADC', err);
                process.exit(1);
            } else { 
        
                moisture = (value / max_threshold) * 100
                //console.log('Channel 0');
                //console.log(value);
                console.log('The moisture in the soil is :', Math.round(moisture,2), '%');    
                //process.exit(0);
            }
        
        
        });
    }
    
    function exit() {
        clearInterval(moisture_handler);  
        process.exit();
      }
    
    process.on('SIGINT', exit);
};
  
