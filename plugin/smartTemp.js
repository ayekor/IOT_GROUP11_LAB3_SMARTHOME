const { sensors } = require("../resources/model");
const fs = require('fs');

var localParams = { 'simulate': false, 'frequency': 2000 };

exports.start = function (params) {
    localParams = params;
    connectHardware();
};


function connectHardware() {

    var Temp_humid = setInterval(getTempHum, 10000);

    function getTempHum() {
        var sensor = require("node-dht-sensor");

        sensor.read(11, 5, function (err, temperature, humidity) {
            if (!err) {


                sensors.dht.humidity = humidity;
                sensors.dht.temperature = temperature;





                const current = new Date();
                var currentDate = current.toJSON().slice(0, 10).replace(/-/g, '/');
                var time = current.toLocaleTimeString("en-US");

                var date_time = currentDate + " - " + time;

                fs.appendFile('data/humidity_data.txt', date_time + " :  " + humidity + "% \n", () => {
                    console.log("Humidity value recorded", humidity);
                })

                console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);


                var humidity_data
                //reading files

                fs.readFile('data/humidity_data.txt', (err, data) => {
                    if (err) {
                        console.log(err);
                    }

                    humidity_data = data.toString();

                    //console.log(humidity_data)

                    sensors.dht.humidity_data = humidity_data;
                })



            } else {
                console.log("something went wrong", err)
            }
        });
    }


    function exit() {
        clearInterval(Temp_humid);  
        process.exit();
      }
    
      process.on('SIGINT', exit);

}
