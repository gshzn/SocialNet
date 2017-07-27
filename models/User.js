var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    localMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/socialnet")

var userSchema = new Schema({
  profilePicture: { type: String, default: 'http://localhost:8080/img/profile/default.jpg' },
  following: Array,
  followers: Array
});
userSchema.plugin(localMongoose);

module.exports = mongoose.model('User', userSchema);
