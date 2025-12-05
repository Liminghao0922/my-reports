import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    
    // Define environment variables that will be exposed to the app
    define: {
      'import.meta.env.VITE_POWERBI_CLIENT_ID': JSON.stringify(env.VITE_POWERBI_CLIENT_ID || env.POWERBI_CLIENT_ID || ''),
      'import.meta.env.VITE_POWERBI_TENANT_ID': JSON.stringify(env.VITE_POWERBI_TENANT_ID || env.POWERBI_TENANT_ID || ''),
      'import.meta.env.VITE_POWERBI_WORKSPACE_ID': JSON.stringify(env.VITE_POWERBI_WORKSPACE_ID || env.POWERBI_WORKSPACE_ID || ''),
      'import.meta.env.VITE_LOOKER_EMBED_URL': JSON.stringify(env.VITE_LOOKER_EMBED_URL || env.LOOKER_EMBED_URL || ''),
      'import.meta.env.VITE_LOOKER_DASHBOARD_ID': JSON.stringify(env.VITE_LOOKER_DASHBOARD_ID || env.LOOKER_DASHBOARD_ID || ''),
      'import.meta.env.VITE_LOOKER_AUTH_METHOD': JSON.stringify(env.VITE_LOOKER_AUTH_METHOD || env.LOOKER_AUTH_METHOD || 'public'),
    },
    
    // Build output directory
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
    },
    
    // Dev server configuration
    server: {
      port: 3000,
      open: true,
    },
    
    // Preview server configuration
    preview: {
      port: 3000,
    },
  };
});
