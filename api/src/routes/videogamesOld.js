var express = require('express');
const {apikey} = require('../db');
var router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {  
  console.log('Entre a la ruta videogames');
  axios.get(`https://api.rawg.io/api/games?key=${apikey}&page_size=10`)
    .then(function (response) {
       const result = response.data.results; 
       const gameobj = result.map(p => {
          return {
            name: p.name,
            background_image: p.background_image,
            rating: p.rating,
            id: p.id,
            genres: p.genres
          }
       });
       console.log('Este es gameobj:  ',gameobj);
 //      console.log('Este es genre[0]:  ',gameobj[0].genres[0].id);
//       console.log('Este es genre[0]:  ',gameobj[0].genres[0].name);
       res.status(200).json(gameobj);
  })
  .catch(function (error) {
       console.log('Error en la ruta /videogames: ', error());
  });
});

// router.get('/:id', (req, res) => {  //con promesas  
//     const {id} = req.params;
//     if (!id) {
//       return res.status(404).json('Invalid Videogame #id:', id);
//     }
//     const idint = parseInt(id);
//     console.log('Entre a la ruta videogames/id: ',idint);
//     axios.get(`https://api.rawg.io/api/games/${idint}?key=${apikey}`)
//     .then(function (response) {
//      const result = response.data
//      const gameobj = {
//            name: result.name,
//            platforms: result.platforms,
//            released: result.released, 
//            background_image: result.background_image,
//            description: result.description,
//            rating: result.rating,
//            id: result.id,
//            genres: result.genres
//       }
//       res.json(gameobj);
//  })
//  .catch(function (error) {
//       console.log('Error en la ruta /videogames: ', error);
//  });
// });

router.get('/:id', async (req, res) => {  
  const {id} = req.params;
  if (!id) {
    return res.status(404).json('Invalid Videogame #id:', id);
  }
  const idint = parseInt(id);
  console.log('Entre a la ruta videogames/id: ',idint);
  try {
    const result = await axios.get(`https://api.rawg.io/api/games/${idint}?key=${apikey}`)
    const gameobj = {
         name: result.data.name,
         platforms: result.data.platforms,
         released: result.data.released, 
         background_image: result.data.background_image,
         description: result.data.description,
         rating: result.data.rating,
         id: result.data.id,
         genres: result.data.genres
    }
    res.json(gameobj);
  } catch (error) {
    res.send(`Error en Ruta /videogames:id ${error}`);
  }
});
module.exports = router;

  // console.log('Entre a la ruta videogames');
  // axios.get(`https://api.rawg.io/api/games?key=${apikey}&dates=2019-09-01,2019-09-30`)
  // .then(function (response) {
  //      const result = response.data.results; 
  //      const gameobj = result.map(p => {
  //         return {
  //           name: p.name,
  //           platforms: p.platforms,
  //           released: p.released, 
  //           background_image: p.background_image,
  //           rating: p.rating,
  //           id: p.id,
  //           genres: p.genres
  //         }
  //      });
  //      console.log('Este es gameobj:  ',gameobj);
  //      console.log('Este es genre[0]:  ',gameobj[0].genres[0].id);
  //      console.log('Este es genre[0]:  ',gameobj[0].genres[0].name);
  //      res.send('Ya tengo los videgames: ', gameobj.le);
  // })
  // .catch(function (error) {
  //      console.log(error.toJSON());
  // });
  