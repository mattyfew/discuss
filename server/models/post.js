const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');

const postSchema = new Schema({
    title: { type: String },
    categories: { type: String },
    content: { type: String },
    author_id: { type: Number },
    comments: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
    ]
}, { timestamps: true });

// const connection = mongoose.connection
// autoIncrement.initialize(connection);
// postSchema.plugin(autoIncrement.plugin, {
//     model: 'Post',
//     field: 'postId'
// });



const ModelClass = mongoose.model('Post', postSchema);
// ModelClass.nextCount(function(err, count){
//     console.log("count",count);
// })

module.exports = ModelClass;
