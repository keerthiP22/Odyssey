import { GoogleGenAI } from "@google/genai";

import { getDevelopmentUser } from "./userService.js";
import {
  saveJarvisMessage,
  getJarvisMessages,
} from "./jarvisMessageService.js";
import { getJarvisContext } from "./jarvisContextService.js";
import {
  createTask,
  completeTask,
} from "./taskService.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const JARVIS_SYSTEM_INSTRUCTION = `
You are JARVIS, the AI companion inside Odyssey.

Odyssey is a personal operating system designed to help Keerthi
reduce mental clutter, choose what matters, and make steady progress.

Your personality:
- Calm
- Grounded
- Supportive
- Practical
- Honest
- Gently motivating
- Never overly enthusiastic or cheesy

Your job is not to give Keerthi an enormous list of things to do.

Help identify what matters most right now.

Available actions:

CREATE_TASK
COMPLETE_TASK

Only choose CREATE_TASK when Keerthi clearly asks you
to add, create, remember, or put something into their tasks.

Only choose COMPLETE_TASK when Keerthi clearly says
that they finished, completed, or want to mark an existing
task as complete.

Otherwise choose CHAT.

Do not invent task information.
`;

type JarvisDecision = {
  action:
    | "CHAT"
    | "CREATE_TASK"
    | "COMPLETE_TASK";

  title?: string;

  taskId?: number;

  priority?: number;

  reply: string;
};

export async function getJarvisResponse(
  message: string
): Promise<string> {
  const user = await getDevelopmentUser();

  await saveJarvisMessage(
    user.id,
    "user",
    message
  );

  const context = await getJarvisContext(user.id);

  const history = await getJarvisMessages(user.id);

  const conversation = history
    .map((item) => {
      const speaker =
        item.role === "user"
          ? "Keerthi"
          : "JARVIS";

      return `${speaker}: ${item.content}`;
    })
    .join("\n");

  const prompt = `
Here is Keerthi's current Odyssey context.

TASKS:
${JSON.stringify(context.tasks, null, 2)}

GOALS:
${JSON.stringify(context.goals, null, 2)}

RECENT JOURNAL ENTRIES:
${JSON.stringify(
  context.journalEntries,
  null,
  2
)}

CONVERSATION HISTORY:
${conversation}

CURRENT MESSAGE:
${message}

Decide what JARVIS should do.

Return JSON with exactly this structure:

{
  "action": "CHAT" or "CREATE_TASK" or "COMPLETE_TASK",
  "title": "task title if creating a task",
  "taskId": 0,
  "priority": 0,
  "reply": "natural response to Keerthi"
}

Rules:

- CREATE_TASK:
  Use only when Keerthi explicitly asks to create/add/remember
  something as a task.

- COMPLETE_TASK:
  Use only when Keerthi explicitly says they completed,
  finished, or want to mark an existing task as complete.

- For COMPLETE_TASK, taskId must be the ID of the matching
  existing task from the TASKS data.

- Never invent a taskId.

- Priority must be an integer from 0 to 3.

- If no priority is obvious, use 0.

- Use CHAT for normal conversation and questions.

- Do not invent information.
`;

  let response;

  try {
    response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction:
          JARVIS_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Gemini request failed:",
      error
    );

    throw error;
  }

  const rawResponse =
    response.text?.trim() || "{}";

  let decision: JarvisDecision;

  try {
    decision = JSON.parse(rawResponse);
  } catch (error) {
    console.error(
      "Could not parse JARVIS decision:",
      rawResponse
    );

    throw error;
  }

  if (decision.action === "CREATE_TASK") {
    if (
      !decision.title ||
      typeof decision.title !== "string"
    ) {
      throw new Error(
        "JARVIS requested task creation without a title."
      );
    }

    await createTask(
      user.id,
      decision.title,
      decision.priority ?? 0
    );
  }

  if (decision.action === "COMPLETE_TASK") {
    if (
      typeof decision.taskId !== "number"
    ) {
      throw new Error(
        "JARVIS requested task completion without a task ID."
      );
    }

    await completeTask(
      user.id,
      decision.taskId
    );
  }

  const reply =
    decision.reply?.trim() ||
    "I'm here. Let's figure out what matters next.";

  await saveJarvisMessage(
    user.id,
    "jarvis",
    reply
  );

  return reply;
}