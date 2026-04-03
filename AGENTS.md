<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:developing-locally-agent-rules -->
## REQUIREMENTS

- Bun runtime is to be used exclusively.
- bun run dev has been modified to deploy development on <project-name>.localhost
- bun run build cannot be used to verify that the project builds
- bun tsc --watch and bun lint can be used to verify that typescript is valid.
- bun tsc && bun lint --fix --max-warnings 9999 must be run before committing changes.

@README.md
<!-- END:developing-locally-agent-rules -->
