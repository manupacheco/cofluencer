const mongoose = require('mongoose');
/* eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */

const campaignSchema = new Schema({
  company_id: Schema.Types.ObjectId,
  influencer_id: [Schema.Types.ObjectId],
  title: String,
  description: String,
  expirationDate: Date,
  tags: [],
  location: {
    street: String,
    city: String,
    state: String,
    zip: Number,
  },
  state: String,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
