<template>
    <v-system-bar
    window
    dark
    
    class="secondary"
    app
    >
    <v-row class="align-center">
        <v-icon class="mr-1 ml-3">
            mdi-pound-box
        </v-icon>
        <div style="user-select:none;">
            Enhash
        </div>

        <v-spacer style="-webkit-app-region: drag; height:30px;"></v-spacer>
        <v-btn
        text
        small
        @click="minimize()"
        >
            <v-icon>mdi-window-minimize</v-icon>
        </v-btn>
        <v-btn
        text
        small
        @click="close()"
        >
            <v-icon>mdi-window-close</v-icon>
        </v-btn>
    </v-row>
    
    </v-system-bar>
    
</template> 

<script>
import {remote} from 'electron'

export default {
    data:()=>({
        window:null
    }),
    methods:{
        close:function(){
            this.window.close()
        },
        minimize:function(){
            this.window.minimize()
        }
    },
    mounted:function(){
        this.window = remote.BrowserWindow.getFocusedWindow()
    }
}
</script>