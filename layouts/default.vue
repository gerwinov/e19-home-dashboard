<template>
  <v-app id="home-dashboard-app" dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar id="toolbar" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        items: [
          { icon: 'dashboard', title: 'Dashboard', to: '/' }
        ],
        title: 'E19 - Dashboard'
      }
    }
  }
</script>

<style>
  #home-dashboard-app {
      background-color: #686765;
  }

  #toolbar {
    background-color: #403C3C;
  }
</style>