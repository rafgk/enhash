<template>
    <v-container>
        <v-row 
        class="text-h4 mt-3 font-weight-bold justify-center"
        style="user-select:none;"
        >Verify {{usingFile?'a file':'text'}}</v-row>
        <v-row class="justify-center mt-5">
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
                >

                </v-text-field>
            </div>
        </v-row>
        <v-row class="justify-center">
            <v-btn depressed
            @click="usingFile = !usingFile"
            :disabled="hashing"
            class="white"
            >Use {{usingFile?'text':'file'}} instead</v-btn>
        </v-row>
        <v-row class="justify-space-around align-center mt-8">
            <v-col cols="4">
                <v-select label="Algorithm"
                outlined
                dense
                :items="algorithms"
                :menu-props="{ bottom: true, offsetY: true }"
                v-model="algorithm"
                :disabled="hashing"
                ></v-select>
            </v-col>
            <v-col cols="4">
                <v-row class="align-center">
                    <v-checkbox class="mt-0" v-model="hmac" :disabled="hashing"></v-checkbox>
                    <v-text-field label="HMAC secret key(optional)"
                    outlined
                    dense
                    :disabled="!hmac||hashing"
                    v-model="hmacKey"></v-text-field>
                </v-row>
            </v-col>
        </v-row>
        <v-row v-if="error" class="justify-center red--text">
            Error: {{error}}
        </v-row>
        <v-row class="justify-center">
            <span v-if="result===true" class="green--text font-weight-bold title">Its a match ;)</span>
            <span v-if="result===false" class="red--text font-weight-bold title">Not a match :(</span>
        </v-row>

        <v-row class="justify-center"
        v-if="hashing"
        >
            <v-progress-circular
            size="100"
            color="primary"
            indeterminate
            >Verifying...</v-progress-circular>
        </v-row>
        <v-row
        class="justify-center">
            <div class="" >
                <v-text-field
                outlined
                v-model="expectedHash"
                label="Expected hash"
                :counter="algorithm?keySizes[algorithm]:null"
                style="width:500px;"
                :disabled="hashing"
                >

                </v-text-field>
            </div> 
        </v-row>
        <v-row class="justify-center mt-15">
            <v-btn 
            class="green white--text" 
            v-if="!hashing"
            @click="usingFile?verifyFile():verifyText()"
            >
                <v-icon>mdi-play</v-icon>
                Start
            </v-btn>

            <v-btn 
            class="red white--text" 
            v-if="hashing"
            @click="cancelOperation"
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
        hashing:false,
        hmac:false,
        usingFile:true,
        algorithms:['sha1','sha256','md5'],
        keySizes:{'sha1':40,'sha256':64,'md5':32},
        algorithm:null,
        fileSelected:null,
        textSelected:null,
        hmacKey:'',
        error:null,
        expectedHash:"",
        result:null,
        stream:null
    }),
    methods:{
        verifyFile: async function(){
            //this.hash = null
            this.error = null
            this.result = null
            if(!this.algorithm){
                this.error = "Please select a hashing algorithm"
            }else if(!this.fileSelected){
                this.error = "Please select a file to hash"
            }else if(this.hmac && this.hmacKey.length < 2){
                this.error = "Add a valid HMAC key"
            }

            if(!this.error){
                this.hashing = true
                let hash;
                if(this.hmac){
                    hash = crypto.createHmac(this.algorithm,this.hmacKey)
                    this.stream = fs.createReadStream(this.fileSelected.path)
                    this.stream.on('data', (data) => {
                        hash.update(data)
                    })
                    this.stream.on('end', ()=>{
                        hash = hash.digest('hex')
                        this.expectedHash.toLowerCase()===hash?this.result=true:this.result=false
                        this.hashing = false
                    }) 
                }else{
                    hash = crypto.createHash(this.algorithm)
                    this.stream = fs.createReadStream(this.fileSelected.path)
                    
                    this.stream.on('data', (data) => {
                        hash.update(data)
                    })
                    this.stream.on('end', ()=>{
                        hash = hash.digest('hex')
                        this.expectedHash.toLowerCase()===hash?this.result=true:this.result=false;
                        this.hashing = false
                    })
                }
            }
        },
        verifyText: async function(){
            this.error = null
            if(!this.algorithm){
                this.error = "Please select a hashing algorithm"
            }else if(!this.textSelected){
                this.error = "Please enter text to hash"
            }else if(this.hmac && this.hmacKey.length < 2){
                this.error = "Add a valid HMAC key"
            }
            if(!this.error){
                let hash;
                if(this.hmac){
                    hash = await crypto.createHmac(this.algorithm, this.hmacKey)
                                        .update(this.textSelected)
                                        .digest('hex')
                    this.expectedHash.toLowerCase() === hash?this.result=true:this.result=false;
                    this.hashing = false
                    
                }else{
                    hash = await crypto.createHash(this.algorithm)
                                        .update(this.textSelected)
                                        .digest('hex')
                    this.expectedHash.toLowerCase() === hash?this.result=true:this.result=false;
                    this.hashing = false
                }
            }
        },
        cancelOperation:async function(){
            if(this.stream){
                this.stream.destroy()
                this.hashing = false
            }
        }
    }
}
</script>