
const std = (req, res, next) => {
    if (req.session.loggedIn) {
        next(); 
    } else {
        // res.setStatus(403);
        res.json({message: "You are not Authenticated"});
    }
}

const tb = (req, res, next) => {
    if (req.session.loggedIn && req.session.username === 'TristanBarrow') {
        next();
    } else {
        // res.setStatus(403);
        res.json({message: "You are not Authenticated"}); 
    }
}
// TODO: always check from database for isAdmin
const admin = (req, res, next) => {
    if (req.session.loggedIn && req.session.isAdmin) {
        next();
    } else {
        // res.setStatus(403);
        res.json({message: "You are not Authenticated"}); 
    }
}

module.exports = {
    std,
    admin,
    tb
};