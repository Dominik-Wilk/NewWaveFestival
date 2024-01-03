const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found...' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const isSeatOccupied = await Seat.exists({ day, seat });

    if (isSeatOccupied) {
      return res
        .status(409)
        .json({ message: 'The slot is already taken for this day...' });
    }

    const newSeat = new Seat({ day, seat, client, email });
    await newSeat.save();

    const seats = await Seat.find();
    req.io.emit('seatsUpdated', seats);

    res.status(201).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
