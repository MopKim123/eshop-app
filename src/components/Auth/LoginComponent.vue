<template>
    <!-- Backdrop always rendered -->
    <div class="modal-backdrop show"> 
        <div class="modal">
            <h2>Login</h2>
            <input v-model="request.username" placeholder="Username..." required/>
            <input v-model="request.password" type="password" placeholder="Password..." required @keyup.enter="login"/> 
            <span>No account yet? <b @click="register">Register</b></span>
            <div class="buttons">
                <button @click="login">Login</button> 
            </div>
        </div> 
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'  
import type { UserRequest } from '../../types/auth'
import { useAuthStore } from '../../store/auth.store'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
const request = ref({} as UserRequest) 

async function login() {  
    const authStore = useAuthStore() 
    const value = request.value
    if(!value.password || !value.username){
        toast.warn("Fill in the required fields!")
        return
    }

    try { 
        await authStore.login(request.value, router) 
        request.value = {} as UserRequest 
    } catch (error) {  
        toast.error("Something went wrong!")
    } 
}

function register() { 
    router.push('/register')
} 
</script>

<style scoped>
b{
    cursor: pointer;
}
.modal{
    background-color: #242424; 
    border: 1px solid white;
    padding: 5vh;
    width: 20vw;
    border-radius: 2vh;
    display: flex;
    flex-direction: column;
}
form{
    display: flex;
    flex-direction: column;
}

input{
    margin-bottom: 1rem;
    padding: 1vh;
    border-radius: 5px;
    border: 1px solid white;
} 
h2{
    color: white;
}

.buttons{ 
    display: flex;
    justify-content: space-around;
    margin-top: 1.5vh;
}

button{
    background-color: #242424; 
    color: rgb(255, 255, 255);
    border: 1px solid white;
}
button:hover{
    background-color: #444444; 
}
button:active{
    background-color: #242424; 
}

.modal-backdrop {   
    background-color: #121212;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.modal-backdrop.show {
    opacity: 1;
    pointer-events: all;
} 
</style>
