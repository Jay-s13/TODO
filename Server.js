const express = require("express");
const bodyparser = require("body-parser");
const joi = require("joi");
const fs = require("fs");

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
var show = require("./showtodo");
var add = require("./addtodo");
var del = require("./deletetodo");
var update = require("./edittodo");
var opt,title,desc;
serv.use(bodyparser());
var server = serv.listen(8000, () => console.log("Server Listening!!!"));

serv.get("/", (req, res) => {
  res.sendFile("/home/js/Desktop/Codes/Todo-Postman/Frontend/Server.html");
  console.log("Server Listening!!!");
});
// serv.post("/", (req, res) => {
// 	title = req.body.Title;
// 	desc = req.body.Description;
//   });

serv.get("/show", (req, res) => {
  var yoyo;
  show.showdb(function(err, res) {
    yoyo = res;
  });
  res.send(yoyo);
});

serv.post("/", (req, res) => {
  //console.log(req.body);
  title = req.body.Title;
  desc = req.body.Description;
  var query = { 'title' : title, 'description' : desc };
  schema1.validate(query, function(err, result) {
	//if (err === null) add.adder(req.body, res);
    console.log(err);
    if (err === null) add.adder(query, res);
    else res.send("Please re-check data and resend.");
  });
});

serv.post("/del", (req, res) => {
  var id=req.body.Id_del;
  var query = {"_id" : id}
  schema1.validate(query, function(err, result) {
    if (err === null) del.deleterec(query, res);
    else res.send("Please re-check data and resend.");
  });
  //res.send(req.body+"Deleted!!!");
});

serv.post("/edit", (req, res) => {
  var id= req.body.Id_edit;
  title = req.body.Title_edit;
  desc = req.body.Description_edit;
  var query = { "_id" : id,'title' : title, 'description' : desc };
  schema1.validate(query, function(err, result) {
    if (err === null) update.editter(query, res);
    else res.send("Please re-check data and resend.");
  });
  //res.send(req.body+"Record Updated!!!")
});

serv.unlink("/disconn", (req, res) => {
  res.send("Disconnected!!!");
  server.close();
});
