# Wireframes

| Field | Details |
|---|---|
| **Project** | Odyssey |
| **Document** | Wireframes |
| **Version** | 1.0 |
| **Status** | Draft |
| **Owner** | Product Design Team |
| **Created** | 30 July 2026 |

---

# Overview

This document defines the structural layout of Odyssey's primary screens.

The purpose of these wireframes is to establish:

- Information hierarchy
- Component placement
- User interaction flow
- Screen consistency

These are low-fidelity layouts intended to guide UI design and development before high-fidelity mockups are created.

---

# Design Philosophy

Every screen should follow the same principles.

- Calm
- Minimal
- Focused
- Personalized
- Action-oriented

Every screen should answer:

- Where am I?
- What should I do?
- What progress have I made?

---

# Layout Grid

## Desktop

```text
┌────────────────────────────────────────────────────────────┐
│ Header                                                     │
├───────────────┬───────────────────────────────┬────────────┤
│ Sidebar       │ Main Content                 │ Context     │
│ Navigation    │                              │ Panel       │
│               │                              │             │
└───────────────┴───────────────────────────────┴────────────┘
```

---

## Tablet

```text
┌───────────────────────────────┐
│ Header                        │
├───────────────────────────────┤
│ Main Content                  │
│                               │
└───────────────────────────────┘
```

---

## Mobile

```text
┌──────────────────────┐
│ Header               │
├──────────────────────┤
│ Main Content         │
│                      │
│                      │
├──────────────────────┤
│ Bottom Navigation    │
└──────────────────────┘
```

---

# Screen 1 — Mission Control

## Purpose

The personalized dashboard.

### Layout

```text
----------------------------------------------------
Good Morning, Keerthi

Today's Mission
[ Complete Decision Trees Lesson ]

-----------------------------------

Goal Progress

██████░░░░ 60%

-----------------------------------

Learning Focus

Machine Learning

-----------------------------------

AI Insight

"You are one lesson away from unlocking Random Forests."

-----------------------------------

Reflection

How did today go?
```

### Components

- Greeting
- Daily Mission Card
- Goal Progress
- Learning Focus
- AI Insight
- Reflection Prompt
- Quick Actions

---

# Screen 2 — Goals

```text
Goals

+ New Goal

-----------------------------------

AI Engineer

78%

View Details

-----------------------------------

Learn ML

45%

-----------------------------------

Fitness

20%
```

Goal Details

```text
Goal

↓

Milestones

↓

Projects

↓

Tasks
```

---

# Screen 3 — Learning

```text
Today's Lesson

Decision Trees

Estimated Time

25 mins

-------------------------

Lesson

-------------------------

Practice

-------------------------

Mini Project

-------------------------

Reflection
```

Components

- Lesson Header
- Reading Area
- Practice
- Mini Project
- Quiz
- Reflection

---

# Screen 4 — Growth Map

```text
          AI

     ML

Python

SQL

Statistics

Data Visualization
```

Selecting a node shows

- Mastery
- Dependencies
- Related Skills
- Recommended Lesson

---

# Screen 5 — AI Coach

```text
AI Coach

----------------------------------

You

How should I study today?

----------------------------------

Odyssey

Based on your AI Engineer goal,
I recommend completing
Decision Trees today because it
unlocks Random Forests.

[ Start Lesson ]
```

Components

- Conversation
- Suggestions
- Context Panel
- Memory Indicators
- Quick Prompts

---

# Screen 6 — Profile

```text
Profile

Avatar

Name

Email

--------------------------

Goals

Preferences

Notifications

Memory

Privacy

Settings
```

---

# Global Header

Every screen contains:

```text
Logo

Search

Notifications

Profile
```

---

# Sidebar

Desktop Navigation

```text
🏠 Mission Control

🎯 Goals

📚 Learning

🗺 Growth Map

🤖 AI Coach

👤 Profile
```

---

# Bottom Navigation

Mobile

```text
🏠

🎯

➕

📚

🤖

👤
```

Floating Action Button

```text
+

↓

Add Goal

Ask AI

Journal

Focus Session
```

---

# Cards

Most content is displayed using reusable cards.

Example

```text
---------------------------

Today's Mission

Complete Decision Trees

25 min

[ Start ]

---------------------------
```

---

# Empty States

Example

```text
No Goals Yet

Create your first goal and Odyssey
will build a personalized roadmap.

[ Create Goal ]
```

---

# Loading States

Instead of blank screens:

- Skeleton cards
- Progress indicators
- Friendly loading messages

Example

> Building your personalized roadmap...

---

# Error States

Example

```text
Something went wrong.

Retry

Return to Mission Control
```

---

# Responsive Behavior

Desktop

- Sidebar always visible
- Three-column layout

Tablet

- Collapsible sidebar
- Two-column layout

Mobile

- Bottom navigation
- Swipe gestures
- Simplified cards

---

# Design Principles

Every screen should:

- Have one primary action.
- Show only relevant information.
- Maintain visual consistency.
- Reduce distractions.
- Encourage progress.

---

# Future Screens

Additional screens may include:

- Calendar
- Career Hub
- Community
- Analytics Dashboard
- Marketplace
- Mentor Portal

---

# Summary

These wireframes establish the structural foundation of Odyssey's interface.

They define what appears on each screen, how information is organized, and how users interact with the platform. High-fidelity visual design should build upon these layouts while preserving the principles of simplicity, clarity, and guided growth.