import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
})

export function makeRequest(url : string, options : any) {
    return api(url, options)
        .then(res => res.data)
        .catch(error => {            
            return Promise.reject(error?.response?.status)
        })
}