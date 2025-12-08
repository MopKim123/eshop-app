<template>
    <div class="cart-container">
        <div class="cart-header">
            <h2>Your Cart</h2>
            <button class="pay-btn" @click="goToPayment">
                Proceed to Payment
            </button>
        </div>

        <table v-if="cart.items?.length" class="cart-table">
            <thead>
                <tr class="items-header">
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
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
                    </td>
                    <td>{{ item.productName }}</td>
                    <td>₱{{ item.price }}</td>
                    <td>
                        <input 
                            type="number" 
                            min="1" 
                            v-model.number="item.quantity" 
                            @change="updateItem(item)"
                            class="col-quantity-input"
                        />
                    </td>
                    <td>₱{{ (item.price * item.quantity).toFixed(2) }}</td>
                    <td>
                        <button class="remove-btn" @click="removeItem(item.id)">✕</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="total-box" v-if="cart.items?.length">
            <h2>Total: ₱{{ totalAmount.toFixed(2) }}</h2>
        </div>

        <div v-else class="empty">
            <p>Your cart is empty.</p>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "../../store/cart.store"
import { toast } from "vue3-toastify"
import type { CartResponse } from "../../types/cart"

const cartStore = useCartStore()
const router = useRouter()
const cart = ref({} as CartResponse)

const productImages = import.meta.glob('../../assets/products/*.png', { eager: true, as: 'url' })

onMounted(async () => {
    await cartStore.getCart()
    cart.value = cartStore.cart
})

const totalAmount = computed(() => {
    return cart.value.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

function updateItem(item: any) {
    if (item.quantity < 1) item.quantity = 1
    cartStore.updateCartItem(item.id, item.quantity)
}

function removeItem(cartItemId: number) {
    cartStore.removeCartItem(cartItemId)  
    cart.value.items = cart.value.items.filter(i => i.id !== cartItemId)
}

function goToPayment() {
    if(!cartStore.cart.items.length){
        toast.info("Cart is empty!")
        return
    }
    router.push("/payment")
}
</script>



<style scoped>
.cart-container { 
    min-height: 91.5vh;
    background-color: #121212;
    padding: 2% 10%;
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pay-btn {
    background: #4CAF50;
    color: white;
    padding: 10px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.cart-table {
    width: 100%;
    border-collapse: collapse; /* removes default borders */
    margin-top: 20px;
    background-color: #242424;
}

.cart-table th,
.cart-table td {
    padding: 10px 5px;
    text-align: left;
    border: none; /* invisible borders */
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
    color: white;
}

.col-img {
    width: 65px;
    height: 65px;
    object-fit: cover;
    border-radius: 6px;
    margin-left: 2vw;
}

.col-quantity-input {
    width: 60px;
    padding: 3px;
    border-radius: 4px;
    border: 1px solid #ccc;
    text-align: center;
}

.remove-btn {
    background: #ff4c4c;
    color: white;
    border: none;
    padding: 5px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.remove-btn:hover {
    background: #ff1f1f;
}

.total-box {
    margin-top: 20px;
    padding: 15px;
    text-align: right;
}

.empty {
    margin-top: 20px;
    text-align: center;
}

</style>
