// AWS configuration
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-2'});
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Data Container
var Set = require('Set');

// Express configuration
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});


app.get('/scan', function (req, res) {
  var params = {
    TableName: 'playus',
    ScanFilter: {
      date: {
        ComparisonOperator: 'GT',
        AttributeValueList: [
          {
            S: '0'
          }
        ]
      }
    },
    Limit : '10',
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
  };

  dynamodb.scan(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
    }
    else {
      console.log(data); // successful response
      res.json(data);
    }
  });
});

// createPlay
app.post('/createPlay', function (req, res) {
  console.log("body: " + JSON.stringify(req.body));

  var currentTime = new Date().getTime().toString();
  var state = "open";
  var userId = req.body.userId;
  var playusIndex = userId+"_"+currentTime;

  var params = {
    Item: {
      "index": {
        "S": playusIndex
      },
      "date": {
        "S": currentTime
      },
      "state": {
        "S": state
      },
      "userId": {
        "S": userId
      },
      "desc": {
        "S": req.body.desc
      },
      "location": {
        "S": req.body.location
      },
      "locationLat": {
        "S": req.body.locationLat
      },
      "locationLng": {
        "S": req.body.locationLng
      },
      "playDate": {
        "S": req.body.playDate
      },
      "playEvent": {
        "S": req.body.playEvent
      },
      "playEventImage": {
        "S": req.body.playEventImage
      },
      "joinList" : {
        "SS": req.body.joinList
      },
      "maxJoin": {
        "N": req.body.maxJoin
      },
      "profile": {
        "S": req.body.profile
      },
    },
    TableName: 'playus'
  };

  dynamodb.putItem(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      res.json(err);
      return;
    }
    else {
      console.log(JSON.stringify(data));
      if (JSON.stringify(data) === "{}")
        res.json('{"result" : "New play created"}');
    }
  });

  // Find #tags and put tags to yesnoTag table
  if (req.body.desc.indexOf('#') !== -1) {
    console.log("desc has tag");

    var words = req.body.desc.split(/\s+/);
    var tagSet = new Set();

    for (var i in words) {
      if (words[i][0] === '#') {
        tagSet.add(words[i]);
      }
    }

    var tags = tagSet.toArray();

    for (var i in tags) {
      console.log(tags[i]);
      var params = {
        Item: {
          "index": {
            "S": playusIndex+'_'+i.toString()
          },
          "playusIndex": {
            "S": playusIndex
          },
          "tag": {
            "S": tags[i]
          },
          "date": {
            "S": new Date().getTime().toString(),
          },
        },
        TableName: 'playusTag'
      };
      dynamodb.putItem(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        }
        else {
          console.log(JSON.stringify(data));
        }
      });
    }
  }
});

app.post('/getPlay', function (req, res) {
  var params = {
    TableName: 'playus',
    IndexName: 'state-playDate-index',
    KeyConditions: { // indexed attributes to query
                     // must include the hash key value of the table or index
      state: {
        ComparisonOperator: 'EQ', // (EQ | NE | IN | LE | LT | GE | GT | BETWEEN |
        AttributeValueList: [
          {
            S: req.body.state,
          }
        ],
      },
      playDate: {
        ComparisonOperator: 'GE',
        AttributeValueList: [
          {
            S: req.body.playDate,
          }
        ],
      },
    },
    ScanIndexForward: true,
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
    Limit : 5,
  };

  dynamodb.query(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
      res.json(err);
    }
    else {
      console.log(data); // successful response
      res.json(data);
    }
  });
});

var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Playwith app listening at http://%s:%s', host, port);
});

