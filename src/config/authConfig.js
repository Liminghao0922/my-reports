export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_POWERBI_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_POWERBI_TENANT_ID}`,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ['https://analysis.windows.net/powerbi/api/Report.Read.All'],
};

export const powerBIScopes = {
  scopes: [
    'https://analysis.windows.net/powerbi/api/Report.Read.All',
    'https://analysis.windows.net/powerbi/api/Dataset.Read.All',
    'https://analysis.windows.net/powerbi/api/Workspace.Read.All',
  ],
};
