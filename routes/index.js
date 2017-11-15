var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();
var request = require('request');

var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://localhost:27017/traffic';

// we will use this variable later to insert and retrieve a "collection" of data
var collection

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);
     collection = db.collection('traffic');
	//collection.insert(traffic, function (err, result) {
 // if (err) {
  //  console.log(err);
 // } else {
  //  console.log('Inserted documents into the "Traffic" collection. The documents inserted with "_id" are:', result.length, result);
  }
});
/*    c    
    /**
     * TODO: insert data here, once we've successfully connected
     */
 // }
//});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/traffic', function(req, res) {
  console.log("In Trafic");
  collection.find().toArray(function(err, result) {
    if(err) {
      console.log(err);
   }else if (result.length)
   {
      console.log("Query Worked");
      console.log(result);
      res.send(result);
    } else {
      console.log("No Documents found");
    }
});
});

router.post('/traffic', function(req, res) {
   console.log("In Traffic Post");
    console.log(req.body);
    collection.insert(req.body, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted documents into the "pokemon" collection. The documents inserted with "_id" are:', result);
        res.end('{"success" : "Updated Successfully", "status" : 200}');
      }
    });
});

router.delete('/traffic', function(req,res,next)
{
        console.log("In the delete Route");
       collection .remove({}, function(err)
        {
         if (err) return console.error(err)
        res.sendStatus(200);

        });
});


module.exports = router;

var traffic = [
{
Time:"12am",
Location:"Provo",
Description:"Someone ate a burrito"}
];
