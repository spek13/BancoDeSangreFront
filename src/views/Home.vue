
<template>
  <div class="form-group col-sm-12">
    <label>Adjunte la copia de la cédula de conyuge en formato PDF</label>
    <input
      type="file"
      ref="images"
      accept="image/png"
      :disabled="loading"
      class="form-control"
      id="imagen"
      data-validate="Anexe la copia de su cédula"
    >
    <br>
    <button :disabled="loading" @click="agregar">Subir Archivo</button>
    <p v-if="downloadUrl">
      Archivo disponible ensdasdfas:
      
      <a :href="downloadUrl">Link</a>

    </p>




<main class="container" >
    <section class="movies" id="movies">
	    <div class="row" >
		  
            <div class="col-lg-3 col-md-4 col-sm-6" v-for="(image, index) in images" v-bind:key="index">
			    <article class="card" >
                    <!--v-for="(publicaciones,index) in publicacion" v-bind:key="index"!-->
				    <header class="title-header">
					    <h3>paiseja</h3>
				    </header>
				    <div class="card-block">
					    <div class="img-card" >
						    <img :src="image" alt="Movie" class="w-100" />
					    </div>
				        <p class="tagline card-text text-xs-center">paiseja de la naturaleza</p>
					    <a class="btn btn-primary btn-block">publicacion</a>
				    </div>
			    </article>
	        </div>
	    </div>
		    
    </section>
    
	   

</main>
	   


    <!-- <div v-for="(image, index) in images" v-bind:key="index">
    
    
    
    <img :src="image" class="img-fluid" alt="Responsive image"> -->

    




  </div>
</template>
<script>
import firebase, { firestore, storage } from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
const imgref = 'imagenes';

export default {

  data() {
    return {
      storage: firebase.storage(),
      loading: false,
      downloadUrl: '',
      images: []
    };
  },
  //traer liga imagenes 
  mounted (){
    firebase.database().ref('imagenes').on('value', snapshot=>{
      //console.log(snapshot);
      snapshot.forEach(childSnapshot=>{
        const data=childSnapshot.val();
        this.images.push(data.url);
        //console.log(data);
      })
    })


    // this.storage.ref(imgref).listAll().then(data=>{
    //   data.items.forEach(image=>{
    //     image.getDownloadURL().then(link=>{
    //       this.images.push(link)
    //       console.log(link);
    //       });
        
    //   })
    // });


  },
  methods: {
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
          const isPng = file.type === 'image/png';
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
    
  }
};
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