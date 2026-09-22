# FIT-OS

Next-generation personal fitness operating system.

## Current build

FIT-OS is a responsive, GitHub Pages-compatible single-page application with the complete UI shell built in one dependency-free page:

- Today
- Explore
- Plans
- Coach
- Library
- Train
- Recovery
- Nutrition
- Progress
- Profile
- Settings
- Liquid primary navigation
- Hash-based routing
- Local prototype state
- Workout exercise logging and session progress
- Explore discovery filters and search
- Recovery check-in surface
- Nutrition meal logging surface
- Progress and fitness-memory surface
- Personal model and integration boundaries
- Responsive mobile and desktop layouts

The UI deliberately separates prototype/demo values from user-entered or derived context. It does not claim to measure physiology that is not actually connected.

## Product architecture

FIT-OS is being built around:

**Personal Model → Current State → Domain Engines → Adaptation → Recommendation → Coach → Outcome**

Training, nutrition, recovery and progress are connected domains. The conversational AI layer is an interface and explanation layer, not the source of truth for calculations.

Core domain specifications and taxonomies are in `docs/` and `data/`.

## Runtime

- Static HTML/CSS/JavaScript
- No framework
- No local LLM
- No external runtime dependency
- Browser localStorage for prototype state
- GitHub Pages compatible

The production architecture will later add authenticated persistence, remote AI gateway, wearable/health integrations, structured food/exercise data and computer-vision capabilities.

## QA

`.github/workflows/qa.yml` runs automated checks for:

- JavaScript syntax
- HTML parsing
- duplicate IDs
- required screens
- manifest JSON

## Run

Open `index.html` directly or serve the repository with any static HTTP server. GitHub Pages can serve the root of `main`.

## Engineering order

1. Training engine
2. Nutrition engine
3. Recovery engine
4. Progress/measurement engine
5. Personalization/context engine
6. Coach orchestration
7. Persistence/API boundary
8. Integration adapters
9. UI integration
10. QA/security/performance hardening
