import axios from "axios" 
import type { CartResponse } from "../types/cart"
import type { OrderResponse } from "../types/order"

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getOrders(): Promise<OrderResponse[]> {
    const userId = Number(localStorage.getItem('userId'))
    try {
        const res = await axios.get<OrderResponse[]>(
            `${API_BASE_URL}/api/orders/user/${userId}`, 
            { withCredentials: true }
        )
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "fetch failed")
        }
        throw new Error("fetch failed")
    }
}  

export async function checkout(): Promise<void> {
    const userId = Number(localStorage.getItem('userId'))
    try {
        await axios.post<void>(
            `${API_BASE_URL}/api/orders/checkout/${userId}`,
            null,  
            {  
                withCredentials: true
            }
        ) 
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Add to cart failed")
        }
        throw new Error("Add to cart failed")
    }
}

export async function cancelOrder(orderId: number): Promise<void> {
    const userId = Number(localStorage.getItem('userId'))
    try {
        await axios.post<void>(
            `${API_BASE_URL}/api/orders/${orderId}/cancel/${userId}`,
            null,  
            {  
                withCredentials: true
            }
        )
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Add to cart failed")
        }
        throw new Error("Add to cart failed")
    }
}