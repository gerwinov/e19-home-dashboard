<template>
  <v-card :id="cardId" dark flat tile @click.native="toggleLight()">
    <v-layout class="text-xs-center">
      <v-flex>
        <img src="/icons/light.svg" class="mt-3">
        <h1 class="header-3 mb-1" v-text="light.attributes.friendly_name"></h1>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    props: {
      light: { required: true }
    },

    computed: {
      lightOn () {
        return this.light.state === 'on'
      },
      cardId () {
        return this.lightOn ? 'light-on-card' : 'light-off-card'
      }
    },

    methods: {
      toggleLight () {
        let action = this.lightOn ? 'turn_off' : 'turn_on'

        this.$store.dispatch({
          type: 'toggleLight',
          id: this.light.entity_id,
          action: action
        })
      }
    }
  }
</script>

<style>
  #light-on-card {
    background-color: #BDD2A8;
  }
  #light-off-card {
    background-color: #81807C;
  }
</style>