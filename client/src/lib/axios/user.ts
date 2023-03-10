import { makeRequest } from "./request";

export function getUser(username : string, password: string) {
    return makeRequest('/user', {
        method: 'get',
        params: {
            username: username, 
            password: password
        }
    })
}

export function createUser(username: string, password: string) {
    return makeRequest('/user', {
        method: 'post',
        params: {
            username: username,
            password: password
        }
    })
}