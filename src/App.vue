<template>
  <v-app style="background-color:#30475e;">
      <v-navigation-drawer
      expand-on-hover
      width="200px"
      absolute
      permanent
      class="secondary"
      app
      
    >
        
        <v-tabs
        vertical
        v-model="tab"
        class=""
        dark
        >
            <v-tabs-slider color="primary" style="width:5px;"></v-tabs-slider>
            <v-tab
            href="#tab-1"
            active-class="primary--text secondary lighten-1"
            class="secondary">
                <v-icon class="ml-1">
                    mdi-pound
                </v-icon>
                <v-spacer></v-spacer>
                Hash
                <v-spacer></v-spacer>
            </v-tab>
            <v-tab
            href="#tab-2"
            active-class="primary--text secondary lighten-1"
            class="secondary"
            >
                <v-icon class="ml-1">
                    mdi-shield-check
                </v-icon>
                <v-spacer></v-spacer>
                Verify
                <v-spacer></v-spacer>
            </v-tab>
            <v-tab
            href="#tab-3"
            active-class="primary--text secondary lighten-1"
            class="secondary"
            >
                <v-icon class="ml-1 mr-3">
                    mdi-compare
                </v-icon>
                <v-spacer></v-spacer>
                Compare
                <v-spacer></v-spacer>
            </v-tab>
            
            <v-tab
            href="#tab-4"
            active-class="primary--text secondary lighten-1"
            class="secondary"
            >
                <v-icon class="ml-1 mr-3">
                    mdi-lock
                </v-icon>
                <v-spacer></v-spacer>
                Encrypt
                <v-spacer></v-spacer>
            </v-tab>
            <v-tab
            href="#tab-5"
            active-class="primary--text secondary lighten-1"
            class="secondary"
            >
                <v-icon class="ml-1 mr-3">
                    mdi-information
                </v-icon>
                <v-spacer></v-spacer>
                About
                <v-spacer></v-spacer>
            </v-tab>
        </v-tabs>
        
    </v-navigation-drawer>

    <AppBar></AppBar>

    <v-main>
      <v-tabs-items v-model="tab" style="background-color:#30475e">
        <v-tab-item
        value="tab-1"
        >
        <HashTab></HashTab>
        </v-tab-item>

        <v-tab-item
        value="tab-2"
        >
        <VerifyTab></VerifyTab>
        </v-tab-item>
        
        <v-tab-item
        value="tab-3"
        >
        <CompareTab></CompareTab>
        </v-tab-item>
        
        <v-tab-item
        value="tab-4"
        >
        <EncryptTab></EncryptTab>
        </v-tab-item>
        <v-tab-item
        value="tab-5"
        >
        <AboutTab></AboutTab>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'
import HashTab from './components/tabs/HashTab'
import VerifyTab from './components/tabs/VerifyTab'
import EncryptTab from './components/tabs/EncryptTab'
import CompareTab from './components/tabs/CompareTab'
import AboutTab from './components/tabs/AboutTab'
export default {
  name: 'App',

  components: {
    AppBar,
    HashTab,
    VerifyTab,
    EncryptTab,
    CompareTab,
    AboutTab
  },

  data: () => ({
    tab:null
  }),
  methods:{

  }
};
</script>

<style>
html{
overflow: hidden;
}

v-main{
  overflow: auto;
}
body::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
  position: absolute;
  left: 0;
}

body::-webkit-scrollbar-track {
  background: orange;        /* color of the tracking area */
}

body::-webkit-scrollbar-thumb {
  background-color: blue;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid orange;  /* creates padding around scroll thumb */
}
</style>