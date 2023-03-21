import { Product } from "../../types/Product";
import { makeRequest } from "./request";


export function getProductById(id : string) {
    return makeRequest(`/product/${id}`,{
        method: 'get'
    })
}

export function getProductByName(name : string) {
    return makeRequest(`/productname/${name}`,{
        method: 'get'
    })
}

export function getProductList(sellerId : string = "") {
    let route = sellerId !== "" ? `/product/${sellerId}` : '/product' 
    return makeRequest(route, {
        method: 'get'
    })
}


export function getProductListByFilter(filterOptions: any[]) {
    return makeRequest(`/product/filter`,{
        method: 'post',
        data: filterOptions
    })
}

export function updateProductStat(id: string, product: Product) {
    return makeRequest(`product/${id}`, {
        method: 'post',
        data: product
    })
}