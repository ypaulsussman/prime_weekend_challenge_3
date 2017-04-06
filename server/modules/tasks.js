var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'lkcvknak',
  password: 'hYyP0WRFVQJKixxL4D3Nzf3HMskQz9YR',
  host: 'postgres://lkcvknak:hYyP0WRFVQJKixxL4D3Nzf3HMskQz9YR@stampy.db.elephantsql.com:5432/lkcvknak',
  port: 5432,
  max: 2,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
      console.log("error connecting: ");
    } else {
      db.query('SELECT * from "tasks" ORDER BY "complete" ASC;',
      function(queryError, result) { done(); if (queryError) { res.sendStatus(500); } else { res.send(result.rows);
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
    } else {
      db.query('INSERT INTO "tasks" ("name", "complete") VALUES ($1, false);',
      [name],
      function(queryError, result) { done(); if (queryError) { res.sendStatus(500); } else { res.sendStatus(201); }
      });
    }
  });
});//end router.post

router.put('/complete', function(req, res) {
  var taskID = req.body.taskID;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('UPDATE "tasks" SET "complete" = TRUE WHERE "id" = $1;',
      [taskID],
      function(queryError, result) { done(); if (queryError) { res.sendStatus(500); } else { res.sendStatus(201);}
      });
    }
  });
});


router.delete('/delete/:id', function(req, res) {
  var delTask = req.params.id;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('DELETE FROM "tasks" WHERE "id" = $1;', [delTask],
      function(queryError, result) { done(); if (queryError) { res.sendStatus(500); } else { res.sendStatus(201); }
      });
    }
  });
});




module.exports = router;
