
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
 