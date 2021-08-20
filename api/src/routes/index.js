const { Router } = require('express');

// Importar todos los routers;
const vgameRouter = require('./videogames');
const genreRouter = require('./genre');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames',vgameRouter);
router.use('/genres',genreRouter);


module.exports = router;