# Projects Directory

This directory contains modular, self-contained project applications that can be easily swapped in and out of the portfolio.

## Structure

```
projects/
├── streamflow/              # StreamFlow AI chatbot platform
│   ├── components/          # All React components
│   ├── styles/              # Project-specific CSS
│   ├── types/               # TypeScript type definitions
│   └── index.tsx            # Main export (entry point)
└── [new-project]/           # Add new projects here
    ├── components/
    ├── styles/
    ├── types/
    └── index.tsx
```

## Adding a New Project

### 1. Create Project Directory

```bash
mkdir -p projects/my-new-project/{components,styles,types}
```

### 2. Create Entry Point

`projects/my-new-project/index.tsx`:

```tsx
'use client';

import YourMainComponent from './components/YourMainComponent';
import './styles/global.css';

export default function MyNewProjectApp() {
  return (
    <div className="my-new-project-app">
      <YourMainComponent />
    </div>
  );
}
```

### 3. Create Next.js Route

`app/my-new-project/page.tsx`:

```tsx
import MyNewProjectApp from '@/projects/my-new-project';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My New Project | Aung Myint Oo',
  description: 'Project description here',
};

export default function MyNewProjectPage() {
  return <MyNewProjectApp />;
}
```

### 4. Update Projects Config

Add to `lib/projects.ts`:

```tsx
{
  id: "my-new-project",
  title: "My New Project",
  description: "Brief description",
  longDescription: "Detailed description",
  image: "/images/projects/my-project.jpg",
  tags: ["React", "TypeScript", "Next.js"],
  demoUrl: "/my-new-project",
  githubUrl: "https://github.com/...",
  featured: true,
}
```

### 5. Access Your Project

Navigate to: `https://aungmyintoo.com/my-new-project`

## Design Principles

1. **Self-Contained**: Each project is fully isolated with its own components, styles, and types
2. **No Dependencies**: Projects don't depend on portfolio code (except shared UI if needed)
3. **Easy Removal**: Delete project folder + route to remove a project
4. **Modular**: Copy entire project folder to move to another codebase
5. **Scalable**: Add unlimited projects without affecting existing ones

## Current Projects

### StreamFlow AI (`/streamflow`)
- **Description**: AI chatbot platform with RAG, lead capture, and CRM integration
- **Backend**: Railway (Flask/Python)
- **API Proxy**: `/api/chat` → forwards to Railway backend
- **Key Features**:
  - Interactive chatbot playground
  - Document knowledge base (RAG)
  - Real-time conversation history
  - Lead qualification
  - CRM synchronization

## API Routes for Projects

If your project needs backend integration:

1. Create API route: `app/api/[your-endpoint]/route.ts`
2. Configure environment variables in `.env.local`
3. Project components call `/api/[your-endpoint]`
4. API route handles server-side logic or proxies to external services

Example (StreamFlow):
```
Frontend → /api/chat → Railway Backend
```

## CSS Isolation

To prevent style conflicts:

### Option 1: CSS Modules (Recommended)
Rename `.css` → `.module.css` and use:
```tsx
import styles from './Component.module.css';
<div className={styles.myClass}>
```

### Option 2: Scoped Namespacing
Use unique class prefixes:
```css
/* streamflow-specific styles */
.streamflow-navbar { ... }
.streamflow-hero { ... }
```

### Option 3: Layout-Level Isolation
Create `app/[project]/layout.tsx` with wrapper className to scope styles.

## Environment Variables

Project-specific env vars go in `.env.local`:

```bash
# StreamFlow AI
RAILWAY_API_URL=https://streamflow-backend.railway.app

# Future Project
MY_PROJECT_API_KEY=...
```

## TypeScript Support

Projects use relative imports for types:
```tsx
import type { MyType } from '../../types';
```

Alternatively, configure path alias in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/projects/*": ["./projects/*"]
    }
  }
}
```

## Deployment Notes

- All projects deploy together as part of the main portfolio
- Vercel automatically handles routes under `/[project-name]`
- Environment variables must be set in Vercel dashboard
- Projects are built during main portfolio build process
