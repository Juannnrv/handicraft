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
            <select class="country-code" v-model="profileData.countryCode" :disabled="!isEditing.phone">
              <option value="+00">+00</option>
              <option value="+1">+1 (EE. UU., Canadá, Caribe)</option>
                <option value="+54">+54 (Argentina)</option>
                <option value="+55">+55 (Brasil)</option>
                <option value="+56">+56 (Chile)</option>
                <option value="+57">+57 (Colombia)</option>
                <option value="+58">+58 (Venezuela)</option>
                <option value="+51">+51 (Perú)</option>
                <option value="+52">+52 (México)</option>
                <option value="+53">+53 (Cuba)</option>
                <option value="+34">+34 (España)</option>
                <option value="+44">+44 (Reino Unido)</option>
                <option value="+33">+33 (Francia)</option>
                <option value="+49">+49 (Alemania)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japón)</option>
                <option value="+91">+91 (India)</option>
                <option value="+62">+62 (Indonesia)</option>
                <option value="+65">+65 (Singapur)</option>
                <option value="+27">+27 (Sudáfrica)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+61">+61 (Australia)</option>
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
                <option value="mujer">F</option>
                <option value="hombre">M</option>
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
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { Edit2Icon } from 'lucide-vue-next'
  import Footer from '../components/footer.vue'
  
  const router = useRouter()
  
  const profileData = ref({
    photoUrl: '',
    username: '',
    email: '',
    countryCode: '+1',
    phone: '',
    gender: 'F',
    birthDate: ''
  })
  
  const originalProfileData = ref({ ...profileData.value })  // Guardamos los valores originales
  
  const isEditing = ref({
    username: false,
    email: false,
    phone: false,
    gender: false,
    birthDate: false
  })
  
  const toggleEdit = async (field) => {
    // Al cambiar el estado de edición, verificamos si hubo algún cambio
    const hasChanged = profileData.value[field] !== originalProfileData.value[field]
    
    // Si hay un cambio, imprimimos
    if (hasChanged) {
      const editedUser = {
        username: profileData.value.username,
        email: profileData.value.email,
        phone: `${profileData.value.countryCode} ${profileData.value.phone}`,
        gender: profileData.value.gender,
        birthday: profileData.value.birthDate.split('-').slice(1).concat(profileData.value.birthDate.split('-')[0]).join('/'),
      }
      
      console.log(JSON.stringify(editedUser))

      const editRequest = await fetch('http://localhost:5000/user/', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "x-version": "1.0.0"
      },
      body: JSON.stringify(editedUser),
      credentials: 'include'
    })

    console.log(await editRequest.json())


      // Actualizamos los valores originales después de imprimir
      originalProfileData.value = { ...profileData.value }
    }
    
    // Alternar el estado de edición
    isEditing.value[field] = !isEditing.value[field]
  }
  
  // Función para obtener la información del usuario
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0'
        },
        credentials: 'include' // Asegura que se envíen las cookies en caso de autenticación
      })
  
      if (response.status === 401) {
        router.push('/login')
      } else if (response.ok) {
        const data = await response.json()
  
        // Guardamos los valores originales cuando cargamos los datos
        profileData.value = {
          photoUrl: data.data.profilePicture || '',
          username: data.data.username || '',
          email: data.data.email || '',
          countryCode: data.data.phone?.split(" ")[0] || '+1',
          phone: data.data.phone?.split(" ")[1] || '',
          gender: data.data.gender === 'hombre' ? 'hombre' : 'mujer',
          birthDate: data.data.birthday ? new Date(data.data.birthday).toISOString().split("T")[0] : ''
        }
        originalProfileData.value = { ...profileData.value }  // Actualizamos los valores originales
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
  
  // Llama a fetchUserData cuando el componente se monte
  onMounted(() => {
    fetchUserData()
  })
  
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
    background-color: #D9D9D9;
    border-radius: 4px;
    font-size: 14px;
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

  .country-code {
  -webkit-appearance: none; /* Chrome, Safari, Opera */
  -moz-appearance: none; /* Firefox */
  appearance: none; /* Otros navegadores */
  background-color: #D9D9D9;
  padding-right: 20px; /* Ajusta el espacio a la derecha */
  border: none;
  border-radius: 4px;
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

  input:disabled, select:disabled {
  background-color: #D9D9D9;
  color: #666; /* Ajusta el color del texto */
  cursor: not-allowed; /* Opcional, para mostrar que no es editable */
}

  </style>