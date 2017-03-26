const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String },
    categories: { type: String },
    content: { type: String },
    author_id: { type: String },
    author_username: { type: String },
    // comments: [{
    //     comment_id: {type: String }
    // }]
    comments: [
        {type: Schema.Types.ObjectId, ref: 'Comment' }
    ]
}, { timestamps: true });

const ModelClass = mongoose.model('Post', postSchema);

module.exports = ModelClass;
