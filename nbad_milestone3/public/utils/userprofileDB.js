var userprofile = require('../models/user_profile');
var UserConnection = require('../models/user_connection.js');
var connectionDB = require('./connectionDB.js');

var connections_list = connectionDB.getConnections();

module.exports.getUserProfile = function(userId)
{
  for(let k=0;k<data.length;k++){
          if ((data[k].userID) == userId ){
              return data[k];
          }
        }
  };

  var connection1 = new UserConnection(connections_list[0],connections_list[0].rsvp);
  var connection2 = new UserConnection(connections_list[1],connections_list[1].rsvp);
  var connection3 = new UserConnection(connections_list[2],connections_list[2].rsvp);
  var connection4 = new UserConnection(connections_list[3],connections_list[3].rsvp);
  var connection5 = new UserConnection(connections_list[4],connections_list[4].rsvp);
  var connection6 = new UserConnection(connections_list[5],connections_list[5].rsvp);

 

 
var data = [
    {
        userID: "Neil19",
        connection_list: [connection1,connection3],
    },
    {
        userID: "Riemann1191",
        connection_list: [connection6,connection2,connection4], 
    }

];

