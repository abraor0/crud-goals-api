const asyncHandler = require('express-async-handler');

// @desc      Get Goals
// @route     GET /api/goals
// @access    Private

const getGoals = asyncHandler(async (req, resp) => {
  resp.status(200).json({message: 'Get Goals'});
});

// @desc      Create Goal
// @route     POST /api/goals
// @access    Private

const createGoal = asyncHandler(async(req, resp, next) => {
  if (!req.body.message) {
    resp.status(400);
    throw new Error('Missing message field');
  }
  resp.status(200).json({message: 'Create Goal'});
});

// @desc      Update Goal
// @route     PUT /api/goals/:id
// @access    Private

const updateGoal = asyncHandler(async (req, resp) => {
  resp.status(200).json({message: `Update goal ${req.params.id}`});
});

// @desc      Delete Goal
// @route     DELETE /api/goals/:id
// @access    Private

const deleteGoal = asyncHandler(async (req, resp) => {
  resp.status(200).json({message: `Delete goal ${req.params.id}`});
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal
}