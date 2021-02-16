<template>
    <v-container>
        <v-row 
        class="text-h4 mt-3 mb-3 accent--text font-weight-bold justify-center"
        style="user-select:none;"
        >
            Compare two files
        </v-row>
        <v-row class="justify-space-around">
            <v-col cols="4">
                <v-file-input 
                style="width:300px !important;"
                show-size
                prepend-icon="mdi-file"
                outlined
                dense
                label="File 1"
                :disabled="comparing"
                v-model="file1"
                dark
                filled
                ></v-file-input>
            </v-col>
            <v-col cols="4">
                <v-file-input 
                style="width:300px !important;"
                show-size
                prepend-icon="mdi-file"
                outlined
                dense
                label="File 2"
                :disabled="comparing"
                v-model="file2"
                dark
                filled
                ></v-file-input>
            </v-col>
        </v-row>
        <v-row class="justify-center" v-if="comparing">
            <v-progress-circular
            size="120"
            color="primary"
            indeterminate
            >Comparing...</v-progress-circular>
        </v-row>
        <v-row class="mb-6">
            <v-row v-if="result" class="title align-center justify-center">
                <v-icon class="green--text">mdi-file-check</v-icon> 
                Files match!
            </v-row>
            <v-row v-if="result===false" class="title align-center justify-center">
                <v-icon class="red--text">mdi-file-remove</v-icon>
                Files don't match
            </v-row>
        </v-row>
        <v-row class="justify-center">
            <v-btn 
            class="green white--text" 
            v-if="!comparing"
            @click="compareFiles()"
            >
                <v-icon>mdi-play</v-icon>
                Start
            </v-btn>
        </v-row>

    </v-container>
</template>

<script>
let filecompare = require('filecompare')
export default {
    data:()=>({
        comparing:false,
        result:null,
        file1:null,
        file2:null
    }),
    methods:{
        compareFiles:async function(){
            if(this.file1 && this.file2){
                this.comparing = true
                this.result = null
                filecompare(this.file1.path,this.file2.path,(result)=>{
                    this.result = result
                    this.comparing = false
                })
            }

        }
    }
}
</script>