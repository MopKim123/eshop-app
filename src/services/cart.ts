import axios from "axios" 
import type { CartResponse } from "../types/cart"

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getCart(id: number): Promise<CartResponse> {
    try {
        const res = await axios.get<CartResponse>(
            `${API_BASE_URL}/api/cart/${id}`, 
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

export async function updateCartItem(cartItemId: number, quantity: number): Promise<CartResponse> {
    try {
        const res = await axios.put<CartResponse>(
            `${API_BASE_URL}/api/cart/item/${cartItemId}?quantity=${quantity}`,
            { },
            { withCredentials: true }
        )
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Update failed")
        }
        throw new Error("Update failed")
    }
}

export async function removeCartItem(cartItemId: number): Promise<CartResponse> {
    try {
        console.log("deleting cart item with id:", cartItemId)
        const res = await axios.delete<CartResponse>(
            `${API_BASE_URL}/api/cart/item/${cartItemId}`,
            { withCredentials: true }
        ) 
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Remove failed")
        }
        throw new Error("Remove failed")
    }
}

export async function addToCart(productId: number, quantity = 1): Promise<CartResponse> {
    const userId = Number(localStorage.getItem('userId'))
    try {
        const res = await axios.post<CartResponse>(
            `${API_BASE_URL}/api/cart/${userId}/add`,
            null,  
            {
                params: { productId, quantity }, 
                withCredentials: true
            }
        )
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Add to cart failed")
        }
        throw new Error("Add to cart failed")
    }
}