import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const LookerReport = () => {
  const { instance, accounts } = useMsal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [embedError, setEmbedError] = useState(false);
  const [requireAuth, setRequireAuth] = useState(false);

  const embedUrl = import.meta.env.VITE_LOOKER_EMBED_URL;
  const authMethod = import.meta.env.VITE_LOOKER_AUTH_METHOD;

  const buildEmbedUrl = () => {
    let url = embedUrl;

    // Add authentication parameters based on auth method
    if (authMethod === 'sso' && accounts.length > 0) {
      const user = accounts[0];
      const params = new URLSearchParams({
        email: user.username,
        name: user.name || user.username,
        user_id: user.localAccountId || user.username,
      });
      url += (url.includes('?') ? '&' : '?') + params.toString();
    } else if (authMethod === 'filter' && accounts.length > 0) {
      // Use RLS (Row-Level Security) filter based on user email
      const user = accounts[0];
      const params = new URLSearchParams({
        'params.user_email': user.username,
      });
      url += (url.includes('?') ? '&' : '?') + params.toString();
    }

    return url;
  };

  const handleLogin = async () => {
    try {
      await instance.loginPopup({
        scopes: ['User.Read'],
      });
    } catch (err) {
      console.error('Login failed:', err);
      setError('Authentication failed. Please try again.');
    }
  };

  const openInPopup = () => {
    const url = buildEmbedUrl();
    const width = 1200;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      url,
      'LookerReport',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  useEffect(() => {
    // Check if authentication is required
    if (authMethod === 'required' || authMethod === 'sso' || authMethod === 'filter') {
      if (accounts.length === 0) {
        setRequireAuth(true);
        setLoading(false);
        return;
      }
    }
    setRequireAuth(false);
    setLoading(false);
  }, [accounts, authMethod]);

  if (loading) {
    return <Loading message="Loading Looker Dashboard..." />;
  }

  // Show login prompt if authentication is required
  if (requireAuth) {
    return (
      <div className="container">
        <div className="report-header">
          <h2>Looker Dashboard</h2>
        </div>
        <div className="report-container" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
            <h3 style={{ marginBottom: '1rem', color: '#0078d4' }}>Authentication Required</h3>
            <p style={{ marginBottom: '2rem', color: '#666', lineHeight: '1.6' }}>
              This Looker report requires authentication. Please sign in to view the dashboard.
            </p>
            <button className="btn btn-primary" onClick={handleLogin} style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              🔑 Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <ErrorMessage title="Report Loading Failed" message={error} />
      </div>
    );
  }

  // If iframe embedding failed, show popup button
  if (embedError) {
    return (
      <div className="container">
        <div className="report-header">
          <h2>Looker Studio Report</h2>
        </div>
        <div className="report-container" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ marginBottom: '1rem', color: '#0078d4' }}>Looker Studio Report</h3>
            <p style={{ marginBottom: '2rem', color: '#666', lineHeight: '1.6' }}>
              The report cannot be embedded directly. Click the button below to open it in a new window.
            </p>
            <button className="btn btn-primary" onClick={openInPopup} style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              🚀 Open Looker Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default: try to embed in iframe
  return (
    <div className="container">
      <div className="report-header">
        <h2>Looker Dashboard</h2>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {accounts.length > 0 && authMethod !== 'public' && (
            <span style={{ color: '#666', fontSize: '0.9rem', marginRight: '1rem' }}>
              👤 Viewing as: {accounts[0].name || accounts[0].username}
            </span>
          )}
          <button className="btn btn-secondary" onClick={openInPopup}>
            🔗 Open in New Window
          </button>
        </div>
      </div>
      <div className="report-container">
        <iframe
          src={buildEmbedUrl()}
          style={{
            width: '100%',
            height: '600px',
            border: 'none',
            borderRadius: '8px',
          }}
          title="Looker Dashboard"
          onError={() => {
            console.log('Iframe failed to load, showing popup button');
            setEmbedError(true);
          }}
        />
      </div>
      {authMethod !== 'public' && accounts.length > 0 && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f8ff', borderRadius: '4px', border: '1px solid #b3d9ff' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#0066cc' }}>
            ℹ️ <strong>Authentication Mode:</strong> {authMethod === 'sso' ? 'SSO (User context passed to Looker)' : authMethod === 'filter' ? 'Row-Level Security (Filtered by user email)' : 'Required (Must be signed in)'}
          </p>
        </div>
      )}
    </div>
  );
};

export default LookerReport;
