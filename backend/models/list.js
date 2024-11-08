// backend/routes/list.js

const router = require("express").Router();
const db = require("../data/db");

// Add a task
router.post("/addTask", (req, res) => {
    const { title, body, userId } = req.body;
    const newTask = { id: Date.now().toString(), title, body, userId };

    db.tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task
router.put("/updateTask/:id", (req, res) => {
    const task = db.tasks.find(task => task.id === req.params.id);

    if (task) {
        task.title = req.body.title || task.title;
        task.body = req.body.body || task.body;
        res.status(200).json({ message: "Task updated", task });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// Delete a task
router.delete("/deleteTask/:id", (req, res) => {
    const taskIndex = db.tasks.findIndex(task => task.id === req.params.id);

    if (taskIndex !== -1) {
        db.tasks.splice(taskIndex, 1);
        res.status(200).json({ message: "Task deleted" });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// Get tasks for a specific user
router.get("/getTasks/:userId", (req, res) => {
    const userTasks = db.tasks.filter(task => task.userId === req.params.userId);
    res.status(200).json(userTasks.length ? { tasks: userTasks } : { message: "No tasks found" });
});

module.exports = router;
