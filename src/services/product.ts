import axios from "axios" 
import type { ProductResponse } from "../types/product"

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getProducts(): Promise<ProductResponse[]> {
    try {
        const res = await axios.get<ProductResponse[]>(
            `${API_BASE_URL}/api/products`, 
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
