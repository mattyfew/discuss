const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// need to add user posts history
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    username: { type: String, unique: true, lowercase: true },
    admin: { type: Boolean, unique: false },
    firstname: { type: String, unique: false },
    lastname: { type: String, unique: false },
    imageUrl: { type: String, unique: false },
    password: { type: String },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
    ],
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
    ]
}, { timestamps: true });

userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    })
}

const ModelClass = mongoose.model('User', userSchema);

module.exports = ModelClass;
