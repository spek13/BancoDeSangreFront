
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
      Archivo disponible en:
      <a :href="downloadUrl">Link</a>

    </p>
  </div>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

export default {
  data() {
    return {
      loading: false,
      downloadUrl: ''
    };
  },
  
  methods: {
    
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
