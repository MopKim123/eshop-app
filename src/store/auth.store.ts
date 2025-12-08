import { defineStore } from 'pinia' 
import { loginUser } from '../services/auth'
import type { LoginResponse, UserRequest } from '../types/auth'
import { toast } from 'vue3-toastify'
import { type Router } from 'vue-router'

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
        async login(user: UserRequest, router: Router) { 
            try {   
                const data = await loginUser(user);    
                console.log("user",data)  
                this.setUser(data)    
                router.push('/home')
            } catch (err) {
                toast.error(`User not found! ${err}`) 
            }
        },  
    }
})
