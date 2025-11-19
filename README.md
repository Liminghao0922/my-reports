# Power BI & Looker Report Site - React Version

🎉 **Modern React application** for hosting Power BI and Looker Studio reports with MSAL.js authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Azure AD App Registration (SPA type)
- Power BI workspace and report
- Looker Studio dashboard (optional)

### Installation

1. **Clone and install dependencies:**
```powershell
git clone https://github.com/Liminghao0922/my-reports.git
cd my-reports
npm install
```

2. **Configure environment variables:**

Create a `.env` file in the root directory:

```env
# Power BI Configuration
POWERBI_CLIENT_ID=your-azure-ad-app-client-id
POWERBI_TENANT_ID=your-azure-ad-tenant-id
POWERBI_WORKSPACE_ID=your-powerbi-workspace-id
POWERBI_REPORT_ID=your-powerbi-report-id
POWERBI_REPORT_NAME=Your Report Name

# Looker Configuration (Optional)
LOOKER_EMBED_URL=https://lookerstudio.google.com/embed/reporting/your-dashboard-id
LOOKER_DASHBOARD_ID=your-dashboard-id
LOOKER_AUTH_METHOD=public
```

3. **Run development server:**
```powershell
npm run dev
```

Visit http://localhost:3000

### Build for Production

```powershell
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```powershell
npm run preview
```

## 🏗️ Tech Stack

- **React 18.2** - UI framework
- **Vite 5.0** - Build tool with HMR
- **React Router 6.20** - Client-side routing
- **@azure/msal-react 2.0** - Azure AD authentication
- **Power BI Client 2.22** - Power BI embedding
- **ES Modules** - Native ESM support

## 📁 Project Structure

```
pbi-report/
├── index.html                    # Vite entry HTML
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies
├── .env                          # Environment variables (git ignored)
├── src/
│   ├── main.jsx                  # React app entry
│   ├── App.jsx                   # Main app with routing
│   ├── config/
│   │   └── authConfig.js         # MSAL configuration
│   ├── components/
│   │   ├── Layout.jsx            # Main layout wrapper
│   │   ├── Navigation.jsx        # Navigation bar
│   │   ├── Footer.jsx            # Footer component
│   │   ├── Loading.jsx           # Loading spinner
│   │   └── ErrorMessage.jsx      # Error display
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── PowerBIReport.jsx     # Power BI report viewer
│   │   └── LookerReport.jsx      # Looker Studio viewer
│   └── assets/
│       └── css/
│           └── styles.css        # Global styles
└── dist/                         # Build output (generated)
```

## 🔐 Azure AD Configuration

1. **Create App Registration:**
   - Type: **Single-Page Application (SPA)**
   - Redirect URI: `http://localhost:3000` (dev) and your production URL
   
2. **Required API Permissions:**
   - `Report.Read.All` (Delegated)
   - `Dataset.Read.All` (Delegated)
   - `Workspace.Read.All` (Delegated)

3. **Authentication Flow:**
   - Uses **popup mode** (not redirect)
   - Token auto-refresh every 50 minutes
   - Session storage for cache

## 🎯 Features

✅ **Modern React Architecture**
- Component-based design
- React Hooks for state management
- React Router for navigation
- Hot Module Replacement (HMR)

✅ **MSAL Authentication**
- Popup-based login/logout
- Automatic token refresh
- Silent token acquisition
- User info display

✅ **Power BI Integration**
- AAD token-based embedding
- Report controls (refresh, fullscreen, print)
- Error handling and retry
- Proper cleanup on unmount

✅ **Looker Studio Support**
- Popup window for Looker Studio (bypasses iframe restrictions)
- Multiple auth methods (SSO, embed_url, public)
- User context passing

## 🔧 Development

### Available Scripts

- `npm run dev` - Start dev server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run start` - Alias for dev

### Environment Variables

Vite exposes environment variables prefixed with `VITE_`:

```javascript
// Access in code:
import.meta.env.VITE_POWERBI_CLIENT_ID
```

The `vite.config.js` automatically maps your `.env` variables to the `VITE_` prefix.

## 🚢 Deployment

### Azure Static Web Apps

The project includes `staticwebapp.config.json` for Azure Static Web Apps deployment.

**GitHub Actions workflow** is already configured in `.github/workflows/`.

### Environment Variables in Azure

Set these in your Azure Static Web App configuration:

- `POWERBI_CLIENT_ID`
- `POWERBI_TENANT_ID`
- `POWERBI_WORKSPACE_ID`
- `POWERBI_REPORT_ID`
- `POWERBI_REPORT_NAME`
- `LOOKER_EMBED_URL` (optional)
- `LOOKER_DASHBOARD_ID` (optional)
- `LOOKER_AUTH_METHOD` (optional)

## 📝 Migration Notes

This is the **React version** (v3.0.0) of the Power BI Report Site.

**Key Changes from v2.0:**
- ✅ Migrated from vanilla JS to React
- ✅ Vite replaces custom PowerShell build scripts
- ✅ Component-based architecture
- ✅ Better state management
- ✅ Improved error handling
- ✅ Hot Module Replacement for development
- ✅ TypeScript-ready (type definitions included)

## 🐛 Troubleshooting

### Power BI Report Not Loading

1. **Check authentication:** Make sure you're signed in
2. **Verify environment variables:** Check `.env` file
3. **Console errors:** Open browser DevTools
4. **Token permissions:** Ensure API permissions are granted in Azure AD

### Looker Studio Issues

- Looker Studio cannot be embedded in iframes
- Use the popup button to open in a new window
- Ensure `LOOKER_EMBED_URL` is correct

### MSAL Errors

- **"redirect_in_iframe":** Already fixed - using popup mode
- **"Token expired":** Auto-refresh is implemented
- **"Invalid client":** Check `POWERBI_CLIENT_ID`

## 📚 Documentation

- [MSAL.js Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)
- [Power BI Embedded](https://docs.microsoft.com/power-bi/developer/embedded/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)

## 📄 License

MIT

## 👤 Author

Li Minghao

---

**Version:** 3.0.0 (React)  
**Last Updated:** November 2025
