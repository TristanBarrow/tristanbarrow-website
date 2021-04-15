
export const std = (req: any, res: any, next: any) => {
    const { loggedIn } = req.session;
    if (loggedIn) {
        next(); 
    } else {
        // res.setStatus(403);
        res.json({success: false, message: "You are not Authenticated"});
    }
}

// TODO: always check from database for isAdmin
export const admin = (req: any, res: any, next: any) => {
    const { loggedIn, isAdmin } = req.session;
    if (loggedIn && isAdmin) {
        next();
    } else {
        // res.setStatus(403);
        res.json({success: false, message: "You are not Authenticated"}); 
    }
}

export const tb = (req: any, res: any, next: any) => {
    const { loggedIn, isAdmin, username } = req.session;
    if (loggedIn && isAdmin && username === 'TristanBarrow') {
        next();
    } else {
        // res.setStatus(403);
        res.json({success: false, message: "You are not Authenticated"}); 
    }
}
