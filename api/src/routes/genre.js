const { Router } = require('express');
const axios = require('axios');
const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('Siiiiii entre al /genre vamos tadavia')
});

module.exports = router;