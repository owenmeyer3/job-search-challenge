var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("indeedDB");
  var query = {};
  dbo.collection("jobsColl").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
