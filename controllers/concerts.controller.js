const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not found...' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, tickets } = req.body;
    const newConcert = new ConcertController({
      performer,
      genre,
      price,
      day,
      tickets,
    });
    await newConcert.save();
    res.status(201).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
