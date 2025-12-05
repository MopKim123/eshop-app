
export interface OrderResponse {
    id: number
    userId: number
    items: OrderItemResponse[] 
    totalAmount: string
    status: string
    createdAt: string
} 
export interface OrderItemResponse { 
    productId: number
    price: number
    productName: string 
    quantity: number
    subtotal: string 
}  