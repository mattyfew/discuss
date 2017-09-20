const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const fs = require('fs');
const knox = require('knox');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');

// passport, by default, tries to make a cookie-based session. So we tell it that should be false, since we are using JWT
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const PostModel = require('./models/post');
const UserModel = require('./models/user');
const CommentModel = require('./models/comment');
const ObjectId = require('mongoose').Types.ObjectId;




/********** Knox ****************/

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env
} else {
    secrets = require('./secrets')
}

const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'discuss-images'
});

/********** Multer File Upload **************/

var diskStorage = multer.diskStorage({

    destination: function (req, file, callback) {
        console.log("diskstorage doin work", file);
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            console.log("the new uid", uid, uid + path.extname(file.originalname));
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: { filesize: 2097152 }
});



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
        console.log("profile edit running");
        UserModel.findOneAndUpdate({_id: req.body.props.userId}, req.body.props, {upsert: false, new: true}, function(err, user){
            if (err) console.log(err);
            return res.send(user)
        })
    })

    app.post('/uploadMulterImg', uploader.single('file'), function(req,res,next){
        console.log("POST /uploadMulterImg summin happened");

        console.log('in send to AWS function');
        const s3Request = client.put(req.file.filename, {
            'Content-Type': req.file.mimetype,
            'Content-Length': req.file.size,
            'x-amz-acl': 'public-read'
        });

        const readStream = fs.createReadStream(req.file.path);
        readStream.pipe(s3Request);

        s3Request.on('response', s3Response => {

            const wasSuccessful = s3Response.statusCode == 200;
            console.log('wasSuccessful', wasSuccessful);
            if(wasSuccessful) {
                next();
            } else {
                res.json({ success: false });
            }
        });
    })

    // function sendToAWS(req, res, next) {
    //     console.log('in send to AWS function');
    //     const s3Request = client.put(req.file.filename, {
    //         'Content-Type': req.file.mimetype,
    //         'Content-Length': req.file.size,
    //         'x-amz-acl': 'public-read'
    //     });
    //
    //     const readStream = fs.createReadStream(req.file.path);
    //     readStream.pipe(s3Request);
    //
    //     s3Request.on('response', s3Response => {
    //
    //         const wasSuccessful = s3Response.statusCode == 200;
    //         console.log('wasSuccessful', wasSuccessful);
    //         if(wasSuccessful) {
    //             next();
    //         } else {
    //             res.json({ success: false });
    //         }
    //     });
    //
    // }




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
