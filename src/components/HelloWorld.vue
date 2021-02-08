<template>
  <v-container>
    <v-row style="justify-center">
      <v-col>
        <div class="text-h5">File:</div>
        <v-file-input
        show-size
        @change="getHash"
        
        ></v-file-input>
        <v-btn 
        class="green white--text"
        :loading="hashing">Hash it!</v-btn>

        <p v-if="hash">Hash: {{hash}} </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
let fs = require('fs')
let crypto = require('crypto')

export default {
    name: 'HelloWorld',

    data: () => ({
      hash:'',
      hashing:false

    }),
    methods:{
      getHash:async function(file){
        if(file){
          this.hashing = true
          console.log('Path '+ file.path)
          let stats = await fs.statSync(file.path)
          console.log('Size is:' + stats.size)
          console.log('Starting Hashing Process!')


          let hash = crypto.createHash('sha256')
          let stream = fs.createReadStream(file.path)
          stream.on('data', (data) => {
              hash.update(data)
          })
          stream.on('end', ()=>{
               this.hash = hash.digest('hex')
               this.hashing = false
          })
        }
        

      },
    },
    mounted:function(){

    }
  }
</script>
