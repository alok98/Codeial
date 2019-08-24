const User=require('../models/user');
//const db = require('./config/mongoose');
module.exports.profile=function(req,res){
   res.render('user_profile',{
       title: "profile"
   });
}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }

    return res.render('user_sign_up',{
        title:"Sign Up"
    })
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
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

module.exports.createSession = function(req,res){
    return res.redirect('/')
}