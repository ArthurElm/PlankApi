//requesting mongooose and Schema so the class can be defined
const mongoose = require('mongoose')
const {Schema} = mongoose;
//setting up the Rules for our class using schema 
const plankSchema = new Schema({
    weight: Number,  //Decimal128  //String
    material: String, 
    dimensions: Array,
    inStock: Boolean,
    numberID: Number
  })

//defining the name of the constructor for our class
const Plank = mongoose.model('Plank', plankSchema);
//export the class, also called a model or a document, to use in different files
module.exports = Plank