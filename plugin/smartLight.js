const { sensors,actuators } = require("../resources/model"); 
//var pluginName = sensors.pir.name;
var localParams = { 'simulate': false, 'frequency': 2000 };

exports.start = function (params) {
    localParams = params; 
    connectHardware(); 
};


function connectHardware() {

    var Gpio = require('onoff').Gpio,
    sensor_pir = new Gpio(17, 'in', 'both');   
    
    var Gpio = require('onoff').Gpio;
    var LED_red = new Gpio(4, 'out');   

    var Gpio = require('onoff').Gpio,
    sensor_ldr = new Gpio(22, 'in', 'both'); 

    //var switch_light;

    sensor_pir.watch(function (err, value) {
        //if (err) exit(err);
        //console.log(value ? 'there is some one!' : 'not anymore!');

        //console.log("value" + value);
        //console.log("err" + err);
        if (value==1 ){
            console.log('there is some one! ');
            LED_red.write(1); 
            console.log('Light is on!');
            actuators.leds[1].value = 1;

            console.log('')
        }else{
            console.log('not anymore! '); 
            LED_red.write(0);
            console.log('Light is off!');
            actuators.leds[1].value = 0; 
            console.log('')
        }

        
        if(sensor_ldr.readSync()==0){
            LED_red.write(0); 
            console.log('There is DayLight, light goes off')
            console.log('')

            sensors.ldr.value = 0;
    
          }else{
            LED_red.write(1); 
            console.log('There is Darkness, light goes on') 
            console.log('')
          } 
          

    });

 
    
    function exit(err) {
        if (err) console.log('An error occurred: ' + err);
        sensor_pir.unexport();
        console.log('Bye, bye!');  
        LED_red.writeSync(0); // Turn LED off  
        LED_red.unexport(); // Unexport GPIO to free resources 
        
        process.exit();
    }
  
    process.on('SIGINT', exit);
  
};
  
