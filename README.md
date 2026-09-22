# FIT-OS

Next-generation personal fitness operating system prototype.

## Current build

This is the first complete web-app foundation for FIT-OS. It is a responsive, GitHub Pages-compatible single-page web application with:

- Today dashboard
- Readiness and body-signal overview
- AI Coach interface
- Training session
- Recovery engine UI
- Nutrition UI
- Progress and fitness-memory UI
- Settings
- Responsive mobile navigation
- Local prototype interactions and toast feedback
- No local LLM
- No external runtime dependency

## Product direction

FIT-OS is being designed around a personal model that connects:

**Movement + Recovery + Nutrition → Personal Model → Training Engine + Recovery Engine → AI Coach**

The prototype intentionally does not make medical diagnoses. AI/provider integrations, wearable APIs, computer vision and persistent backend storage will be added as separate engineering phases.

## Run

Open `index.html` directly, or serve the repository with any static HTTP server.

GitHub Pages can serve the root of the `main` branch.

## Next engineering phases

1. Design system hardening and component architecture
2. Real workout data model
3. Remote AI gateway
4. Wearable/health integrations
5. Computer-vision movement engine
6. Persistent user profile and fitness memory
7. Authentication and privacy controls
8. Automated testing and CI
