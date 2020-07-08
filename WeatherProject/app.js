const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  const cityName = req.body.cityName;
  const autKey = "be6c86d20c31d08a52c83148b04cb128";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ req.body.cityName +"&appid="+ autKey +"&units=metric";
  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const weatherDesc = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature in "+ cityName +" is " + temp + " degrees Celcius.</h1>")
      res.write("<p>The weather is currently " + weatherDesc + "</p>");
      res.write("<img src = " + iconUrl + ">");
      res.send();
    })
  });
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
