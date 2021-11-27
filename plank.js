// class Plank{
//     constructor(weight, material, dimensions, inStock, numberID){
//         this._weight = weight;
//         this._material = material;
//         this._dimensions = dimensions;
//         this._inStock = inStock;
//         this._numberID = numberID;
//     }

//     get weight() {
//         return this._weight;
//     }
    
//     get material(){
//         return this._material;
//     }

//     get dimensions(){
//         return this._dimensions;
//     }

//     get inStock(){
//         return this._inStock;
//     }

//     get numberID(){
//         return this._numberID;
//     }

//     setAge(w){
//         this._weight = w;
//     }

//     setBreed(m){
//         this._material = m;
//     }

//     setName(d){
//         this._dimensions = d;
//     }

//     setName(i){
//         this._inStock = i;
//     }

//     setName(n){
//         this._numberID = n;
//     }

//     chop(){
//         console.log( this._material + ' Chop Chop Chop');
//     }
// }


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