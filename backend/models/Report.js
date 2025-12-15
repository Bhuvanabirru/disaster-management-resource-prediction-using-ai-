const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
  disasterType: String,
  location: String,
  description: String,
  damageLevel: Number,
  peopleAffected: Number,
  needs: String,
  severity: String,
  resourcesAssigned: [String]
}, { timestamps: true });



module.exports = mongoose.model('Report', reportSchema);
