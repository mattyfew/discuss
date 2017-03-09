const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// passport, by default, tries to make a cookie-based session. So we tell it that should be false, since we are using JWT
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {

    app.get('/', requireAuth, function(req,res) {
        res.send({ message: 'Super secret code is ABC123'});
    });

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);

    app.get('/posts', requireAuth, function(req,res){
        res.json({"wow": "it worked"})
    })
}
