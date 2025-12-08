<script setup lang="ts"> 
import { ToastifyContainer } from 'vue3-toastify'
</script>

<template>
  <ToastifyContainer :clear-on-url-change="false" />
  <router-view/>  
</template>
<!-- #121212 -->
<style>
* {
    font-family: 'Inter', Arial, Helvetica, sans-serif;
}
</style>
