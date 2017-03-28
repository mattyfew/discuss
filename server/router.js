const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// passport, by default, tries to make a cookie-based session. So we tell it that should be false, since we are using JWT
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const PostModel = require('./models/post');
const UserModel = require('./models/user');
const CommentModel = require('./models/comment');
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = function(app) {



    // ******************   AUTH   **********************

    app.get('/', requireAuth, function(req,res) {
        res.send({ message: 'Super secret code is ABC123'});
    });

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);




    // ******************   PROFILE   **********************

    app.get('/profile/:username', function(req,res){
        UserModel.find({username: req.params.username}, function(err, result){
            if (err) console.error(err);
            res.json(result[0]);
        });
    });

    app.post('/profile/edit', function(req,res){
        UserModel.findOneAndUpdate({_id: req.body.props.userId}, req.body.props, {upsert: false, new: true}, function(err, user){
            if (err) console.log(err);
            console.log("callback",user);
            return res.send(user)
        })
    })




    // ******************   POSTS   **********************

    app.get('/posts', function(req,res){
        PostModel.find({}, function(err, result){
            res.json(result);
        });
    });

    app.get('/posts/:postId', function(req,res){
        PostModel.find({_id: req.params.postId}, function(err, result){
            if (err) console.error(err);
            res.json(result[0]);
        });
    });

    app.post('/posts/new',function(req,res){
        let post = new PostModel({
            title: req.body.props.title,
            categories: req.body.props.categories,
            content: req.body.props.content,
            author_id: req.body.props.userId,
            author_username: req.body.props.username
        });

        post.save(function(err, newPost){
            if (err) console.error(err);
        });
    });

    app.delete('/posts/:post_id', function(req,res,next){
        PostModel.findByIdAndRemove({_id: req.params.post_id}, function(err, result){
            if (err) console.error(err);
            next();
        });
    });



    // ******************   COMMENTS   **********************

    app.get('/post/:post_id/comments', function(req,res){
        PostModel.findOne({ _id: req.params.post_id}).populate("comments").exec(function(err,result){
            if (err) throw err;
            res.json(result)
        })
    });

    app.post('/post/:postId/comments/new', function(req,res){
        let comment = new CommentModel({
            post_id: req.params.postId,
            author_id: req.body.props.userId,
            author_username: req.body.props.username,
            content: req.body.props.content
        });

        comment.save(function(err, newComment){
            PostModel.findByIdAndUpdate(req.params.postId,
                { $push: { "comments": newComment._id } },
                {safe: true, upsert: true, new: true})
            .populate("comments")
            .exec(function(err, result){
                if (err) console.error(err);
                res.json(result)
            });
        });
    });

}
