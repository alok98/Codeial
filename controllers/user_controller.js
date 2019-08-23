const User=require('../models/user');
//const db = require('./config/mongoose');
module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
        if(user){
            if(err){console.log('error in showing profile');return}
      return res.render('user_profile',{
        title: "profile",
        user:user
    });
    }
    return res.redirect('/user/signIn');
        });
    }
    else{
        return res.redirect('/user/signIn');
    }
}
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Sign Up"
    })
}
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Sign In"
    })
}
module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirm_password){
    return res.redirect('back')}
     User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user email');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log('error in creating user while signing up')
                }
               return res.redirect('/user/signIn');

            })
        }
        else{
        return res.redirect('back');}
        
    })

}
// creating sign in session
module.exports.create_session=function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user email while signing in'); return
        }
        // if user is present
        if(user){
            //password incorrect
            if(user.password!=req.body.password){
                console.log('5');
                 res.redirect('back');
            }
            else{
                res.cookie('user_id',user.id)
                res.redirect('/user/profile');
            }
        }
    })
}