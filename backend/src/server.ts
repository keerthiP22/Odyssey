import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { getJarvisResponse } from "./services/jarvisService.js";
import { getDevelopmentUser } from "./services/userService.js";
import {
  createTask,
  getUserTasks,
  setTaskCompleted,
  deleteTask,
} from "./services/taskService.js";
import {
  createGoal,
  getUserGoals,
  setGoalCompleted,
} from "./services/goalService.js";
import {
  createJournalEntry,
  getUserJournalEntries,
} from "./services/journalService.js";
import { getJarvisMessages } from "./services/jarvisMessageService.js";

dotenv.config();


const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());


// ------------------------------------
// Health check
// ------------------------------------

app.get("/", (_req, res) => {
  res.json({
    message: "Odyssey backend is alive 🦴",
  });
});


// ------------------------------------
// JARVIS
// ------------------------------------

app.post("/api/jarvis/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const reply = await getJarvisResponse(message);

    return res.json({
      reply,
    });
  } catch (error) {
    console.error("JARVIS error:", error);

    return res.status(500).json({
      error: "JARVIS could not respond.",
    });
  }
});


// ------------------------------------
// GET JARVIS MESSAGES
// ------------------------------------

app.get("/api/jarvis/messages", async (_req, res) => {
  try {
    const user = await getDevelopmentUser();

    const messages = await getJarvisMessages(user.id);

    return res.json({
      messages,
    });
  } catch (error) {
    console.error("JARVIS message retrieval error:", error);

    return res.status(500).json({
      error: "Could not retrieve JARVIS messages.",
    });
  }
});



// ------------------------------------
// GET TASKS
// ------------------------------------

app.get("/api/tasks", async (_req, res) => {
  try {
    const user = await getDevelopmentUser();

    const tasks = await getUserTasks(user.id);

    return res.json({
      tasks,
    });
  } catch (error) {
    console.error("Task retrieval error:", error);

    return res.status(500).json({
      error: "Could not retrieve tasks.",
    });
  }
});


// ------------------------------------
// CREATE TASK
// ------------------------------------

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({
        error: "Task title is required.",
      });
    }

    const user = await getDevelopmentUser();

    const task = await createTask(
      user.id,
      title,
      typeof priority === "number" ? priority : 0,
      typeof dueDate === "string"
        ? dueDate
        : undefined
    );

    return res.status(201).json({
      task,
    });
  } catch (error) {
    console.error("Task creation error:", error);

    return res.status(500).json({
      error: "Could not create task.",
    });
  }
});


// ------------------------------------
// COMPLETE / UNCOMPLETE TASK
// ------------------------------------

app.patch("/api/tasks/:id/complete", async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId)) {
      return res.status(400).json({
        error: "Invalid task ID.",
      });
    }

    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        error: "completed must be true or false.",
      });
    }

    const user = await getDevelopmentUser();

    const task = await setTaskCompleted(
      user.id,
      taskId,
      completed
    );

    return res.json({
      task,
    });
  } catch (error) {
    console.error("Task completion error:", error);

    return res.status(500).json({
      error: "Could not update task.",
    });
  }
});


// ------------------------------------
// DELETE TASK
// ------------------------------------

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId)) {
      return res.status(400).json({
        error: "Invalid task ID.",
      });
    }

    const user = await getDevelopmentUser();

    await deleteTask(user.id, taskId);

    return res.status(204).send();
  } catch (error) {
    console.error("Task deletion error:", error);

    return res.status(500).json({
      error: "Could not delete task.",
    });
  }
});

// ------------------------------------
// GOALS
// ------------------------------------

app.get("/api/goals", async (_req, res) => {
  try {
    const user = await getDevelopmentUser();
    const goals = await getUserGoals(user.id);

    return res.json({ goals });
  } catch (error) {
    console.error("Goal retrieval error:", error);
    return res.status(500).json({ error: "Could not retrieve goals." });
  }
});

app.post("/api/goals", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Goal title is required." });
    }

    const user = await getDevelopmentUser();
    const goal = await createGoal(
      user.id,
      title,
      typeof description === "string" && description.trim()
        ? description.trim()
        : undefined
    );

    return res.status(201).json({ goal });
  } catch (error) {
    console.error("Goal creation error:", error);
    return res.status(500).json({ error: "Could not create goal." });
  }
});

app.patch("/api/goals/:id/complete", async (req, res) => {
  try {
    const goalId = Number(req.params.id);
    const { completed } = req.body;

    if (!Number.isInteger(goalId)) {
      return res.status(400).json({ error: "Invalid goal ID." });
    }

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        error: "completed must be true or false.",
      });
    }

    const user = await getDevelopmentUser();
    const goal = await setGoalCompleted(user.id, goalId, completed);

    return res.json({ goal });
  } catch (error) {
    console.error("Goal completion error:", error);
    return res.status(500).json({ error: "Could not update goal." });
  }
});

// ------------------------------------
// JOURNAL
// ------------------------------------

app.get("/api/journal", async (_req, res) => {
  try {
    const user = await getDevelopmentUser();
    const entries = await getUserJournalEntries(user.id);

    return res.json({ entries });
  } catch (error) {
    console.error("Journal retrieval error:", error);
    return res.status(500).json({
      error: "Could not retrieve journal entries.",
    });
  }
});

app.post("/api/journal", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({
        error: "Journal content is required.",
      });
    }

    const user = await getDevelopmentUser();
    const entry = await createJournalEntry(user.id, content.trim());

    return res.status(201).json({ entry });
  } catch (error) {
    console.error("Journal creation error:", error);
    return res.status(500).json({
      error: "Could not create journal entry.",
    });
  }
});


// ------------------------------------
// START SERVER
// ------------------------------------

app.listen(PORT, () => {
  console.log(
    `Odyssey backend running on http://localhost:${PORT}`
  );
});