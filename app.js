const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {

    const key = "8251f9ff0aa7f2178763aa551fba0d7a"
    const city = req.body.cityname
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "+&units=metric&appid=" + key
    https.get(url, (response) => {
        response.on('data', (data) => {
            const wheatherData = JSON.parse(data)
            const temp = wheatherData.main.temp
            const place = wheatherData.name

            const description = wheatherData.weather[0].description
            const iconcode = wheatherData.weather[0].icon
            const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            res.write('<p>The weather is currently ' + description + "</p>")
            res.write("<h1>The temperature in " + place + " is " + temp + " degree celcius</h1>")
            res.write("<img src=" + iconurl + ">")
            res.send()
        });

    }).on('error', (e) => {
        console.error(e);
    });
})



app.listen(port, () => {
    console.log(`server is running`)
})