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
      if (JSON.stringify(data) === "{}") {
        var playusJoinIndex = playusIndex + '_' + userId + '_' + currentTime;
        var playusJoinParams = {
          Item: {
            "index": {
              "S": playusJoinIndex
            },
            "date": {
              "S": currentTime
            },
            "playusIndex": {
              "S": playusIndex
            },
            "userId": {
              "S": userId
            },
          },
          TableName: 'playusJoin'
        };

        dynamodb.putItem(playusJoinParams, function (err, data) {
          if (err) {
            console.log(err, err.stack);
            res.json(err);
            return;
          }
          else {
            console.log(JSON.stringify(data));
            if (JSON.stringify(data) === "{}") {
              res.json('{"result" : "New play created"}');
            }
          }
        });
      }
    }
  });

  // Find #tags and put tags to yesnoTag table
  if (req.body.desc.indexOf('#') !== -1 || req.body.playEvent ) {
    console.log("desc has tag");

    var words = req.body.desc.split(/\s+/);
    var tagSet = new Set();

    for (var i in words) {
      if (words[i][0] === '#') {
        tagSet.add(words[i]);
      }
    }
    tagSet.add('#'+req.body.playEvent);

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
        ComparisonOperator: 'GT',
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

app.post('/getPlayByEvent', function (req, res) {
  var params = {
    TableName: 'playus',
    IndexName: 'playEvent-playDate-index',
    KeyConditions: { // indexed attributes to query
                     // must include the hash key value of the table or index
      playEvent: {
        ComparisonOperator: 'EQ', // (EQ | NE | IN | LE | LT | GE | GT | BETWEEN |
        AttributeValueList: [
          {
            S: req.body.playEvent,
          }
        ],
      },
      playDate: {
        ComparisonOperator: 'GT',
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

app.post('/getMyPlay', function (req, res) {
  var params = {
    TableName: 'playus',
    IndexName: 'userId-date-index',
    KeyConditions: { // indexed attributes to query
                     // must include the hash key value of the table or index
      userId: {
        ComparisonOperator: 'EQ', // (EQ | NE | IN | LE | LT | GE | GT | BETWEEN |
        AttributeValueList: [
          {
            S: req.body.userId,
          }
        ],
      },
      date: {
        ComparisonOperator: 'LT',
        AttributeValueList: [
          {
            S: req.body.date,
          }
        ],
      },
    },
    ScanIndexForward: false,
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

app.post('/getMyJoinPlay', function (req, res) {
  console.log("body: " + JSON.stringify(req.body));

  var params = {
    TableName: 'playusJoin',
    IndexName: 'userId-date-index',
    KeyConditions: { // indexed attributes to query
                     // must include the hash key value of the table or index
      userId: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [
          {
            S: req.body.userId,
          }
        ],
      },
      date: {
        ComparisonOperator: 'LT',
        AttributeValueList: [
          {
            S: req.body.date,
          }
        ],
      },
    },
    ScanIndexForward: false,  // false : reverse order by sort key value
                              // true : order by sort key value
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
    Limit : 5,
  };

  dynamodb.query(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
      res.json(err);
    } else {
      console.log(data); // successful response

      if (data.Items.length < 1) {
        console.log('{result : "data.Items is empty"}');
        res.json(data);
        return;
      }

      var joinPlay = { "Items": [], "Count": 0, "ScanCount": 0 };
      for (var it = 0; it < data.Items.length; it++) {
        var params = {
          Key: {
            "index": {
              "S": data.Items[it].playusIndex.S
            }
          },
          TableName: 'playus',
          ConsistentRead: true
        };

        dynamodb.getItem(params, function(err, playData) {
          if (err) {
            console.log(err); // an error occurred
          } else {
            var order;
            for (order = 0; order < data.Items.length; order++) {
              if (data.Items[order].playusIndex.S ===
                  playData.Item.index.S) {
                break;
              }
            }
            joinPlay.Items[order] = playData.Item;
            joinPlay.Count++;
          }
          joinPlay.ScanCount++;

          if (data.Items.length === joinPlay.ScanCount) {
            console.log("response joinPlay");
            console.log(joinPlay);
            res.json(joinPlay);
          }
        });
      }
    }
  });
})

app.post('/getPlayByTag', function (req, res) {
  console.log("body: " + JSON.stringify(req.body));

  var params = {
    TableName: 'playusTag',
    IndexName: 'tag-date-index',
    KeyConditions: { // indexed attributes to query
                     // must include the hash key value of the table or index
      tag: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [
          {
            S: req.body.tag,
          }
        ],
      },
      date: {
        ComparisonOperator: 'LT',
        AttributeValueList: [
          {
            S: req.body.date,
          }
        ],
      },
    },
    ScanIndexForward: false,  // false : reverse order by sort key value
                              // true : order by sort key value
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
    Limit : 5,
  };

  dynamodb.query(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
      res.json(err);
    } else {
      console.log(data); // successful response

      if (data.Items.length < 1) {
        console.log('{result : "data.Items is empty"}');
        res.json(data);
        return;
      }

      var searchPlay = { "Items": [], "Count": 0, "ScanCount": 0 };
      for (var it = 0; it < data.Items.length; it++) {
        var params = {
          Key: {
            "index": {
              "S": data.Items[it].playusIndex.S
            }
          },
          TableName: 'playus',
          ConsistentRead: true
        };

        dynamodb.getItem(params, function(err, playData) {
          if (err) {
            console.log(err); // an error occurred
          } else {
            var order;
            for (order = 0; order < data.Items.length; order++) {
              if (data.Items[order].playusIndex.S ===
                  playData.Item.index.S) {
                break;
              }
            }
            searchPlay.Items[order] = playData.Item;
            searchPlay.Count++;
          }
          searchPlay.ScanCount++;

          if (data.Items.length === searchPlay.ScanCount) {
            console.log("response searchPlay");
            console.log(searchPlay);
            res.json(searchPlay);
          }
        });
      }
    }
  });
})

app.post('/getPlayByLocation', function (req, res) {
  var now =  new Date().getTime();
  var params = {
    TableName: 'playus',
    IndexName: 'state-locationLng-index',
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
      locationLng: {
        ComparisonOperator: 'BETWEEN',
        AttributeValueList: [
          {
            S: req.body.locationLng1,
          },
          {
            S: req.body.locationLng2,
          }
        ],
      },
    },
    QueryFilter: {
      locationLat: {
        ComparisonOperator: 'BETWEEN',
        AttributeValueList: [
          {
            S: req.body.locationLat1,
          },
          {
            S: req.body.locationLat2,
          }
        ]
      },
      playDate: {
        ComparisonOperator: 'GT', // (EQ | NE | IN | LE | LT | GE | GT | BETWEEN |
        AttributeValueList: [
          {
            S: now.toString(),
          }
        ],
      },
    },
    ScanIndexForward: true,
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
    Limit : 100,
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

app.post('/joinPlay', function (req, res) {
  var playusIndex = req.body.playusIndex;
  var userId = req.body.userId;
  var joinMember = req.body.joinMember;

  var params = {
    Key: {
      "index": {
        "S": playusIndex
      }
    },
    TableName: 'playus',
    ConsistentRead: true
  };

  dynamodb.getItem(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
      res.json(err);
    }
    else {
      console.log(data); // successful response

      var joinList = data.Item.joinList.SS;

      if (parseInt(data.Item.maxJoin.N) <= joinList.length){
        res.json('{"result" : "Error, Join list was full"}');
        return;
      }

      for(var i = 0; i < joinList.length; i++) {
        if (joinList[i].split('__')[0] === userId) {
          res.json('{"result" : "Error, Already join"}');
          return;
        }
      }

      joinList.push(joinMember);
      playInfoData = data;

      var currentTime = new Date().getTime().toString();
      var playusJoinIndex = playusIndex + '_' + userId + '_' + currentTime;
      var playusJoinParams = {
        Item: {
          "index": {
            "S": playusJoinIndex
          },
          "date": {
            "S": currentTime
          },
          "playusIndex": {
            "S": playusIndex
          },
          "userId": {
            "S": userId
          },
        },
        TableName: 'playusJoin'
      };

      dynamodb.putItem(playusJoinParams, function (err, data) {
        if (err) {
          console.log(err, err.stack);
          res.json(err);
          return;
        }
        else {
          console.log(JSON.stringify(data));
          if (JSON.stringify(data) === "{}") {
            var joinListEditParams = {
              Key: {
                "index": {
                  "S": playusIndex
                }
              },
              TableName: 'playus',
              AttributeUpdates: {
                "joinList": {
                  Action: 'PUT',
                  Value: {
                    "SS": joinList
                  }
                },
              }
           };

           dynamodb.updateItem(joinListEditParams, function (err, data) {
             if (err)
               console.log(err, err.stack);
             else
               console.log(data);
           });
          }
          res.json(playInfoData);
        }
      });
    }
  });
});

var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Playwith app listening at http://%s:%s', host, port);
});

