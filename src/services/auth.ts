import axios from "axios"
import type { LoginRequest, LoginResponse } from "../types/auth"

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function loginUser(user: LoginRequest): Promise<LoginResponse> {
    try {
        const res = await axios.post<LoginResponse>(
            `${API_BASE_URL}/api/users/login`,
            user,
            { withCredentials: true }
        )
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed")
    }
}
