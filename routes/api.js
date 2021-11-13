const router = require('express').Router();
const { Workouts, Exercise } = require('../models');
const { Types } = require('mongoose');
const date = Date.now();

router
  .route('/workouts')
  .post(async (req, res) => {
    try {
      // We do not take in a body. We create a new workout using the date instantiated above
      const created = await Workouts.create({ date });
      res.status(200).json(created);
    } catch (err) {
      res.status(418).json(err);
    }
  })
  .get(async (req, res) => {
    try {
      // Find workout in descending order based on time, limit the query to 1
      const lastWorkout = await Workouts.findOne().sort({ day: -1 }).limit(1);
      res.status(200).json(lastWorkout);
      console.log(lastWorkout);
    } catch (err) {
      res.status(418).json(err);
    }
  });

router.put('/workouts/:id', async (req, res) => {
  try {
    // Create a new exercise
    const { _id } = await Exercise.create(req.body);
    // Add our exercise ID to the specified workout in params
    const pushedTo = await Workouts.findOneAndUpdate(
      { _id: req.params.id },
      // Can't forget mongoose.Types
      { $push: { exercises: Types.ObjectId(_id) } },
      { new: true }
    );
    res.status(200).json(pushedTo);
  } catch (err) {
    res.status(418).json(err);
    // console.log(err);
  }
});

router.get('/workouts/range', async (req, res) => {
  try {
    // Find all workouts and their corresponding exercises
    const workoutsInRange = await Workouts.find({}).populate('exercises');
    res.status(200).json(workoutsInRange);
  } catch (err) {
    res.status(418).json(err);
    console.log(err);
  }
});

module.exports = router;
