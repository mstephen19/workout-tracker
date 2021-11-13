const router = require('express').Router();
const { Workout } = require('../models');

router.route('/workouts').get((req, res) => {
  Workout.find({})
});

module.exports = router;
