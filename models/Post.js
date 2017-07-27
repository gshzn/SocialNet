var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var postSchema = new Schema({
  poster: Object,
  text: String,
  datePosted: String
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
