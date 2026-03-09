# Invitation

A modern, interactive invitation and greeting card application built with React, TypeScript, and Vite.

## Project Background

The Invitation project provides users with an elegant way to create and send personalized digital greeting cards. The application features a card-based interface with multiple card types including:

- **Greetings** - Standard greeting messages
- **Thank You / Grateful** - Gratitude expressions  
- **Apologies / Regret** - Apology cards
- **Preferences** - Preference/choice cards
- **Email Flow** - Streamlined email integration
- **Starting Cards** - Initial card selection

Built with modern web technologies, the app integrates with email services (EmailJS), Google APIs, and generative AI (Google's Generative AI) to provide intelligent, personalized greeting card experiences.

### Key Features

- 🎨 **Interactive Card Interface** - Smooth card-based UI for creating invitations
- 📧 **Email Integration** - Send cards directly via email using EmailJS
- 🤖 **AI-Powered** - Generative AI integration for intelligent content suggestions
- 🔐 **Type-Safe** - Full TypeScript support for robust development
- 🧪 **Fully Tested** - Vitest with React Testing Library and MSW
- 📱 **Responsive Design** - TailwindCSS for modern styling
- ✅ **Code Quality** - ESLint, Prettier

## Installation & Setup

### Using pnpm (Recommended)

```sh
pnpm install
pnpm dev
```

### Using bun

```sh
bun install
bun run dev
```

### Prerequisites

- **Node.js** 22.21.1 or later
- **pnpm** 10.25.0+ or **bun** 1.0+

## Available Commands

### pnpm Commands

```sh
pnpm dev             # start development server
pnpm start           # start development server
pnpm build           # build production bundle
pnpm preview         # preview production bundle locally
pnpm test            # run tests once
pnpm test:watch      # run tests in watch mode
pnpm test:ui         # run tests with UI
pnpm lint            # run eslint
pnpm lint:fix        # run eslint with --fix option
pnpm typecheck       # run TypeScript compiler check
pnpm prettier        # run prettier to format code
pnpm validate        # run test, lint, build, and typecheck concurrently
pnpm clean           # remove node_modules, lock files, and dist
pnpm remove:tailwind # remove TailwindCSS dependency
```

### bun Commands

```sh
bun run dev          # start development server
bun run start        # start development server
bun run build        # build production bundle
bun run preview      # preview production bundle locally
bun run test         # run tests once
bun run test:watch   # run tests in watch mode
bun run test:ui      # run tests with UI
bun run lint         # run eslint
bun run lint:fix     # run eslint with --fix option
bun run typecheck    # run TypeScript compiler check
bun run prettier     # run prettier to format code
bun run validate     # run test, lint, build, and typecheck concurrently
bun run clean        # remove node_modules, lock files, and dist
bun run remove:tailwind # remove TailwindCSS dependency
```

## Technologies

- **React** 19+ - UI Library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **MSW** - Mock Service Worker for API mocking
- **EmailJS** - Email service integration
- **Google Generative AI** - AI-powered content suggestions
- **Lint-Staged** - Git hooks for code quality
- **ESLint** - Code linting
- **Prettier** - Code formatting

## CI/CD & Package Managers

### pnpm (Default)

The project is configured to use **pnpm** by default as specified in `package.json`:

```json
"packageManager": "pnpm@10.25.0"
```

Standard GitHub Actions workflows run with pnpm:
- `.github/workflows/build.yml`
- `.github/workflows/test.yml`
- `.github/workflows/lint.yml`
- `.github/workflows/typecheck.yml`

### bun Support

Full support for **bun** is available with dedicated workflow files:
- `.github/workflows/build-bun.yml`
- `.github/workflows/test-bun.yml`
- `.github/workflows/lint-bun.yml`
- `.github/workflows/typecheck-bun.yml`

To use bun in CI/CD:
1. Update your fork to use the bun workflows
2. Or use the prepare action with bun:
   ```yaml
   - uses: ./.github/actions/prepare
     with:
       packageManager: 'bun'
   ```


## Project Structure

```
src/
├── pages/          # Page components and main app routes
├── components/     # Reusable UI components
├── services/       # External service integrations
├── utils/          # Utility functions and reducers
├── @types/         # TypeScript type definitions
└── App.tsx         # Main application component
```

## Development Workflow

1. **Create a feature branch**: `git checkout -b feature/your-feature`
2. **Make your changes** 
3. **Run validation**: `pnpm validate` or `bun run validate`
4. **Push and create a Pull Request**

## Testing

Run the test suite:

```sh
# pnpm
pnpm test
pnpm test:watch
pnpm test:ui

# bun
bun run test
bun run test:watch
bun run test:ui
```

## Code Quality

The project enforces code quality through:

- **ESLint** - Identifies and fixes code issues
- **Prettier** - Auto-formats code
- **TypeScript** - Static type checking
- **Vitest** - Unit and component testing

## License

MIT
