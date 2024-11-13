<template>
    <div class="profile-container">
      <div class="profile-photo bellotaBold">
        <p>Foto de perfil</p>
        <img :src="profileData.photoUrl || 'https://weremote.net/wp-content/uploads/2022/08/mujer-sonriente-apunta-arriba-1920x1280.jpg'" alt="Profile photo" />
      </div>
  
      <div class="form-group">
        <div class="label-input">
          <label>Usuario:</label>
          <div class="input-group">
            <input type="text" v-model="profileData.username" :disabled="!isEditing.username" />
            <button class="edit-button" @click="toggleEdit('username')">
              <Edit2Icon size="18" />
            </button>
          </div>
        </div>
      </div>
  
      <div class="form-group">
        <div class="label-input">
          <label>Correo:</label>
          <div class="input-group">
            <input type="email" v-model="profileData.email" :disabled="!isEditing.email" />
            <button class="edit-button" @click="toggleEdit('email')">
              <Edit2Icon size="18" />
            </button>
          </div>
        </div>
      </div>
  
      <div class="form-group">
        <div class="label-input">
          <label>Celular:</label>
          <div class="input-group">
            <select class="country-code" v-model="profileData.countryCode">
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+34">+34</option>
            </select>
            <input type="tel" v-model="profileData.phone" placeholder="Añadir número de celular" :disabled="!isEditing.phone" />
            <button class="edit-button" @click="toggleEdit('phone')">
              <Edit2Icon size="18" />
            </button>
          </div>
        </div>
      </div>
  
      <div class="form-row">
        <div class="form-group half">
          <div class="label-input">
            <label>Sexo:</label>
            <div class="input-group">
              <select v-model="profileData.gender" :disabled="!isEditing.gender">
                <option value="F">F</option>
                <option value="M">M</option>
              </select>
              <button class="edit-button" @click="toggleEdit('gender')">
                <Edit2Icon size="18" />
              </button>
            </div>
          </div>
        </div>
  
        <div class="form-group half">
          <div class="label-input">
            <label>Fecha de nacimiento:</label>
            <div class="input-group">
              <input type="date" v-model="profileData.birthDate" :disabled="!isEditing.birthDate" />
              <button class="edit-button" @click="toggleEdit('birthDate')">
                <Edit2Icon size="18" />
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="payment-section">
        <h3 class="bellotaBold">Métodos de pago</h3>
        <div class="payment-method">
          <div class="payment-card">Visa /Mastercard</div>
        </div>
        <button class="add-payment">Añadir método de pago</button>
      </div>
    </div>
    <Footer :selectedIndex="4" />
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Edit2Icon } from 'lucide-vue-next'

  import Footer from '../components/footer.vue';
  
  const profileData = ref({
    photoUrl: '',
    username: 'SaraMartin9',
    email: 'SMBY1996@gmail.com',
    countryCode: '+1',
    phone: '',
    gender: 'F',
    birthDate: '1996-09-15'
  })
  
  const isEditing = ref({
    username: false,
    email: false,
    phone: false,
    gender: false,
    birthDate: false
  })
  
  const toggleEdit = (field) => {
    isEditing.value[field] = !isEditing.value[field]
  }

  components: {
        Footer
  }
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .profile-photo {
    text-align: center;
    width: 100px;
    height: 100px;
    margin: 0 auto 30px;
  }
  
  .profile-photo img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .label-input {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  label {
    flex: 0 0 80px;
    font-size: 14px;
    color: #333;
    font-family: 'BellotaBold', sans-serif;
  }
  
  .input-group {
    flex: 1;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .form-row {
    display: flex;
    gap: 20px;
  }
  
  .half {
    flex: 1;
  }
  
  input, select {
    flex: 1;
    padding: 8px 12px;
    border: none;
    background-color: #f0f0f0;
    border-radius: 4px;
    font-size: 14px;
  }
  
  input:disabled, select:disabled {
    background-color: #f0f0f0;
    color: #333;
  }
  
  .country-code {
    width: 70px;
    flex: 0 0 auto;
  }
  
  .edit-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #666;
  }
  
  .edit-button:hover {
    color: #333;
  }
  
  .payment-section {
    margin-top: 30px;
    padding-bottom: 40px;
  }
  
  h3 {
    margin-bottom: 15px;
    font-size: 16px;
  }
  
  .payment-card {
    background-color: #f0f0f0;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .add-payment {
    width: 100%;
    padding: 12px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    text-align: left;
  }
  
  .add-payment:hover {
    background-color: #e5e5e5;
  }
  
  @media (max-width: 600px) {
    .profile-container {
      padding: 40px;
      height: 100vh;
      overflow-y: scroll;
    }
  
    .label-input {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
  
    label {
      flex: 0 0 auto;
      margin-bottom: 5px;
    }
  
    .input-group {
      width: 100%;
    }
  
    .form-row {
      flex-direction: column;
      gap: 10px;
    }
  
    .half {
      width: 100%;
    }
  
    .country-code {
      width: 60px;
    }
  }

  </style>