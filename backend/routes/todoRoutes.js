const express = require("express");
const router = express.Router();

// CRUD operations for todos
const {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const { protect } = require("../middleware/authMiddleware");

// router.post("/", createTodo);
// router.get("/", readTodos);
// router.put("/:id", updateTodo);
// router.delete("/:id", deleteTodo);

router.route("/").post(protect, createTodo).get(protect, readTodos);
router.route("/:id").put(protect, updateTodo).delete(protect, deleteTodo);

module.exports = router;
