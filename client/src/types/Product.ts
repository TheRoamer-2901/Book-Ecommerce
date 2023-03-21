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

export type CartItem = Product & {
    selected: boolean,
    quantity: number,
    appliedCouponValue: number
}


