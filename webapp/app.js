const de=require('dotenv').load();
const createError = require('http-errors');
const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

var date = new Date();

const conn=require('./dbconn.js');//DB connection file
const db=new conn();
db.connect((err)=>{
  if(err){
    throw err;
  }
db.query('CREATE DATABASE IF NOT EXISTS '+process.env.DB_NAME, function (err) {// create db if not exist
    if (err) throw err;
  console.log("DB Created!...");
    db.query('USE '+process.env.DB_NAME, function (err) {
      if (err) throw err;
      db.query('create table IF NOT EXISTS users('
        + 'user_id INT NOT NULL AUTO_INCREMENT,'
        + 'username VARCHAR(100) NOT NULL,'
        + 'password VARCHAR(100) NOT NULL,'
        + 'email VARCHAR(100) NOT NULL,'
        + 'about VARCHAR(150),'
        + 'image varchar(255),'
        + 'created_at DATE,'
        + 'updated_at DATE,'
        + 'PRIMARY KEY ( user_id )'
        +  ')', function (err) {
            if (err) throw err;
  console.log("Table Created!...");
let qry="insert into `users` (`username`,`password`,`email`,`created_at`,`updated_at`) SELECT * FROM (SELECT  'ashish','ashish','ashish@gmail.com',now(),now()) AS tmp WHERE NOT EXISTS (SELECT `username` FROM `users` WHERE `username` = 'ashish') LIMIT 1;";
let query=db.query(qry,(err,result)=>{
            if(err)
            {
              console.log('Insert Error:'+err);
            }
            else{
              console.log('Default Record Inserted..:'+result);
            }
});

      });
    });
  });
  console.log("Mysql Connected and Ready!...");
});



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/',(request, response) => {
  response.status(200).json({response: {
      message: "Hit at " + date.toLocaleTimeString(),
      database:process.env.DB_NAME
  }});   
  response.end();
});

app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;








