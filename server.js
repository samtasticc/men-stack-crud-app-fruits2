// ========= IMPORTS ========= //
// Here is where we import modules
require('dotenv').config() // this imports and converts, it has to be the first line of code.

// We begin by loading Express
const express = require("express");
const mongoose = require('mongoose')
const app = express();
const methodOverride = require('method-override')
const morgan = require('morgan')

// ========= MONGOOSE ========= //
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

const Fruit = require('./models/fruit.js')// this imports the Fruit model

// ========= MIDDLEWARE ========= //
app.use(express.urlencoded({extended: false})) // this enables Express to access the data using middleware.
app.use(methodOverride('_method'))
app.use(morgan('dev'))

// ========= ROUTES ========= //
app.get('/', (req, res) => {
    res.render('index.ejs') // this tells the server to display the HTML that is on the index.ejs page
})

app.get('/fruits', async(req, res) => {
    const allFruits = await Fruit.find({})
    console.log(allFruits)
    res.render('fruits/index.ejs', {fruits: allFruits})
})

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs')
})

app.get('/fruits/:fruitId', async(req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId)
    res.render('fruits/show.ejs', {fruit: foundFruit})
})

app.get('/fruits/:fruitId/edit', async(req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId)
    console.log(foundFruit)
    // res.send(`This is the edit route for ${foundFruit.name}`)
    res.render('fruits/edit.ejs', {fruit: foundFruit})
})

app.put('/fruits/:fruitId', async(req, res) => {
    if(req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    }
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)
    res.redirect(`/fruits/${req.params.fruitId}`)
})

app.delete('/fruits/:fruitId', async(req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId) // when we manipulate data (edit, delete, create) we always redirect. with GET, we render. everything else, redirect.
    // res.send('this is the delete route') // we res.send to make sure the route is working.
    res.redirect('/fruits')
})

// POST /fruits --> method/action from our form in new.ejs
app.post('/fruits', async(req, res) => {
    // console.log(req.body)
    if(req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    } // this ternary operator will alter the req.body object to reflect a Boolean in stead of 'on' or nothing
    // console.log(req.body)
    await Fruit.create(req.body)
    res.redirect('/fruits') // will remove later. temporarily, once the user hits submit, this will redirect to the /fruits/new.ejs page
                            // we changed /fruits/new to /fruits so we will be redirected to the index of fruits.
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});