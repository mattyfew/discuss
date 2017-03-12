const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author_id: { type: String },
    content: { type: String }
}, { timestamps: true })

const ModelClass = mongoose.model('Comment', commentSchema);

module.exports = ModelClass;
