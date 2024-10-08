<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex justify-space-between">
              <h3>Quản lý người dùng</h3>
              <!-- Nút thêm người dùng -->
              <v-btn color="primary" class="ml-4" @click="toggleForm">
                <v-icon left>mdi-plus</v-icon>
                Thêm người dùng
              </v-btn>
            </v-card-title>
  
            <!-- Form thêm người dùng (import từ file khác) -->
            <AddUser
              v-if="showForm"
              :onSubmit="isEditing ? updateUser : addUser"
              :onClose="toggleForm"
              :user="currentUser"
              :isEditing="isEditing"
              :formTitle="isEditing ? 'Edit User' : 'Add User'"
            ></AddUser>
  
            <!-- Bảng danh sách người dùng -->
            <v-data-table
              :headers="headers"
              :items="users"
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn color="blue" text @click="editUser(item)">Edit</v-btn>
                <v-btn color="red" text @click="confirmDelete(item)">Delete</v-btn>
              </template>
            </v-data-table>
  
            <!-- Modal xác nhận xóa -->
            <v-dialog v-model="showDeleteConfirm" max-width="290">
              <v-card>
                <v-card-title class="headline">Xác nhận xóa</v-card-title>
                <v-card-text>Bạn có chắc chắn muốn xóa người dùng này?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey darken-1" text @click="cancelDelete">Cancel</v-btn>
                  <v-btn color="red darken-1" text @click="deleteUser">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import AddUser from './AddUser.vue';
  
  export default {
    components: {
      AddUser
    },
    data() {
      return {
        showForm: false,
        isEditing: false, // Check if editing mode
        currentUser: null, // Current user data
        showDeleteConfirm: false, // State for delete confirmation modal
        userToDelete: null, // User that is being deleted
        headers: [
          { text: 'STT', value: 'stt' },
          { text: 'Tên người dùng', value: 'name' },
          { text: 'Giới tính', value: 'gender' },
          { text: 'Ngày sinh', value: 'dob' },
          { text: 'Email', value: 'email' },
          { text: 'Chức năng', value: 'actions', sortable: false },
        ],
        users: [], // List of users from localStorage
      };
    },
    created() {
      this.loadUsersFromLocalStorage();
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm) {
          this.resetForm(); // Reset form when closed
        }
      },
      addUser(user) {
        const newUser = {
          ...user,
          stt: this.users.length + 1, // Automatically add STT
        };
        this.users.push(newUser);
        this.saveUsersToLocalStorage();
        this.showForm = false;
      },
      editUser(user) {
        this.currentUser = user; // Save current user data for editing
        this.isEditing = true; // Set editing mode
        this.showForm = true; // Show form
      },
      confirmDelete(user) {
        this.userToDelete = user; // Save user to delete
        this.showDeleteConfirm = true; // Show delete confirmation modal
      },
      cancelDelete() {
        this.showDeleteConfirm = false; // Close modal without deleting
        this.userToDelete = null; // Clear user to delete
      },
      deleteUser() {
        this.users = this.users.filter(u => u !== this.userToDelete);
        this.updateSTT(); // Update STT after deletion
        this.saveUsersToLocalStorage();
        this.showDeleteConfirm = false; // Close modal after deleting
        console.log('Đã xóa người dùng:', this.userToDelete);
        this.userToDelete = null; // Clear user to delete
      },
      updateSTT() {
        this.users.forEach((user, index) => {
          user.stt = index + 1; // Reassign STT
        });
      },
      saveUsersToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(this.users));
      },
      loadUsersFromLocalStorage() {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          this.users = JSON.parse(storedUsers);
        }
      },
      resetForm() {
        this.currentUser = null; // Reset current user data
        this.isEditing = false; // Reset editing mode
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  