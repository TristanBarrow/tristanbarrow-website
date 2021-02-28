module.exports = (route, callback) => {
    const fullRoute = '/api' + route;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json'); 
    fetch(fullRoute, headers)
        .then(res => res.json())
        .then(data => {
            callback(data)
            return data;
        });
}