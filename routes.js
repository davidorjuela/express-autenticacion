
const mongoose = require("mongoose");
const User = require("./user");
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  console.log(req.session);
  
  if(req.session.email){
    const users = await User.find();
    res.render("index", { users: users });
  }
  else{
    res.redirect("/login");
  }
});

router.get("/login", async (req, res) => {
  res.sendFile(`${__dirname}/views/ingreso.html`);
});

router.post("/login", async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({email:email})
    .then(function(user) {
        return bcrypt.compare(password, user.password);
    })
    .then(function(samePassword) {
        if(!samePassword) {
            res.status(403).send();
        }
        req.session.email=email;
        res.redirect("/");
    })
    .catch(function(error){
        console.log("Error authenticating user: ");
        console.log(error);
        next();
    });
});


router.get("/logout", (req, res) => {
  console.log("logout");
  req.session=null;
  res.redirect("/login");
});

router.get("/register", async (req, res) => {
  res.sendFile(`${__dirname}/views/registro.html`);
});

router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  try {
    const user = await User.create(data);
  } catch (e) {
    console.error(e);
  }
  res.redirect("/login");
});

module.exports = router;