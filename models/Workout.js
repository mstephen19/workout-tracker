const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkoutSchema = new Schema({
  type: {
    type: String,
    trim: true,
    validate: [({ length }) => length > 30, 'Type name too long.'],
  },
  name: {
    type: String,
    trim: true,
    validate: [({ length }) => length > 50, 'Type name too long.'],
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

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
