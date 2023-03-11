import { createSlice } from "@reduxjs/toolkit";
import { ProductQueryOption } from "../../types/Filter";
import { filterInitOptions, searchInitOption, sellerInitOption } from "../../assets/fitlerCategories";

const initialState : ProductQueryOption = {
    searchOption: searchInitOption,
    filterOptions: filterInitOptions,
    sellerOption: sellerInitOption
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
        searchOptionSelected: (state, action) => {            
            state.searchOption.option = action.payload
        },
        filterCleared: (state) => {
            state.filterOptions = filterInitOptions
        }
    }
})

export const {
    filterApplied,
    searchOptionSelected,
    filterCleared
} = productOption.actions

export default productOption.reducer