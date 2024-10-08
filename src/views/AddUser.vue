<template>
    <v-card class="pa-4 mb-4">
      <h4>{{ formTitle }}</h4> <!-- Update the title dynamically -->
      <v-form ref="form">
        <v-text-field
          v-model="user.name"
          label="Tên người dùng"
          outlined
          dense
          required
          :error-messages="nameErrors"
        ></v-text-field>
  
        <v-select
          v-model="user.gender"
          :items="genderOptions"
          label="Giới tính"
          outlined
          dense
          required
        ></v-select>
  
        <v-text-field
          v-model="user.dob"
          label="Ngày sinh"
          type="date"
          outlined
          dense
          required
          :error-messages="dobErrors"
        ></v-text-field>
  
        <v-text-field
          v-model="user.email"
          label="Email"
          outlined
          dense
          required
          :error-messages="emailErrors"
        ></v-text-field>
  
        <div class="d-flex justify-space-between">
          <v-btn color="primary" @click="submitForm">
            {{ isEditing ? 'Save' : 'Add' }}
          </v-btn>
          <v-btn color="red" @click="closeForm">
            Close
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    onSubmit: {
      type: Function,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    user: {
      type: Object,
      default: () => ({
        name: '',
        gender: '',
        dob: '',
        email: ''
      })
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    formTitle: {  // Thêm prop cho tiêu đề
      type: String,
      required: true
    }
  });
  
  const user = ref({ ...props.user });
  const genderOptions = ['Nam', 'Nữ'];
  const nameErrors = ref([]);
  const emailErrors = ref([]);
  const dobErrors = ref([]);
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  function submitForm() {
    nameErrors.value = [];
    emailErrors.value = [];
    dobErrors.value = [];
  
    let isValid = true;
  
    if (!user.value.name) {
      nameErrors.value.push('Tên không được phép để trống.');
      isValid = false;
    }
  
    if (!user.value.email) {
      emailErrors.value.push('Email không được phép để trống.');
      isValid = false;
    } else if (!isValidEmail(user.value.email)) {
      emailErrors.value.push('Email không đúng định dạng.');
      isValid = false;
    }
  
    if (!user.value.dob) {
      dobErrors.value.push('Ngày sinh không được phép để trống.');
      isValid = false;
    } else if (new Date(user.value.dob) > new Date()) {
      dobErrors.value.push('Ngày sinh không được lớn hơn ngày hiện tại.');
      isValid = false;
    }
  
    if (isValid) {
      props.onSubmit(user.value);
      resetForm();
    }
  }
  
  function closeForm() {
    props.onClose();
  }
  
  function resetForm() {
    user.value = {
      name: '',
      gender: '',
      dob: '',
      email: ''
    };
  }
  </script>
  
  <style scoped>
  </style>
  