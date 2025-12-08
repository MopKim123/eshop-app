<template>
    <div class="product-display show">
        <div class="search-bar">
            <h2>Products</h2>
            <input 
                v-model="searchQuery" 
                placeholder="Search..." 
                @keyup.enter="filterProducts"
            />
        </div>

        <div class="product-grid">
            <div 
                v-for="product in filteredProducts" 
                :key="product.id" 
                class="product-card"
                @click="goToProduct(product)"
            >
                <div class="image-wrapper">
                    <img 
                        :src="productImages[`../../assets/products/${product.name}.png`]" 
                        alt="product.name" 
                        class="product-image"
                    />  
                    <img 
                        src="../../assets/add.png" 
                        class="add-to-cart" 
                        alt="Add to cart"
                        @click.stop="addProductToCart(product)"
                    />
                </div> 
                <div class="product-info">
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.description }}</p>
                    <p>Price: P{{ product.price }}</p>
                    <p>Stock: {{ product.stock }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../../store/product.store'
import type { ProductResponse } from '../../types/product'
import { useRouter } from 'vue-router'
import { addToCart } from '../../services/cart'
import { toast } from 'vue3-toastify'

const router = useRouter()
const productStore = useProductStore()
const searchQuery = ref('')

onMounted(async () => {
    await productStore.getAllProducts()
})

const productImages = import.meta.glob('../../assets/products/*.png', { eager: true, as: 'url' })

const filteredProducts = computed(() => {
    if (!searchQuery.value) return productStore.products
    return productStore.products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

function goToProduct(product: ProductResponse) {
    productStore.selectedProduct = product
    router.push("/product")
}

function addProductToCart(product: ProductResponse) {
    addToCart(product.id, 1)
    toast.success("Added to cart")
}

function filterProducts() {
    if (!searchQuery.value) return productStore.products
    return productStore.products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
} 

</script>

<style scoped>
.product-display {
    padding: 2vh;
    min-height: 91.5vh;
}

.product-grid {

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2vh;
}

.product-card {
    background-color: #242424;
    border: 1px solid white;
    border-radius: 1vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    color: white;
}

.image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%; /* square ratio */
    overflow: hidden;
}

.product-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* keeps square, fills container */
}

.add-to-cart {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 25%;
    cursor: pointer;
    height: 15%;
    width: 15%;
}

.product-info {
    padding: 1vh;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.product-info h3 {
    margin: 0.5vh 0;
}


.search-bar {
    display: flex;
    margin-bottom: 2vh;  
    align-items: center;
}

.search-bar h2{
    margin: 0;
}

.search-icon{
    height: 1.5vw;
}
.search-bar input { 
    padding: 0.5vh 1vh;
    font-size: 0.9rem;
    width: 20%;
    height: 2vh;
    margin-left: auto;
}

.search-bar button {
    padding: 0.5vh 1vh;
    margin-left: 0.5vh;
    cursor: pointer;
}
</style>
