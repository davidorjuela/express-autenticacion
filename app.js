var cookieSession = require('cookie-session')
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
require("./user");
const routes = require('./routes');




mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/visitors", { useNewUrlParser: true });

const app = express();

app.use(cookieSession({
  secret: "mi-cadena-secreta"/* una cadena de texto aleatoria */,
  // Cookie Options
  maxAge: 60*1000 //24 * 60 * 60 * 1000 = 24 hours
}));

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(3000, () => console.log("Listening on port 3000 ..."));
