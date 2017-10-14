const express=require('express');
 const hbs=require('hbs');
var app =express();
// app.get('/',(req,res)=>{
// res.send('helloo');
// });
// app.set('view engine','hbs');
// app.use(express.static(__dirname + '/public'));
// app.get('/',(req,res)=>{
// res.send({
//   name:'andrew',
//   like:[
//     'biking',
//     'lkdsl'
//   ]
// });
// });
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  app.get('/about',(req,res)=>{
    res.render('about.hbs',{
      pagetitle:temperature,
      ap:apparentTemperature
    });
  });
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});


app.listen(3000,()=>{
  console.log('server is up');
});
