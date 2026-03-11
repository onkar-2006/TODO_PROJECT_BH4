const express = require("express")
const router = express.Router()
const { createTodo, getMyTodos, toggleTodo  ,deleteTodo} = require('../controllers/TodoController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.route('/new').post(isAuthenticated, createTodo);
router.route('/my-tasks').get(isAuthenticated, getMyTodos);
router.route('/update/:id').put(isAuthenticated, toggleTodo);
router.route('/task/:id').delete(isAuthenticated, deleteTodo);

module.exports = router;


