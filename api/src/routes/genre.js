const { Router } = require('express');
const axios = require('axios');
const {apikey, Genre} = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    try {    
       const vgGenres = await Genre.findAll()
       res.send(vgGenres);
    } catch (error) {
        res.send(`Error in route /genres ${error}`);
    } 
});

module.exports = router;