const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String },
    categories: { type: String },
    content: { type: String },
    user_id: { type: Number }
});

const ModelClass = mongoose.model('post', postSchema);

module.exports = ModelClass;
