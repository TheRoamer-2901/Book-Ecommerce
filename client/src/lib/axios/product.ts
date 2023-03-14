import { makeRequest } from "./request";

export function getProductByName(name : string) {
    return makeRequest(`/productname/${name}`,{
        method: 'get'
    })
}