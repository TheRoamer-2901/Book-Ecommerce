export type RangeOption = {
    value: [number, number | undefined] 
    description: string
}

export type ListOption = {
    value: string
}

export type FilterCategory = {
    title: string,
    options: RangeOption[] | ListOption[],
    type: 'SINGLE_SELECT' | 'MULTI_SELECT' | 'INPUT' 
}

export function isRangeOption(op: RangeOption | ListOption): op is RangeOption {
    return (op as RangeOption).description !== undefined
}