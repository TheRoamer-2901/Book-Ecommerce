import { Product } from "../../types/Product";
import { makeRequest } from "./request";



export function getProductById(id : string) {
    return makeRequest(`/product/${id}`,{
        method: 'get'
    })
}
export function getShopProductById(id : string, token: string) {
    return makeRequest(`/seller/product/${id}`,{
        headers: {'authorization': 'Bearer ' + token},
        method: 'get'
    })
}

export function getProductByName(name : string) {
    return makeRequest(`/search/product/name`,{
        method: 'get',
        params: {
            name: name
        }
    })
}

export function getProductByAuthor(author: string) {
    return makeRequest(`/search/product/author`,{
        method: 'get',
        params: {
            name: author
        }    
    })
}

export function getProductList(page: number) {    
    return makeRequest('/product', {
        method: 'get',
        params: {
            page: page
        }
    })
}

export function getShopProductList(token: string, page: number) {
    return makeRequest(`/seller/product`, {
        method: 'get',
        headers: {'authorization': 'Bearer ' + token},
        params: {
            page: page
        }
    })
}

export function getProductListByFilter(filterOptions: any[],page: number) {    
    return makeRequest(`/product/filter`,{
        method: 'get',
        params: {
            options: filterOptions,
            page: page
        }
    })
}

export function getShopProductListByFilter(filterOptions: any[], token: string, page: number) {    
    return makeRequest(`/seller/product/filter`,{
        method: 'get',
        headers: {'authorization': 'Bearer ' + token},
        params: {
            options: filterOptions,
            page: page
        }
    })
}

export function updateProductStat(product: Product) {
    return makeRequest(`/seller/product/update`, {
        method: 'post',
        data: product
    })
}
export function createNewProduct(product: any) {
    return makeRequest(`/seller/product/create`, {
        method: 'post',
        data: product
    })
}

export function getProductQuantity() {
    return makeRequest('/product/count', {
        method: 'get'
    })
}
export function getShopProductQuantity(token: string) {
    return makeRequest('/seller/product/count', {
        method: 'get',
        headers: {'authorization': 'Bearer ' + token},
    })
}

export function getFilteredProductQuantity(filterOptions: any[]) {
    return makeRequest('/product/filter/count', {
        method: 'get',
        params: {
            options: filterOptions,
        }
    })
}
export function getFilteredShopProductQuantity(filterOptions: any[], token: string) {
    return makeRequest('/seller/product/filter/count', {
        method: 'get',
        headers: {'authorization': 'Bearer ' + token},
        params: {
            options: filterOptions,
        }
    })
}