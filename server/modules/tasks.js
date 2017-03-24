var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'chi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
      console.log("db connection error!");
    } else {
      db.query('SELECT * from "tasks" ORDER BY "id" DESC;',
      function(queryError, result) {
        done();
        if (queryError) {
          res.sendStatus(500);
          console.log("querry error!");
        } else {
          console.log(result);
          res.send(result.rows);
        }//end else
      });//end db.query
    }//end else
  });//end pool.connect
});//end router.get

router.post('/add', function(req, res) {
  var name = req.body.name;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
      console.log("db connection error!");
    } else {
      db.query('INSERT INTO "tasks" ("name", "complete") VALUES ($1, false);',
      [name],
      function(queryError, result) { done(); if (queryError) { res.sendStatus(500); } else { res.sendStatus(201); console.log("add worked"); }
      });
    }
  });
});//end router.post




module.exports = router;
