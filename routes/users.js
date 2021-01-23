var express = require('express');
var router = express.Router();
var request = require("sync-request");
var UserModel = require('../models/users');

router.post('/sign-up', async function(req, res, next){
    var searchUser = await UserModel.findOne({
        email: req.body.emailFromFront
    })
 
    if(!searchUser){
    var newUser = new UserModel({
        username: req.body.usernameFromFront,
        email:req.body.emailFromFront,
        password:req.body.passwordFromFront,
      });
      
      var newUserSave = await newUser.save();

        req.session.user = {
           name: newUserSave.username,
           id: newUserSave._id
        }
          
    
      res.redirect('/weather');
       } else {
       res.redirect('/');
       }

     });

router.post('/sign-in', async function(req, res, next){

    //var searchUser = await CityModel.find();

     var searchUser = await UserModel.findOne(
      {email:req.body.emailFromFront,
       password:req.body.passwordFromFront
        })
    
    
    if(searchUser!=null) {
        req.session.user = {
            name: searchUser.username,
            id: searchUser._id
        }
        res.redirect('/weather');
       } else {
       res.render('login');
       }  
       
       });


 router.get('/log-out', function(req, res, next){

    req.session.user = null;
     
    res.redirect('/');
 })

module.exports = router;