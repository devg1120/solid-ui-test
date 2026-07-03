---
name: solidjs-best-practices
description: Use this skill whenever editing or reviewing a SolidJS codebase, fixing reactivity bugs, or converting React-style patterns to idiomatic Solid. Trigger on mentions of signals, accessors, props, createEffect, createMemo, stores, JSX conditionals, `<Show>`, `<For>`, or questions like "why isn't this updating?" even if the user only asked for a refactor or small bug fix.
---

# SolidJS Best Practices

Use this skill to keep Solid code aligned with Solid's reactive model. Prefer the smallest fix that removes React habits and preserves existing behavior.

## Core Guidance

- Pass signal values to JSX props by default: use `id={id()}` rather than passing the accessor itself unless the child API explicitly expects an accessor.
- Child components should usually not need to care whether a prop originated from a signal.
- Do not destructure props. Read `props.name` directly so Solid keeps the getter reactive. If separation is necessary, use `splitProps`.
- Remember the component body is setup code, not a reactive scope. If a value should update over time, read signals inside JSX, `createMemo`, or `createEffect`.
- Prefer derived state over synchronized state. Use a derived function or `createMemo` instead of an effect that copies one reactive value into another.
- Use `createEffect` sparingly and mainly for true side effects such as DOM integration, subscriptions, or imperative third-party APIs.
- Prefer Solid control-flow primitives over ad hoc JS in JSX: `<Show>` for conditionals and `<For>` for lists, especially when updates are dynamic.
- Use stores for complex or nested objects when property-level reactivity matters. Use signals for primitives and simple references.

## Editing Workflow

When changing Solid code, look first for these common non-idiomatic patterns:

- props being destructured
- accessors being passed as normal props without a clear reason
- signal reads in plain setup code that are expected to stay reactive
- `createEffect` being used for fetching or derived state
- `array.map(...)` used directly in JSX for dynamic lists
- inline `&&` conditionals where `<Show>` would be clearer
- large nested objects stored in a signal that want a store

## Response Style

- Make the smallest idiomatic change.
- If you rewrite a pattern, explain the reactive reason briefly.
- Avoid inventing abstractions unless the code already wants them.
