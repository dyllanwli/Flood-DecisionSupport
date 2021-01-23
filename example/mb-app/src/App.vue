<template>
  <v-app>
    <v-app-bar
      max-height=40
      app
      color="primary"
      dark
      class="main-app-bar"
    >
    </v-app-bar>

    <v-main>
      <BaseMap/>
    </v-main>
  </v-app>
</template>

<script>
import BaseMap from '@/components/BaseMap';
// import Router from './components/Router'
export default {
  name: 'App',

  components: {
    BaseMap,
    // Router
  },

  data: () => ({
    //
  }),
};
</script>