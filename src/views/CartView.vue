

<template>  
    <NavBar/> 
    <ViewCartComponent/>
</template>

<script setup lang="ts">
import ViewCartComponent from '../components/cart/ViewCartComponent.vue';
import NavBar from '../components/shared/NavBar.vue';
</script>

<style scoped>
    .container{ 
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;  
    }
</style>
