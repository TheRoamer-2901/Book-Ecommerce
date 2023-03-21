import { FilterCategory } from "../types/Filter"

export const filterInitOptions : FilterCategory[] = [
    {
        title: "Giá",
        options: [
            {
                value: [0, 100000],
                description: "Dưới 100k",
                selected: false
            },
            {
                value: [100000, 500000],
                description: "100k-500k",
                selected: false
            },
            {
                value: [500000, 1000000],
                description: "500k-1000k",
                selected: false
            },
            {
                value: [1000000, undefined],
                description: "500k-1000k",
                selected: false
            }
        ],
        type: 'SINGLE_SELECT'     
    },
    {
        title: "Đánh giá",
        options: [
            {
                value: [3, 5],
                description: "Từ 3",
                selected: false
            },
            {
                value: [4, 5],
                description: "Từ 4",
                selected: false

            },
            {
                value: [5, 5],
                description: "Từ 5",
                selected: false
            }
        ],
        type: 'SINGLE_SELECT'     
    },
    {
        title: "Thể loại",
        options: [
            {
                value: "Tiểu thuyết",
                selected: false
            },
            {
                value: "Trinh thám",
                selected: false
            },
            {
                value: "Viễn tưởng",
                selected: false
            },
            {
                value: "Phiêu lưu",
                selected: false
            },
        ],
        type: 'MULTI_SELECT'     
    }
]



export const sellerInitId = undefined