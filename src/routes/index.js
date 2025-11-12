const express = require('express');
const router = express.Router();
const denuncias = require('./denuncias.routes');

router.use('/denuncias', denuncias);

module.exports = router;
