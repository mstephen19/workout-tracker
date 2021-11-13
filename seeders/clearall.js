let mongoose = require('mongoose');
let db = require('../models');

mongoose.connect('mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
});

db.Workouts.deleteMany({}).then(() => console.log('test'));
