
<template>
<div class="row">

  <div class="col-sm-2 admin-sidebar well container-fluid">
    <div class="nav flex-column nav-pills text-center text-uppercase admin-nav" id="sidebar-admin" role="tablist" aria-orientation="vertical">
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="panel" role="tab" aria-controls="admin-requests" aria-selected="false">ver publicaciones</a>
        <a class="nav-link admin-nav-item admin-sidebar-item"  data-toggle="pill" href="panel/master" v-if="rol=='2'" role="tab" aria-controls="admin-userss" aria-selected="false">donadores</a>
        <a class="nav-link admin-nav-item admin-sidebar-item"  data-toggle="pill" href="panel/logs" v-if="rol=='2'" role="tab" aria-controls="admin-userss" aria-selected="false">logs</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="panel/cuestionario" v-if="rol=='1' " role="tab" aria-controls="admin-analytics" aria-selected="false">generar una cita</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="panel/historialcitas" v-if="rol=='1' "  role="tab" aria-controls="admin-messages" aria-selected="false">historial de citas</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="panel/ultimacita" v-if="rol=='1'" role="tab" aria-controls="admin-sessions" aria-selected="false">ultima cita</a>    
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="panel/publicacion"  v-if="rol=='3'" role="tab" aria-controls="admin-sessions" aria-selected="false">crear publicaciones</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="panel/listapacientes"  v-if="rol=='4'" role="tab" aria-controls="admin-sessions" aria-selected="false">ver citas</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="panel/perfil" role="tab" aria-controls="admin-sessions" aria-selected="false">perfil</a>
    </div>
  </div>
  <div >
    <!-- <label>dcarga de imagenes </label> -->
    <!-- <div class="input-group">
      <input
      type="file"
      ref="images"
      accept="image/png"
      :disabled="loading"
      class="custom-file-input" 
      id="inputGroupFile04"
      data-validate="Anexe la copia de su cédula"
    >
    </div> -->
<div class="input-group"  v-if="rol=='2'" role="tab" aria-controls="admin-userss" aria-selected="false">
  <div class="custom-file">
    <input 
    type="file"
      ref="images"
      accept="image/png"
      :disabled="loading"
      class="custom-file-input" 
      id="inputGroupFile04"
      data-validate="Anexe la copia de su cédula">
    <label class="custom-file-label" for="inputGroupFile04">Seleccionar archivo</label>
  </div>

  <div class="input-group-append">
    <button :disabled="loading" @click="agregar" class="btn btn-outline-secondary" type="button">Subir Archivo</button>
  </div>
</div>



    <br>
    <!-- <button :disabled="loading" @click="agregar">Subir Archivo</button> -->
    <p v-if="downloadUrl">
      Archivo disponible ensdasdfas:
      
      <a :href="downloadUrl">Archivo cargado </a>

    </p>




<main class="container" >
    <section class="movies" id="movies">
	    <div class="row" >
		  
            <div class="col-lg-3 col-md-4 col-sm-6" v-for="(image, index) in images" v-bind:key="index">
			    <article class="card" >
                    <!--v-for="(publicaciones,index) in publicacion" v-bind:key="index"!-->
				    <header class="title-header">
					    <h3>Publicación</h3>
				    </header>
				    <div class="card-block">
					    <div class="img-card" >
						    <img :src="image" alt="Movie" class="w-100" />
					    </div>
				        <!-- <p class="tagline card-text text-xs-center">paiseja de la naturaleza</p> -->
					    <!-- <a class="btn btn-primary btn-block">publicacion</a> -->
				    </div>
			    </article>
	        </div>
	    </div>
		    
    </section>
    
	   

</main>
	   


    <!-- <div v-for="(image, index) in images" v-bind:key="index">
    
    
    
    <img :src="image" class="img-fluid" alt="Responsive image"> -->

    




  </div>
  </div>
</template>


<script>
import firebase, { firestore, storage } from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
const imgref = 'imagenes';
import axios from 'axios';

export default {
    data(){
        return{
            userDataLogin:[],
            rol:'',
            token:'',
            id:'',
            datas:[],
            email:'',
            drawer: true,
            items: [
            { title: 'Home', icon: 'mdi-home-city',route:'/panel/master' },
            { title: 'My Account', icon: 'mdi-account',route :'/panel/master'},
            { title: 'Users', icon: 'mdi-account-group-outline', route:'/panel/prueva'},
            ],
            mini: true,
            url:'http://127.0.0.1:3333/api/v1/',
            publicacion:[],
                  storage: firebase.storage(),
      loading: false,
      downloadUrl: '',
      images: []
        }
    },
 
      mounted (){
          this.start();
    firebase.database().ref('imagenes').on('value', snapshot=>{
      //console.log(snapshot);
      snapshot.forEach(childSnapshot=>{
        const data=childSnapshot.val();
        this.images.push(data.url);
        //console.log(data);
      })
    })

  },
    methods:{
        start:function() {
            this.userDataLogin=JSON.parse(localStorage.getItem('userDataLogin'));
            this.id=this.userDataLogin[0].id;
            this.token=this.userDataLogin[0].token;
            this.rol=this.userDataLogin[0].rol;
            console.log("rol "+this.rol);
            this.email=this.userDataLogin[0].email;

            this.datas.push({
                id:this.id,
                token:this.token,
                rol:this.rol,
                email:this.email,
            })
           localStorage.setItem('datas',JSON.stringify(this.datas));
           this.publicaciones();
        },
        publicaciones:function(){
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token,
                }
            }
            axios.get(this.url+"user/promoter",this.header)
            .then(response=>{
                this.publicacion=response.data.promotions;      
            })
            .catch(error=>{
            })
        },


            test(){
      console.log(this.images);
    },
    async agregar() {
      try {
         
        const VARIABLE = Math.round(Math.random() * (1 + 2000) * 800);
        const { files } = this.$refs.images;
        this.loading = true;
        const file = files[0];
        if (file) {
          const isPng = file.type === 'image/png'|| 'image/jpg';
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>"+VARIABLE);
          if (isPng) {
            const response = await firebase
              .storage()
              .ref(`pdfs/${file.name}`)
              .put(file);
            const url = await response.ref.getDownloadURL();
            console.log('archivo disponible en ', url);
            this.downloadUrl = url;
            //guardar url en fb
                const responsess = await firebase
              .database()
              .ref(`imagenes/${VARIABLE}`)
              .set({url:this.downloadUrl});
            //this.agregarliga();
          } else {
            console.log('Archivo no valido');
          }
        } else {
          console.log('falta el archivo');
        }
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    }
    // async agregarliga() {
    //   console.log("vemos que si ");
    //   // firebase.database().ref ("hola").set({hola1:"hola1"});
    // const response = await firebase
    //           .database()
    //           .ref(`pdfs/${downloadUrl}`)
    //           .set({hola1:"hola1"});
    //        // const url = await response.ref.getDownloadURL();


    // }
    
  
    },
    
}
</script>

<style >
@media screen and (max-width: 480px) {
    .admin-sidebar{
        display: none;
    }
}

@media screen and (min-width: 480px) {
    .admin-tabs{
        display: none;
    }
}

.admin-sidebar{
    max-width: 13%;
}

#sidebar-admin{
    position: fixed;
}

.admin-sidebar-item{
    padding: 1em;
    border-bottom: 1px solid white;
}

.admin-nav{
    background: #49C2B3;
}

.admin-nav-item{
    color: white;
    font-weight:bold;
}

.admin-nav-item:hover{
    color: white;
    background: #41aea1;
}

.admin-nav-item.active{
    background: #53FFE7 !important;
    color: white !important;
}

.admin-header-block{
   background: #434449;
   color: white !important;
   text-align: left;
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
    border-color: #ddd;
    border-radius: 4px;
    font-weight: bold;
}

.admin-filter-button{
    background: #78B404;
    color: white !important;
    font-weight: bold;
}

.admin-user-card{
    margin-bottom: 10px;
}

.title-header {padding: .75rem 1.25rem; background-color: #f5f5f5; border-bottom: 1px solid transparent;}
.title-header h3 {font-size: 0.80rem; margin: 0;}
.movies {margin-top: 2rem;}
.img-card {width: 100%; margin-bottom: .40rem;}
.movies {margin-bottom: .60rem;}
.series {margin-bottom: .60rem;}
.footer {padding: 1rem 0; margin-top: 2rem; font-size: 80%; text-align: left;}
.footer p {margin: 0;}
.footer-links {padding-left: 0; margin-bottom: 1rem;}
.footer-links li {display: inline-block;}
.footer a {font-weight: 500; color: inherit;}
.footer-links li + li {margin-left: 1rem;}
/* Bug Bootstrap V4.0.6 - Mobile - SCSS _navbar*/ 
.navbar {display: block;}
</style>