<template>
    <v-container>
        <v-row 
        class="text-h4 mt-3 font-weight-bold justify-center accent--text"
        style="user-select:none;"
        >Hash {{usingFile?'a file':'text'}}</v-row>
        <v-row class="justify-center mt-9">
            <div v-if="usingFile">
                <v-file-input
                
                style="width:300px !important;"
                show-size
                prepend-icon="mdi-file"
                outlined
                dense
                label="Select file"
                v-model="fileSelected"
                :disabled="hashing"
                dark
                filled
                >
                </v-file-input>
            </div>
            <div v-else>
                <v-text-field
                style="width:300px"
                label="Text to be hashed"
                outlined
                dense
                prepend-icon="mdi-text"
                v-model="textSelected"
                :disabled="hashing"
                dark
                filled
                >

                </v-text-field>
            </div>
        </v-row>
        <v-row class="justify-center">
            <v-btn depressed
            @click="usingFile = !usingFile"
            :disabled="hashing"
            dark
            class="button"

            >Use {{usingFile?'text':'file'}} instead</v-btn>
        </v-row>
        <v-row class="justify-space-around align-center mt-8">
            <v-col cols="4">
                <v-select label="Algorithm"
                class="accent--text "
                outlined
                dense
                dark
                filled
                :items="algorithms"
                :menu-props="{ bottom: true, offsetY: true }"
                v-model="algorithm"
                :disabled="hashing"
                ></v-select>
            </v-col>
            <v-col cols="4">
                <v-row class="align-center">
                    <v-checkbox class="mt-0" v-model="hmac" :disabled="hashing"                 
                    dark
                    filled></v-checkbox>
                    <v-text-field label="HMAC secret key(optional)"
                    outlined
                    dense
                    :disabled="!hmac||hashing"
                    v-model="hmacKey"
                    dark
                    filled
                    ></v-text-field>
                </v-row>
            </v-col>
        </v-row>
        <v-row v-if="error" class="justify-center font-weight-bold primary--text">
            Error: {{error}}
        </v-row>

        <v-row class="justify-center"
        v-if="hashing"
        >
            <v-progress-circular
            size="100"
            color="primary"
            indeterminate
            >Hashing...</v-progress-circular>
        </v-row>
        <v-row v-if="hash"
        class="justify-center">
            <div class="pa-3 rounded" 
            style="border:2px solid black !important; max-width:500px !important;word-wrap: break-word;">
                <span class="font-weight-bold"> Hash:</span> {{hash}}
            </div> 
        </v-row>
        <v-row class="justify-center mt-15">
            <v-btn 
            class="green white--text" 
            v-if="!hashing"
            @click="usingFile?hashFile():hashText()"
            >
                <v-icon>mdi-play</v-icon>
                Start
            </v-btn>

            <v-btn 
            class="red white--text" 
            v-if="hashing"
            @click="cancelOperation()"
            >
            <v-icon>mdi-stop</v-icon>
                Stop
            </v-btn>
        </v-row>

    </v-container>
</template>

<script>
let fs = require('fs')
let crypto = require('crypto')
export default {
    data:()=>({
        //True when hashing process starts
        hashing:false,
        hmac:false,
        usingFile:true,
        algorithms:['md5','sha256','sha1','ripemd160','md4','sha224','sha384','sha512'],
        algorithm:null,
        fileSelected:null,
        textSelected:null,
        hmacKey:'',
        error:null,
        hash:null,
        stream:null
    }),
    methods:{
        hashFile:async function(){
            this.hash = null
            this.error = null
            if(!this.algorithm){
                this.error = "Please select a hashing algorithm"
            }else if(!this.fileSelected){
                this.error = "Please select a file to hash"
            }else if(this.hmac && this.hmacKey.length < 2){
                this.error = "Add a valid HMAC key"
            }
            //Start the hashing!
            if(!this.error){
                //disable all user actions and naviagation until the process is cancelled or finished
                this.hashing = true
                let hash;

                if(this.hmac){
                    //hmac hashing
                    hash = crypto.createHmac(this.algorithm,this.hmacKey)
                    this.stream = fs.createReadStream(this.fileSelected.path)
                    this.stream.on('data', (data) => {
                        hash.update(data)
                    })

                    this.stream.on('error', ()=>{
                        this.hashing = false
                        this.error = "Error while reading the file"
                        })
                    this.stream.on('end', ()=>{
                        this.hash = hash.digest('hex')
                        this.hashing = false
                    }) 

                }else{
                    
                    //normal hashing
                    hash = crypto.createHash(this.algorithm)
                    this.stream = fs.createReadStream(this.fileSelected.path)
                    
                    this.stream.on('data', (data) => {
                        hash.update(data)
                    })
                    this.stream.on('error', ()=>{
                        this.hashing = false
                        this.error = "Error while reading the file"
                        })
                    this.stream.on('end', ()=>{
                        this.hash = hash.digest('hex')
                        this.hashing = false
                    }) 
                }
            }
        },
        hashText: async function(){
            this.hash = null
            this.error = null
            if(!this.algorithm){
                this.error = "Please select a hashing algorithm"
            }else if(!this.textSelected){
                this.error = "Please enter text to hash"
            }else if(this.hmac && this.hmacKey.length < 2){
                this.error = "Add a valid HMAC key"
            }
            if(!this.error){
                if(this.hmac){
                    this.hash = await crypto.createHmac(this.algorithm, this.hmacKey)
                                            .update(this.textSelected)
                                            .digest('hex')
                }else{
                    this.hash = await crypto.createHash(this.algorithm)
                                            .update(this.textSelected)
                                            .digest('hex')
                    
                }
            }
        }
        ,
        cancelOperation:async function(){
            if(this.stream){
                this.stream.destroy()
                this.hashing = false
            }
        }
    },
    mounted:function(){
    }
}
</script>