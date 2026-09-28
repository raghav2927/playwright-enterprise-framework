# Session 01: Repository Foundation and Execution Contract

## 1. Ticket

### User Story

As a QA automation engineer, I want a strict, environment-aware
Playwright repository so that tests can run consistently without
embedding environment details inside test code.

### Acceptance Criteria

- Playwright and TypeScript project created
- TypeScript strict mode enabled
- Environment selection validated
- Tests do not access process.env directly
- Smoke test uses configured baseURL
- HTML report and failure evidence configured
- Configuration, type-check, and smoke commands pass

### Constraints

- Windows and PowerShell
- Chromium only for the initial baseline
- No Page Objects
- No custom fixtures
- No authentication
- No CI or Docker
- No credentials in source control

### Definition of Done

The following commands succeed:

- npm run config:check
- npm run typecheck
- npm run test:smoke
- npm run report

## 2. Concepts Before Implementation

### What is an execution contract?

An execution contract defines the inputs and conditions required to
start the suite successfully.

For this framework, the initial contract includes:

- a supported APP_ENV
- a valid WEB_BASE_URL
- a valid API_BASE_URL
- installed browser binaries
- valid TypeScript
- a known Playwright project

### Why is configuration validation needed?

Environment variables enter the Node.js process as strings or undefined.
They are untrusted input.

The configuration layer converts this untrusted input into a validated,
typed AppConfig object. Invalid configuration fails before browser
execution.

### Why is type checking separate?

Playwright can transform and execute TypeScript, but execution is not a
replacement for compiler validation. The TypeScript compiler runs as a
separate quality gate.

### What happens without this design?

Tests may:

- hardcode URLs
- fail late with misleading errors
- behave differently across machines
- expose secrets
- duplicate environment selection logic
- accept unsupported environments

## 3. Architecture Decision

### Options Considered

1. Hardcode the URL in tests
2. Read process.env inside each test
3. Use a centralized validated configuration module

### Selected Approach

Use a centralized configuration module.

### Reason

It provides one validation boundary and prevents environment logic from
spreading through the framework.

### Trade-Off

The configuration module adds code before the suite has many tests.

This cost is justified because multi-environment execution is a known
requirement, not a speculative future feature.

## 4. What We Implemented

### Files Added

- config/environment.ts
- scripts/validate-config.ts
- tests/smoke/application-health.spec.ts
- playwright.config.ts
- tsconfig.json
- .env.example
- .gitignore
- .github/copilot-instructions.md

### Execution Flow

1. npm starts Playwright.
2. Playwright loads playwright.config.ts.
3. playwright.config.ts calls createAppConfig().
4. createAppConfig() validates APP_ENV.
5. The matching environment file is loaded.
6. Required URLs are validated.
7. Playwright receives webBaseUrl as baseURL.
8. The smoke test navigates using a relative path.
9. Playwright produces terminal output and HTML evidence.

## 5. Code Walkthrough

### config/environment.ts

Owns environment selection, file loading, validation, and the typed
configuration object.

### playwright.config.ts

Owns test-runner behavior, browser projects, retries, reporters, and
artifacts.

### scripts/validate-config.ts

Validates configuration without launching a browser.

### application-health.spec.ts

Verifies that the anonymous application shell exposes the Global Feed.

## 6. Modify and Verify

Add a third supported environment named staging.

Do not copy qa configuration inside TypeScript.

Create a local .env.staging file and execute the same smoke test against
it.

## 7. Break and Fix

Set APP_ENV to an unsupported value and record:

- the error
- where it occurs
- why it occurs before browser launch
- how the configuration guard prevents a misleading test failure

## 8. Git Workflow

Use a feature branch:

feature/qaf-001-foundation

Commit only after configuration validation, type checking, and the smoke
test pass.

## 9. Commands

- npm run config:check
- npm run typecheck
- npm run test:smoke
- npm run test:ui
- npm run report

## 10. Interview Questions

1. Why should tests not read process.env directly?
2. Why run tsc separately when Playwright supports TypeScript?
3. What belongs in playwright.config.ts?
4. Why did we not create a Page Object?
5. What is the difference between compile-time readonly and runtime
   Object.freeze?

## 11. Learning Log

Complete learning-log.md using actual execution evidence.

## 12. Gap Map Update

Update docs/roadmap/gap-map.md only after completing the exercises.

## 13. Three-Line Recap

We created a strict Playwright and TypeScript execution baseline.

Environment input is converted into validated configuration before the
browser starts.

The first test proves the application shell, while avoiding premature
framework abstractions.

## 14. Progress Snapshot

Update docs/roadmap/current-progress.md after the Git commit.