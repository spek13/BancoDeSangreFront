import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase/app'
import router from './router';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
//import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'

//Vue.use(Vuetify);
firebase.initializeApp({
  apiKey: "AIzaSyC1nTBCI7DzlEy_MLG7nETQBJtcmvazSRs",
  authDomain: "bloodbanck-452b3.firebaseapp.com",
  databaseURL: "https://bloodbanck-452b3.firebaseio.com",
  projectId: "bloodbanck-452b3",
  storageBucket: "bloodbanck-452b3.appspot.com",
  messagingSenderId: "378505581699",
  appId: "1:378505581699:web:6c05b8b44f5b700b7f37b6",
  measurementId: "G-8JGL4EWG14"

});

Vue.use(BootstrapVue)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
