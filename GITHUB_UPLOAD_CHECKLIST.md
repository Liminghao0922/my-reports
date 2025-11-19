# GitHub Upload Checklist

## ✅ Pre-Upload Verification (Completed)

### Project Structure
- ✅ 15 files/directories in root (excluding node_modules, dist, .git)
- ✅ All vanilla JS files deleted
- ✅ All Chinese documentation converted to English
- ✅ All intermediate files removed

### Critical Files
- ✅ `package.json` - React v3.0.0 dependencies
- ✅ `vite.config.js` - Vite build configuration
- ✅ `index.html` - Vite entry point
- ✅ `README.md` - Complete English documentation
- ✅ `CHANGELOG.md` - Version history
- ✅ `.gitignore` - Comprehensive exclusions (88 lines)
- ✅ `.github/workflows/azure-static-web-apps.yml` - Updated for Vite build

### React Components
- ✅ `src/main.jsx` - Application entry
- ✅ `src/App.jsx` - Router and MSAL provider
- ✅ `src/components/` - All components created
- ✅ `src/pages/` - PowerBIReport and LookerReport
- ✅ `src/config/authConfig.js` - MSAL configuration

### Documentation
- ✅ `docs/LOOKER_AUTH_MODES.md` - Complete English guide (244 lines)
- ✅ All README files in English
- ✅ Architecture documentation removed (redundant with README)

## 📋 GitHub Upload Steps

### 1. Verify Git Status
```powershell
git status
```
**Expected:** No .env, node_modules, or dist files should appear

### 2. Stage All Changes
```powershell
git add .
```

### 3. Verify Staged Files
```powershell
git status
```
**Check:** Ensure only source files are staged (no .env, node_modules, dist)

### 4. Commit Changes
```powershell
git commit -m "Migrate to React v3.0.0 with Vite, MSAL, and multi-mode Looker auth"
```

### 5. Push to GitHub
```powershell
git push origin main
```

## 🔐 GitHub Repository Secrets Configuration

After uploading, configure these secrets in GitHub repository settings:

### Required Secrets
1. `AZURE_STATIC_WEB_APPS_API_TOKEN_SALMON_HILL_0B1C45200`
   - Value: Your Azure Static Web Apps deployment token
   - Found in: Azure Portal → Static Web Apps → Overview

2. `POWERBI_CLIENT_ID`
   - Value: Your Azure AD app client ID
   - Example: `12345678-1234-1234-1234-123456789012`

3. `POWERBI_TENANT_ID`
   - Value: Your Azure AD tenant ID
   - Example: `87654321-4321-4321-4321-210987654321`

4. `POWERBI_WORKSPACE_ID`
   - Value: Your Power BI workspace GUID
   - Example: `abcdef12-3456-7890-abcd-ef1234567890`

5. `POWERBI_REPORT_ID`
   - Value: Your Power BI report GUID
   - Example: `fedcba98-7654-3210-fedc-ba9876543210`

6. `POWERBI_REPORT_NAME`
   - Value: Display name for your report
   - Example: `Sales Dashboard`

### Optional Secrets (Looker)
7. `LOOKER_EMBED_URL` (optional)
   - Value: Your Looker Studio embed URL
   - Example: `https://lookerstudio.google.com/embed/reporting/...`

8. `LOOKER_DASHBOARD_ID` (optional)
   - Value: Looker dashboard ID
   - Example: `12345678-90ab-cdef-1234-567890abcdef`

9. `LOOKER_AUTH_METHOD` (optional)
   - Value: One of `public`, `required`, `sso`, `filter`
   - Default: `public`

## 🚀 Post-Upload Verification

### 1. Check GitHub Actions
- Navigate to: Repository → Actions tab
- Verify: Build workflow runs successfully
- Check: All environment variables injected correctly

### 2. Verify Azure Deployment
- Wait: ~2-3 minutes for deployment
- Check: Azure Static Web Apps deployment status
- Test: Visit your live site URL

### 3. Test Functionality
- ✅ Navigation works (Home, Power BI, Looker)
- ✅ Azure AD login/logout
- ✅ Power BI report embeds correctly
- ✅ Looker report respects auth mode
- ✅ Token refresh works (wait 50+ minutes)
- ✅ Mobile/tablet responsiveness

## 📝 Notes

### Build Process
- GitHub Actions now runs `npm ci` and `npm run build`
- Vite builds to `dist/` directory
- Environment variables injected during build with VITE_ prefix
- No PowerShell build scripts needed in CI/CD

### Security
- `.env` file is git-ignored (contains local secrets)
- `.env.example` shows required variables (safe to commit)
- Production secrets configured in GitHub repository settings
- Azure Static Web Apps injects secrets during deployment

### Troubleshooting
If deployment fails:
1. Check GitHub Actions logs for errors
2. Verify all required secrets are configured
3. Ensure secret names match workflow file
4. Check Azure Static Web Apps logs in Azure Portal
5. Verify redirect URIs in Azure AD app registration

## ✨ Success Criteria

Your upload is successful when:
- ✅ GitHub Actions workflow completes without errors
- ✅ Azure Static Web Apps shows "Ready" status
- ✅ Site loads at your Azure URL
- ✅ Authentication redirects to Azure AD
- ✅ Reports embed correctly after login
- ✅ No console errors in browser DevTools

---

**Ready to upload!** 🎉

Run: `git add . && git commit -m "Migrate to React v3.0.0" && git push origin main`
