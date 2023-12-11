<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
 
<template>
    <div >
        <div class="flex  text-3xl space-x-4 p-12">
            <div >
              Gameeee
            </div>
            <RouterLink to="/games">Games</RouterLink>
            <RouterLink to="/users">Users</RouterLink>
            
        </div>
    </div>
</template>
 
<style scoped></style>