# PMBook

Strategic alignment and business operations platform for government contracting.

## Overview

PMBook is a comprehensive platform designed to streamline strategic alignment and business operations specifically for government contracting. It provides tools and interfaces to manage complex business processes, documentation, and operational workflows.

## Installation

```bash
npm install @captify-io/pmbook
```

## Usage

### Basic Import

```typescript
import { PMBook } from '@captify-io/pmbook'
```

### Available Modules

- `@captify-io/pmbook/app` - Main application components
- `@captify-io/pmbook/components` - Reusable UI components
- `@captify-io/pmbook/services` - Business logic and API services
- `@captify-io/pmbook/types` - TypeScript type definitions
- `@captify-io/pmbook/config` - Configuration utilities

## Dependencies

This package depends on `@captify-io/core ^2.0.2` which provides:
- Core platform functionality and shared components
- Centralized theme system (captify, lite, dark themes)
- Authentication and session management
- Common UI components and utilities

### Migration from @captify-io/platform

Version 1.0.35+ migrates from `@captify-io/platform` to `@captify-io/core`. Key changes:

- Updated dependency to `@captify-io/core@latest`
- All imports now use `@captify-io/core` instead of `@captify-io/platform`
- `apiClient` is imported from `@captify-io/core`
- `useCaptify` is imported from `@captify-io/core/components`
- `auth` is imported from `@captify-io/core/lib`

Version 1.0.36+ introduces centralized configuration:

- **Centralized themes**: Import themes from `@captify-io/core/globals.css`
- **Simplified environment variables**: Use `CAPTIFY_URL` and `NEXT_PUBLIC_CAPTIFY_URL`
- **Authentication proxy**: All auth requests forwarded to platform
- **No hardcoded defaults**: Environment variables must be properly configured

## Environment Variables

Required environment variables:

```bash
# Captify Platform URL
CAPTIFY_URL=http://localhost:3000              # Server-side
NEXT_PUBLIC_CAPTIFY_URL=http://localhost:3000  # Client-side

# Application Port
PORT=3001

# Optional: AWS resources (only needed for local AWS feature testing)
# COGNITO_IDENTITY_POOL_ID=
# BEDROCK_AGENT_ID=
# BEDROCK_AGENT_ALIAS_ID=
```

**Note**: No fallback URLs are hardcoded. Environment variables must be set in `.env.local` for development or via deployment environment for production.

## Development

### Prerequisites

- Node.js >= 18.18 or >= 20
- npm >= 9.8.1

### Setup

```bash
# Install dependencies
npm ci --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

### Scripts

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build for production
- `npm run dist` - Build distributable package
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## License

MIT

## Repository

https://github.com/captify-io/pmbook

## Issues

Report issues at: https://github.com/captify-io/pmbook/issues