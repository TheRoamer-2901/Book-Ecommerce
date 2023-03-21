import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
})

export function makeRequest(url : string, options : any) {
    return api(url, options)
        .then(res => res.data)
        .catch(error => {            
            Promise.reject(error?.response?.status)
        })
}