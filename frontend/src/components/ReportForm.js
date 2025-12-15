import React, { useState } from 'react';
import './ReportForm.css';

function ReportForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    disasterType: 'Flood',
    location: '',
    description: '',
    damageLevel: 5,
    peopleAffected: 0,
    needs: '',
  });

  const disasterTypes = ['Flood', 'Earthquake', 'Wildfire', 'Hurricane', 'Landslide', 'Tornado'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'damageLevel' || name === 'peopleAffected' ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.location.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(formData);

    // Reset form
    setFormData({
      disasterType: 'Flood',
      location: '',
      description: '',
      damageLevel: 5,
      peopleAffected: 0,
      needs: '',
    });
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2>📝 Create Disaster Report</h2>

      <div className="form-group">
        <label>Disaster Type *</label>
        <select
          name="disasterType"
          value={formData.disasterType}
          onChange={handleChange}
          required
        >
          {disasterTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Location *</label>
        <input
          type="text"
          name="location"
          placeholder="e.g., New Delhi, Mumbai"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          name="description"
          placeholder="Describe the disaster situation..."
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Damage Level (1-10)</label>
          <input
            type="range"
            name="damageLevel"
            min="1"
            max="10"
            value={formData.damageLevel}
            onChange={handleChange}
          />
          <span className="damage-value">{formData.damageLevel}</span>
        </div>

        <div className="form-group">
          <label>People Affected</label>
          <input
            type="number"
            name="peopleAffected"
            min="0"
            value={formData.peopleAffected}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Immediate Needs</label>
        <textarea
          name="needs"
          placeholder="Medical supplies, food, shelter, etc."
          value={formData.needs}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>

      <button type="submit" className="submit-btn">
        🚀 Submit Report
      </button>
    </form>
  );
}

export default ReportForm;
