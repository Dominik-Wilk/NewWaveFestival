const express = require('express');
const router = express.Router();
const db = require('../db');
const Joi = require('joi');
const validateInput = require('../validateInput');

const concertSchema = Joi.object({
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  day: Joi.number().required(),
  price: Joi.number().required(),
});

router.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

router.get('/concerts/:id', (req, res) => {
  const concertId = parseInt(req.params.id, 10);
  const concert = db.concerts.find(item => item.id === concertId);

  res.json(concert);
});

router.post('/concerts', validateInput(concertSchema), (req, res) => {
  const { performer, genre, price, day } = req.body;
  const newConcert = {
    id: Math.max(...(db.concerts.map(item => item.id, 0) + 1)),
    performer,
    genre,
    price,
    day,
  };
  db.concerts.push(newConcert);
  res.status(201).json({ message: 'OK' });
});

module.exports = router;
