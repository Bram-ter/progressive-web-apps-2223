const fs = require("fs");
const https = require("https");
const express = require('express');
const app = express()
const port = process.env.PORT || 3000
let options = { maxAge: '2y'}

const cert = fs.readFileSync("localhost.pem", "utf-8");
const key = fs.readFileSync("localhost-key.pem", "utf-8");

const routes = require("./routes/routes");

/* Middleware */
app.use(express.static("./public", options));

app.use(function(req, res, next) {
    // Add the req object to res.locals, so it can be accessed in subsequent middleware functions and routes
    res.locals.request = req;

    // Call the next middleware function in the chain
    next();
});

/* Set template engine */
app.set('view engine', 'ejs');

app.use(routes)

https.createServer({ key, cert }, app).listen(port);