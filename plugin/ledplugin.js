const { actuators } = require("../resources/model"); 
var pluginName = actuators.leds[1].name;
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

  var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
  var LED_red = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
   
  console.info('Hardware %s actuator started!', pluginName);
 
  var alternate_light = setInterval(blinkLED, 2000); //run the blinkLED function every 2000ms
  

  function blinkLED() { //function to start blinking
    
    if (LED_red.readSync() === 0) { //check the pin state, if the state is 0 (or off)

      var red_state_on = 1; 

      LED_red.write(1); //set pin state to 1 (turn LED on)  
      console.log("led state: " + red_state_on);

      actuators.leds[1].value = red_state_on;

    } else {

      var red_state_off = 0; 

      LED_red.write(0); //set pin state to 0 (turn LED off) 
      console.log("led state: " + red_state_off);

      actuators.leds[1].value = red_state_off;
 
    }
  }
  
  
  
  function exit() {
    clearInterval(alternate_light); // Stop blink intervals   
    LED_red.writeSync(0); // Turn LED off  
    LED_red.unexport(); // Unexport GPIO to free resources 
    
    process.exit();
  }

  process.on('SIGINT', exit);

  };
