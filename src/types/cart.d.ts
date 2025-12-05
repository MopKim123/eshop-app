
export interface CartResponse {
    id: number
    items: CartItemResponse[] 
    totalAmount: string
    userId: number
} 
export interface CartItemResponse {
    id: number
    productId: number
    price: number
    productName: string 
    quantity: number
    subtotal: string 
} 

// {
//     "id": 1,
//     "items": [
//         {
//             "price": "450.00",
//             "productId": 1,
//             "productName": "Wireless Mouse",
//             "quantity": 1,
//             "subtotal": "450.00"
//         },
//         {
//             "price": "550.00",
//             "productId": 3,
//             "productName": "USB-C Charger",
//             "quantity": 2,
//             "subtotal": "1100.00"
//         },
//         {
//             "price": "3200.00",
//             "productId": 5,
//             "productName": "Portable SSD 500GB",
//             "quantity": 1,
//             "subtotal": "3200.00"
//         }
//     ],
//     "totalAmount": "4750.0",
//     "userId": 1
// }