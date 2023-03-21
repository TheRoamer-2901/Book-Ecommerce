import { makeRequest } from "./request";

export function authenticateUser(username : string, password: string) {
    return makeRequest('/auth/login', {
        method: 'get',
        params: {
            username: username, 
            password: password
        }
    })
}

export function createUser(username: string, password: string) {
    return makeRequest('/auth/signup', {
        method: 'post',
        params: {
            username: username,
            password: password
        }
    })
}