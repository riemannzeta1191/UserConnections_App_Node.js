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


router.get('/newConnection', function(req,res) {
    var currentUser = req.session.theUser;
    

       if(currentUser == undefined){
      
         req.session.theUser = userdata["userdata"][0];
        
         req.session.login = 1;
       var userId = req.session.theUser.user_ID;
       var currentUserProfile = userprofileDB.getUserProfile(userId);
       
       req.session.currentUserProfile = currentUserProfile;
       var userconnections = req.session.currentUserProfile.connection_list;
    
       if (userconnections == undefined){
       
         res.render('savedconnection',{data:[]});
       }
       else{
      
        res.render('savedconnection',{data: userconnections,user :req.session.theUser});
      }

      }else{
       
        var userconnections = req.session.currentUserProfile.connection_list;
         
       res.render('newConnection',{data: userconnections ,user :req.session.theUser,session :req.session.login});
}


   }); 

router.get("/savedconnection",function(req,res){
     var userconnections = req.session.currentUserProfile.connection_list;

    res.render('savedconnection',{data: userconnections,user :req.session.theUser})
})


router.post('/connection/changes',urlencodedParser, function(req,res,next){

  var action = req.body.action;


   if(action=='delete'){
           
           var id = req.body.connectioncode;
           for(var i=0;i<req.session.currentUserProfile.connection_list.length;i++){
             if(req.session.currentUserProfile.connection_list[i].connection._connection_ID == id){
                req.session.currentUserProfile.connection_list.splice(i,1);
                break;
              }
           }
           var userconnections = req.session.currentUserProfile.connection_list;

           res.render('savedconnection',{data : userconnections,user :req.session.theUser});

   }else if(action=='Updateprofile'){
              var id = req.body.connectioncode;
              var li =[];
             
              var connection = connectionDB.getConnectionID(id);
             
              var isaddeditem = false;
              for(var i=0;i<req.session.currentUserProfile.connection_list.length;i++){
                if(req.session.currentUserProfile.connection_list[i].connection._connection_ID == id){
                      isaddeditem = true;
                     
                       li.push(i)
                      break;
                    
                     }
                      
                  }
                return res.render('connection',{data: req.session.currentUserProfile.connection_list[li[0]],session:req.session.login,user :req.session.theUser});  
              }
      
   else if(action=="UpdatersvpYes"){
   	        
              if(!(req.session.currentUserProfile === undefined)){
              var id = req.body.connectioncode;
               var sess_list = req.session.currentUserProfile.connection_list;
              itemadded = false;
              var counter = 0;
              connection = connectionDB.getConnectionID(id);
              if (connection.rsvp == undefined){
              connection.rsvp = "No";
          }

              for( var i=0;i<req.session.currentUserProfile.connection_list.length;i++){
                          
                 if(req.session.currentUserProfile.connection_list[i].connection._connection_ID == id){
                           
                   if(!(req.session.currentUserProfile.connection_list[i].connection._rsvp == "Yes")){
                  
                        req.session.currentUserProfile.connection_list[i].connection._rsvp="Yes";
                      
                        isaddeditem = true;
                      }
                   break;
                 } 
                 
                 else {
                  
                    counter += 1;
                    if (counter == sess_list.length){
                     
                     connection.rsvp = "Yes";
                    sess_list.push(new userconnection(connection,connection.rsvp));
                    break;

                    }
                  continue;
                 } 

              }
                
              if (sess_list.length == 0){
              
                connection.rsvp = "Yes";
                sess_list.push(new userconnection(connection,connection.rsvp));
             } 
          
              res.render('savedconnection',{data:req.session.currentUserProfile.connection_list,session:req.session.login,user :req.session.theUser});
       }
       else{
        req.session.theUser = userdata["userdata"][0];
         req.session.login = 1;

       var userId = req.session.theUser.user_ID;
       var currentUserProfile = userprofileDB.getUserProfile(userId);
       req.session.currentUserProfile = currentUserProfile;
       var userconnections = req.session.currentUserProfile.connection_list;
        var id = req.body.connectioncode;
       var sess_list = req.session.currentUserProfile.connection_list;
       res.render('savedconnection',{data: userconnections ,user :req.session.theUser,session :req.session.login});


       }
   }

   else if(action=="UpdatersvpNo"){
   	           var id = req.body.connectioncode;
   	           if(!(req.session.currentUserProfile === undefined)){
             
              for( var i=0;i<req.session.currentUserProfile.connection_list.length;i++){
                 if(req.session.currentUserProfile.connection_list[i].connection._connection_ID == id){
                                           

                   if(!(req.session.currentUserProfile.connection_list[i].connection._rsvp == undefined)){
                    
                        req.session.currentUserProfile.connection_list[i].connection._rsvp="No";
                      }
                   break;
                 }
              }

              res.render('savedconnection',{data:req.session.currentUserProfile.connection_list, user:req.session.theUser ,session:req.session.login});
           }
           else{
           		res.redirect("/connection/" + id);   
           }

   }

   else if(action=="UpdatersvpMaybe"){
              var id = req.body.connectioncode;
               if(!(req.session.currentUserProfile === undefined)){
              for( var i=0;i<req.session.currentUserProfile.connection_list.length;i++){
                 if(req.session.currentUserProfile.connection_list[i].connection._connection_ID == id){
                                         

                   if(!(req.session.currentUserProfile.connection_list[i].connection._rsvp == undefined)){
                  
                        req.session.currentUserProfile.connection_list[i].connection._rsvp="May Be";
                      }
                   break;
                 }
              }

              res.render('savedconnection',{data:req.session.currentUserProfile.connection_list,user :req.session.theUser,session :req.session.login});
   }
   else{
   	       res.redirect("/connection/" + id);   
   }
}        

});

module.exports = router;