
const request = require('postman-request')


const GetWeather = (place_name,coordinate)=>
{
        const url = 'http://api.weatherstack.com/current?access_key=efdb32c615919dd76ad71a53b2955b81&query='+coordinate//37/8267,-122.4233'
        request({uri:url,json:true},(error,response)=>{
        if(error)
         {
                console.log('error is 1:'+error)
         }
        else if(response.body.error)
          {
                console.log('Error :'+response.body.error)
          }
        else
        {
            console.log(place_name +' weather is :')
            console.log(response.body.current.weather_descriptions + '. It is currently feelsLike ' +response.body.current.feelslike )
        }

    })
}


const GetCoordinates = (placeName,callback) =>
{
        const mapUrl ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(placeName)+'.json?limit=1&access_token=pk.eyJ1IjoiZ29sYW5zaGFsb20iLCJhIjoiY2t0ZDB4ajVpMGh2ZDJudGQ2MGloNmthcSJ9.jZZGUZwCK_DcTsgPqhcB8w'
        request({uri:mapUrl,json:true},(error,responseMap)=>{

            if(error)
            {    
                console.log('error :'+ error)
                callback()

            }
            else if(!responseMap || !responseMap.body || !responseMap.body.features || responseMap.body.features.length == 0)
                {
                    console.log('Error : 0 resaults try different location')
                    callback()
                }
                
            else
            {
                console.log(placeName)
   
                callback(responseMap.body.features[0])//.place_name,responseMap.body.features[0].center)
            
            }
        

        })

}

module.exports= {
    GetWeather:GetWeather ,
    GetCoordinates:GetCoordinates 
};