const express = require('express');
const router = express.Router();

const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal
} = require('../controllers/goalController');
const auth = require('../middlewares/authMiddleware');

router.use(auth);
router.route('/').get(getGoals).post(createGoal);
router.route('/:id').delete(deleteGoal).put(updateGoal);

module.exports = router;