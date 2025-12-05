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
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loadingReports, setLoadingReports] = useState(true);

  const embedReport = async (accessToken, report) => {
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
        embedUrl: report.embedUrl,
        id: report.id,
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
        //setError('Failed to load the report. Please try again.');
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
          'https://analysis.windows.net/powerbi/api/Workspace.Read.All',
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
            'https://analysis.windows.net/powerbi/api/Workspace.Read.All',
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

  const fetchUserReports = async () => {
    setLoadingReports(true);
    setError(null);

    const token = await getPowerBIToken();
    if (!token) return;

    try {
      // 获取用户的所有工作区
      const workspacesResponse = await fetch('https://api.powerbi.com/v1.0/myorg/groups', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!workspacesResponse.ok) {
        throw new Error('Failed to fetch workspaces');
      }

      const workspacesData = await workspacesResponse.json();
      const allReports = [];

      // 从每个工作区获取报表
      for (const workspace of workspacesData.value) {
        try {
          const reportsResponse = await fetch(
            `https://api.powerbi.com/v1.0/myorg/groups/${workspace.id}/reports`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );

          if (reportsResponse.ok) {
            const reportsData = await reportsResponse.json();
            reportsData.value.forEach(report => {
              allReports.push({
                id: report.id,
                name: report.name,
                workspaceId: workspace.id,
                workspaceName: workspace.name,
                embedUrl: report.embedUrl,
                datasetId: report.datasetId,
              });
            });
          }
        } catch (err) {
          console.error(`Failed to fetch reports from workspace ${workspace.name}:`, err);
        }
      }

      setReports(allReports);
      setLoadingReports(false);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError(err.message || 'Failed to load reports');
      setLoadingReports(false);
    }
  };

  const loadReport = async (report) => {
    setLoading(true);
    setError(null);
    setSelectedReport(report);

    const token = await getPowerBIToken();
    if (token) {
      await embedReport(token, report);
    }
  };

  const handleReportSelect = (report) => {
    loadReport(report);
  };

  useEffect(() => {
    let refreshInterval;

    const initializeReport = async () => {
      await fetchUserReports();
      
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
      setLoadingReports(false);
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
    if (selectedReport) {
      loadReport(selectedReport);
    } else {
      fetchUserReports();
    }
  };

  return (
    <div className="container">
      <div className="report-header">
        <h2>Power BI Reports</h2>
        {selectedReport && <p className="report-subtitle">Current: {selectedReport.name}</p>}
      </div>

      {loadingReports ? (
        <Loading message="Loading your reports..." />
      ) : (
        <>
          {!selectedReport && (
            <div className="report-list">
              <h3>Select a Report to View</h3>
              {reports.length === 0 ? (
                <div className="no-reports">
                  <p>No reports found. You may not have access to any Power BI reports.</p>
                </div>
              ) : (
                <div className="reports-grid">
                  {reports.map((report) => (
                    <div 
                      key={`${report.workspaceId}-${report.id}`} 
                      className="report-card"
                      onClick={() => handleReportSelect(report)}
                    >
                      <h4>{report.name}</h4>
                      <p className="workspace-name">📁 {report.workspaceName}</p>
                      <button className="btn btn-primary">View Report</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedReport && (
            <div className="report-container">
              <div className="report-actions">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setSelectedReport(null);
                    setLoading(false);
                    if (powerbiRef.current && reportContainerRef.current) {
                      try {
                        powerbiRef.current.reset(reportContainerRef.current);
                      } catch (e) {
                        console.log('Reset failed:', e);
                      }
                    }
                  }}
                >
                  ← Back to Reports List
                </button>
              </div>

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
          )}
        </>
      )}
    </div>
  );
};

export default PowerBIReport;
