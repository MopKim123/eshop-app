<template>
    <div class="payment-container">
        <h2>Order Overview</h2>

        <table v-if="cart.items?.length" class="cart-table">
            <thead>
                <tr class="items-header">
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart.items" :key="item.productId" class="item-row">
                    <td>
                        <img 
                            :src="productImages[`../../assets/products/${item.productName}.png`]" 
                            alt="product" 
                            class="col-img"
                        />
                        {{ item.productName }}
                    </td>
                    <td>₱{{ item.price }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>₱{{ (item.price * item.quantity).toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>

        <div class="total-box" v-if="cart.items?.length">
            <h2>Total: ₱{{ totalAmount.toFixed(2) }}</h2>
        </div>

        <div v-else class="empty">
            <p>Your cart is empty.</p>
        </div>

        <button class="order-btn" @click="placeOrder" :disabled="!cart.items?.length">
            Place Order
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "../../store/cart.store"
import { checkout, getOrders } from "../../services/order"
import { toast } from "vue3-toastify"

const cartStore = useCartStore()
const router = useRouter()
const cart = ref(cartStore.cart)

const productImages = import.meta.glob('../../assets/products/*.png', { eager: true, as: 'url' })

onMounted(async () => {
    await cartStore.getCart()
    cart.value = cartStore.cart
})

const totalAmount = computed(() => {
    return cart.value.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

async function placeOrder() { 
    await checkout()
    await getOrders()
    toast.success(`Order placed! Total: ₱${totalAmount.value.toFixed(2)}`)
    router.push("/order")
}
</script>

<style scoped>
.payment-container {
    min-height: 91.5vh;
    background-color: #121212;
    padding: 2% 10%;
}

h2 {
    margin-bottom: 20px;
}
 
.cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #242424;
}

.cart-table th,
.cart-table td {
    padding: 10px 5px;
    text-align: left;
    border: none;
}

.items-header {
    font-weight: bold;
    color: white;
}

.item-row {
    background-color: #333;
    margin-bottom: 0.3vh;
}

.item-row td {
    vertical-align: middle;
}

.col-img {
    width: 65px;
    height: 65px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 1vw;
}

.total-box {
    margin-top: 20px;
    padding: 15px;
    text-align: right;
}

.order-btn { 
    background: #4CAF50;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.order-btn:disabled {
    background: #888;
    cursor: not-allowed;
}

.order-btn:hover:not(:disabled) {
    background: #45a049;
}

.empty {
    margin-top: 20px;
    text-align: center;
}
</style>
