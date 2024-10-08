<template>
    <div>
        <div class="dashboard-container">
            <h1>Dashboard</h1>
            <router-link to="/admin/manager-user" class="menu-link" exact-active-class="active-link">
                <v-btn class="menu-btn">Manager User</v-btn>
            </router-link>
            <router-link to="/admin/manager-product" class="menu-link" exact-active-class="active-link">
                <v-btn class="menu-btn">Manager Product</v-btn>
            </router-link>
        </div>
        <RouterView />
    </div>
</template>

<script setup>
</script>

<style>
.dashboard-container {
    display: flex;             
    flex-direction: column;    
    align-items: flex-start;  
}


.menu-btn {
    margin: 5px 0;
}

.active-link .menu-btn {
    background-color: #1976D2;
    color: white; 
    font-weight: bold;
}
</style>
