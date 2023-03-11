export type RangeOption = {
    value: [number, number | undefined],
    selected: boolean
    description: string
}

export type ListOption = {
    value: string
    selected: boolean
}

export type FilterCategory = {
    title: string,
    options: RangeOption[] | ListOption[],
    type: 'SINGLE_SELECT' | 'MULTI_SELECT' | 'INPUT' 
}


export function isRangeOption(op: RangeOption | ListOption): op is RangeOption {
    return (op as RangeOption).description !== undefined
}

export function isListOption(op: RangeOption | ListOption): op is ListOption {
    return typeof (op as ListOption).value === 'string'
}



export type SearchOption = {
    name: string,
    author: string,
    option: 'AUTHOR' | 'PRODUCT'
}

type Seller = {name: string}

export type ProductQueryOption = {
    searchOption: SearchOption,
    filterOptions: FilterCategory[] 
    sellerOption: Seller
}