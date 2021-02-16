import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark:true,
        themes: {
        
          dark: {
            primary: '#f05454',
            secondary: '#222831',
            accent: '#dddddd',
            button:'#36404E',
            error: '#dddddd',
          },
        },
      },
});
