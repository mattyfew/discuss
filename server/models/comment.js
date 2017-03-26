const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('debug', true);


const commentSchema = new Schema({
    post_id: { type: String },
    author_id: { type: String },
    author_username: { type: String },
    content: { type: String }
}, { timestamps: true })

const ModelClass = mongoose.model('Comment', commentSchema, 'comments');

module.exports = ModelClass;
