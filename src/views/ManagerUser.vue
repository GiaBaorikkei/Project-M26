<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex justify-space-between">
              <h3>Quản lý người dùng</h3>
              <v-btn color="primary" class="ml-4" @click="toggleForm">
                <v-icon left>mdi-plus</v-icon>
                Thêm người dùng
              </v-btn>
            </v-card-title>
  
            <AddUser
              v-if="showForm"
              :onSubmit="isEditing ? updateUser : addUser"
              :onClose="toggleForm"
              :user="currentUser"
              :isEditing="isEditing"
              :formTitle="isEditing ? 'Edit User' : 'Add User'"
            ></AddUser>
  
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
        isEditing: false,
        currentUser: null,
        showDeleteConfirm: false,
        userToDelete: null,
        headers: [
          { text: 'STT', value: 'stt' },
          { text: 'Tên người dùng', value: 'name' },
          { text: 'Giới tính', value: 'gender' },
          { text: 'Ngày sinh', value: 'dob' },
          { text: 'Email', value: 'email' },
          { text: 'Chức năng', value: 'actions', sortable: false },
        ],
        users: [],
      };
    },
    created() {
      this.loadUsersFromLocalStorage();
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm) {
          this.resetForm();
        }
      },
      addUser(user) {
        const newUser = {
          ...user,
          stt: this.users.length + 1,
        };
        this.users.push(newUser);
        this.saveUsersToLocalStorage();
        this.showForm = false;
      },
      editUser(user) {
        this.currentUser = user;
        this.isEditing = true;
        this.showForm = true;
      },
      confirmDelete(user) {
        this.userToDelete = user;
        this.showDeleteConfirm = true;
      },
      cancelDelete() {
        this.showDeleteConfirm = false;
        this.userToDelete = null;
      },
      deleteUser() {
        this.users = this.users.filter(u => u !== this.userToDelete);
        this.updateSTT(); 
        this.saveUsersToLocalStorage();
        this.showDeleteConfirm = false; 
        this.userToDelete = null; 
      },
      updateSTT() {
        this.users.forEach((user, index) => {
          user.stt = index + 1; 
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
        this.currentUser = null; 
        this.isEditing = false; 
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  