# Design System

| Field | Details |
|---|---|
| **Project** | Odyssey |
| **Document** | Design System |
| **Version** | 1.0 |
| **Status** | Draft |
| **Owner** | Product Design Team |
| **Created** | 30 July 2026 |

---

# Overview

The Design System defines Odyssey's visual language and reusable UI components.

Its purpose is to ensure consistency across the platform while creating a calm, modern, and trustworthy experience.

Every screen should feel like part of the same product.

---

# Design Philosophy

Odyssey is not a productivity app.

It is a Personal Growth Operating System.

The interface should feel like:

- Calm
- Intelligent
- Minimal
- Premium
- Human
- Encouraging

Users should feel guided—not overwhelmed.

---

# Design Principles

Every interface should be:

- Clear
- Consistent
- Accessible
- Purposeful
- Personal
- Responsive

---

# Brand Personality

Odyssey should feel like:

- A mentor, not a manager
- Intelligent, not robotic
- Calm, not noisy
- Professional, not corporate
- Modern, not trendy

---

# Color Palette

## Primary

```text
Deep Indigo
#4F46E5
```

Used for:

- Primary buttons
- Active navigation
- Progress indicators

---

## Secondary

```text
Sky Blue
#3B82F6
```

Used for:

- Links
- Highlights
- Charts

---

## Success

```text
#22C55E
```

---

## Warning

```text
#F59E0B
```

---

## Error

```text
#EF4444
```

---

## Background

```text
Light
#F8FAFC

Dark
#0F172A
```

---

## Surface

```text
White
#FFFFFF

Dark Surface
#1E293B
```

---

# Typography

## Font Family

Primary

```
Inter
```

Fallback

```
System UI
```

---

# Type Scale

| Style | Size |
|---------|------|
| Display | 48px |
| H1 | 36px |
| H2 | 30px |
| H3 | 24px |
| H4 | 20px |
| Body | 16px |
| Small | 14px |
| Caption | 12px |

---

# Spacing System

Base Unit

```
8px
```

Spacing Scale

```
4

8

16

24

32

40

48

64
```

---

# Border Radius

Small

```
8px
```

Medium

```
12px
```

Large

```
20px
```

Cards

```
24px
```

---

# Shadows

Small

```
Subtle elevation
```

Medium

```
Card hover
```

Large

```
Modals
```

Shadows should remain soft and minimal.

---

# Buttons

## Primary

Filled

Used for primary actions.

Example

```
Start Lesson
```

---

## Secondary

Outlined

Example

```
View Details
```

---

## Ghost

Text only

Example

```
Cancel
```

---

# Input Fields

Components

- Text Input
- Search
- Password
- Dropdown
- Date Picker
- Multi-select

Every input includes:

- Label
- Placeholder
- Validation
- Helper Text

---

# Cards

Cards are the primary content container.

Types

- Goal Card
- Lesson Card
- Progress Card
- AI Insight Card
- Reflection Card
- Achievement Card

Cards should include:

- Title
- Description
- Metadata
- Primary Action

---

# Icons

Preferred Library

```
Lucide
```

Style

- Outline
- Minimal
- Consistent stroke width

---

# Navigation Components

Reusable components include:

- Sidebar
- Bottom Navigation
- Breadcrumbs
- Tabs
- Top Bar

---

# Feedback Components

Include:

- Toasts
- Alerts
- Snackbars
- Confirmation Dialogs
- Progress Indicators

---

# Progress Indicators

Examples

- Circular Progress
- Linear Progress
- Skill Mastery
- Goal Completion

Progress should be visually encouraging.

---

# AI Components

Reusable AI-specific components.

## AI Insight Card

Displays personalized insights.

---

## Recommendation Card

Shows today's recommendation.

---

## Reflection Prompt

Encourages journaling.

---

## Coaching Bubble

Displays AI responses.

---

# Empty States

Every empty state should include:

- Friendly illustration
- Explanation
- Primary action

Example

```
No goals yet.

Let's build your first roadmap.

[ Create Goal ]
```

---

# Loading States

Use:

- Skeleton loaders
- Progress bars
- Animated placeholders

Avoid blank screens.

---

# Error States

Every error should include:

- Clear explanation
- Recovery action
- Retry option

Never expose technical errors to users.

---

# Animations

Animations should be:

- Fast
- Subtle
- Purposeful

Examples

- Fade
- Slide
- Scale
- Progress transitions

Avoid excessive motion.

---

# Accessibility

The Design System must support:

- WCAG AA contrast
- Keyboard navigation
- Screen readers
- Reduced motion
- Focus indicators
- Large text scaling

Accessibility is a requirement, not an enhancement.

---

# Responsive Breakpoints

| Device | Width |
|---------|------|
| Mobile | <768px |
| Tablet | 768–1023px |
| Desktop | 1024px+ |

---

# Design Tokens

Example

```
Primary Color

Primary Font

Spacing

Radius

Shadow

Animation Speed

Icon Size
```

All components should consume design tokens rather than hard-coded values.

---

# Component Hierarchy

```text
Design Tokens

↓

Base Components

↓

Composite Components

↓

Feature Components

↓

Screens
```

---

# Naming Convention

Examples

```
ButtonPrimary

GoalCard

MissionCard

InsightCard

Sidebar

BottomNavigation

LessonCard
```

Component names should be descriptive and consistent.

---

# Future Enhancements

- Glassmorphism support
- Theme customization
- Dynamic accent colors
- AI-generated themes
- Motion library
- Design token automation

---

# Success Metrics

The Design System is successful if:

- Screens feel visually consistent.
- Components are reusable.
- Development speed increases.
- Accessibility requirements are met.
- Designers and developers share the same language.

---

# Summary

The Design System is the visual foundation of Odyssey.

It transforms product principles into reusable patterns that enable designers and developers to build a cohesive, scalable, and accessible experience. By emphasizing consistency, clarity, and calmness, the Design System ensures that every interaction reinforces Odyssey's mission of guiding users on their personal growth journey.