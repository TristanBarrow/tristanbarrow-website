const scriptures = {
    bom: require('../../res/scriptures/book-of-mormon-reference.json'),
    dnc: require('../../res/scriptures/doctrine-and-covenants-reference.json'),
    nt: require('../../res/scriptures/new-testament-reference.json'),
    ot: require('../../res/scriptures/old-testament-reference.json'),
    pgp: require('../../res/scriptures/pearl-of-great-price-reference.json'),  
}

module.exports = (test, book, chapter, verse) => {
    // if they want testament keys, send them
    if (test === 'keys') return Object.keys(scriptures);

    // if the testament doesn't exist send an error
    if (test === undefined || test === null || scriptures[test] === undefined)    
        return null;

    // save the testament
    const _test = scriptures[test];

    // if they want book keys, send them
    if (book === 'keys') return Object.keys(_test);

    // if they dont want the book, send the testament
    if (book === null) {
        return _test;
    } 

    // if the book is not in the testament send an error
    if (book === undefined || _test[book] === undefined) return null;

    // save the book
    const _book = _test[book];

    // if they want chapter keys, send them
    if (chapter === 'keys') return Object.keys(_book);

    // if they don't want the chapter, send the book
    if (chapter === null) return _book;

    // if the chapter is not in the book send an error
    if (chapter === undefined || _book[chapter] === undefined) return null;

    // save the chapter
    const _chapter = _book[chapter];

    if (verse === 'keys') return Object.keys(_chapter);

    // if they don't want the verse, send the chapter
    if (verse === null) {
        if (typeof _chapter === 'string') {
            // in this case the chapter is actually sections in d&c
            return {
                type: 'verse',
                isLast: `${Object.keys(_book).length}` === chapter,
                content: _chapter
            }
        }
        return _chapter;
    }

    // if the verse doesn't exist, send an error
    if (verse === undefined || _chapter[verse] === undefined) return null;

    // send the verse
    return {
        isLeaf: true,
        text: _chapter[verse],
        isLast: `${Object.keys(_chapter).length}` === verse
    }
}