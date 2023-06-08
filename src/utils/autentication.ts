export function isAuth() {
    return !!getToken()
}

export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token: string) {
    localStorage.setItem('token', token);
    return
}
