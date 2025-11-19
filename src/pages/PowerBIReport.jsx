import React, { useEffect, useRef, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import * as pbi from 'powerbi-client';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const PowerBIReport = () => {
  const { instance, accounts } = useMsal();
  const reportContainerRef = useRef(null);
  const powerbiRef = useRef(null);
  const reportRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const embedReport = async (accessToken) => {
    try {
      // Initialize powerbi service if not already done
      if (!powerbiRef.current) {
        powerbiRef.current = new pbi.service.Service(
          pbi.factories.hpmFactory,
          pbi.factories.wpmpFactory,
          pbi.factories.routerFactory
        );
      }

      // Reset the container before embedding
      if (reportContainerRef.current) {
        // Clear any existing embed
        if (reportRef.current) {
          try {
            powerbiRef.current.reset(reportContainerRef.current);
          } catch (e) {
            console.log('Reset not needed or failed:', e);
          }
        }
        reportContainerRef.current.innerHTML = '';
      }

      const reportConfig = {
        type: 'report',
        tokenType: pbi.models.TokenType.Aad,
        accessToken: accessToken,
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${import.meta.env.VITE_POWERBI_REPORT_ID}&groupId=${import.meta.env.VITE_POWERBI_WORKSPACE_ID}`,
        id: import.meta.env.VITE_POWERBI_REPORT_ID,
        permissions: pbi.models.Permissions.Read,
        settings: {
          panes: {
            filters: { expanded: false, visible: true },
            pageNavigation: { visible: true },
          },
          background: pbi.models.BackgroundType.Transparent,
        },
      };

      const embeddedReport = powerbiRef.current.embed(reportContainerRef.current, reportConfig);
      
      embeddedReport.on('loaded', () => {
        console.log('Report loaded successfully');
        setLoading(false);
      });

      embeddedReport.on('error', (event) => {
        console.error('Report error:', event.detail);
        setError('Failed to load the report. Please try again.');
        setLoading(false);
      });

      reportRef.current = embeddedReport;
    } catch (err) {
      console.error('Embed error:', err);
      setError(err.message || 'Failed to embed the report');
      setLoading(false);
    }
  };

  const getPowerBIToken = async () => {
    if (accounts.length === 0) {
      setError('Please sign in to view the report');
      setLoading(false);
      return;
    }

    try {
      const response = await instance.acquireTokenSilent({
        scopes: [
          'https://analysis.windows.net/powerbi/api/Report.Read.All',
          'https://analysis.windows.net/powerbi/api/Dataset.Read.All',
        ],
        account: accounts[0],
      });

      return response.accessToken;
    } catch (error) {
      console.error('Token acquisition failed:', error);
      
      try {
        const response = await instance.acquireTokenPopup({
          scopes: [
            'https://analysis.windows.net/powerbi/api/Report.Read.All',
            'https://analysis.windows.net/powerbi/api/Dataset.Read.All',
          ],
        });
        return response.accessToken;
      } catch (popupError) {
        console.error('Popup token acquisition failed:', popupError);
        setError('Failed to acquire access token. Please sign in again.');
        setLoading(false);
        return null;
      }
    }
  };

  const loadReport = async () => {
    setLoading(true);
    setError(null);

    const token = await getPowerBIToken();
    if (token) {
      await embedReport(token);
    }
  };

  useEffect(() => {
    let refreshInterval;

    const initializeReport = async () => {
      await loadReport();
      
      // Auto-refresh token every 50 minutes
      refreshInterval = setInterval(async () => {
        const newToken = await getPowerBIToken();
        if (newToken && reportRef.current) {
          try {
            await reportRef.current.setAccessToken(newToken);
            console.log('Token refreshed successfully');
          } catch (error) {
            console.error('Token refresh failed:', error);
          }
        }
      }, 50 * 60 * 1000);
    };

    if (accounts.length > 0) {
      initializeReport();
    } else {
      setError('Please sign in to view the report');
      setLoading(false);
    }

    // Cleanup function
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
      if (powerbiRef.current && reportContainerRef.current) {
        try {
          powerbiRef.current.reset(reportContainerRef.current);
        } catch (e) {
          console.log('Cleanup reset failed:', e);
        }
      }
      reportRef.current = null;
    };
  }, [accounts.length]); // Only depend on accounts.length to avoid re-embedding

  const handleRetry = () => {
    loadReport();
  };

  return (
    <div className="container">
      <div className="report-header">
        <h2>{import.meta.env.VITE_POWERBI_REPORT_NAME}</h2>
      </div>

      <div className="report-container">
        {loading && <Loading message="Loading Power BI Report..." />}
        
        {error && (
          <ErrorMessage
            title="Report Loading Failed"
            message={error}
            onRetry={handleRetry}
          />
        )}

        <div
          ref={reportContainerRef}
          style={{ height: '600px', width: '100%', display: loading || error ? 'none' : 'block' }}
        />
      </div>

      {!loading && !error && (
        <div className="report-controls">
          <button className="btn btn-secondary" onClick={() => reportRef.current?.refresh()}>
            🔄 Refresh
          </button>
          <button className="btn btn-secondary" onClick={() => reportRef.current?.fullscreen()}>
            🖥️ Fullscreen
          </button>
          <button className="btn btn-secondary" onClick={() => reportRef.current?.print()}>
            🖨️ Print
          </button>
        </div>
      )}
    </div>
  );
};

export default PowerBIReport;
