import { createSlice } from "@reduxjs/toolkit";
import { ProductQueryOption, filterValue, isListOption, isRangeOption } from "../../types/Filter";
import { filterInitOptions, sellerInitId } from "../../assets/fitlerCategories";
import { useAppSelector } from "../../hooks/hook";
import { formatCategoryTitle } from "../../utils/product";

const initialState : ProductQueryOption = {
    filterOptions: filterInitOptions,
    sellerId: sellerInitId
}

const productOption = createSlice ({
    name: 'productOption',
    initialState,
    reducers: {
        filterApplied: (state, action) => {
            const {title, index} = action.payload;
            
            state.filterOptions = state.filterOptions.map(category => {
                if(title === category.title) {  
                    if(category.type === 'INPUT') {
                    
                    } 
                    if(category.type === 'SINGLE_SELECT') {
                        category.options = category.options.map((op, i) => {
                            return i === index && !op.selected
                            ? {...op, selected: true} 
                            : {...op, selected: false}
                        })
                    } 
                    if(category.type === 'MULTI_SELECT') {
                        category.options = category.options.map((op, i) => {
                            return i === index 
                            ? {...op, selected: !op.selected} 
                            : op
                        })                    
                    }
                }
                return category
            })
        },
        filterCleared: (state) => {
            state.filterOptions = filterInitOptions
        }
    }
})


export function getSelectedFilter() {
    let filterOptions : filterValue[] = []
    useAppSelector(state => {
        state.productOption.filterOptions.forEach(category => {
            let option : filterValue = {title: formatCategoryTitle(category.title)!, value: {gte: undefined, lte: undefined, in: undefined}}
            let empty = true
            for(let op of category.options) {
                if(op.selected && isRangeOption(op)) {
                    option.value.gte = op.value[0]
                    option.value.lte = op.value[1] 
                    empty = false
                }
                if(op.selected && isListOption(op)) {
                    if(option.value.in == undefined) option.value.in = []
                    option.value.in.push(op.value)
                    empty = false
                }
            }
            if(!empty) filterOptions = [option, ...filterOptions]
        })        
    })
    return filterOptions
}

export const {
    filterApplied,
    filterCleared
} = productOption.actions

export default productOption.reducer