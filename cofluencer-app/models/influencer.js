const mongoose = require('mongoose');
/* eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */

const influencerSchema = new Schema({
  username: String,
  email: String,
  password: String,
  phone: Number,
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number,
  },
  bio: String,
  influenceArea: String,
  profileImage: String,
  socialLinks: [{}],
  role: ['influencer', 'company', 'admin'],
  tags: [],
  campaignsFavs: [Schema.Types.ObjectId],
  instagram: {
    username: String,
    followers_count: Number,
    biography: String,
    media_count: Number,
    media: {
      data: [{}],
      paging: {
        cursors: {
          before: String,
          after: String,
        },
        next: String,
      },
    },
    id: String,
  },
  id: String,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Influencer = mongoose.model('Influencer', influencerSchema);

module.exports = Influencer;
