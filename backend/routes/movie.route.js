const express = require('express');
const movieRoute = express.Router();

// Movie model
let Movie = require('../models/Movie');

/*post method
movieRoute.post('/post', (req, res)=> {
  res.send('Post API')
})
//Get all Method
movieRoute.get('/getAll', (req, res) => {
  res.send('Get All API')
})

//Get by ID Method
movieRoute.get('/getOne/:id', (req, res) => {
  res.send('Get by ID API')
})

//Update by ID Method
movieRoute.patch('/update/:id', (req, res) => {
  res.send('Update by ID API')
})

//Delete by ID Method
movieRoute.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API')
})*/

//Add Movie
movieRoute.post('/create', async (req, res) => {
  const data = new Movie({
    name: req.body.name,
    description: req.body.description, 
    status: req.body.status
    /*Movie.create(req.body, (error, data) => {
    res.json(data)*/
  })
  try{
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch(error) {
    res.status(400).json({message: error.message})
  }
})

//Get All Movies
movieRoute.get("/", async (req, res) => {
  try{
    Movie.find((data) => {
      res.json(data)
    });
  }
  catch(err) {
    console.log(err)
  }
})
// Get single movie
movieRoute.route('/read/:id').get((req, res) => {
  Movie.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update movie
movieRoute.route('/update/:id').put((req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})
// Delete movie
movieRoute.route('/delete/:id').delete((req, res, next) => {
  Movie.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = movieRoute;