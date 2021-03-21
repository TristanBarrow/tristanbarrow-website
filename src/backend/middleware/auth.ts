
export const std = (req: any, res: any, next: any) => {
    if (req.session.loggedIn) {
        next(); 
    } else {
        // res.setStatus(403);
        res.json({success: false, message: "You are not Authenticated"});
    }
}

// TODO: always check from database for isAdmin
export const admin = (req: any, res: any, next: any) => {
    if (req.session.loggedIn && req.session.isAdmin) {
        next();
    } else {
        // res.setStatus(403);
        res.json({success: false, message: "You are not Authenticated"}); 
    }
}

export const tb = (req: any, res: any, next: any) => {
    if (req.session.loggedIn && req.session.username === 'TristanBarrow') {
        next();
    } else {
        // res.setStatus(403);
        res.json({success: false, message: "You are not Authenticated"}); 
    }
}
