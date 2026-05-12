# Demo 2 — Project Instructions

## Tech Stack
- **Build**: Vite 8 + TypeScript 6
- **Runtime**: Browser (ESM modules)
- **Package Manager**: npm

## Conventions
- Use TypeScript strict mode
- ESM imports with `.js` extensions in compiled output
- CSS in `src/style.css` — vanilla CSS, no frameworks
- Assets in `src/assets/` and `public/`

## Agents Available
This project has custom subagents configured in `.claude/agents/`:

| Agent | Purpose | Model |
|-------|---------|-------|
| `code-reviewer` | Post-change code review | Sonnet |
| `explorer` | Fast read-only codebase research | Haiku |
| `test-runner` | Run tests and fix failures (worktree isolated) | Sonnet |
| `implementer` | Build features in background (worktree isolated) | Sonnet |
| `architect` | Deep design analysis and ADRs | Opus |

## Development
```bash
npm run dev    # Start dev server
npm run build  # Production build
```

## Working with Parallel Agents
- Use `claude agents` to open agent view and dispatch background sessions
- Use `claude --worktree <name>` to start isolated sessions
- Agent teams are enabled via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- Worktrees branch from local HEAD (configured in settings)
