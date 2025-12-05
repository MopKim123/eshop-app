

<template>  
    <NavBar/> 
    <DisplayComponent/>
</template>

<script setup lang="ts">
import DisplayComponent from '../components/products/DisplayComponent.vue';
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
