const { sensors,actuators } = require("../resources/model"); 
var pluginName = sensors.pir.name;
var localParams = { 'simulate': false, 'frequency': 2000 };

exports.start = function (params) {
    localParams = params; 
    connectHardware(); 
};

exports.stop = function () {
  if (localParams.simulate) {
    clearInterval(interval);
  } else {
    actuator.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};


function connectHardware() {

    var Gpio = require('onoff').Gpio,
    sensor_ldr = new Gpio(22, 'in');   
    
    var Gpio = require('onoff').Gpio;
    var LED_red = new Gpio(4 , 'out');   
 
    var alternate_light = setInterval(DetectDarkness,2000)

    function DetectDarkness() {  
 
      if(sensor_ldr.readSync()==0){
        LED_red.write(0); 
        console.log('There is Light')

      }else{
        LED_red.write(1); 
        console.log('There is Darkness') 
      } 

    }

    

    /*
        if (sensor_ldr.value ==1){
            console.log('Darkness',sensor_ldr.value);
            LED_red.write(1); 
            console.log('Light is on!');
            actuators.leds[1].value = 1;
        }else{
            console.log('No Darkness!',sensor_ldr );  
            LED_red.write(0);
            console.log('Light is off!');
            actuators.leds[1].value = 0;
        } 
    */

 
    
    function exit(err) {
        if (err) console.log('An error occurred: ' + err);
        //sensor_pir.unexport();
        console.log('Bye, bye!');  
        LED_red.writeSync(0); // Turn LED off  
        LED_red.unexport(); // Unexport GPIO to free resources 
        
        process.exit();
    }
  
    process.on('SIGINT', exit);
  
};
  
