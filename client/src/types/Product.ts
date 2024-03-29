export type Product = {
    id: string
    name : string,
    author: string,
    img: string,
    price: number,
    quantity: number
    discountRate: number
    genres: string[],
    coupons: number[]
}

export type NewProduct = {
    name : string,
    author: string,
    img: string,
    price: number,
    quantity: number
    discountRate: number
    genres: string[],
    coupons: number[]
}

type OrderInfo = {
    note: string,
    location: string
}

export type CartItem = {
    id : string,
    selected: boolean,
    quantity: number,
    product: Product
    appliedCouponValue: number
    orderInfo: OrderInfo
}


