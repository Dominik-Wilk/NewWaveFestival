const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../db');

const validateInput = require('../validateInput');

const testimonialSchema = Joi.object({
  author: Joi.string().required(),
  text: Joi.string().required(),
});

router.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

router.get('/testimonials/:id', (req, res) => {
  const testimonialId = parseInt(req.params.id, 10);
  const testimonial = db.testimonials.find(item => item.id === testimonialId);

  res.json(testimonial);
});

router.post('/testimonials', validateInput(testimonialSchema), (req, res) => {
  const { author, text } = req.body;
  const newTestimonial = {
    id: Math.max(...(db.testimonials.map(item => item.id, 0) + 1)),
    author,
    text,
  };
  db.testimonials.push(newTestimonial);
  res.status(201).json({ message: 'OK' });
});

router.put(
  '/testimonials/:id',
  validateInput(testimonialSchema),
  (req, res) => {
    const testimonialId = parseInt(req.params.id, 10);
    const { author, text } = req.body;
    const index = db.testimonials.findIndex(item => item.id === testimonialId);

    if (index === -1) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    db.testimonials[index] = { ...db.testimonials[index], author, text };
    res.json({ message: 'OK' });
  }
);

router.delete(
  '/testimonials/:id',
  validateInput(testimonialSchema),
  (req, res) => {
    const testimonialId = parseInt(req.params.id, 10);
    const index = db.testimonials.findIndex(item => item.id === testimonialId);

    if (index === -1) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    db.testimonials.splice(index, 1);
    res.json({ message: 'OK' });
  }
);

module.exports = router;
