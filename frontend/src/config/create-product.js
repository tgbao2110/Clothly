export const createProductForm = [
    {
        label:'Title',
        name: 'title',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter product name'
    },
    {
        label:'Description',
        name: 'description',
        componentType: 'textarea',
        placeholder: 'Enter product description'
    },
    {
        label:'Category',
        name: 'category',
        componentType: 'select',
        options: [
            {id: 'men', label: 'Men'},
            {id: 'women', label: 'Women'},
            {id: 'kids', label: 'Kids'},
            {id: 'accessories', label: 'Accessories'},
            {id: 'footwear', label: 'Footwear'}
        ]
    },
    {
        label:'Brand',
        name: 'brand',
        componentType: 'select',
        options: [
            {id: 'nike', label: 'Nike'},
            {id: 'adidas', label: 'Adidas'},
            {id: 'puma', label: 'Puma'},
            {id: 'reebok', label: 'Reebok'},
            {id: 'under_armour', label: 'Under Armour'}
        ]
    },
    {
        label:'Price',
        name: 'price',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter product price'
    },
    {
        label: 'Sale Price',
        name: 'salePrice',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter sale price (optional)'
    },
    {
        label:'Stock Quantity',
        name: 'stockQuantity',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter stock quantity'
    }
]