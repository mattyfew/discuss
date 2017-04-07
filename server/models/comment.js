const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs')

mongoose.set('debug', true);

const commentSchema = new Schema({
    post_id: { type: String },
    parent_id: { type: Schema.Types.ObjectId, ref: 'Comment' },
    author: {
        id: { type: Schema.Types.ObjectId, ref: 'User' },
        username: { type: String }
    },
    content: { type: String },
    children: [
        { type: Schema.Types.ObjectId, ref: 'Comment' }
    ],
    slug: { type: String }
}, { timestamps: true })

commentSchema.plugin(URLSlugs('parent_id _id', {field: 'slug'}));
// commentSchema.plugin(URLSlugs('_id parent_id', {field: 'full_slug'}));


// modifies the slug field to hold a path composed of the parent or parent’s slug and this comment’s unique slug, and
// adds a full_slug field that combines the slugs and time information to make it easier to sort documents in a threaded discussion by date.

const ModelClass = mongoose.model('Comment', commentSchema, 'comments');

module.exports = ModelClass;
