
const std = (req, res, next) => {
    if (req.session.loggedIn) {
        next(); 
    } else {
        // res.setStatus(403);
        res.json({message: "You are not Authenticated"});
    }
}

const tb = (req, res, next) => {
    if (req.session.loggedIn && req.user === 'TristanBarrow') {
        next();
    } else {
        // res.setStatus(403);
        res.json({message: "You are not Authenticated"}); 
    }
}

module.exports = {
    std,
    tb
};