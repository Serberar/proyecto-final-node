const mongoose = require('mongoose');
const Movie = require('../api/models/movies.models');

const TodasMovies = [
    { "title": "The Matrix",
    "director": "Hermanas Wachowski",
    "year": "1999",
    "genre": "Acción"

    },
    {
        "title": "The Matrix Reloaded",
        "director": "Hermanas Wachowski",
        "year": "2003",
        "genre": "Acción"
    
      },
      {
        "title": "Buscando a Nemo",
        "director": "Andrew Stanton",
        "year": "2003",
        "genre": "Animación"
        
      },
      {
        "title": "Buscando a Dory",
        "director": "Andrew Stanton",
        "year": "2016",
        "genre": "Animación"
      
      },
      {
        "title": "Interestelar",
        "director": "Christopher Nolan",
        "year": "2014",
        "genre": "Ciencia ficción"
       
      },
      {
        "title": "50 primeras citas",
        "director": "Peter Segal",
        "year": "2004",
        "genre": "Comedia romántica"
        
      },
    ];

    mongoose.connect("mongodb+srv://stephany16:miguel13@cluster0.wtcjjtp.mongodb.net/movie?retryWrites=true&w=majority", {
        useNewUrlParser: true,
    useUnifiedTopology: true,
    }) 
    .then(async () => {
        const allMovies = await Movie.find();
        if (allMovies.length) {
          await Movie.collection.drop()
          console.log("movies borrdas");

        };
    }).catch((error)=>console.log("error borrando", error))

    .then(async()=>{
        const movieMap= TodasMovies.map((movie)=>new Movie(movie));
        await Movie.insertMany(movieMap);
        console.log(("movies insertdas"));
    }).catch((error)=>console.log("error borrando", error))
    .finally(() => mongoose.disconnect());
