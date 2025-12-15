const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory database for now
let reports = [];

// 📌 Route: Create new disaster report
app.post('/api/reports', async (req, res) => {
  try {
    const {
      disasterType,
      location,
      description,
      damageLevel,
      peopleAffected,
      needs
    } = req.body;

    // Validate required fields
    if (!disasterType || !location || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 👉 Call ML server to predict severity
    let severity = 'Pending';
    try {
      const mlRes = await axios.post('http://localhost:8000/predict', {
        disasterType,
        description
      });
      severity = mlRes.data.severity || 'Pending';
    } catch (mlError) {
      console.error('⚠️ ML server error:', mlError.message);
    }

    const newReport = {
      id: reports.length + 1,
      disasterType,
      location,
      description,
      damageLevel,
      peopleAffected,
      needs,
      severity,
      resourcesAssigned: 'Pending Assignment...'
    };

    reports.push(newReport);
    res.status(201).json(newReport);
  } catch (err) {
    console.error('🚨 Backend error:', err);
    res.status(500).json({ message: 'Failed to create report' });
  }
});

// 📌 Route: Get all reports
app.get('/api/reports', (req, res) => {
  res.json(reports);
});

// 📌 Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
