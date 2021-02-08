<template>
  <v-app>
      <v-navigation-drawer
      expand-on-hover
      width="200px"
      absolute
      permanent
      class="green"
      app
    >
        
        <v-tabs
        vertical
        v-model="tab"
        class="green">
            <v-tabs-slider color="red" style="width:5px;"></v-tabs-slider>
            <v-tab
            href="#tab-1"
            >
                <v-icon class="ml-1">
                    mdi-pound
                </v-icon>
                <v-spacer></v-spacer>
                Hash
                <v-spacer></v-spacer>
            </v-tab>
            <v-tab
            href="#tab-2"
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
            >
                <v-icon class="ml-1 mr-3">
                    mdi-lock
                </v-icon>
                <v-spacer></v-spacer>
                Encrypt
                <v-spacer></v-spacer>
            </v-tab>
            <v-tab
            href="#tab-4"
            >
                <v-icon class="ml-1 mr-3">
                    mdi-compare
                </v-icon>
                <v-spacer></v-spacer>
                Compare
                <v-spacer></v-spacer>
            </v-tab>
        </v-tabs>
        
    </v-navigation-drawer>

    <AppBar></AppBar>

    <v-main>
      <v-tabs-items v-model="tab">
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
        <EncryptTab></EncryptTab>
        </v-tab-item>
        
        <v-tab-item
        value="tab-4"
        >
        <CompareTab></CompareTab>
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
import CompareTab from './components/tabs/VerifyTab'
export default {
  name: 'App',

  components: {
    AppBar,
    HashTab,
    VerifyTab,
    EncryptTab,
    CompareTab
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