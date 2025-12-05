import { defineStore } from 'pinia'  
import type { ProductResponse } from '../types/product'
import { getProducts } from '../services/product'

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
                console.log("products",data)                 
            } catch (err) {
                // toast.error(`User not found! ${err}`) 
            }
        },  
    }
})
