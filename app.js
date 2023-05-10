const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

// Configurar body parser para obtener datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', './views');









mongoose.connect('mongodb://0.0.0.0:27017/lab7', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected!');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

const peliculaSchema = new mongoose.Schema({
    name: String,
    genero: String,
    director: String,
    calificacion: String
  });
  
  const Pelicula = mongoose.model('Pelicula', peliculaSchema);

  app.get('/index', (req, res) => {
    res.render('index.ejs');
  });

  app.post('/peliculas',function (req, res) {
  const nombre = req.body.nombre;
  const genero = req.body.genero;
  const director = req.body.director;
  const calificacion = req.body.calificacion

  const peliculas = new Pelicula({
    name: nombre,
    genero: genero,
    director: director,
    calificacion: calificacion
  });
    
  peliculas.save().then(() => {
    console.log('New Pelicula created!');
  }).catch((error) => {
    console.error('Error creating Pelicula:', error);
  });

  });


  
 
app.post('/index',async (req, res)=> { 
  res.render('index.ejs');
});


app.post('/mostrar',async (req, res)=> {
  try{
    const peliculas = await Pelicula.find();
    res.render('mostrar.ejs' ,{ peliculas });
  }catch (error) {
    console.log(error);
    res.send('Error al obtener las películas');
  }
});


  
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });