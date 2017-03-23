const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// passport, by default, tries to make a cookie-based session. So we tell it that should be false, since we are using JWT
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const PostModel = require('./models/post');
const UserModel = require('./models/user');

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
            if (err) console.error(err);
            res.json(result[0]);
        });
    });

    app.post('/posts/new',function(req,res){
        const post = new PostModel({
            title: req.body.props.title,
            categories: req.body.props.categories,
            content: req.body.props.content,
            author_id: req.body.props.userId,
            author_username: req.body.props.username
        });

        post.save(function(err){
            if (err) console.error(err);
        });
    });

    app.delete('/posts/:post_id', function(req,res,next){
        PostModel.findByIdAndRemove({_id: req.params.post_id}, function(err, result){
            if (err) console.error(err);
            next();
        });
    });

    app.get('/profile/:id', function(req,res){
        UserModel.find({_id: req.params.id}, function(err, result){
            if (err) console.error(err);
            res.json(result[0]);
        });
    });

    app.post('/profile/edit', function(req,res){
        console.log("req.body is ", req.body.props);

        UserModel.findOneAndUpdate({_id: req.body.props.userId}, req.body.props, {upsert: false}, function(err){
            if (err) console.log(err);
            return res.send('successfully save!')
        })

    })
}
