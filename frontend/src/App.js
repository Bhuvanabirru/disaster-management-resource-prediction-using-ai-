import React, { useState, useEffect } from 'react';
import './App.css';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';

function App() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch reports from backend
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/reports');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      alert('Failed to fetch reports: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  // Handle form submission
  const handleReportSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newReport = await response.json();
        setReports([...reports, newReport]);
        alert('Report created successfully!');
      } else {
        alert('Failed to create report');
      }
    } catch (error) {
      console.error('Error creating report:', error);
      alert('Error creating report: ' + error.message);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🚨 Disaster Management System</h1>
        <p>AI-Powered Resource Prediction & Allocation</p>
      </header>

      <div className="container">
        <div className="form-section">
          <ReportForm onSubmit={handleReportSubmit} />
        </div>

        <div className="reports-section">
          <div className="reports-header">
            <h2>📋 Disaster Reports</h2>
            <button onClick={fetchReports} className="refresh-btn" disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          <ReportList reports={reports} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
