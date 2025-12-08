import { defineStore } from 'pinia' 
import { loginUser } from '../services/auth'
import type { LoginResponse, UserRequest } from '../types/auth'
import { toast } from 'vue3-toastify'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userId: Number(localStorage.getItem('userId')), 
        username: '', 
    }),

    actions: {
        clear() {
            this.username = ''
        },  
        setUser(user: LoginResponse) {
            this.username = user.username
            localStorage.setItem("username", user.username) 
            localStorage.setItem("userId", user.id.toString())
        }, 
        async login(user: UserRequest) { 
            try {   
                const data = await loginUser(user);    
                this.setUser(data)    
                console.log("user",data)                 
            } catch (err) {
                toast.error(`User not found! ${err}`) 
            }
        },  
    }
})
