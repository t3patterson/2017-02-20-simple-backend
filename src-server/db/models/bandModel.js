const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// DATA TABLE
// ----------------------
const bandSchema = new Schema({
  // example of optional fields
  country:        { type: String, required: true },
  artist:  			{ type: String, required: true},
  bandMembers:    { type: Number,  required: true },
  bookingCost:    { type: Number, required: true },
  agentName:      { type: String },
  albumArt:       { type: String  },
  createdAt:      { type: Date,  required: true, default: Date.now() } ,
  onTour:         { type: Boolean, required: true, default: false }
})


module.exports = createModel('Band', bandSchema)
