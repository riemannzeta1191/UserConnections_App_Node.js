var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var connectionDB = require('../utils/connectionDB');
var user = require('../models/user');
var urlencodedParser= bodyParser.urlencoded({extended:false});

var userProfile = require('../models/user_profile');
var userdata = require('../utils/userDb');
var session = require('express-session');
var userprofileDB  = require('../utils/userprofileDB')
var userconnection = require('../models/user_connection');



router.get('/', function(req,resp){
    if (!(req.session.currentUserProfile === undefined)){

                 var userconnections = req.session.currentUserProfile.connection_list;

            resp.render('index',{data: userconnections ,user :req.session.theUser,session:req.session.login})
     }
    else{
        resp.render('index',{session:0});
    } 

});


router.get('/login', function(req,res) {
    var currentUser = req.session.theUser;

       if(currentUser == undefined){
         req.session.theUser = userdata["userdata"][0];
         req.session.login = 1;
       var userId = req.session.theUser.user_ID;
       var currentUserProfile = userprofileDB.getUserProfile(userId);
       
       req.session.currentUserProfile = currentUserProfile;
       var userconnections = req.session.currentUserProfile.connection_list;
       // req.session.save();
       if (userconnections == undefined){
         res.render('savedconnection',{data:[]});
       }
       else{
        
        res.render('savedconnection',{data: userconnections,user :req.session.theUser});
      }

      }else{
        var userconnections = req.session.currentUserProfile.connection_list;
         
       res.render('savedconnection',{data: userconnections ,user :req.session.theUser,session :req.session.login});
}


   }); 




router.get('/logout',function(req,res){
  req.session.login = 0;
  req.session.destroy();
 
 
  res.render('index',{session:0});

});


// route to display the connections page listing all connections

router.get('/connections', function(req,resp){
    var categories = getCategories();
    
    var connectionData = connectionDB.getConnections();
    
    var data= {
        categories: categories,
        connections: connectionData
    }
         return resp.render('connections', { data:data,session:req.session.login,user :req.session.theUser});

  
});




router.get('/about', function(req,resp){
	resp.render('about',{session:req.session.login,user :req.session.theUser});

});

// route to display the contact page

router.get('/contact', function(req,resp){

	resp.render('contact',{session: req.session.login,user :req.session.theUser});
});

// route to display the each connection detail if the 
// request connection_ID is present else display
// the connections page.

router.get('/connection/:connection_ID', function(req, res) {
    var connection_ID = req.params.connection_ID;
   
   
    var connection = connectionDB.getConnectionID(connection_ID);
   
    if(connection==undefined)
  {
    var categories = getCategories();
    var connectionData = connectionDB.getConnections();
    var data= {
        categories: categories,
        connections: connectionData
    }
    
    res.render('connections', { data: data ,session:req.session.login ,user :req.session.theUser});
  }
  else{
    var data= {
        connection: connection
    }
  
    res.render('connection', { data: data, session:req.session.login,user :req.session.theUser});
  }
});



router.get('/connections/*', function(req, res) {
    var categories = getCategories();
    var connectionData = connectionDB.getConnections();
    var data= {
        categories: categories,
        connections: connectionData
    }
    res.render('connections', { data: data,user :req.session.theUser,session,session:req.session.login });
});






var connections = [];
//code to get categories of each connection
var getCategories = function() {
    var data = connectionDB.getConnections();
    data.forEach(function (connection) {
        if(!connections.includes(connection.connection_topic)){
            connections.push(connection.connection_topic);
        }

    });
    return connections;
};

module.exports = router;