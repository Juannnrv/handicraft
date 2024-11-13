    <template>
        
        <div class="workshop-page">
        <div class="workshop-content">
        
            <div class="workshop-image-container">
            <img :src="workshop.imageUrl" :alt="workshop.title" class="workshop-image">
            <img class="square-title" :src="rotatedSquare" alt="">
            <h1 class="workshop-title bellotaBold">{{ workshop.title }}</h1>
            <img class="square-bg" style="filter: invert(100%);" :src="rotatedSquare" alt="">
            <a class="a-back" href="registerEmail">
                <img class="back-arrow" style="filter: invert(100%);" :src="backArrow" alt="">
            </a>
            </div>
    
            <div class="workshop-details">
            <p class="workshop-description bellotaRegular">
                En este taller dado por los artesanos de 
                <strong class="bellotaBold">{{ workshop.instructor }}</strong>, 
                {{ workshop.description }}
            </p>
    
            <div class="audience-section bellotaBold">
                <h2>{{ workshop.audience.title }}</h2>
                <p class="note bellotaRegular">{{ workshop.audience.note }}</p>
            </div>
    
            <div class="info-grid bellotaRegular">
                <div class="info-item">
                <strong>Duración:</strong> {{ workshop.duration }}
                </div>
                <div class="info-item">
                <strong>Fecha de inicio:</strong> {{ workshop.startDate }}
                </div>
                <div class="info-item">
                <strong>Horario:</strong> {{ workshop.schedule }}
                </div>
                <div class="info-item">
                <strong>Materiales:</strong> {{ workshop.materials }}
                </div>
                <div class="info-item">
                <strong>Modalidad:</strong> {{ workshop.modality }}
                </div>
                <div class="info-item">
                <strong>Lugar:</strong> {{ workshop.location }}
                </div>
            </div>
    
            <div class="div-button">
                <button class="signup-button  bellotaBold" @click="handleSignup"><img style="width: 20px;" :src="suscribe" alt="">Inscribirse al taller</button>
                <span class="note bellotaRegular">*Cupos limitados</span>
            </div>
            </div>
        </div>
        </div>
    </template>
    
    <script setup>

    import rotatedSquare from '../images/rotatedSquare.svg'
    import backArrow from '../images/backArrow.svg'
    import suscribe from '../images/suscribe.svg'
    // Example of workshop data structure that would come from an API
    const workshop = {
        id: 1,
        title: 'Taller de cerámica artesanal',
        imageUrl: 'https://concepto.de/wp-content/uploads/2018/08/workshop-1-e1676660941240.jpg',
        instructor: 'Cerámicas Tater Vera',
        description: 'aprenderán a usar la arcilla para crear cosas para el hogar con diseños típicos ayacuchanos.',
        audience: {
        title: 'Para el público en general',
        note: '*los niños menores de 8 años se recomienda que estén acompañados de un adulto'
        },
        duration: '2 meses',
        startDate: '8 de Julio',
        schedule: '4 a 6 PM cada sábado',
        materials: 'Materiales dados en clase',
        modality: 'Presencial',
        location: 'En el Ministerio de Cultura, Lima, Perú',
        availableSpots: true
    }
    
    const goBack = () => {
        // Add navigation logic here
        console.log('Going back')
    }
    
    const handleSignup = () => {
        // Add signup logic here
        console.log('Signing up for workshop:', workshop.id)
    }
    </script>
    
    <style scoped>
    .workshop-page {

        min-height: 100vh;
        position: relative;
        height: 100vh;
        
    }
    
    .workshop-content{
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .workshop-image-container {
        position: relative;
    }
    
    .workshop-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    
    .workshop-title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #3D3D3D;
        color: white;
        padding: 10px;
        padding-left: 30px;
        margin: 0;
        font-size: 1em;
    }
    
    .workshop-details {
        flex-grow: 1;
        padding: 20px;
        overflow-y: scroll;
        scrollbar-width: none;
    }
    
    .workshop-description {
        font-size: 0.8em;
        margin-bottom: 14px;
    }
    
    .audience-section {
        background-color: #fff;
        border-radius: 8px;
        margin-bottom: 14px;
    }
    
    .audience-section h2 {
        margin: 0 0 4px 0;
        font-size: 1em;
    }
    
    .note {
        color: #666;
        font-size: 0.7em;
    }
    
    .info-grid {
        display: grid;
        gap: 1vh;
        margin-bottom: 10px;
    }
    
    .info-item {
        background-color: #fff;
        padding: 1px;
        border-radius: 8px;
        font-size: 0.9em;
    }
    
    .info-item strong {
        color: #333;
    }
    
    .signup-button {
        background-color: #D9D9D9;
        color: black;
        border: none;
        border-radius: 8px;
        padding: 10px;
        font-size: 0.8em;
        cursor: pointer;
       display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        gap: 5px;
    }
    
    .signup-button:hover {
        background-color: #444;
    }
    

    
    .square-bg{
            position: absolute;
            left: 0;
            top: 0px;
            width: 40px;
        }
    
        .a-back{
        position: absolute;
        width: 25px;
        left: 3px;
        top: 25px;
        display: flex
        }
    
        .a-back > img{
        width: 100%;
        }

        .square-title{
            position: absolute;
            left: 0;
            bottom: 0px;
            height: 40px;
            z-index: 1;
    }
    .div-button{
        display: flex;
        gap: 20px;
        align-items: center;
    }
    
    @media (min-width: 768px) {
        .workshop-details {
        max-width: 800px;
        margin: 0 auto;
        }
    
        .info-grid {
        grid-template-columns: repeat(2, 1fr);
        }
    }

    </style>