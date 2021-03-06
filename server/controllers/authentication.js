const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    // sub is a jwt standard that means subject, iat means issued at time
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req,res,next){
    // User has already had their email and password authd
    // We just need to give them a token
    res.send({
        token: tokenForUser(req.user),
        user_id: req.user._id,
        username: req.user.username
    })
}

exports.signup = function(req,res,next) {
    const { email, password, username, firstname, lastname, imageUrl} = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password.' });
    }

    User.findOne({ email: email}, function(err, existingUser) {
        if (err) { return next(err); }

        // If a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send({error:'Email is in use'});
        }

        const user = new User({
            email: email,
            password: password,
            username: username,
            firstname: firstname,
            lastname: lastname,
            imageUrl: imageUrl || 'https://upload.wikimedia.org/wikipedia/en/9/93/Tanooki_Mario.jpg',
            admin: false
        });

        user.save(function(err) {
            if (err) { return next(err); }

            res.json({
                token: tokenForUser(user),
                user_id: user._id,
                username: user.username
            });
        });

    })
}
