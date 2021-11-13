const router = require('express').Router();
const { Workouts, Exercise } = require('../models');
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
      const lastWorkout = await Workouts.findOne().sort({ data: -1 }).limit(1);
      res.status(200).json(lastWorkout);
    } catch (err) {
      res.status(418).json(err);
    }
  });

router.put('/workouts/:id', async ({ body }, res) => {
  try {
    const { _id } = await Exercise.create(body);
    const pushedTo = await Workouts.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: _id } },
      { new: true }
    );
    res.status(200).json(pushedTo);
  } catch (err) {
    res.status(418).json(err);
  }
});

module.exports = router;
