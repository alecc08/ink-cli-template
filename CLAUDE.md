# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive CLI template built with Ink (React for CLIs) and TypeScript. It features an animated splash screen, browser-based authentication via local HTTP server, and entity management (Teams and Repositories) with advanced form inputs.

## Development Commands

```bash
# Build the TypeScript project
npm run build

# Watch mode for development (rebuilds on file changes)
npm run dev

# Build and run the CLI
npm start

# Prepare for publishing (runs automatically before npm publish)
npm run prepublishOnly
```

## Architecture

### Application Flow

The application follows a view-based state machine pattern managed in `src/app.tsx`:

1. **SPLASH** → Animated flame introduction (`components/Splash.tsx`)
2. **LOGIN_FLOW** → Browser-based auth via local HTTP server (`components/LoginServer.tsx`, `auth-server.ts`)
3. **DASHBOARD** → Main menu with nested navigation (`components/Dashboard.tsx`)
4. **Entity Management** → Multi-step forms for Teams and Repositories

### State Management

All application state is centralized in `src/app.tsx` using React useState hooks:
- `view`: Controls which screen is displayed (View type)
- `user`: Authenticated user name
- `requests`: In-memory storage of all CRUD operations
- `teams` and `repos`: Local entity storage (optimistically updated)
- `selectedEntityId`: Tracks entity being modified

### Authentication Flow

Authentication uses a real HTTP server (`auth-server.ts`) that:
1. Starts on port 3000 when login screen appears
2. Serves an HTML form at `http://localhost:3000`
3. User submits their name via browser
4. Server closes and resolves with the username
5. CLI transitions to Dashboard view

This pattern is in `src/components/LoginServer.tsx` which wraps the server startup.

### Entity Management Pattern

Both Teams and Repositories follow the same flow:
- **Selection**: `EntitySelector.tsx` provides searchable entity list
- **Forms**: `EntityForm.tsx` handles both ADD and MODIFY operations with multi-step input
- **Request Tracking**: All operations create Request objects stored in app state

### Form System (`EntityForm.tsx`)

The form component supports three field types:
- `text`: Single-line text input using `ink-text-input`
- `select`: Single choice dropdown using `ink-select-input`
- `multi-select`: Custom implementation with number keys (1-N) to toggle selections

Multi-select state is handled separately from other form fields. Users press number keys to toggle options, then Enter to confirm.

### Component Communication

Data flows one-way from `app.tsx` to child components via props:
- `onLogin`: Callback from LoginServer to set authenticated user
- `onSelect`: Dashboard menu selections trigger view changes
- `onSubmit`: EntityForm creates Request objects passed back to app
- `onCancel`: Returns to Dashboard from any sub-view

## Type System

Key types defined in `src/app.tsx`:
- `View`: Union type of all possible screen states
- `Team`: Entity with id, name, description, lead
- `Repository`: Entity with id, name, language[], visibility
- `Request`: Tracked operation with type, action, data, status

## Build Configuration

- **TypeScript**: ESM modules with NodeNext resolution (`tsconfig.json`)
- **Output**: Compiled to `dist/` directory
- **Entry**: `dist/cli.js` is the executable (shebang in `src/cli.tsx`)
- **JSX**: React JSX transform enabled for Ink components

## Module Resolution

The project uses ESM with `.js` extensions in imports (TypeScript convention for NodeNext):
```typescript
import App from './app.js';  // Note: .js extension for .tsx file
```
