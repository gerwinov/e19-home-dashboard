<template>
  <v-card :id="cardId" dark flat tile @click.native="flipSwitch()">
    <v-layout class="text-xs-center">
      <v-flex>
        <img src="/icons/power.svg" class="mt-3">
        <h1 class="header-3 mb-1" v-text="switcher.attributes.friendly_name"></h1>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    props: {
      switcher: { required: true }
    },

    computed: {
      switchOn () {
        return this.switcher.state === 'on'
      },
      cardId () {
        return this.switchOn ? 'switch-on-card' : 'switch-off-card'
      }
    },

    methods: {
      flipSwitch () {
        let action = this.switchOn ? 'turn_off' : 'turn_on'

        this.$store.commit({
          type: 'flipSwitch',
          id: this.switcher.entity_id,
          action: action
        })
      }
    }
  }
</script>

<style>
  #switch-on-card {
    background-color: #BDD2A8;
  }
  #switch-off-card {
    background-color: #81807C;
  }
</style>