const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema({
  policyNo: {
    type: String,
    required: [true, "Please provide policy No."],
    length: 6,
  },
  policyType: {
    type: String,
    required: [true, "Please provide policy Type"],
    length: 2,
  },
  status: {
    type: String,
    required: [true, "Please provide status"],
    length: 1,
  },
  agentID: {
    type: String,
    required: [true, "Please provide agent's ID"],
    length: 8,
  },
});

const InsuredSchema = new mongoose.Schema({
  insureName: {
    type: String,
    required: [true, "Please provide name"],
    unique: true,
    length: 100,
  },
  policies: [PolicySchema],
});

module.exports = mongoose.model("Insured", InsuredSchema);
