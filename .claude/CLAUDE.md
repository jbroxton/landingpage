# Speqq Website

## About Speqq and the site
- Speqq is a Requirements Management platform for Product Managers.
- This app is a public website for Speqq for anyone to
    - Learn about Speqq
    - Contact me
    - Sign up for our watchlist
    - Sign up for our user studies

# Your goal you must always be optimizing for
- The website needs to be a captivating for viwers and convert traffic to signup

## Constraints to follow when writing code

- **Avoid over-engineering:**Do not over-engineer the solution. You must always give the simplist long term solution. You care about the long term health of the app. You do not want to rewrite code
- **Only write code that is scalabe:** Always ask, how does this feature scale to 50,000 users. Develop solutions and code with this fact.
- You must approach implementation as a thoughtful software engineer contributing to a growing, professional codebase. Avoid over-engineering, duplication, or breaking established conventions.
- When writing code, avoid writing custom code at all costs. Use existing libraries and framworks, API for React, NextJS, Tiptap, OpenAI
- Avoid unnecessary re-renders
- Do not use try-catch blocks
- Always type function arguments and return values
- Prefer interface or type aliases for structured objects
- Do not use try-catch for local UI logic or expected API responses
- Avoid using anonymous functions inside JSX
- Use useEffect and useState properly
	•	Do not violate React rules of hooks.
- Use getServerSideProps or getStaticProps for data fetching, not useEffect on page load
Use React.memo, useMemo, and useCallback only where profiling shows performance gains.
	•	Don’t wrap everything in these just to “optimize” preemptively.
   - DRY (Don't Repeat Yourself)
- Pattern consistency across the codebase
- Simplicity without sacrificing scalability
---

## Your Development Process when writing code everytime 

Follow the steps below with care before you write a single line of code:

### 1. Read Codebase

- **How to understand the current state**
   - Review the existing project structure, file layout, naming conventions, and import patterns. 
   - Identify repeated patterns in how features, components, utilities, and styles are organized.
   - Observe how existing files are structured: What is colocated? What is modularized?
   - Find target files you will need to change for the implementation
   - Read each file line by line. Do Not lightly scan target files
   - Ask your self if you understand the current state well enought? Good is 8/10. If yes, then you are good. If not, re read.

### 2. Choose the Right Approach

- Select the **simplest solution** that works within the existing structure.
- If multiple paths are possible, prefer the one that is:
  - Already established in the codebase
  - Easier for others to maintain or extend
  - Aligned with the project's framework or architectural philosophy

**Do not invent new patterns** unless the existing ones are provably broken or limiting.

### 3. Favor Extension Over Reinvention

- **Before creating a new file**, ask:
  - Can this logic go into an existing file?
  - Does this concept already exist somewhere in the code?
- Extend shared utilities or components instead of duplicating them.

### 4. Apply DRY Principles

- Extract shared logic into functions or utilities when reused more than once.
- Avoid copy-pasting similar logic across files—factor out differences and reuse abstractions.
- Prefer named exports and pure functions for reusability.

### 5. Write Code That Matches the House Style

- Follow naming conventions for files, functions, and components.
- Organize imports consistently (group external, internal, relative).
- Maintain consistency in component folder structure and export patterns.

---

## Output Requirements

At the end of your work, you must:

- Output a list of all tasks completed
- Indicate which existing patterns were extended or reused
- Confirm that no build errors or lint issues were introduced
- Ensure all new code:
  - Fits cleanly into the codebase
  - Is organized logically and consistently
  - Could be easily understood and extended by another developer

---

## What You Must Not Do

| Anti-Pattern                           | Why It's a Problem                            |
| -------------------------------------- | --------------------------------------------- |
| Creating redundant files               | Pollutes the codebase, creates confusion      |
| Copy-pasting existing logic            | Introduces maintenance risk and inconsistency |
| Breaking naming or folder patterns     | Makes the codebase harder to navigate         |
| Adding complex abstraction prematurely | Over-engineering for unclear benefit          |

---

## Guiding Philosophy

**Write code as if someone smarter than you will have to read and maintain it under deadline pressure.**

Your job is not only to make the code work, but to make it consistent, traceable, and extendable. Consistency scales better than cleverness.


## ✅ Global Code Constraints

When writing or modifying code, always adhere to the following:

- ✅ Keep code **simple** and easy to understand
- ✅ Ensure code is **efficient** and performs well
- ❌ **Do not** add fallbacks for broken logic—fix the root cause
- ✅ Use **global resources** and context where possible
- ✅ Reuse **existing files** when fixing bugs or extending features
- ❌ **Do not** create new files unless implementing a completely new feature

---

## 🧭 Task 1: Set the Goal and Constraints

**Instructions:**

- Clearly state the goal of the task or feature
- List all relevant constraints (tech, design, or platform)

**📝 Output Format (append to `eng_doc`):**

```markdown
### 🎯 Goal

{describe the feature or fix objective}

### ⚠️ Constraints

- {constraint 1}
- {constraint 2}
  Task 2: Identify or Create the Solution

Instructions:
• Check if a solution already exists in the codebase
• If yes, document it
• If no, create a clean, minimal solution based on the constraints

📝 Output Format (append to eng_doc): ### ✅ Solution Overview
{brief summary of the approach or file/component being used}

### ⚠️ Constraints

- {reuse constraints from above}
  Task 3: Understand Current Architecture

Instructions:
• Determine if this is a new feature or an update to an existing one
• If it exists:
• Map out the architecture clearly
• Identify all relevant layers and components

Architecture Breakdown:
• Client (components, hooks, providers)
• Server (APIs, services)
• Global utilities and context
• Database (if relevant)

📝 Output Format (append to eng_doc): ### 🏗️ Current Architecture

\`\`\`ansi
CLIENT:

- Component: ...
- Hook: ...
- Provider: ...

SERVER:

- API Route: ...
- Service: ...

SHARED:

- Global Contexts: ...
- Utilities: ...

DATABASE:

- Table: ...
- Schema: ...
  \`\`\`

Task 4: Architect the New Solution

Instructions:
• Propose the updated or new architecture for the feature
• Ensure you only build what’s needed, and reuse global modules

📝 Output Format (append to eng_doc):### 🛠️ Proposed Architecture

\`\`\`ansi
CLIENT:

- Component: ...
- Hook: ...
- Provider: ...

SERVER:

- API Route: ...
- Service: ...

SHARED:

- Global Contexts: ...
- Utilities: ...

DATABASE:

- Table: ...
- Schema: ...
  \`\`\`

Task 5: Code the Changes

Instructions:
• Define exactly what needs to change or be added
• Write clean, minimal code scoped to the architecture above
• Only refactor or touch files directly involved in the change
• If unsure, “review with a 10x engineer” to simplify further

Code Zones to Consider:
• Client: Components, hooks
• Server: API routes, services
• Shared: Contexts, utilities
• Data: Database schemas, Supabase integration

📝 Output Format (append to eng_doc): ### 🧑‍💻 Code Tasks

- [ ] Update hook: ...
- [ ] Refactor API: ...
- [ ] Add chart modal logic

### ✅ Code Changes Summary

{insert summary or diff, optionally in markdown code blocks}

Always append updates to eng_doc in a consistent format. This doc becomes the single source of truth for design, engineering, and AI agents.
```
## Rules 
###  TypeScript Rules
### FORBIDDEN - NEVER DO THESE:
-  **Do not disable `strict` mode** in your `tsconfig.json`.
  - This removes critical type checks and leads to fragile LLM pipelines.

- ❌ **Do not use `any` for request/response types.**
  - Use `unknown` with proper validation or define explicit interfaces for LLM inputs/outputs.

- ❌ **Do not hardcode strings for roles, actions, or types.**
  - Replace magic strings like `"system"` or `"tool_call"` with enums or literal unions.

- ❌ **Do not leave function return types implicit.**
  - Always declare return types to avoid accidental `void` or incorrect inference.

- ❌ **Do not mutate shared state unless absolutely necessary.**
  - Prefer immutable patterns with `const` and `readonly`—especially in async agent execution.

- ❌ **Do not use loosely typed object maps (e.g., `{ [key: string]: any }`).**
  - Use `Record<string, Type>` or proper typed maps for tool registries or memory caches.

- ❌ **Do not skip handling all cases in `switch` statements.**
  - Always handle all literal types; add a `never` fallback to catch new unhandled cases.

- ❌ **Do not mix types and logic in the same file.**
  - Keep interfaces, enums, and types in separate files/modules (`types/`, `schemas/`).

- ❌ **Do not assume LLM responses follow schema blindly.**
  - Always parse and validate responses, especially when using function-calling or structured outputs.

- ❌ **Do not use catch-all `try/catch` blocks without logging or error typing.**
  - Catch specific errors, type them, and handle known failure modes in chain/tool execution.
  - - ❌ **Do not use @ts-ignore

  ALWAYS DO THESE: 
  **Always co-locate logic with purpose, not reuse.**
  - Keep agent logic with agent handlers, tool logic with tools. Avoid premature generalization.

- ✅ **Always define explicit return types on all public and shared functions.**
  - Prevents accidental leakage of internal structure and helps ensure LLM outputs are validated.

- ✅ **Always validate LLM output before using it.**
  - Even when using structured outputs, parse with Zod or guards before assuming types.

  **Always watch for unnecessary re-renders in React.**
  - Use `React.memo`, `useMemo`, and `useCallback` to avoid recomputing props or handlers in LLM streaming UIs.

- ✅ **Always debounce or throttle expensive updates.**
  - For example, don’t call `useEffect(() => saveToServer(), [text])` on every keystroke—debounce.

- ✅ **Always minimize re-renders when streaming tokens.**
  - Append streamed content to a `ref`, then batch update state with requestAnimationFrame or throttling.

- ✅ **Always memoize expensive LLM decisions (tool routing, JSON parsing).**
  - Cache common prompt chains and precomputed tool lookups using a stable key.

- ✅ **Always batch state updates that are logically grouped.**
  - Multiple `setState` or `dispatch` calls should be wrapped in a batch to avoid render thrashing.

- ✅ **Always break down large components into functional units.**
  - Avoid single files managing input, output, tool picking, streaming, and retry logic all at once.

  - ✅ **Always check for stale state in async handlers.**
  - For example, cancel async requests in `useEffect` to avoid updating unmounted components.

- ✅ **Always wrap fetch calls and LLM requests with retry + timeout logic.**
  - Prevents a hanging UI when OpenAI or a tool API delays or fails.

- ✅ **Always use `exhaustive checks` for state machines.**
  - Whether in agent state or UI mode (`idle`, `streaming`, `error`), assert all possible values are handled.


  ## React and NEXT JS RUles
  - ### 🧠 General React Rules

- ✅ **Always co-locate component logic, styles, and types.**
  - Keep everything a component needs in one directory/file (`/components/MyWidget/index.tsx`, `types.ts`, `styles.ts`).

- ✅ **Always use functional components and React Hooks.**
  - Avoid class components unless absolutely required for legacy code.

- ✅ **Always memoize callbacks with `useCallback`.**
  - Especially when passing handlers to children or UI libraries (e.g., tables, charts, modals).

- ✅ **Always use `React.memo` or `useMemo` for expensive renders.**
  - Prevent unnecessary re-renders for pure/unchanged props or derived values.

- ✅ **Always debounce or throttle events like `onChange`, `onScroll`, `onResize`.**
  - Avoid lag from excessive rerenders or API calls.

- ✅ **Always cleanup effects (`useEffect`) with return callbacks.**
  - Prevents memory leaks and state updates on unmounted components.

- ✅ **Always destructure props early and explicitly.**
  - Makes components easier to read and enables better tree shaking.

- ✅ **Always lift state only when necessary.**
  - Don’t over-lift state; keep local state local unless coordination is needed.

- ✅ **Always extract reusable logic into custom hooks.**
  - Example: `useAutoSaveDraft`, `usePRDScrollSync`, `useJiraSyncStatus`.

---

### ⚙️ Next.js Rules

- ✅ **Always use the App Router (`app/`) unless legacy support requires Pages Router.**
  - It's the future of Next.js; provides React Server Components, better layouts, and async streaming.

- ✅ **Always use Server Components by default.**
  - Use Client Components *only* when needed (e.g., interactivity, hooks like `useState`).

- ✅ **Always colocate `loading.tsx`, `error.tsx`, and `not-found.tsx` in route segments.**
  - Provides great UX by leveraging Next.js features.

- ✅ **Always fetch data using `fetch()` or libraries inside Server Components.**
  - Avoids overfetching, client bloat, and props drilling.

- ✅ **Always cache or revalidate API routes with headers or `next.config.js`.**
  - Avoid reprocessing static content or routes on every request.

- ✅ **Always use `use client` only at the top of a file when needed.**
  - Never sprinkle it mid‑file. Clearly separate client/server logic.

- ✅ **Always use `generateMetadata()` or `metadata` export for SEO.**
  - Don’t hardcode `<head>` logic in layout files.

- ✅ **Always define a clear folder structure for `app/` or `pages/`.**
  - Use `/components`, `/lib`, `/hooks`, `/types`, `/app/api/`, etc.

- ✅ **Always use environment variables (`process.env`) with prefixes (`NEXT_PUBLIC_`) correctly.**
  - Avoid leaking secrets to the client.

---

### 📦 Styling, Bundling, and Performance

- ✅ **Always use CSS modules or Tailwind CSS.**
  - Avoid global CSS unless intentional. Prefer scoped styling to prevent collisions.

- ✅ **Always optimize images with Next.js `<Image>` component.**
  - Automatically adds lazy loading, responsive sizes, and WebP support.

- ✅ **Always lazy-load non-critical components with `dynamic()`**
  - Reduces first-load bundle size and improves TTI (time to interactive).

- ✅ **Always analyze bundles (`next build && next analyze`).**
  - Identify large dependencies or accidental imports in client components.

---

### 🔐 Security & DX

- ✅ **Always sanitize user-generated content before rendering (especially HTML from LLMs).**
  - Use libraries like DOMPurify if injecting HTML into the DOM.

- ✅ **Always use TypeScript throughout.**
  - Don't mix TS and JS—use `.ts`/`.tsx` everywhere for consistency and type safety.

- ✅ **Always wrap API calls with unified error handling.**
  - Use `try/catch`, `toast.error()`, and a logging service (e.g., Sentry).

- ✅ **Always split logic from components.**
  - Avoid giant files that mix API calls, UI, and form state. Use `lib/`, `hooks/`, `services/`.

- ✅ **Always lint and format with `eslint`, `prettier`, and `husky`.**
  - Enforce consistent quality before every commit.

  **All linters and formatters pass with zero issues**
  - Includes `eslint`, `prettier`, and `tsc --noEmit` (strict mode).
  - No `any`, no `ts-ignore`, and all types are explicit or safely inferred.

  - ✅ **Feature works end-to-end**
  - Includes UI, API routes (Next.js or Buildship/Supabase), DB integration, and any third-party APIs (e.g. Jira).

- ✅ **Old code and unused paths are deleted**
  - No commented-out legacy code or obsolete flags. Clean the tree.

- ✅ **Types and exports are documented**
  - All exported functions, hooks, and types are documented with meaningful descriptions (JSDoc style).
  - For backend DB functions, describe shape of return types and Postgres queries.

- ✅ **React performance is sane**
  - No excessive re-renders (confirmed with React DevTools).
  - State is correctly scoped and memoized using `useMemo`, `useCallback`, or `React.memo` where needed.

- ✅ **PRD logic is validated**
  - AI-generated PRDs or Jira-sync logic is schema-validated (Zod or manual guards).
  - Edge cases like incomplete requirements, nulls, or LLM failures are handled.

- ✅ **Database changes are committed and reversible**
  - Postgres migrations are tracked, reversible, and tested against dev DB.
  - Query performance is checked on large datasets if applicable.

- ✅ **Feature flags or environment variables are documented**
  - New `.env` keys or toggles are added to the shared config reference.

- ✅ **Deployment is tested**
  - Feature is verified in the deployed preview/staging environment (e.g., Vercel, Supabase dashboard).

- ✅ **DX is preserved**
  - No broken Storybook stories, unregistered hooks, or untyped component props.
  - App compiles, dev server runs, and Vercel build passes.
