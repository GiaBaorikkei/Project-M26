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

.menu-link {
    text-decoration: none; /* Xóa gạch chân cho liên kết */
}

.menu-btn {
    /* Có thể thêm các kiểu dáng cho nút nếu cần */
    margin: 5px 0; /* Thêm khoảng cách giữa các nút */
}

/* Đổi màu cho nút khi đang hoạt động */
.active-link .menu-btn {
    background-color: #1976D2; /* Màu nền cho nút đang hoạt động */
    color: white; /* Màu chữ cho nút đang hoạt động */
    font-weight: bold; /* Đánh dấu liên kết đang hoạt động */
}
</style>
