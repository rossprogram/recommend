<template>
  <v-app>
    <v-app-bar
      app
    >
      <div class="d-flex align-center">
        <v-img
          alt="Ross Program Z Logo"
          class="shrink mr-4"
          contain
          :src="`${publicPath}logo.png`"
          transition="scale-transition"
          width="30"
        />
      </div>
      <v-toolbar-title>The Ross Mathematics Program</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container fluid class="pa-6">
        <v-fade-transition mode="out-in">
	  <router-view />
        </v-fade-transition>
      </v-container>
    </v-content>
    <Snackbar/>
  </v-app>
</template>

<script>
import Snackbar from './components/Snackbar.vue';

export default {
  name: 'App',

  components: {
    Snackbar,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },

};
</script>
