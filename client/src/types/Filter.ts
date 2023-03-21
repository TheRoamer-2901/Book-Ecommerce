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



export type ProductQueryOption = {
    filterOptions: FilterCategory[] 
    sellerId: string | undefined
}

export type filterValue = {
    title: string,
    value: {
        gte: number | undefined,
        lte: number | undefined, 
        in: string[] | undefined
    }
}