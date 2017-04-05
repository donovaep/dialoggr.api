let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let EntrySchema = new Schema({
  user:  { type: String, required: 'You must specify a user' },
  type:  { type: String, required: true, enum: [ 'carbs', 'bgl', 'sleep' ] },
  value: { type: Number, min: [ 0, 'Value entered must be at least zero' ] },
  start: { type: Date, default: Date.now },
  end:   { type: Date, default: null },
  description: String
}, {
  timestamps: true, // adds createdAt and updatedAt fields automatically
  minimize: false   // will make sure all properties exist, even if null
});
EntrySchema.index({ user: 1, type: 1 });
module.exports = mongoose.model('Entry', EntrySchema);