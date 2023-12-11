const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../db');
const validateInput = require('../validateInput');

const seatSchema = Joi.object({
  client: Joi.string().required(),
  email: Joi.string().required(),
  day: Joi.number().required(),
  seat: Joi.number().required(),
});

router.get('/seats', (req, res) => {
  const { client } = req.body;

  res.json(db.seats);
});

router.get('/seats/:id', (req, res) => {
  const { client } = req.body;
  const seatId = parseInt(req.params.id, 10);
  const seat = db.seats.find(item => item.id === seatId);

  res.json(seat);
});

router.post('/seats', validateInput(seatSchema), (req, res) => {
  const { day, seat, client, email } = req.body;
  const newSeat = {
    id: Math.max(...(db.seats.map(item => item.id, 0) + 1)),
    day,
    seat,
    client,
    email,
  };
  db.seats.push(newSeat);
  res.status(201).json({ message: 'OK' });
});

module.exports = router;
