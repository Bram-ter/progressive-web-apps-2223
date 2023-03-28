const fs = require("fs");
const https = require("https");
const express = require('express');
const app = express()
const port = process.env.PORT || 3000

const cert = fs.readFileSync("localhost.pem", "utf-8");
const key = fs.readFileSync("localhost-key.pem", "utf-8");

const ejs = require("ejs");

const routes = require("./routes/routes");

/* Middleware */
app.use(express.static("./public"));

app.use(function(req, res, next) {
    res.locals.request = req;
    next();
});

/* Set template engine */
app.set('view engine', 'ejs');

app.use(routes)

https.createServer({ key, cert }, app).listen(port);