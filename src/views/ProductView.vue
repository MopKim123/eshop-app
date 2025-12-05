

<template>  
    <NavBar/> 
    <ViewProductComponent/>
</template>

<script setup lang="ts">
import ViewProductComponent from '../components/products/ViewProductComponent.vue';
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
