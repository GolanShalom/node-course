const request = require('postman-request')

const GetForecast = (coordinate,longitude,callback)=>
{
        const uri = 'http://api.weatherstack.com/current?access_key=efdb32c615919dd76ad71a53b2955b81&query='+longitude+','+coordinate//37/8267,-122.4233'
        request({uri,json:true},(error,response)=>{
        if(error)
         {
            callback('unable to connect service',undefined)        
        }
        else if(response.body.error)
          {
            callback('unable find location',undefined)
          }
        else
        {
            //callback(undefined,response.body.current.weather_descriptions + '. It is currently feelsLike ' +response.body.current.feelslike )
             callback(undefined,{
                 placename : response.body.location,
                 temperature : response.body.current.temperature,
                 Rainchance :  response.body.current.weather_icons,
                 forcast:response.body.current.weather_descriptions + '. It is currently feelsLike '  +
                 response.body.current.feelslike +' temperature ' + response.body.current.temperature  +
                 ' Rainchance ' + response.body.current.weather_icons
            })
            
        }

    })
}

module.exports = {
    GetForecast:GetForecast
}