import { defineStore } from 'pinia'   
import type { CartResponse } from '../types/cart'
import { getCart, removeCartItem, updateCartItem as apiUpdateCartItem } from '../services/cart'
import { toast } from 'vue3-toastify'

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: {} as CartResponse, 
    }),

    actions: {
        clear() {
            this.cart = {} as CartResponse
        },  
        setCart(cart: CartResponse) {
            this.cart = cart 
        }, 
        async getCart() { 
            const userId = Number(localStorage.getItem('userId'))
            try {   
                const data = await getCart(userId);    
                this.setCart(data)          
            } catch (err) {
                toast.error(`Cart not found! ${err}`) 
            }
        },  
        
        async updateCartItem(cartItemId: number, quantity: number) {
            try {
                console.log("cartItemId",cartItemId, "quantity",quantity)
                await apiUpdateCartItem(cartItemId, quantity)
                // this.cart = updatedCart
            } catch (error) {
                console.error("Failed to update cart item:", error)
            }
        },

        async removeCartItem(cartItemId: number) {
            try {
                const updatedCart = await removeCartItem(cartItemId)
                this.cart = updatedCart
            } catch (error) {
                console.error("Failed to remove cart item:", error)
            }
        }
    }
})
