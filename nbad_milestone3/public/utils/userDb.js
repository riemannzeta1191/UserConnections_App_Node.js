var connectionDB = require('../utils/connectionDB');
var sessions = require('express-session');
var User = require('../models/user');

let userdata = [
	{
        user_ID:"Riemann1191",
        first_name:"Bernhard",
        last_name:"Riemann",
        email:"riemann@gmail.com",
        address:"9393 UT Drive",
        city:"charlotte",
        state:"NC",
        zipcode:28262,
        country:"USA"
       

    },
    {
        user_ID:"Neil19",
        first_name:"Neils",
        last_name:"Bohr",
        email:"bohr@gmail.com",
        address:"9353 UT Drive",
        city:"charlotte",
        state:"NC",
        zipcode:28262,
        country:"USA"
        

    },
]

module.exports.getusers = function(){
    let users = [];
    userdata.forEach(function(item){
       var user = new User(userdata["user_ID"],userdata["first_name"],
                            userdata["last_name"],userdata["email"],userdata["address"],
                            userdata["city"],userdata["state"],userdata["zip"],userdata["country"]);
       users.push(user)
    });
    return users;
};



module.exports.userdata = userdata;