
// LOGIN
export default (callback: any) => {
    const fullRoute = '/api/user/status';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    
    const request = new Request(fullRoute, {
        method: 'GET',
        headers,
        mode: 'same-origin',
    });

    fetch(request)
        .then(res => res.json())
        .then(data => {
            callback(data)
            return data;
        });
    
}