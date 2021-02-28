const scriptures = {
    bom: require('../../cradle/scriptures/book-of-mormon-flat.json'),
    dnc: require('../../cradle/scriptures/doctrine-and-covenants-flat.json'),
    nt: require('../../cradle/scriptures/new-testament-flat.json'),
    ot: require('../../cradle/scriptures/old-testament-flat.json'),
    pgp: require('../../cradle/scriptures/pearl-of-great-price-flat.json'),  
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = () => {
    let testament = null;
    switch (getRandomInt(5)) {
        case 0: 
            testament = scriptures.bom;
            break;
        case 1: 
            testament = scriptures.dcn;
            break;
        case 2: 
            testament = scriptures.nt;
            break;
        case 3: 
            testament = scriptures.ot;
            break;
        case 4: 
            testament = scriptures.pgp;
            break;
    }
    const verse = testament.verses[getRandomInt(testament.verses.length)];
    console.log(verse);
    return verse;
}