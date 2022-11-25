const express = require('express');

const app = express();

app.set('view engine','ejs');

app.use(express.static('node_modules/bootstrap/dist/css'))
app.use(express.static('node_modules/bootstrap/dist/js'))

app.use(express.static('public/img')) 

app.get('/',(req,res) => {
    res.render('index',{title:'Group 11'});
})

const actuatorRouter = require('./routes/actuators') 
app.use('/pi',actuatorRouter)

const sensorRouter = require('./routes/sensors') 
app.use('/pi',sensorRouter)


app.listen(3000);

app.use((req,res)=>{  
    res.status(404).render('404',{title: 'Error 404'});
})

//var ledsPlugin = require('./plugin/ledplugin');

//ledsPlugin.start({'simulate': true, 'frequency': 10000});

//var pirPlugin = require('./plugin/pirplugin');

//pirPlugin.start({'simulate': true, 'frequency': 10000});

//var ldrPlugin = require('./plugin/ldrplugin');

//ldrPlugin.start({'simulate': true, 'frequency': 10000});

//var smartLightSubsystem = require('./plugin/smartLight');

//smartLightSubsystem.start({'simulate': true, 'frequency': 10000});


//var smartTempSubsystem = require('./plugin/smartTemp');

//smartTempSubsystem.start({'simulate': true, 'frequency': 10000});

var smartGarden = require('./plugin/smartgarden');

smartGarden.start({'simulate': true, 'frequency': 5000});
