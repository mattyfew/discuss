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


    // app.use(function(req,res,next){
    //     var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    //
    //     if(token) {
    //         console.log("THERE WAS A TOKEN");
    //     } else {
    //         console.log("NOPE");
    //     }
    // })


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

        PostModel.findOne({_id: req.params.postId})
            .populate("comments")
            .exec(function(err, result){
                console.log("get Post", result);
                if (err) console.error(err);
                res.json(result);
            });
    });

    app.post('/posts/new',function(req,res){
        let post = new PostModel({
            title: req.body.props.title,
            categories: req.body.props.categories,
            content: req.body.props.content,
            author: {
                id: req.body.props.userId,
                username: req.body.props.username
            }
        });

        console.log(post);
        post.save(function(err, newPost){
            if (err) console.error(err);
            res.status(201).json(newPost)
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
        PostModel.findOne({ _id: req.params.post_id})
        .populate("comments")
        .exec(function(err,result){
            if (err) throw err;
            res.json(result)
        })
    });

    app.post('/post/:postId/comments/new', function(req,res){
        const comment = new CommentModel({
            post_id: req.params.postId,
            content: req.body.props.inputValue,
            parent_id: req.body.props.parentId,
            author: {
                id: req.body.props.userId,
                username: req.body.props.username
            }
        });

        comment.save(function(err, newComment){
            PostModel.findByIdAndUpdate(req.params.postId,{
                $push: { "comments": newComment._id }
            }, { upsert: true, new: true }) // i took out safe:true
            .populate("comments")
            .populate("children")
            .exec(function(err, result){
                if (err) console.error(err);
                console.log("this is in the PostModel", result);
                res.json(result)
            });
        });
    });

}
