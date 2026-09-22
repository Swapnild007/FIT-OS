# FIT-OS Core Specification v0.1

Status: Foundation build
Scope: Product logic and domain architecture. UI is explicitly out of scope.

## Product contract
FIT-OS is a personal fitness operating system. Training, nutrition, recovery, progress and coaching are connected domains.

The system must preserve goals and constraints; distinguish measured, user-entered, imported, estimated, derived and demo data; never present demo values as physiological measurements; explain recommendations; adapt when context changes; and keep medical diagnosis/treatment outside the fitness engine.

## Core domains
Training: exercises, movement patterns, muscle involvement, sessions, sets, reps, load, duration, RPE/RIR, volume, progression and adherence.

Nutrition: foods, recipes, meals, calories, protein, carbohydrate, fat, dietary pattern, cuisine, preferences, restrictions, meal timing and adherence.

Recovery: sleep, soreness, stress, resting heart rate, HRV when available, recent training load, subjective readiness and recovery actions.

Progress: body weight, measurements, strength/performance, adherence, trends and user-defined outcomes.

Coach: context assembly, recommendation generation, explanation, adaptation and conversation history. The language model is an interface layer, not the source of truth for calculations.

## Decision context
Recommendations may use goal, availability, recent training, recovery, equipment, experience, preferences, nutrition context, progress history and explicit constraints.

Missing data remains missing. The engine must not silently invent it.

## Recommendation pipeline
input -> validate -> normalize -> derive context -> apply hard constraints -> rank valid options -> generate recommendation -> explain -> record outcome

Hard constraints are applied before preference ranking.

## Training principles
Support progressive overload, appropriate volume/intensity, movement-pattern balance, exercise substitutions, recovery-aware programming, goal-specific programming, beginner-safe progression and time/adherence constraints.

Muscle focus is not equivalent to isolation. A chest session can contain secondary triceps/shoulder involvement; primary and secondary involvement are stored separately.

## Nutrition principles
Support calorie targets as estimates, protein/carbohydrate/fat targets, dietary patterns, cuisine preferences, meal timing, food substitutions, meal planning and adherence.

Clinical diets, eating disorders, pregnancy, disease-specific nutrition and other clinical cases require qualified professional input.

## Recovery principles
Recovery is contextual rather than a single magic score. FIT-OS may combine sleep quantity/consistency, soreness, stress, resting HR/HRV when legitimately available, recent training load and user-reported readiness.

A readiness value must be traceable to its inputs and methodology.

## Data provenance
Every derived metric is classified as measured, user-entered, imported, estimated, derived or demonstration.

## AI architecture
User -> Coach API -> context builder -> domain engines -> recommendation -> explanation -> Coach response

The model may explain, summarize, ask questions and personalize language. Deterministic domain logic remains responsible for calculations and hard constraints.

## Persistence boundary
The current GitHub Pages prototype uses localStorage. This is temporary. The domain model must later support authenticated remote storage, versioned APIs, event/history records and wearable/health integrations.

## Definition of done
A domain is complete only when its taxonomy, data model, calculations/rules, validation, empty/error states, provenance, persistence boundary and tests exist, and UI consumes the domain without embedding business logic.

## Build order
1. Domain schemas and taxonomies
2. Training engine
3. Nutrition engine
4. Recovery engine
5. Progress/measurement engine
6. Personalization/context engine
7. Coach orchestration
8. Persistence/API boundary
9. Integration adapters
10. UI integration
11. QA/security/performance hardening
