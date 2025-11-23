
export const loggedInCheck = (req, res, next) => {

    if (req.session.user) {
        return res.redirect('/home');
    }else if(req.session.admin){
        return res.redirect('/admin/home')
    }
    next();
};

export const isAdmin = (req,res,next) => {
    if(req.session.admin){
        return next()
    }
    return res.status(403).send("Not Authorised")
    
}
export const ensureLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/loginPage');
    }
    next(); 
};
