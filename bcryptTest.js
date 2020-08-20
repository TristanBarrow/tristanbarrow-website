const bcrypt = require('bcrypt');
const saltRounds = 10;
const pass1 = 'pass1';
const pass2 = 'pass2';

// bcrypt.hash(pass1, saltRounds, (err, hash) => {
//     console.log(hash)
// });
const hash1 = '$2b$10$rOX2LOP.mLKiT2qSr0U2yeSbG8Q8ajcRlKrj1x/9tIa6avJP2EqB2';
const hash2 = '$2b$10$S8QEJy08M42Id76wgYHXsOgoV1myzelxavRVPQHl/Xnxj5q1uyPpi';


bcrypt.compare(pass2, hash1, (err, result) => {
    console.log(result)

})

bcrypt.compare(pass1, hash2, (err, result) => {
    console.log(result)
})