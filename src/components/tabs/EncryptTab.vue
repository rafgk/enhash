<template>
    <v-container>
        <v-form ref="form">

        
        <v-row
        class="text-h4 mt-3 font-weight-bold justify-center accent--text"
        style="user-select:none;"
        >{{encrypting?'Encrypt':'Decrypt'}} a file(Beta)</v-row>

        <v-row class="justify-center mt-9">
            <div>
                <v-file-input
                dark
                style="width:300px !important;"
                show-size
                prepend-icon="mdi-file"
                outlined
                dense
                filled
                :rules="[rules.required]"
                label="Select file"
                v-model="fileSelected"
                ></v-file-input>
            </div>
        </v-row>
                
        <v-row
        class="justify-center"
        >
            <v-btn
            depressed
            @click="encrypting = !encrypting"
            :disabled="processing"
            dark
            class="button"
            
            >{{!encrypting?'Encrypt':'Decrypt'}} instead</v-btn>
        </v-row>
        
        <v-row class="justify-space-around mt-9"> 
            <v-col cols="4">
                <v-select
                class="accent--text "
                outlined
                dense
                dark
                filled
                :items="algorithms"
                :menu-props="{ bottom: true, offsetY: true }"
                v-model="algorithm"
                :disabled="processing"
                :rules="[rules.required]"
                label="Algorithm">

                </v-select>
            </v-col>

            <v-col cols="4">
                <v-text-field
                label="Password"
                type="password"
                filled
                outlined
                dense
                :rules="[rules.required,rules.min,rules.characters]"
                v-model="password"
                color="#fffff"
                dark
                ></v-text-field>

            </v-col>

        </v-row>


        <v-row class="justify-center"
        v-if="processing"
        >
            <v-progress-circular
            size="100"
            color="primary"
            indeterminate
            > {{encrypting?'Encrypting':'Decrypting'}}...</v-progress-circular>
        </v-row>

        <v-row class="justify-center mt-15">
            <v-btn 
            class="green white--text" 
            v-if="!processing"
            @click="encrypting?encryptFile():decryptFile()"
            >
                <v-icon>mdi-play</v-icon>
                Start
            </v-btn>

        </v-row>
        </v-form>
    </v-container>
</template>

<script>
let cryptify = require('cryptify')
export default {
    data:()=>({
        algorithm:null,
        algorithms:['aes-128-cbc-hmac-sha256','aes-256-cbc-hmac-sha256','aes-128-cbc'],
        processing:false,
        encrypting:true,
        fileSelected:null,
        password:'',
        rules: {
            required: value => !!value || 'Required!',
            min: v => v.length >= 8 || 'Must be at least 8 characters',
            characters: v => v.match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$') && true || 'Must include uppercase, lowercase, number and a special character' //eslint-disable-line
        }
    }),
    methods:{
        //TODO: Check if file is already encrypted/decrypted 
        encryptFile:async function(){
            if(this.$refs.form.validate()){
                //TODO: set password requirements
                this.processing = true
                new cryptify(this.fileSelected.path, this.password,this.algorithm)
                .encrypt().then(()=>{
                    this.processing = false
                }).catch((err)=>{
                    console.log(err)
                    this.processing = false
                })
            }

        },
        decryptFile:function(){
            if(this.$refs.form.validate()){
                this.processing = true
                new cryptify(this.fileSelected.path,this.password, this.algorithm)
                .decrypt().then(()=>{
                    this.processing = false
                }).catch((err)=>{
                    console.log(err)
                    this.processing = false
                })
            }
        }
    }
}
</script>
