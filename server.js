const express = require('express');

const app = express()

const port = process.env.PORT || 3000

let ejs = require("ejs");

/* Middleware */
app.use(express.static("./public"));

/* Set template engine */
app.set('view engine', 'ejs');

/* Get started as homepage */
app.get('/', (req, res) => {
  res.render('pages/index', {
    pageTitle: "Getting started",
  })
})

app.listen(port, () => console.info(`App listening on port ${port}`));