var express = require('express');
var router = express.Router();
var request = require("sync-request");
var CityModel = require('../models/cities');
var UserModel = require('../models/users');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/weather', async function(req, res, next) {
  
    if(req.session.user == null) {
    res.redirect('/')
  } else {
  var cityList = await CityModel.find();

  res.render('weather', {cityList});
   }
});

router.post('/add-city', async function(req, res, next) {


  var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&lang=fr&units=metric&appid=74909e1d2363af681696c7a1493b88cf`);
  var dataAPI = JSON.parse(data.body);
  console.log(dataAPI)

   var alreadyExist = await CityModel.findOne({
     name: req.body.newcity.toLowerCase()
   });

   if(alreadyExist == null && dataAPI.name){

   var newCity = new CityModel ({
    name: req.body.newcity,
    desc: dataAPI.weather[0].description,
    img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
    temp_min: dataAPI.main.temp_min,
    temp_max: dataAPI.main.remp_max,
    lat: dataAPI.coord.lat,
    lon: dataAPI.coord.lon,
    })

    await newCity.save();
     
  }
   cityList = await CityModel.find();

  /*var alreadyExist = false;

  for(i=0;i<cityList.length;i++) {
    if(req.body.newcity.toLowerCase() == cityList[i].name.toLowerCase()) {
      alreadyExist = true;
    }
   }
   
   if(alreadyExist == false && dataAPI.name){
  cityList.push({
    name: req.body.newcity,
    desc: dataAPI.weather[0].description,
    img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
    temp_min: dataAPI.main.temp_min,
    temp_max: dataAPI.main.remp_max,
  })
  }*/
  
  res.render('weather', {cityList});
});

router.get('/delete-city', async function(req, res, next) {

  await CityModel.deleteOne({ 
    _id: req.query.id
  })

  var cityList = await CityModel.find();

  /*cityList.splice(req.query.position,1);*/
  res.render('weather', {cityList});
});


router.get('/update-cities', async function(req, res, next) {
  var cityList = await CityModel.find();

  for(var i=0;i<cityList.length;i++){
    var data = await request('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&lang=fr&units=metric&appid=74909e1d2363af681696c7a1493b88cf`);
    var dataAPI = JSON.parse(data.body);
 
     await CityModel.updateOne(
      { _id: cityList[i].id
      }, {
        name: cityList[i].name,
        desc: dataAPI.weather[0].description,
        img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
        temp_min: dataAPI.main.temp_min,
        temp_max: dataAPI.main.remp_max,
      })
      }
 
  var cityList = await CityModel.find();
 
  res.render('weather',{cityList});
 
 });




module.exports = router;
