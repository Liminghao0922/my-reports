# Copilot Instructions for AI Coding Agents

## Project Overview
This is a **Power BI & Looker Report Hosting Site** - a modern **React application** using **MSAL.js authentication** to embed and display Power BI and Looker reports. The site is built with **Vite** and deployed to Azure Static Web Apps.

## Architecture & Key Components

### Core Structure
- **React 18.2** with functional components and hooks
- **Vite 5.0** for fast build and development
- **React Router 6.20** for client-side routing
- **@azure/msal-react** for Azure AD authentication
- **Power BI JavaScript SDK** for report embedding
- **Azure Static Web Apps hosting** - no backend API required
- **Fully client-side architecture**

### Key Files & Directories
- `index.html` - Vite entry HTML
- `vite.config.js` - Vite configuration with environment variable injection
- `src/main.jsx` - React application entry point
- `src/App.jsx` - Main app with routing and MSAL provider
- `src/config/authConfig.js` - MSAL configuration
- `src/components/` - Reusable React components (Navigation, Footer, Layout, etc.)
- `src/pages/` - Page components (Home, PowerBIReport, LookerReport)
- `src/assets/css/styles.css` - Global styles
- `staticwebapp.config.json` - Azure Static Web Apps routing
- `build.ps1` - Build script using Vite
- `docs/LOOKER_AUTH_MODES.md` - Looker authentication guide

## Authentication & Security
- Use **@azure/msal-react (v2.x)** for React-based Azure AD authentication
- **Single-page application (SPA)** type app registration required
- **Delegated permissions**: Report.Read.All, Dataset.Read.All, Workspace.Read.All
- **No client secrets** - browser-based public client flow
- Users authenticate with their Power BI credentials via popup
- Row-Level Security (RLS) automatically applied based on user identity

## Power BI Integration Pattern
- **User Owns Data model** - users access reports with their own Power BI permissions
- Direct embedding using Power BI JavaScript SDK with AAD token (TokenType.Aad)
- No embed token generation required - uses user's access token
- Token refresh handled automatically every 50 minutes
- Proper cleanup on component unmount to avoid duplicate embeds
- Example embed URL: `https://app.powerbi.com/reportEmbed?reportId={REPORT_ID}&groupId={WORKSPACE_ID}`

## Looker Integration Pattern
- **Four authentication modes**: public, required, sso, filter
- Default iframe embedding with fallback to popup window
- **public** - No authentication required
- **required** - User must sign in but no context passed
- **sso** - Pass user email/name to Looker via URL parameters
- **filter** - Row-Level Security with user email filter (params.user_email)
- Automatic detection of Looker Studio iframe restrictions

## Development Workflow
1. **Local development**: Use `npm run dev` (Vite dev server with HMR)
2. **Environment setup**: Set environment variables in `.env` file
3. **Build**: Run `npm run build` (Vite builds to `dist/`)
4. **Preview**: Run `npm run preview` to test production build
5. **Testing**: Test authentication flow with actual Azure AD and Power BI
6. **Deployment**: Push to GitHub, automatic deployment via Azure Static Web Apps

## Deployment Configuration
- Deploy to **Azure Static Web Apps** via GitHub Actions
- **No backend API** - only static file hosting needed
- Set environment variables in Azure Static Web Apps configuration
- Required variables: POWERBI_CLIENT_ID, POWERBI_TENANT_ID, POWERBI_WORKSPACE_ID, POWERBI_REPORT_ID
- Optional: LOOKER_EMBED_URL, LOOKER_DASHBOARD_ID, LOOKER_AUTH_METHOD
- Configure redirect URIs in Azure AD app registration: `https://your-site.azurestaticapps.net`

## React Component Conventions
- **Functional components** with hooks only (no class components)
- Use **React Router** for navigation (`<Link>`, `<Outlet>`)
- Use **useMsal()** hook for authentication state
- Use **useRef()** for DOM references and persistent values
- Use **useEffect()** with proper cleanup functions
- Keep components focused and single-purpose
- Props destructuring in function parameters
- Consistent error handling with ErrorMessage component
- Loading states with Loading component

## State Management
- Local state with **useState** for component-level state
- **useRef** for PowerBI service instances and DOM references
- **useMsal** hook for authentication state
- **React Router** for URL-based state
- No global state management library needed (Redux/Context not required)

## UI/UX Conventions
- **Minimal design** - focus on report display
- Responsive layout for desktop and tablet
- Sign in/sign out buttons in navigation
- Loading spinner during authentication and report loading
- Error handling with user-friendly messages and retry buttons
- Automatic token refresh on expiration
- User info display in navigation when authenticated
- Active navigation state highlighting
