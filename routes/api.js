const router = require('express').Router();
const { Workouts, Exercise } = require('../models');
const { Types } = require('mongoose');
const date = Date.now();

router
  .route('/workouts')
  .post(async (req, res) => {
    try {
      const created = await Workouts.create({ date });
      res.status(200).json(created);
    } catch (err) {
      res.status(418).json(err);
    }
  })
  .get(async (req, res) => {
    try {
      const lastWorkout = await Workouts.findOne().sort({ day: -1 }).limit(1);
      res.status(200).json(lastWorkout);
      console.log(lastWorkout);
    } catch (err) {
      res.status(418).json(err);
    }
  });

router.put('/workouts/:id', async (req, res) => {
  try {
    const { _id } = await Exercise.create(req.body);
    const pushedTo = await Workouts.findOneAndUpdate(
      { _id: req.params.id },
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
    const workoutsInRange = await Workouts.find({}).populate('exercises');
    res.status(200).json(workoutsInRange);
  } catch (err) {
    res.status(418).json(err);
    console.log(err);
  }
});

module.exports = router;
