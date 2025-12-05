import { defineStore } from 'pinia'    
import type { OrderResponse } from '../types/order'
import { getOrders } from '../services/order'

export const useOrderStore = defineStore('order', {
    state: () => ({
        order: [] as OrderResponse[], 
    }),

    actions: {
        clear() {
            this.order = {} as OrderResponse[]
        },  
        setOrder(order: OrderResponse[]) {
            this.order = order 
        }, 
        async getOrder() { 
            try {   
                const data = await getOrders();    
                this.setOrder(data)    
                console.log("order",data)                 
            } catch (err) {
                // toast.error(`User not found! ${err}`) 
            }
        },   

        // async removeCartItem(cartItemId: number) {
        //     try {
        //         const updatedCart = await removeCartItem(cartItemId)
        //         this.cart = updatedCart
        //     } catch (error) {
        //         console.error("Failed to remove cart item:", error)
        //     }
        // }
    }
})
