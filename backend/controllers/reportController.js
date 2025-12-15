const Report = require('../models/Report');
const axios = require('axios');

// Auto-resource allocation logic
function assignResources(severity) {
  console.log('Assigning resources for severity:', severity); // Debug log
  if (severity === 'High') {
    return ['Ambulance', 'Firefighters', 'Medical Team'];
  } else if (severity === 'Medium') {
    return ['Police Patrol', 'Rescue Volunteers'];
  } else if (severity === 'Low') {
    return ['Inspection Team'];
  } else {
    console.log('Unknown severity:', severity); // Debug log for unexpected severity
    return ['Inspection Team']; // Default fallback
  }
}


// Create Report with ML Prediction + Resource Assignment
const createReport = async (req, res) => {
const {
  disasterType,
  location,
  description,
  damageLevel,
  peopleAffected,
  needs
} = req.body;
let severity = 'Pending ML Prediction...';
  try {
    // Step 1: Predict Severity using ML Server
    const mlResponse = await axios.post('http://localhost:8000/predict', {
      disasterType,
      description,
      damageLevel,
      peopleAffected
    });


severity = mlResponse.data.severity || 'Low';

    // Step 2: Assign resources
    const resourcesAssigned = assignResources(severity);

    // Step 3: Save Report
    const newReport = new Report({
  disasterType,
  location,
  description,
  damageLevel,
  peopleAffected,
  needs,
  severity,
  resourcesAssigned
});
console.log('Final Report:', newReport);

    await report.save();

    res.status(201).json(report);
  } catch (error) {
    console.error('Error creating report:', error.message);
    res.status(500).json({ message: 'Failed to create report' });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports' });
  }
};

module.exports = {
  createReport,
  getReports
};
