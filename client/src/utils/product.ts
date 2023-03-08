export function getDiscountPrice(price : number, discountRate : number, ...discountCoupons: number[]) : number {
    return Math.ceil(price*(1-discountRate/100))
}