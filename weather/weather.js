const request=require('request');
var getWeather=(latitude,longitude,callback)=>{
request({
  url:`https://api.darksky.net/forecast/47998cdb2a717bca32b95ab12a9496a6/${latitude},${longitude}`,
  json:true
},(error,response,body)=>{
  if(error){
    callback('Unable to connect to forecast.io server');
  }
  else if(response.statusCode===400){
    callback('Unable to fetch the data');
  }else
    if(response.statusCode===200)
  {
  callback(undefined,{
    Temperature:body.currently.temperature,
    apparentTemperature:body.currently.apparentTemperature
  });
 }
});
};
module.exports.getWeather=getWeather;
