# CLAUDE.md - Codebase Guidelines for Possible Demo

## Build/Lint Commands
- Development: `npm run dev --turbopack` (for fast refresh)
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`

## Code Style Guidelines

### Project Structure
- Next.js App Router with TypeScript, React 19, and shadcn/ui components
- Path aliases: `@/components`, `@/lib`, `@/hooks`, etc.

### TypeScript/Formatting
- Strict mode enabled, ES2017 target
- Use interfaces for component props with descriptive types
- Define explicit return types for functions/components
- Use double quotes for strings and 2-space indentation

### Component Patterns
- React Server Components by default; add "use client" when needed
- Props should be destructured with default values when appropriate
- Use PascalCase for components/types, camelCase for variables/functions
- Leverage conditional rendering with ternary operators and logical && 

### CSS & Styling
- Tailwind CSS with shadcn/ui (New York style)
- Use `cn()` utility for conditional class names
- Group related styles logically

### Error Handling
- Use early returns with null checks
- Leverage optional chaining and nullish coalescing
- Type assertions only when values are guaranteed

### State Management
- Use React hooks appropriately
- Prefer smaller, focused components over large ones
- Extract complex logic into custom hooks or utility functions