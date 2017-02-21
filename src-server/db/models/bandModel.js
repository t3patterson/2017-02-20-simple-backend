const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// DATA TABLE
// ----------------------
const bandSchema = new Schema({
  // example of optional fields
  country:        { type: String,  },
  artist:  			{ type: String, },
  bandMembers:    { type: Number,   },
  bookingCost:    { type: Number,  },
  agentName:      { type: String },
  albumArt:       { type: String  },
  createdAt:      { type: Date,  required: true, default: Date.now() } ,
  onTour:         { type: Boolean, default: false }
})


module.exports = createModel('Band', bandSchema)
