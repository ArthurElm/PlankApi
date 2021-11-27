//declarations and imports
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const mongoose = require('mongoose');
// require the class constructor from different file
const Plank = require('./plank.js')
const {
  Schema
} = mongoose;

//app plugins or libraries
app.use(bodyParser.urlencoded({
  extended: false
}))



let plank1 = new Plank({
  weight: 10,
  material: "Wood",
  dimensions: [10, 20, 5],
  inStock: true,
  numberID: 1.1
});

let plank2 = new Plank({
  weight: 20,
  material: "Metal",
  dimensions: [10, 20, 5],
  inStock: true,
  numberID: 1.1
});

let planks = [plank1, plank2];

console.log(plank1)

app.get('/', (req, res) => {
  res.send('Arthur El Malawi')
})

app.get('/message', (req, res) => {
  res.send('Hi this is nice message')
})

app.get('/othermessage', (req, res) => {
  res.send('iueagfdbc oeid Hi this is nice message')
})

app.get('/plank', (req, res) => {
  Plank.find((err, result) => {
    if (err) {
      res.send("Error occured no plank retrieved")
      return
    }
    res.send(result)
    console.log(result)
  })
})

app.get('/plank/:id', (req, res) => {
  const id = req.params.id;
  Plank.findById(id, (err, plank) => {
    if (err) {
      res.send("Plank not found")
      return
    }
    res.send(plank)
    console.log(plank)
  })
})

app.post('/plank', (req, res) => {
  console.log("Inserting a plank in the database")

  let inStock = false;
  if (req.body.inStock === 'true') {
    inStock = true;
  }
  let plank = new Plank({
    weight: parseInt(req.body.weight),
    material: req.body.material,
    dimensions: req.body.dimensions,
    inStock,
    numberID: parseFloat(req.body.numberID)
  });


  plank.save(err => {
    if (err) {
      res.send(`Plank not inseted into the database, error is: ${err}`)
      return
    }
    res.send("Plank inserted into the database")
    console.log("Plank is in the database")
  })
})

app.delete('/plank/:id', (req, res) => {
  // You can use findOneAndDelete({_id:})
  // or
  // You can use findByIdAndDelete(id)
  //see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete

  Plank.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.send("Plank did not delete")
      return
    }
    res.send("Plank deleted")
    console.log(`Plank with id ${req.params.id} is now deleted`)
  })
})

app.put('/plank/:id', (req, res) => {
  console.log('Trying to edit plank')
  console.log(parseInt(req.body.weight))

  let inStock = (req.body.inStock === 'true');

  Plank.findByIdAndUpdate(req.params.id, {
    weight: parseInt(req.body.weight),
    material: req.body.material,
    dimensions: req.body.dimensions,
    inStock,
    numberID: parseFloat(req.body.numberID)
  }, err => {
    if (err) {
      res.send("It didn't edit. The error is:" + err)
      return
    }
    res.send("It did edit")
  })
})


app.listen(port, () => {
  mongoose.connect('mongodb+srv://admin:admin@plankapi.akeu3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
  catch(error => console.log(error));
  console.log(`Example app listening at http://localhost:${port}`)
})