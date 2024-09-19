const mongoose = require('mongoose')

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
})

const Fruit = mongoose.model('Fruit', fruitSchema) // using an uppercase letter at the beginning is how we create the model
module.exports = Fruit // export the module