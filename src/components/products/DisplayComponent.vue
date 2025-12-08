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
                    <h2>{{ product.name }}</h2>
                    <p>{{ product.description }}</p>
                    <h3>Price: P{{ product.price }}</h3>
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
    toast.success(`Added product to cart`)
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
    background-color: #121212;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2vh;
}

.product-card {
    background-color: #242424;
    /* border: 1px solid white; */
    border-radius: 1vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    color: white;
}
.product-card:hover{
    background-color: #3b3b3b;

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
    bottom: 5%;
    right: 5%;
    width: 25%;
    cursor: pointer;
    height: 10%;
    width: 10%;
}
.add-to-cart:active{
    height: 9.5%;
    width: 9.5%;
    margin: .25%;
}

.product-info {
    padding: 1vh;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
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
    height: 3vh;
    margin-left: auto;
    border-radius: 10px;
}

.search-bar button {
    padding: 0.5vh 1vh;
    margin-left: 0.5vh;
    cursor: pointer;
}

@media (max-width: 1200px) {
    .product-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 992px) {
    .product-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .search-bar input {
        width: 50%;
        margin-left: auto;
    }
}

@media (max-width: 480px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .search-bar {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5vh;
    }
    .search-bar input {
        width: 95%;
        margin-left: 0;
    }
}
</style>