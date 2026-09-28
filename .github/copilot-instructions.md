# Repository Copilot Instructions

## Purpose

This repository is a reusable enterprise Playwright and TypeScript
automation platform.

The current learning application is RealWorld, but application-specific
code must remain separate from reusable framework capabilities.

## Engineer Context

The engineer already understands TypeScript fundamentals, async and
await, Playwright locators, assertions, Page Objects, and basic
data-driven testing.

Do not restart from beginner programming syntax unless requested.

Areas requiring deeper mentoring include:

- framework architecture
- fixtures and fixture composition
- execution lifecycle
- API framework design
- PostgreSQL automation
- Git workflows
- Docker
- CI/CD architecture
- debugging and root-cause analysis

## Change Rules

Before proposing code:

1. State the problem being solved.
2. Explain where the responsibility belongs.
3. Identify affected files.
4. Prefer the smallest maintainable change.
5. Do not create speculative abstractions.
6. Preserve existing working behavior.
7. Include verification commands.

## Playwright Rules

- Use TypeScript strict mode.
- Prefer composition over inheritance.
- Use Playwright web-first assertions.
- Prefer semantic locators.
- Do not use hard waits.
- Do not duplicate Playwright APIs in wrapper methods.
- Do not introduce BasePage or BaseTest without a proven requirement.
- Keep tests isolated and parallel-safe.
- Keep environment-specific values outside tests.
- Do not access process.env throughout the test suite.
- Never commit credentials, tokens, or storage-state files.

## AI Rules

- Treat generated code as a draft requiring review.
- Never silently replace failing locators.
- Never remove a failing assertion merely to make CI pass.
- Never expose credentials or tokens.
- Never run destructive database operations without explicit approval.
- Require evidence before recommending a self-healing change.

## Documentation Rules

For each session, update:

- the session README
- the learning log
- the gap map
- the current 