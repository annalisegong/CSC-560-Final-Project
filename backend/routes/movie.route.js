const express = require('express');
const app = express();
const movieRoute = express.Router();

// Movie model
let Movie = require('../models/Movie');

//Add Movie
movieRoute.post('/create', async (req, res) => {
  const data = new Movie({
    name: req.body.name,
    description: req.body.description, 
    status: req.body.status
  })
  try{
    const dataToSave = await data.save();
    console.log('Data added successfully')
    res.status(200).json(dataToSave)
  }
  catch(error) {
    res.status(400).json({message: error.message})
  }
})

//Get All Movies
movieRoute.get('/', async (req, res) => {
  try{
    const data = await Movie.find();
    res.json(data)
  }
  catch(error) {
    res.status(500).json({message: error.message})
  }
})
// Get single movie
movieRoute.get('/read/:id', async (req, res) => {
  try{
    const data = await Movie.findById(req.params.id);
    res.json(data)
  }
  catch(error) {
    res.status(500).json({message: error.message})
  }
})

// Update movie
movieRoute.put('/update/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const updatedData = req.body;
    const options = {new: true};

    const result = await Movie.findByIdAndUpdate(
      id, updatedData, options
    )
    console.log('Data updated successfully')
    res.send(result)
  }
  catch(error) {
    res.status(400).json({message: error.message})
  }
})

// Delete movie
movieRoute.delete('/delete/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Movie.findByIdAndRemove(id)
    res.status(200);
    res.send(`Data with ${data.name} has been deleted..`)
  }
  catch(error) {
    res.status(400).json({message: error.message})
  }
})
module.exports = movieRoute;