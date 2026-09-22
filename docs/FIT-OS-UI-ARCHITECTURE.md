# FIT-OS UI Architecture v1

The UI is now a complete single-page operating shell. The visual system is intentionally centralized in `index.html` so GitHub Pages can render the product without a build step or runtime dependency.

## Screens

1. Today
2. Explore
3. Plans
4. Coach
5. Library
6. Train
7. Recovery
8. Nutrition
9. Progress
10. Profile
11. Settings

## Primary navigation

Today · Train · Plans · Coach · Profile

Secondary modules are reachable from cards and contextual actions. The liquid navigation indicator tracks the active primary module.

## Functional contracts

- Route changes use URL hashes and work without a server-side router.
- Explore filters combine location, goal, muscle focus, duration, experience, equipment and search.
- Training has exercise sequencing, set-entry UI, session progress and completion state.
- Recovery exposes contextual signals and check-in actions.
- Nutrition exposes estimated targets, meal logging and personalization.
- Progress separates entered values from derived/demo values.
- Coach is an interface layer; deterministic fitness logic remains outside the conversational UI.
- Profile and Settings expose the personalization, data-source and privacy boundaries.
- Prototype state is stored locally in browser localStorage.
- No LLM is stored on the device.
- No external runtime dependency is required for the UI.

## QA contract

The repository contains a GitHub Actions workflow at `.github/workflows/qa.yml` that checks:

- JavaScript syntax with Node
- HTML parsing and duplicate IDs
- Required screen presence
- manifest JSON validity

## Architecture boundary

This UI is deliberately not the fitness intelligence engine. Future domain engines should provide structured state and recommendations to the UI. The interface must not fabricate measurements or silently turn demo values into physiological claims.
