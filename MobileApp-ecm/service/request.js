var token = localStorage.getItem("token");
var firstUrl = 'http://localhost:8080'

async function getMethod(url) {
    if(url.includes(firstUrl) == false){
        url = firstUrl + url;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    return response
}

async function postMethod(url, payload) {
    if(url.includes(firstUrl) == false){
        url = firstUrl + url;
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(payload)
    });
    return response
}

export {getMethod,postMethod}