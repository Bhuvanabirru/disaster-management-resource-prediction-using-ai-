import React from 'react';
import './ReportList.css';

function ReportList({ reports, loading }) {
  if (loading) {
    return <div className="loading">⏳ Loading reports...</div>;
  }

  if (reports.length === 0) {
    return <div className="no-reports">No disaster reports yet.</div>;
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return '#e74c3c';
      case 'Medium':
        return '#f39c12';
      case 'Low':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="report-list">
      {reports.map((report) => (
        <div key={report.id} className="report-card">
          <div className="report-header">
            <h3>{report.disasterType}</h3>
            <span
              className="severity-badge"
              style={{ backgroundColor: getSeverityColor(report.severity) }}
            >
              {report.severity}
            </span>
          </div>

          <div className="report-body">
            <p className="location">📍 {report.location}</p>
            <p className="description">{report.description}</p>

            <div className="report-details">
              <div className="detail">
                <span className="label">Damage Level:</span>
                <span className="value">{report.damageLevel}/10</span>
              </div>
              <div className="detail">
                <span className="label">People Affected:</span>
                <span className="value">{report.peopleAffected}</span>
              </div>
            </div>

            {report.needs && (
              <div className="needs">
                <strong>🛒 Needs:</strong> {report.needs}
              </div>
            )}

            {report.resourcesAssigned && (
              <div className="resources">
                <strong>🚑 Resources:</strong> {report.resourcesAssigned}
              </div>
            )}
          </div>

          <div className="report-footer">
            <small>{new Date(report.createdAt).toLocaleString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReportList;
