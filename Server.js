const express = require("express");
const bodyparser = require("body-parser");
const joi = require("joi");
const fs = require("fs");
const hbs=require("hbs");
const path=require("path");

var show = require("./showtodo");
var add = require("./addtodo");
var del = require("./deletetodo");
var update = require("./edittodo");
var opt,title,desc;

const pwd=path.join(__dirname,'./');
const viewpath=path.join(__dirname,'./views')

const schema1 = joi.object().keys({
  _id: joi.number(),
  title: joi
    .string()
    .min(3)
    .max(30)
    .alphanum()
    .regex(/^[a-zA-Z0-9]{3,30}$/),
  description: joi
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
});
const serv = express();
serv.set('view engine','hbs');
serv.set('views',viewpath);
serv.use(express.static(pwd));
serv.use(bodyparser());
var server = serv.listen(8000, () => console.log("Server Listening!!!"));

serv.get("", (req, res) => {
  res.render('server');
  console.log("Server Listening!!!");
});


serv.get("/show", (req, resp) => {
  var yoyo;
  show.showdb(function(err, res) {
    yoyo = res;
  },resp);
});

serv.post("/", (req, res) => {
  title = req.body.Title;
  desc = req.body.Description;
  var query = { 'title' : title, 'description' : desc };
  schema1.validate(query, function(err, result) {
    console.log(err);
    if (err === null) add.adder(query, res);
    // else res.send('<script>alert("Please re-check data and resend.")</script>');
    else res.render('server', {
      name: 'Please re-check data and resend.'
    });
  });
});

serv.post("/del", (req, res) => {
  var id=req.body.Id_del;
  var query = {"_id" : id}
  schema1.validate(query, function(err, result) {
    if (err === null) del.deleterec(query, res);
    else res.render('server', {
      name: 'Please re-check data and resend.'
    });
  });
});

serv.post("/edit", (req, res) => {
  var id= req.body.Id_edit;
  title = req.body.Title_edit;
  desc = req.body.Description_edit;
  var query = { "_id" : id,'title' : title, 'description' : desc };
  schema1.validate(query, function(err, result) {
    if (err === null) update.editter(query, res);
    else res.render('server', {
      name: 'Please re-check data and resend.'
    });
  });
});


serv.unlink("/disconn", (req, res) => {
  res.send("Disconnected!!!");
  server.close();
});
