// Here is where we import modules
require('dotenv').config() // this imports and converts, it has to be the first line of code.
// We begin by loading Express
const express = require("express");
const mongoose = require('mongoose')
const app = express();

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.get('/', (req, res) => {
    res.render('index.ejs') // this tells the server to display the HTML that is on the index.ejs page
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});