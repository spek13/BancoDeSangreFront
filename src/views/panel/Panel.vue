
<template>

<div class="row">
  <div class="col-sm-2 admin-sidebar">
    <div class="nav flex-column nav-pills text-center text-uppercase admin-nav" id="sidebar-admin" role="tablist" aria-orientation="vertical">
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel" role="tab" aria-controls="admin-requests" aria-selected="false">ver publicaciones</a>
        <a class="nav-link admin-nav-item admin-sidebar-item"  data-toggle="pill" href="http://localhost:8080/panel/master" v-if="rol=='2'" role="tab" aria-controls="admin-userss" aria-selected="false">donadores</a>
        <a class="nav-link admin-nav-item admin-sidebar-item"  data-toggle="pill" href="http://localhost:8080/panel/logs" v-if="rol=='2'" role="tab" aria-controls="admin-userss" aria-selected="false">logs</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/cuestionario" v-if="rol=='1' " role="tab" aria-controls="admin-analytics" aria-selected="false">generar una cita</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/historialcitas" v-if="rol=='1' "  role="tab" aria-controls="admin-messages" aria-selected="false">historial de citas</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/ultimacita" v-if="rol=='1'" role="tab" aria-controls="admin-sessions" aria-selected="false">ultima cita</a>    
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/publicacion"  v-if="rol=='3'" role="tab" aria-controls="admin-sessions" aria-selected="false">crear publicaciones</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/listapacientes"  v-if="rol=='4'" role="tab" aria-controls="admin-sessions" aria-selected="false">ver citas</a>
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel/perfil" role="tab" aria-controls="admin-sessions" aria-selected="false">perfil</a>
    </div>
  </div>
<main class="container">
    <section class="movies" id="movies">
	    <div class="row" >
		    <div class="col-lg-3 col-md-4 col-sm-6">
			    <article class="card" >
                    <!--v-for="(publicaciones,index) in publicacion" v-bind:key="index"!-->
				    <header class="title-header">
					    <h3>Donar</h3>
				    </header>
				    <div class="card-block">
					    <div class="img-card">
						    <img src="https://www.cem.itesm.mx/cms/dircom/publicaciones/agendas/media/k2/items/cache/d9640fd356a2fdd2860810454b9f9005_XL.jpg" alt="Movie" class="w-100" />
					    </div>
				        <p class="tagline card-text text-xs-center">paiseja de la naturaleza</p>
					    <a class="btn btn-primary btn-block">publicacion</a>
				    </div>
			    </article>
		    </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
			    <article class="card" >
                    <!--v-for="(publicaciones,index) in publicacion" v-bind:key="index"!-->
				    <header class="title-header">
					    <h3>Donar</h3>
				    </header>
				    <div class="card-block">
					    <div class="img-card">
						    <img src="data:image/jpeg;base64,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" alt="Movie" class="w-100" />
					    </div>
				        <p class="tagline card-text text-xs-center">paiseja de la naturaleza</p>
					    <a class="btn btn-primary btn-block">publicacion</a>
				    </div>
			    </article>
	        </div>
	    </div>
		    
    </section>
    
	   

</main>
</div>
 
</template>


<script>
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
        }
    },
    mounted(){
        this.start();
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
        }
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