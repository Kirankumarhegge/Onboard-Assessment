const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  optionId: String,
  optionValue: String,
});

const AssessSchema = new mongoose.Schema({
  nickname: String,
  QuesId: Number,
  entryType: String, 
  optionType: String,
  category: String,
  subCategory: String,
  entryType: String,
  isQuestionActive: Boolean,
  isChildQuestion: Boolean,
  hasChildQuestion: Boolean,
  childCondition: String,
  maxOptionSelection: String,
  question: String,
  options: [OptionSchema],
  uiType: String,
  createdAt: Number,
  updatedAt: Number,
  ansValues: [OptionSchema]
}, { collection: 'Assess' }); 

const AssessModel = mongoose.model('Assess', AssessSchema);

module.exports = AssessModel;
