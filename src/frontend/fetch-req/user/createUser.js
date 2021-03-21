
// CREATE USER
export default (username, password, callback) => {
    const fullRoute = '/api/user/create';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    
    const request = new Request(fullRoute, {
        method: 'POST',
        headers,
        mode: 'same-origin',
        body: JSON.stringify({username, password}),
    });

    fetch(request)
        .then(res => res.json())
        .then(data => {
            callback(data)
            return data;
        });
    
}