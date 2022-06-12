const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

// @desc      Get Goals
// @route     GET /api/goals
// @access    Private

const getGoals = asyncHandler(async (req, resp) => {
  const goals = await Goal.find();
  resp.status(200).json(goals);
});

// @desc      Create Goal
// @route     POST /api/goals
// @access    Private

const createGoal = asyncHandler(async(req, resp, next) => {
  if (!req.body.text) {
    resp.status(400);
    throw new Error('Missing message field');
  }

  const goal = await Goal.create({
    text: req.body.text
  });
  resp.status(200).json(goal);
});

// @desc      Update Goal
// @route     PUT /api/goals/:id
// @access    Private

const updateGoal = asyncHandler(async (req, resp) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    req.status(400);
    throw new Error('Goal not found');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  resp.status(200).json(updatedGoal);
});

// @desc      Delete Goal
// @route     DELETE /api/goals/:id
// @access    Private

const deleteGoal = asyncHandler(async (req, resp) => {
  const goal = Goal.findById(req.params.id);
  if (!goal) {
    req.status(400);
    throw new Error('Goal not found');
  }

  await goal.deleteOne();

  resp.status(200).json({message: `Deleted goal ${req.params.id}`});
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal
}