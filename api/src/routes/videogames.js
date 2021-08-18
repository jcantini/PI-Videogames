var express = require('express');
const {apikey, Videogame, Genre} = require('../db');
var router = express.Router();
const axios = require('axios');


//Search all videogames 
router.get('/', async (req, res) => {  
    try {
      //Search Videogames from the Api  
      const result = await axios.get(`https://api.rawg.io/api/games?key=${apikey}&page_size=5`)
      const apivgames = result.data.results.map(p => {
          return {
            name: p.name,
            background_image: p.background_image,
            rating: p.rating,
            description: p.description,
            id: p.id,
            genres: p.genres
          }
      })
      console.log('---------apivgames: ',apivgames)
      //Search Videogames from the Database
      const dbvgames = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: [] 
          }
        }
      })
      //Join and return results
      console.log('---------dbvgames: ',dbvgames)
      const allvgames = apivgames.concat(dbvgames)
      console.log('---------allvgames: ',allvgames)
      return allvgames
    } catch (error) {
      res.send(`Error in route /videogames:id ${error}`);
    }
  });
  
  //Search a videogame by id
  router.get('/:id', async (req, res) => {  
    const {id} = req.params;
    if (!id) {
      return res.status(404).json('Invalid Videogame #id:', id);
    }
    const idint = parseInt(id);
    console.log('Entre a la ruta videogames/id: ',idint);
    try {
      //Serch videogame in the Api  
      const result = await axios.get(`https://api.rawg.io/api/games/${idint}?key=${apikey}`)
      const apigameId = {
           name: result.data.name,
           platforms: result.data.platforms,
           released: result.data.released, 
           background_image: result.data.background_image,
           description: result.data.description,
           rating: result.data.rating,
           id: result.data.id,
           genres: result.data.genres
      }
      if (!apigameId) {
        //Search videogame in the Database  
        const dbgameid  = await Player.findByPk(idint);
        if (!dbgameid) {
          return null;
        } else {
          return dbgameid;
        }
      }
      console.log('Videogame solicitado: ',apigameId )
      return apigameId
    } catch (error) {
      res.send(`Error in Rute /videogames:id ${error}`);
    }
  });

  module.exports = router;