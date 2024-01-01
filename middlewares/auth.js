exports.protect = (req, res, next)=>{
    if(!req.session?.user){
        req.flash('error', 'Loggin First')
        res.redirect('/auth/login');
    }else   
    {

        next();

    }
}

exports.authorize = (...roles)=>(req, res, next)=>{
    if(!roles.includes(req.session?.user.role)){
        req.flash('error', 'User role is not authorize to access this route')
        res.redirect('/');
    }else
    next();

}