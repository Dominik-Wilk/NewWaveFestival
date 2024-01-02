const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getById);

router.post('/concerts', ConcertController.post);

module.exports = router;
