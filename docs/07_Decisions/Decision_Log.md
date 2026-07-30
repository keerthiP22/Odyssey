# Architecture Decision Records (ADR)

| Field | Details |
|--------|---------|
| **Project** | Odyssey |
| **Version** | 1.0 |
| **Status** | Active |
| **Created** | 30 July 2026 |

---

# What is an ADR?

Architecture Decision Records (ADRs) document the important technical and product decisions made during the development of Odyssey.

Every major decision should answer:

- What was decided?
- Why was it decided?
- What alternatives were considered?
- What are the consequences?

These records help maintain consistency as the product evolves.

---

# ADR-001

## Title

Odyssey is a Goal-First Platform

### Status

Accepted

### Date

30 July 2026

### Context

Most productivity applications revolve around tasks and habits.

Users eventually lose motivation because tasks become disconnected from larger ambitions.

### Decision

Goals become the highest-level object in Odyssey.

Everything else—including tasks, habits, learning, analytics, and coaching—exists only to help users achieve their goals.

### Consequences

Positive

- Clear product direction
- Better AI recommendations
- Easier prioritization
- Every feature has purpose

Negative

- Requires stronger goal modeling
- More complex planning engine

---

# ADR-002

## Title

Mission Control is the Home Screen

### Status

Accepted

### Date

30 July 2026

### Context

Traditional dashboards overwhelm users with widgets and statistics.

Users primarily want to know:

"What should I do today?"

### Decision

The Odyssey home screen will be called Mission Control.

It provides:

- Daily Mission
- AI Briefing
- Goal Progress
- Recommended Tasks
- Learning Focus
- Reflection

### Consequences

Users receive immediate clarity instead of information overload.

---

# ADR-003

## Title

Odyssey is Built Around Four Core Systems

### Status

Accepted

### Date

30 July 2026

### Decision

Odyssey consists of four primary systems.

1. Goal Engine
2. AI Coach
3. Daily Growth Engine
4. Growth Map

Every new feature must strengthen at least one of these systems.

### Consequences

Positive

- Prevents feature creep
- Keeps architecture modular
- Easier engineering
- Better scalability

---

# ADR-004

## Title

Learning Must Always Preserve Context

### Status

Accepted

### Date

30 July 2026

### Context

Learning platforms teach concepts independently.

Users often forget why they are learning something.

### Decision

Every lesson should answer:

- Where am I?
- Why am I learning this?
- What does this unlock?
- Where is this used?
- What should I learn next?

### Consequences

Learning becomes purposeful rather than memorization.

---

# ADR-005

## Title

Real-World Application is Mandatory

### Status

Accepted

### Date

30 July 2026

### Context

Knowledge is retained more effectively when learners connect concepts to practical situations.

### Decision

Every lesson in Odyssey must include at least one real-world application or challenge.

Examples include:

- Real products
- Industry use cases
- Everyday observations
- Mini practical exercises

### Consequences

Higher engagement

Better retention

Practical understanding

---

# ADR-006

## Title

The AI Acts as a Coach, Not Just an Assistant

### Status

Accepted

### Date

30 July 2026

### Context

Most AI applications respond only when users ask questions.

### Decision

Odyssey's AI proactively:

- Guides
- Plans
- Reflects
- Encourages
- Adapts

The AI behaves like a coach rather than a chatbot.

### Consequences

Users receive continuous support throughout their journey.

---

# ADR-007

## Title

Decisions Over Productivity

### Status

Accepted

### Date

30 July 2026

### Context

Traditional productivity tools optimize task completion.

### Decision

Odyssey optimizes decision quality instead of task quantity.

The AI should always recommend the most meaningful next action rather than simply filling a to-do list.

### Consequences

Users spend time on high-impact work instead of staying busy.

---

# Future ADRs

Future decisions will be added here as the product evolves.

Examples:

- Database architecture
- AI memory strategy
- Recommendation algorithms
- Authentication
- Mobile-first strategy
- Monetization
- Privacy model