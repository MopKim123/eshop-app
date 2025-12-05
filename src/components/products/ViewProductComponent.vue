<template>
    <div class="product-view">
        <div class="image-wrapper">
            <img 
                :src="productImages[`../../assets/products/${product.name}.png`]" 
                class="product-image"
            />
        </div>

        <div class="details">
            <h1>{{ product.name }}</h1>
            <p>{{ product.description }}</p>
            
            <div class="info">
                <span class="label">Price:</span>
                <span class="value">₱{{ product.price }}</span>
            </div>

            <div class="info">
                <span class="label">Stock:</span>
                <span class="value">{{ product.stock }}</span>
            </div>

            <button class="add-cart-btn">
                Add to Cart
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue" 
import { useProductStore } from "../../store/product.store";

const productStore = useProductStore()
const productImages = import.meta.glob('../../assets/products/*.png', { eager: true, as: 'url' })

const product = computed(() => productStore.selectedProduct)
</script>

<style scoped>
.product-view {
    display: flex;
    gap: 4vh;
    padding: 4vh;
    height: 90vh;
}

/* SQUARE LEFT IMAGE */
.image-wrapper {
    width: 65%;
    padding-top: 45%;
    position: relative;
}

.product-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid white;
    border-radius: 1vh;
}

/* DETAILS AT TOP */
.details {
    flex: 1;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* puts content at top left */
    gap: 1rem;
}

/* label/value layout */
.info {
    display: flex;
    gap: 0.5rem;
    font-size: 1.1rem;
}

.label {
    font-weight: bold;
}

.add-cart-btn {
    margin-top: 1.5rem;
    background: #242424;
    color: white;
    border: 1px solid white;
    padding: 1rem 2rem;
    cursor: pointer;
    margin: 0 auto;
}

.add-cart-btn:hover {
    background: #444;
}

</style>
