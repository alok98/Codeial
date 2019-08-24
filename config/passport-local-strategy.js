const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user')
passport.use(new LocalStrategy({
    usernameField:'email'
},
    function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('error in finding user')
                return done(err)
            }
            if(!user||user.password!=password){
                return done(null,false)
            }
            return done(null,user)
        })
    }
))

passport.serializeUser(function(user,done){
    return done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user')
            return done(err);
        }
        return done(null,user);
    })

})
// check if the user us authenticated
passport.checkAuthentication =function(req,res,next){
  // if the user is signed in then pass request to the next function(controller action)
  if(req.isAuthenticated()){
      return next();
  }
  return res.redirect('/user/signIn')
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending it to the local for views
        res.locals.user=req.user;

    }
    next();
}

module.exports=passport;