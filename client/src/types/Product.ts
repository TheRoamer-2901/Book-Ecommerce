export type Product = {
    id: string
    name : string,
    author: string,
    img: string,
    price: number,
    discountRate: number
}

export type CartItem = Product & { quantity: number }


