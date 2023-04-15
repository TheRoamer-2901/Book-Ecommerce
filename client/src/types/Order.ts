export type Order = {
    id: string,
    note: string,
    date: string,
    location: string,
    deliveryLog: deliveryStatus[],
    cartItemId: string
    appliedCouponValue: number,
    purchaserId: number,
    cartItem: any
}

export type deliveryStatus = {
    date : string,
    state : string
    description : string
}