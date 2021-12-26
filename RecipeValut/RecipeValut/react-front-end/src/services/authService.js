export const API_CONNECTION = () => {
    "http://localhost:42478/"
};

export const login = (Username, Password) => {
    fetch("http://localhost:42478/api/Users/Login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Username, Password})
    })
    .then(res => res.json());
};

export const register = (Username, Password) => {
    fetch('http://localhost:42478/api/Users/Register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Username, Password})
    })
    .then(res => res.json());
}