import { FilterCategory } from "../types/Filter"

export const categories : FilterCategory[] = [
    {
        title: "Giá",
        options: [
            {
                value: [0, 100],
                description: "Dưới 100k"
            },
            {
                value: [100, 500],
                description: "100k-500k"
            },
            {
                value: [500, 1000],
                description: "500k-1000k"
            },
            {
                value: [10000, undefined],
                description: "500k-1000k"
            }
        ],
        type: 'SINGLE_SELECT'     
    },
    {
        title: "Đánh giá",
        options: [
            {
                value: [3, 5],
                description: "Từ 3"
            },
            {
                value: [4, 5],
                description: "Từ 4"
            },
            {
                value: [5, 5],
                description: "Từ 5"
            }
        ],
        type: 'SINGLE_SELECT'     
    },
    {
        title: "Thể loại",
        options: [
            {value: "Tiểu thuyết"},
            {value: "Trinh thám"},
            {value: "Viễn tưởng"},
            {value: "Phiêu lưu"},
        ],
        type: 'MULTI_SELECT'     
    }
]