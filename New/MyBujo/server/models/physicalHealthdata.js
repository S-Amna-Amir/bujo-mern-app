const mongoose = require('mongoose');

const physicalHealthDataSchema = new mongoose.Schema(
{
  date: { type: Date, default: Date.now },
  sleepHours: Number,
  waterIntake: Number,
  waterGoal: Number,
  workoutMinutes: Number,
  caloriesConsumed: Number,
  calorieGoal: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('physicalHealthData', physicalHealthDataSchema);