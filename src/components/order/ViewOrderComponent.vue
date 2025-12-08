<template>
    <div class="orders-container">
        <!-- Status Tabs -->
        <div class="status-tabs">
            <button 
                v-for="s in statuses" 
                :key="s" 
                @click="currentStatus = s"
                :class="{ active: currentStatus === s }"
            >
                {{ s }}
            </button>
        </div>

        <!-- Orders List -->
        <div v-if="filteredOrders.length">
            <div v-for="order in filteredOrders" :key="order.id" class="order-card">
                <div class="order-header">
                    <span>Order ID: {{ order.id }}</span>
                    <span>Status: {{ order.status }}</span>
                    <span>Date: {{ new Date(order.createdAt).toLocaleString() }}</span>
                </div>

                <table class="order-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.items" :key="item.productId">
                            <td class="product-column">
                                <img 
                                    :src="productImages[`../../assets/products/${item.productName}.png`]" 
                                    alt="product" 
                                    class="col-img"
                                />
                                {{ item.productName }}
                            </td>
                            <td>₱{{ Number(item.price).toFixed(2) }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>₱{{ parseFloat(item.subtotal).toFixed(2) }}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="order-total">
                    <strong>Total: ₱{{ parseFloat(order.totalAmount).toFixed(2) }}</strong>
                    <button 
                        v-if="canCancel(order)"
                        class="cancel-btn"
                        @click="cancel(order.id)"
                    >
                        Cancel Order
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="empty">
            <p>No orders with status "{{ currentStatus }}"</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useOrderStore } from '../../store/order.store'
import type { OrderResponse } from '../../types/order'
import { cancelOrder } from '../../services/order'

const orderStore = useOrderStore()
const productImages = import.meta.glob('../../assets/products/*.png', { eager: true, as: 'url' })

const statuses = ['PENDING', 'COMPLETED', 'CANCELLED']
const currentStatus = ref('PENDING')

// Fetch orders when component mounts
onMounted(async () => {
    await orderStore.getOrder()
})

// Filter orders by selected status
const filteredOrders = computed(() => 
    orderStore.order.filter(o => o.status === currentStatus.value)
)

function canCancel(order: OrderResponse): boolean {
    if (order.status !== "PENDING") return false

    const created = new Date(order.createdAt).getTime()
    const now = Date.now()

    const daysPassed = (now - created) / (1000 * 60 * 60 * 24)
    return daysPassed < 7
}

async function cancel(orderId: number) {
    cancelOrder(orderId)
    orderStore.updateOrderStatus(orderId, 'CANCELLED')
}

const sortedOrders = computed(() =>
    [...orderStore.order].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
)
</script>

<style scoped>
.orders-container {
    width: 80%;
    margin: auto;
    padding-top: 4vh;
    color: white;
    min-height: 91.5vh;
}

.status-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2vh;
}

.status-tabs button {
    padding: 0.5rem 1rem;
    border: 1px solid white;
    background-color: #242424;
    color: white;
    cursor: pointer;
    border-radius: 4px;
}

.status-tabs button.active {
    background-color: #4CAF50;
    border-color: #4CAF50;
}

.order-card {
    background-color: #333;
    padding: 1rem;
    margin-bottom: 2vh;
    border-radius: 6px;
}

.order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 0.95rem;
}

.order-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}

.order-table th,
.order-table td {
    text-align: left;
    padding: 8px;
    color: white;
} 

.product-column{
    display: flex;
    align-items: center;
}

.col-img {
    width: 3vw;
    height: 3vw;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 1vw;
}

.order-table tr {
    background-color: #444;
    margin-bottom: 0.3vh;
}

.order-total {
    text-align: right;
    font-size: 1.1rem;
}

.empty {
    text-align: center;
    margin-top: 2rem;
}

.cancel-btn {
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    background: #a00000;
    color: white;
    border: 1px solid white;
    cursor: pointer;
    border-radius: 4px;
}

.cancel-btn:hover {
    background: #cc0000;
}

</style>
