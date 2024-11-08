const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// Create Task
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save();
            existingUser.list.push(list);
            await existingUser.save();
            res.status(200).json({ list });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Update Task
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
        if (list) {
            res.status(200).json({ message: "Task Updated", list });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete Task
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOneAndUpdate(
            { email },
            { $pull: { list: req.params.id } }
        );
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Task Deleted" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get Tasks
router.get("/getTasks/:id", async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
        if (list.length !== 0) {
            res.status(200).json({ list });
        } else {
            res.status(200).json({ message: "No Tasks" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
