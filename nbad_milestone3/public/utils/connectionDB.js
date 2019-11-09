const Connection = require("../models/connection");


//data object for the hardcoded database of each connection detail/
var data = [
    {
        connection_ID: "CCI_1",
        connection_name: "ITSC 2110- Working with Netbeans",
        connection_topic: "Study",
        hosted_by:"Mario",
        details: "I'm new to this Netbeans and wouldlove to connect with others to explore this IDE and learn",
        date: "Thursday, Sept 29 2019",
        location: "Woodward Hall 4th Floor",
        time: "5:30pm - 6:30 pm",
        rsvp:"No"

    },
    {
        connection_ID: "CCI_2",
        connection_name: "ITCS 6156 Machine Learning",
        connection_topic: "Study",
        hosted_by:"Dr John Guttag",
        details: "Lets chat on Classification Techniques",
        date: "Tuesday, Sept 27 2019",
        location: "Woodward Hall 1st Floor",
        time: "5:30pm - 6:30 pm",
        rsvp:"No"

    },


    {
        connection_ID: "CCI_3",
        connection_name: "Let's play tennis",
        connection_topic: "Sports",
         hosted_by:"Katherine",
        details: "Looking for Tennis players for college tournament",
        date: "Monday,11 Sept 2019",
        location: "Macey 3rdFloor",
        time:     "9am - 10 am",
        rsvp:"No"

    },

    {
        connection_ID: "CCI_4",
        connection_name: "Football Anyone",
        connection_topic: "Sports",
        hosted_by:"Gary",
        details: "Football Tournament intercollegiate through North Carolina",
        date: "Wednesday,26 Oct,2019",
        location: "Duke 2nd Floor",
        time:    "9am - 10am",
        rsvp:"No"

    },

    {
        connection_ID: "CCI_5",
        connection_name: "Apache Flume",
        connection_topic: "Study",
        hosted_by:"Chrysler",
        details: "Realtime twitter tag entity classification using Apache Flume and Apache Kafka using Haskell",
        date: "Monday,1st Jan 2020",
        location: "Atkins 1st floor ",
        time: "3am - 7am",
        rsvp:"No"

    },
    {
        connection_ID: "CCI_6",
        connection_name: "Cricket Tournament",
        connection_topic: "Sports",
        hosted_by:"Jenny Sanders",
        details: "Learning Cricket and it's minute technicalities",
        date: "Friday,20 Dec 2019",
        location: "Portal 1st Floor",
        time:"4pm-6pm",
        rsvp:"No"

    },
   
];

// code to get connections object by passing it Connection class and pushing
//them into a list to be displayed into the connections view
module.exports.getConnections = function () {
        var connections = [];

        data.forEach(function(item){
            var connection = new Connection(item["connection_ID"],item["connection_name"],
                item["connection_topic"],item["details"],item["date"],item["location"],
                item["time"],item["hosted_by"],item["rsvp"])
                // console.log(connection);

                connections.push(connection);
        });

    return connections;    
};

//code to get object of given Connection_ID
module.exports.getConnectionID = function (connection_ID) {
      
    for (var i = 0; i < data.length; i++)
      {
        if ((data[i].connection_ID) == connection_ID)
        {
            let connection = new Connection(data[i].connection_ID,
              data[i].connection_name,
              data[i].connection_topic,
              data[i].details,
              data[i].date,
              data[i].location,
              data[i].time,
              data[i].hosted_by)

            return connection;
          }

        }
  };
module.exports.data = data;

