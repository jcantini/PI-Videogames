var express = require('express');
const {apikey, Videogame, Genre, Op} = require('../db');
var router = express.Router();
const axios = require('axios');

//Search all videogames or find by query name
router.get('/', async (req, res) => {  
    const {name} = req.query;

    //Search Videogames from the Api
    try { 
        if (name) {
           let sname = name.split(' ').join('-').toLowerCase()
           var apiresult = await axios.get(`https://api.rawg.io/api/games?search=${sname}&key=${apikey}&page_size=5`)
        } else {
           var apiresult = await axios.get(`https://api.rawg.io/api/games?key=${apikey}&page_size=2`)
        }
        if (apiresult.data.count > 0) {
           var apivgames = apiresult.data.results.map(p => {
             return {
                name: p.name,
          //    background_image: p.background_image,
                rating: p.rating,
                released: p.released,
          //    description: '',
        //    id: p.id,
                genres: p.genres
              }
           })        
        } else var apivgames = []
      //Search Videogames from local Database
        var dbvgames = []
        if (name) {
         const condition = {where: {name: {[Op.like]: `%${name}%`}}}
         dbvgames = await Videogame.findAll(condition, {
             attributes: ['name', 'rating','reldate'],
             include: {
                model: Genre,
                attributes: ['name'],
                through: {attributes: [] }
             }   
         });    
      } else {
         dbvgames = await Videogame.findAll({
            attributes: ['name', 'rating','reldate'],
            include: {
                 model: Genre,
                 attributes: ['name'],
                 through: {attributes: [] }
              }
            })    
      }    
      //Join and return results
//      console.log('--------Encontre en API: ',apivgames)
//      console.log('--------- Encontre en DB: ',dbvgames.map(p => p.toJSON()));
      const allvgames = apivgames.concat(dbvgames)
      res.json(allvgames.length ? allvgames : 'No videogames found');
    } catch (error) {
      res.send(`Error in route /videogames ${error}`);
    }
  });
  
//Search a videogame by id
  router.get('/:id', async (req, res) => {  
    const {id} = req.params;
 
  //Search in the Api  
    try {
      if (!isNaN(id)){
    //Serch videogame in the Api
         var idkey = parseInt(id)
         const result = await axios.get(`https://api.rawg.io/api/games/${idkey}?key=${apikey}`)
         if (result.data.id) {
            const searchapivg = {
              name: result.data.name,
              platforms: result.data.platforms,
              released: result.data.released, 
              background_image: result.data.background_image,
              description: result.data.description,
              rating: result.data.rating,
              id: result.data.id,
              genres: result.data.genres
            }
            return res.status(200).json(searchapivg)
         }
      }
  //Search videogame in local Database  
      console.log('Busco por id en DB: ', id)
      const searchdbvg  = await Videogame.findByPk(id, {
          include: [{
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }]
      });
      console.log('searchdbvg: ',searchdbvg.toJSON() )
      if (searchdbvg) {return res.status(200).json(searchdbvg)}
      return res.status(404).send('Videogame not found');
    } catch (error) {
      res.send(`Error in Rute /videogames:id ${error}`);
    }
  });

//Add a videogame to the database
  router.post('/', async (req, res) => {  
     let { name, description, reldate, rating, platform, genre} = req.body;
     platform = platform.toString();
     const addVgame = await Videogame.create({
        name,
        description,
        reldate,
        rating, 
        platform
     })

//Find videogame genres from Genres table       
    const vg_genre = await Genre.findAll({
        where:{name : genre}
    })
    
    //Association link Videogame-Genres
    addVgame.addGenre(vg_genre)

     res.send('New video game has been added')
   });

  module.exports = router;
  