import { defineStore } from 'pinia'    
import type { OrderResponse } from '../types/order'
import { getOrders } from '../services/order'
import { toast } from 'vue3-toastify'

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
            } catch (err) {
                toast.error(`Order/s not found! ${err}`) 
            }
        },   

        updateOrderStatus(orderId: number, newStatus: string) {
            const target = this.order.find(o => o.id === orderId)
            if (target) {
                target.status = newStatus
            }
        }
    }
})
