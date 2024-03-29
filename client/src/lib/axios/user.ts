import { makeRequest } from "./request";

export function authenticateUser(username : string, password: string) {
    return makeRequest('/auth/login', {
        method: 'get',
        params: {
            username: username, 
            password: password
        },
        withCredentials: true
    })
}

export function logUserOut(userId: string) {
    return makeRequest('/auth/logout', {
        method: 'post',
        data: {
            uid: userId
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

export function getUserByAccessToken(token : string | undefined) {
    return makeRequest('user/token', {
        method: 'get',
        headers: {
            'authorization': 'Bearer ' + token
        }
    })
}

export function renewUserAccessToken() {
    return makeRequest('auth/refreshToken', {
        method: 'get'
    })
}

export function updateUserProfile(token: string, profile : any) {
    return makeRequest('user/update', {
        method: 'post',
        headers: {
            'authorization': 'Bearer ' + token
        },
        data: profile
    })
}

export function updateUserRole(token: string) {    
    return makeRequest('user/update/role', {
        method: 'post',
        headers: {
            'authorization': 'Bearer ' + token
        },
    })
}