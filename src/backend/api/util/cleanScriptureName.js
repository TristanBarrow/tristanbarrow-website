const NAMES = {
    bom: 'Book of Mormon',
    dnc: 'Doctrine & Covenants',
    nt: 'New Testament',
    ot: 'Old Testament',
    pgp: 'Pearl of Great Price',
    jsMatt: 'Joseph Smith - Matthew',
    jsHist: 'Joseph Smith - History'
}

export default (name) => {
    if (NAMES[name] !== undefined) return NAMES[name];
    else return name;
}