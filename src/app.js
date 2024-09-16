const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()

//define paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handleBars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Golan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about page',
        name: 'Golan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help needed',
         name: 'Golan'
    })
})

app.get('/help/*',(req,res)=>{

    res.render('404Page',{
        title: 'help',
        error: "help article not found",
         name: 'Golan'
    })

    
    //res.send('Help artical not found')
})

app.get('/products',(req,res)=>{

    if(!req.query.search)
       return res.send({

            error:'must enter search'
        })
    //console.log (req.query)
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.adress)
    return res.send({error:'adress must be provided'})
     // console.log(req.query.adress)
     geocode.GetCoordinates(req.query.adress,({place_name,center:coordinate}={}) => {

        if(!place_name)
            return res.send({error:'adress must be provided'})

        console.log(place_name)
        forecast.GetForecast(coordinate , '', (error, data) => {
            if(error)
                return res.send({error})
            
                //console.log(data)

                res.send({
                    forcast:data.forcast,
                    location:place_name,
                    adress:req.query.adress
                })



          })
        })
      

    
})


//need to be last
app.get('*',(req,res)=>{
    res.render('404Page',{
        title: 'Error',
        error: "Page not found",
         name: 'Golan'
    })
})


// app.get('/help',(req,res)=>{

//     res.send([{
//         name: 'golan ',
//         age:27
//     },
//     {name: 'Dorit ',
//     age:45
// }
// ])
// })






app.listen(3000,()=>{

    console.log('server is up at port 3000')
})
