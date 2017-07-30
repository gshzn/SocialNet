var router = require('express').Router();
var User = require('./models/User');
var Messages = require("./models/messages");
var passport = require('passport');
var Post = require('./models/Post');

router.get('/', (req, res) => {
  if (req.user) {
    return res.redirect('/home');
  } else {
    return res.render('index.ejs');
  }
});

router.get('/home', (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  } else {
    findPosts(req.user, (posts) => {
      return res.render('home', {user: req.user, posts: posts });
    });
  }
});

router.get('/profile', (req, res) => {
  if (req.user) {
    return res.redirect('/profile/' + req.user.username);
  } else {
    res.render('404');
  }
})

router.get('/profile/:target', (req, res) => {
  findUser(req.params.target, (target) => {
    if (!target) {
      return res.send('Wow, such empty<br/><i>404</i>');
    } else {
      findUserPosts(req.params.target, (posts) => {
        let same = false;
        if (req.user) {
          same = req.user.username == target.username;
        }
        let following = false;
        console.log(req.user.following.length);
        req.user.following.forEach((followingUser) => {
          console.log(followingUser.username + " === " + target.username);
          if (followingUser.username == target.username) {
            following = true;
          }
        });
        console.log(following);
        return res.render('profile', { user: req.user, target, posts, same, following });
      });
    }
  })
});

router.post('/api/register', (req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err) => {
    if (err) {
      return res.send({
        err: true,
        errObj: {
          name: err.name,
          msg: Messages[err.name]
        }
      });
    }
    return res.send({
      err: false,
      msg: "U bent nu geregistreerd, een ogenblik alstublieft terwijl wij u inloggen."
    });
  });
});

router.post('/api/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user);
  return res.send({
    err: false,
    msg: 'U bent ingelogd, een ogenblik geduld terwijl wij u doorsturen.'
  })
});

router.post('/api/login-reg', passport.authenticate('local'), (req, res) => {
  return res.redirect('/home');
});

router.get('/api/logout', (req, res) => {
  if (req.user) {
    req.logout();
  }
  return res.redirect('/');
});

router.post('/api/post', (req, res) => {
  var user = req.user;
  var text = req.body.text;
  console.log(req.body);
  var newPost = new Post({
    poster: user,
    text: text,
    datePosted: formatDate(new Date())
  });

  newPost.save((err) => {
    if (err) {
      return res.send({
        err: true,
        errObj: err
      });
    }
    return res.send({
      err: false,
      msg: "Gepost!"
    })
  })
});

router.post('/api/follow', (req, res) => {
  var user = req.user;
  var target = req.body.target;
  console.log(req.user);
  User.findOne({ username: target }, (err, targetUser) => {
    if (err) throw err;
    console.log(targetUser);
    targetUser.followers.push({
      username: req.user.username,
      profilePicture: req.user.profilePicture
    });
    targetUser.save();
    User.findOne({ username: user.username }, (err, ogUser) => {
      if (err) throw err;
      ogUser.following.push({
        username: targetUser.username,
        profilePicture: targetUser.profilePicture
      });
      ogUser.save();
      return res.send({
        err: false
      });
    });
  })
});

router.post('/api/unfollow', (req, res) => {
  var user = req.user;
  var target = req.body.target;
  User.findOne({ username: target }, (err1, targetUser) => {
    if (err1) return res.send({err: err1});
    var toRemove = targetUser.followers.filter((el) => {
      el.username.toLowerCase().indexOf(user.username.toLowerCase()) > -1;
    });
    targetUser.followers.splice(targetUser.followers.indexOf(toRemove[0]), 1);
    targetUser.save();
    User.findOne({ username: req.user.username }, (err2, userObj) => {
      if (err2) return res.send({err: err2})
      var toRemove = userObj.following.filter((el) => {
        el.username.toLowerCase().indexOf(targetUser.username.toLowerCase()) > -1;
      });
      userObj.following.splice(targetUser.followers.indexOf(toRemove[0]), 1);
      userObj.save();
      return res.send({
        err: false
      });
    });
  })
})

var formatDate = (date) => {
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var mins = date.getMinutes();

  return day + "/" + monthIndex + "/" + year + ", " + hour + ":" + mins;
};


//TODO alter method for friends and self only
var findPosts = (user, cb) => {
  var followingNames = [];
  followingNames.push(user.username);
  user.following.forEach((following) => {
    followingNames.push(following.username);
  })
  Post.find({ 'poster.username': { $in: followingNames }}).sort({datePosted: 'desc'}).exec((err, posts) => {
    if (err) {
      throw err;
    } else {
      return cb(posts);
    }
  });
};

var findUserPosts = (user, cb) => {
  Post.find({ 'poster.username': user }).sort({datePosted: 'desc'}).exec((err, posts) => {
    if (err) {
      throw err;
    } else {
      return cb(posts);
    }
  });
}

var findUser = (username, cb) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      throw err;
    } else {
      return cb(user);
    }
  });
}

module.exports = router;
