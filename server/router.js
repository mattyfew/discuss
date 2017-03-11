const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// passport, by default, tries to make a cookie-based session. So we tell it that should be false, since we are using JWT
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const PostModel = require('./models/post.js');

module.exports = function(app) {

    app.get('/', requireAuth, function(req,res) {
        res.send({ message: 'Super secret code is ABC123'});
    });

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);


    app.get('/posts', function(req,res){
        PostModel.find({}, function(err, result){
            res.json(result);
        });
    });

    app.get('/posts/:post_id', function(req,res){
        PostModel.find({_id: req.params.post_id}, function(err, result){
            console.log(result);
            res.json(result[0]);
        });
    });

    app.post('/posts/new',function(req,res){

        console.log(req.body.props);
        const post = new PostModel({
            title: req.body.props.title,
            categories: req.body.props.categories,
            content: req.body.props.content,
        });

        post.save(function(err){
            if (err) console.error(err);
        });
    });
}
