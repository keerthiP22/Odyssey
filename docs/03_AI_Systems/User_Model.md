# Odyssey User Model

Version: 1.0
Status: MVP
Owner: AI Brain

---

# Purpose

The User Model represents everything Odyssey knows about a person.

It is the foundation of personalization.

Every recommendation, reminder, insight and conversation should be generated using this model.

The goal is NOT to collect as much data as possible.

The goal is to collect only the information that helps Odyssey understand the user and reduce their mental load.

---

# Design Principles

The AI should

✓ Learn gradually

✓ Never assume

✓ Explain recommendations

✓ Respect privacy

✓ Forget irrelevant information

✓ Remember meaningful information

---

# User Layers

Odyssey understands users in six layers.

Identity

↓

Vision

↓

Current Life

↓

Daily Context

↓

Behavior

↓

Memories

```

---

# Layer 1 — Identity

Changes rarely.

```
Name

Preferred Name

Age

Timezone

Occupation

Education

Languages

Personality

Working Style
```

Purpose

Help Odyssey communicate naturally.

---

# Layer 2 — Vision

Who is this person becoming?

```
Dream Career

Dream Lifestyle

Dream Country

Values

Mission

Manifestation

Vision Board

Life Goals
```

Example

```
Dream Career

AI Engineer

Mission

Build products that improve people's lives.

Values

Health

Growth

Freedom
```

This becomes Odyssey's compass.

---

# Layer 3 — Current Life

Life changes in seasons.

Instead of treating everything equally,

Odyssey understands what season the user is in.

```
Current Season

Current Projects

Current Responsibilities

Current Challenges

Current Priorities
```

Example

```
Season

Placement Preparation

Projects

Odyssey

Hydroponics

Responsibilities

College

Fitness
```

---

# Layer 4 — Daily Context

Changes every day.

```
Today's Tasks

Deadlines

Appointments

Energy

Mood

Available Time
```

Purpose

Generate today's recommendations.

---

# Layer 5 — Behavior

Learns automatically.

```
Preferred Work Hours

Average Focus Time

Preferred Break Duration

Learning Style

Productivity Patterns

Morning Routine

Evening Routine
```

Examples

```
Works best

9–12 AM

Usually distracted

After lunch

Focus Length

80 minutes
```

---

# Layer 6 — Memories

Only meaningful memories.

NOT every task.

```
Milestones

Personal Wins

Important Conversations

Lessons Learned

Achievements

Difficult Periods
```

Examples

```
Built first MVP

Completed degree

Finished first marathon

First internship

Started reading habit
```

---

# What Odyssey Should Never Remember

Passwords

OTP

Bank Details

Private Messages

Medical Records (unless explicitly requested)

Embarrassing mistakes

Temporary thoughts

---

# Learning Sources

Odyssey learns from

Planner

↓

Journal

↓

Brain Dump

↓

Habits

↓

Goals

↓

Vision

↓

Knowledge

↓

AI Conversations

---

# Confidence

Every memory has confidence.

```
High

User explicitly stated

--------------

Medium

Repeated behavior

--------------

Low

AI inference
```

The AI should never present low-confidence assumptions as facts.

---

# AI Learning Rules

The AI should

Observe

↓

Recommend

↓

Watch Response

↓

Learn

↓

Improve

Example

User rejects morning workouts.

↓

AI tries evening workouts.

↓

User accepts.

↓

Confidence increases.

---

# User Control

The user can

View memories

Edit memories

Delete memories

Ask why something is remembered

Disable learning

Export data

---

# Memory Lifecycle

New

↓

Observed

↓

Confirmed

↓

Useful

↓

Archived

↓

Forgotten

Not every memory should live forever.

---

# User Growth Timeline

Instead of storing tasks,

Odyssey stores growth.

Example

2026

↓

Graduated

↓

Built Odyssey MVP

↓

Started Placement Prep

↓

First Internship

↓

Moved Abroad

↓

First Startup

Years later,

Odyssey becomes a timeline of the user's life.

---

# Success Criteria

A new AI should be able to read only this model and answer

Who is this user?

What matters to them?

What are they working on?

How do they learn?

What should they do today?

Without reading any other part of the database.