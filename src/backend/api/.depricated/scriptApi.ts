// app.post('/api/login', jsonParser, (req, res) => {
//     user.login(req.body.username, req.body.password, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.json({success: false, message: 'An unknown error has occurred, contact the admin' });
//             throw new Error(err); 
//         }
//         if (result.success) {
//             req.session.loggedIn = true;
//             req.session.username = result.username;
//             req.session.isAdmin = result.isAdmin;
//             res.json({ success: true, message: "Logged In"});
//         } else {
//             res.json(result);
//         }   
//     });
// });

// app.get('/api/user/status', auth.std, (req, res) => {
//     res.json({
//         success: true, 
//         user: req.session.username,
//         isAdmin: req.session.isAdmin
//     });
// });

// app.get('/api/logout', (req, res) => {
//     req.session.destroy();
//     res.json({ 
//         success: true,
//         message: 'Logged out'
//     });
// })

// app.post('/api/user/create', jsonParser, (req, res) => {
//     user.createUser(req.body.username, req.body.password, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.json({success: false, message: 'An unknown error has occurred, contact the admin' });
//             throw new Error(err);
//         } else {
//             res.json(result);
//         }
//     })
// });

// app.get('/api/users', auth.tb, (req, res) => {
//     user.getUsers((err, users) => {
//         if (err) {
//             console.error(err);
//             res.json({success: false, message: 'An unknown error has occurred, contact the admin' });
//             throw new Error(err);
//         } else {
//             res.json(users);
//         }
//     });
// });

// app.get(`/api/scriptures/:test/:book/:chapter/:verse`, (req, res) => {
//     const { test, book, chapter, verse } = req.params;
//     const s = getScriptures(test, book, chapter, verse, null);
//     if (s === null) throw new Error (`404 - failed to find verse '${test}/${book}/${chapter}/${verse}'`)
//     res.json(s);
// });

// app.get(`/api/scriptures/:test/:book/:chapter`, (req, res) => {
//     const { test, book, chapter } = req.params;
//     const s = getScriptures(test, book, chapter, null);
//     if (s === null) throw new Error (`404 - failed to find chapter or verse '${test}/${book}/${chapter}'`)
//     res.json(s);
// });

// app.get(`/api/scriptures/:test/:book`, (req, res) => {
//     const { test, book } = req.params;
//     const s = getScriptures(test, book, null);
//     if (s === null) throw new Error (`404 - failed to find book or section '${test}/${book}'`)
//     res.json(s);
// });

// app.get(`/api/scriptures/:test`, (req, res) => {
//     const { test } = req.params;
//     if (test === 'random') {
//         res.json(getRandomScripture());
//         return;
//     }
//     const s = getScriptures(test, null);
//     if (s === null) throw new Error (`404 - failed to find testament '${test}'`)
//     res.json(s);
// });