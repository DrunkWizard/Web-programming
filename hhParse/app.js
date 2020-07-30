const https = require('https');
const express = require('express');
const app = express();
const fs = require("fs");

let allVacanciesNumber;
let allId = [];
let adNames = [];
let companyNames = [];
let allDescriptions = [];
let keySkills = [];

let options = {
    // host: 'api.hh.ru',
    // path: '/vacancies',
    // method: 'GET',
    headers: { 'HH-User-Agent': "SUCK" }
};

app.get("/", function(req, res){
  const url = "https://api.hh.ru/vacancies?area=1261&text=Системный+администратор&per_page=100";
  https.get(url, options, function(response){
    let data;
    // console.log(response);
    // console.log(response.statusCode);
    response.on('data', function(chunk){
      // var hui = JSON.parse(data);
      // var id = hui.items[0].id
      data += chunk;
    })
    response.on('end', function(){
      const hhData = JSON.parse(data.substr(9));
      allVacanciesNumber = hhData.found;
      for (let i = 0; i < allVacanciesNumber; i++){
        allId.push(hhData.items[i].id)
        adNames.push(hhData.items[i].name)
        companyNames.push(hhData.items[i].employer.name)
        console.log(allId[i]);
        console.log(adNames[i]);
        console.log(companyNames[i]);
        fs.appendFileSync("adNames.txt", adNames[i] + "\n")
        fs.appendFileSync("companyNames.txt", companyNames[i] + "\n")
        fs.appendFileSync("allId.txt", allId[i] + "\n")
      }
    })
  })
  let vacanciesUrl = "https://api.hh.ru/vacancies/"
  for(let i = 0; i < allVacanciesNumber - 1; i++){
    https.get(vacanciesUrl + allId[i], options, function(response){
      let data;
      response.on('data', function(chunk){
        data += chunk;
      })
      response.on('end', function(){
        const hhData = JSON.parse(data.substr(9));
        allDescriptions[i] = hhData.description;
        for (let j = 0; j < 100; j++){
          if(hhData.key_skills[j] == undefined){
            break;
          }
          if(hhData.key_skills[j].name == undefined){
            break;
          }
          // keySkills[i] = hhData.key_skills[j].name;
          fs.appendFileSync("keySkills.txt", hhData.key_skills[j].name + " ")
          if(hhData.key_skills[j+1] == undefined){
            break;
          }
        }
        fs.appendFileSync("keySkills.txt", "\n")
        // let descText = allDescriptions[i].replace(/(<([^>]+)>)/g,"");
        fs.appendFileSync("allDescriptions.txt", allDescriptions[i] + "\n")
        // fs.appendFileSync("keySkills.txt", keySkills[i] + "\n")
        console.log(allDescriptions[i]);
        // console.log(hhData);
      })
    })
  }
  // let descText = allDescriptions.replace(/(<([^>]+)>)/ig,"");
})

app.listen(3000, function(){
  console.log("Server running");
})
