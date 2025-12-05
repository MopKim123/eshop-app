<<template>
    <div class="navbar">
        <div class="app-name" @click="router.push('/')">
            <h2>eShoppers</h2>
        </div>

        <div class="right-section">

            <!-- CART ICON -->
            <img 
                src="../../assets/shopping-cart.png"
                class="cart-icon"
                alt="Cart"
                @click="router.push('/cart')"
            />

            <!-- GUEST -->
            <div class="auth" v-if="!username">
                <h3 @click="isRegisterVisible = true">Register</h3>
                <h3 @click="isLoginVisible = true">Login</h3>
            </div>

            <!-- LOGGED IN -->
            <div class="app-username" v-else>
                <h3 class="username" @click="toggleMenu">{{ username }}</h3>

                <div class="dropdown" v-show="showMenu">
                    <span @click="goPortfolio">Portfolio</span>
                    <span @click="logout">Log out</span>
                </div>
            </div>

        </div>

        <Login 
            :visible="isLoginVisible"
            @update="handleLogin"
            @close="isLoginVisible = false"
        />
        <Register 
            :visible="isRegisterVisible"
            @update="handleRegister"
            @close="isRegisterVisible = false"
        />
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue' 
import router from '../../router'; 
import { useAuthStore } from '../../store/auth.store';

const isRegisterVisible = ref(false)
const isLoginVisible = ref(false)
const username = ref<string | null>(null);
const showMenu = ref(false);
const authStore = useAuthStore()


onMounted(async () => {
  username.value = localStorage.getItem("username")
});

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function goPortfolio() {
  showMenu.value = false
  router.push("/portfolio")
}

function logout() {
  localStorage.removeItem("crypto_username")
  localStorage.removeItem("crypto_token")
  localStorage.removeItem("crypto_user_id")
  authStore.clear()

  showMenu.value = false
  username.value = null
  router.push("/")
}

function handleLogin(){
  username.value = localStorage.getItem("crypto_username")
}
function handleRegister(){
  isLoginVisible.value = true
}
 
</script>

<style scoped>
.navbar {
    width: 100vw;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #242424;
    border-bottom: 1px solid gray; 
    position: sticky;
    top: 0;
    z-index: 100;
}

.app-name {
    color: white;
    cursor: pointer;
    margin-left: 2vw;
}

.right-section {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-left: auto;
    margin-right: 2vw;
}

/* cart icon */
.cart-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: auto;
}

.cart-icon:hover {
    opacity: 0.8;
}

.auth h3 {
    color: white;
    cursor: pointer;
    margin: 0;
}

.app-username {
    position: relative;
    cursor: pointer;
}

.username {
    color: white;
    margin: 0;
}

.dropdown {
    position: absolute;
    right: 0;
    top: 120%;
    background: #2c2c2c;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    min-width: 150px;
    z-index: 50;
}

.dropdown span {
    padding: 0.5rem 1rem;
    color: white;
    cursor: pointer;
}

.dropdown span:hover {
    background: #444;
}

</style>
