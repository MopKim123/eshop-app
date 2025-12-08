import { defineStore } from 'pinia'  
import type { ProductResponse } from '../types/product'
import { getProducts } from '../services/product'
import { toast } from 'vue3-toastify'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as ProductResponse[],
        selectedProduct: {} as ProductResponse 
    }),

    actions: {
        clear() {
            this.products = []
            this.selectedProduct = {} as ProductResponse
        },  
        setProducts(list: ProductResponse[]) {
            this.products = list 
        }, 
        async getAllProducts() { 
            try {   
                const data = await getProducts();    
                this.setProducts(data)    
            } catch (err) {
                toast.error(`Products not found! ${err}`) 
            }
        },  
    }
})
