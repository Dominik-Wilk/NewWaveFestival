const express = require('express');
const app = express();
const cors = require('cors');

const testimonialsRoutes = require('./routes/testimonial.routes');
const concertsRoutes = require('./routes/concert.routes');
const seatsRoutes = require('./routes/seat.routes');

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
