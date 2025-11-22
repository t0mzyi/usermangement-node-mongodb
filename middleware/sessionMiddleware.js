
export const loggedInCheck = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/home');
    }
    next();
};


export const ensureLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/loginPage');
    }
    next(); 
};
