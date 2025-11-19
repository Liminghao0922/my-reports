# Looker Authentication Guide

## Authentication Modes Overview

The React application supports multiple Looker report authentication modes, configured via the `LOOKER_AUTH_METHOD` environment variable.

### 1. Public (Open Access) - `LOOKER_AUTH_METHOD=public`

**Features:**
- ✅ No login required to view reports
- ✅ Simplest configuration
- ❌ No user context
- ❌ Cannot use Row-Level Security

**Use Cases:**
- Public dashboards
- Demo environments
- Reports with no sensitive data

**Configuration:**
```env
LOOKER_AUTH_METHOD=public
```

---

### 2. Required (Login Required) - `LOOKER_AUTH_METHOD=required`

**Features:**
- ✅ Users must login to view
- ✅ Verifies user identity
- ❌ Does not pass user context to Looker
- ⚠️ All logged-in users see the same data

**Use Cases:**
- Reports requiring authentication but no data filtering
- Internal team shared reports
- Audit requirements for access tracking

**Configuration:**
```env
LOOKER_AUTH_METHOD=required
```

**Effect:**
- Unauthenticated users see "Authentication Required" prompt
- After login, users can view the report

---

### 3. SSO (Single Sign-On) - `LOOKER_AUTH_METHOD=sso`

**Features:**
- ✅ Passes user information to Looker
- ✅ URL parameters include user context
- ✅ Can use user info in Looker
- ⚠️ Requires Looker configuration to receive parameters

**Use Cases:**
- Looker reports need to know current user
- Custom welcome messages
- User-based filters (requires Looker configuration)

**Configuration:**
```env
LOOKER_AUTH_METHOD=sso
```

**Parameters Passed:**
```
?email=user@domain.com&name=User Name&user_id=unique-id
```

**Looker Configuration Requirements:**
- Configure Looker Studio to receive URL parameters
- Set parameter mapping (email, name, user_id)

---

### 4. Filter (Row-Level Security) - `LOOKER_AUTH_METHOD=filter`

**Features:**
- ✅ Data filtering based on user email
- ✅ Row-Level Security (RLS)
- ✅ Each user sees different data
- ⚠️ Requires Looker data source to include user email field

**Use Cases:**
- Multi-tenant applications
- Sales reps see only their own data
- Department managers see only their department's data

**Configuration:**
```env
LOOKER_AUTH_METHOD=filter
```

**Parameters Passed:**
```
?params.user_email=user@domain.com
```

**Looker Configuration Requirements:**
1. Data source includes user email field (e.g., `user_email`, `owner_email`)
2. Configure parameter filter in Looker Studio:
   - Create parameter: `user_email`
   - Apply filter condition: `data_field.email = @user_email`

---

## Configuration Examples

### Scenario 1: Public Market Analysis Report

```env
LOOKER_EMBED_URL=https://lookerstudio.google.com/embed/reporting/abc123
LOOKER_DASHBOARD_ID=abc123
LOOKER_AUTH_METHOD=public
```

### Scenario 2: Internal Team Report (Login Required)

```env
LOOKER_EMBED_URL=https://lookerstudio.google.com/embed/reporting/def456
LOOKER_DASHBOARD_ID=def456
LOOKER_AUTH_METHOD=required
```

### Scenario 3: Personalized Welcome Report

```env
LOOKER_EMBED_URL=https://lookerstudio.google.com/embed/reporting/ghi789
LOOKER_DASHBOARD_ID=ghi789
LOOKER_AUTH_METHOD=sso
```

### Scenario 4: Sales Reps See Their Own Sales Data

```env
LOOKER_EMBED_URL=https://lookerstudio.google.com/embed/reporting/jkl012
LOOKER_DASHBOARD_ID=jkl012
LOOKER_AUTH_METHOD=filter
```

---

## Looker Studio RLS Configuration Steps

### When Using Filter Mode:

1. **Add User Field to Data Source**
   - Ensure data table includes user identifier field (e.g., `user_email`)

2. **Create Parameter**
   - Open Looker Studio report
   - Resource → Manage added data sources → Add parameter
   - Parameter ID: `user_email`
   - Data type: Text

3. **Apply Filter**
   - Add filter
   - Condition: `[data_field.user_email]` = `@user_email`
   - Save

4. **Test**
   ```
   https://your-report-url?params.user_email=test@example.com
   ```

---

## UI Features

### Authentication Status Display

After login, the page displays:
- 👤 Current logged-in user
- Authentication mode information box
- User context explanation

### Unauthenticated State (required/sso/filter modes)

Shows login prompt:
- 🔐 Authentication Required
- "This Looker report requires authentication"
- 🔑 Sign In button

---

## Testing Different Modes

### Test Public Mode
```powershell
# Set in .env
LOOKER_AUTH_METHOD=public

# Start dev server
npm run dev

# Visit http://localhost:3000/looker
# Should display report directly without login
```

### Test Required Mode
```powershell
# Set in .env
LOOKER_AUTH_METHOD=required

# Refresh page
# Should show "Authentication Required"
# Click Sign In to login and view
```

### Test SSO Mode
```powershell
# Set in .env
LOOKER_AUTH_METHOD=sso

# After login, check browser console
# iframe src should include: ?email=...&name=...&user_id=...
```

### Test Filter Mode
```powershell
# Set in .env
LOOKER_AUTH_METHOD=filter

# After login, check browser console
# iframe src should include: ?params.user_email=...
```

---

## Security Recommendations

1. **Production Environment**
   - Use `required`, `sso`, or `filter` mode
   - Avoid `public` mode for sensitive data

2. **URL Parameter Security**
   - SSO and Filter modes expose user info in URL
   - Ensure HTTPS connections
   - Looker Studio itself requires Google account login

3. **Data Access Control**
   - Configure sharing permissions at Looker Studio level
   - Combine with Azure AD group policies
   - Regularly audit access logs

---

## Troubleshooting

### Q: Why does filter mode show the same data for all users?
A: Check that Looker Studio has parameter filter properly configured and data source includes user email field.

### Q: SSO mode not passing user information?
A: Ensure you're logged into Azure AD and Looker Studio is configured to receive these parameters.

### Q: Can I customize which user information is passed?
A: Yes! Modify the `buildEmbedUrl()` function in `src/pages/LookerReport.jsx` to add more parameters.

### Q: Are other authentication methods supported?
A: Currently four modes are supported. For other methods (e.g., JWT token), you'll need to add custom logic.

---

**Version:** React 3.0.0  
**Last Updated:** November 2025
