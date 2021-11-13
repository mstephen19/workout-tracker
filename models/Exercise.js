const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
  type: {
    type: String,
    trim: true,
    validate: [({ length }) => length < 35, 'Type name too long.'],
  },
  name: {
    type: String,
    trim: true,
    validate: [({ length }) => length < 40, 'Type name too long.'],
  },
  duration: {
    type: Number,
    match: [/^[\d]$/, 'Must be a number.'],
  },
  distance: {
    type: Number,
    match: [/^[\d]$/, 'Must be a number.'],
  },
  weight: {
    type: Number,
    match: [/^[\d]$/, 'Must be a number.'],
  },
  reps: {
    type: Number,
    match: [/^[\d]$/, 'Must be a number.'],
  },
  sets: {
    type: Number,
    match: [/^[\d]$/, 'Must be a number.'],
  },
});

const Exercise = mongoose.model('Workout', ExerciseSchema);

module.exports = Exercise;
