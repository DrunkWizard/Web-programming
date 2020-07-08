const https = require('https');
const express = require('express');
const app = express();
var allVacancies;
var allId = [];

var options = {
    // host: 'api.hh.ru',
    // path: '/vacancies',
    // method: 'GET',
    headers: { 'HH-User-Agent': "SUCK" }
};

app.get("/", function(req, res){
  const url = "https://api.hh.ru/vacancies?area=1261&text=Системный+администратор&per_page=100";
  https.get(url, options, function(response){
    var data;
    // console.log(response);
    // console.log(response.statusCode);
    response.on('data', function(chunk){
      // var hui = JSON.parse(data);
      // var id = hui.items[0].id
      data += chunk;
    })
    response.on('end', function(){
      const hhData = JSON.parse(data.substr(9));
      allVacancies = hhData.found;
      for (var i = 0; i < allVacancies; i++){
        allId.push(hhData.items[i].id)
        console.log(allId[i]);
      }
    })
    console.log(allVacancies);
  })
})

app.listen(3000, function(){
  console.log("Server running");
})
