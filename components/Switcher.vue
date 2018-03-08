<template>
  <v-card :color="cardColor" dark flat tile ripple @click.native="flipSwitch()">
    <v-card-title primary class="title" v-text="switcher.attributes.friendly_name"></v-card-title>
    <v-card-text>
      <v-icon x-large>power</v-icon>
    </v-card-text>
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
      cardColor () {
        return this.switchOn ? 'green accent-2' : 'blue-grey lighten-1'
      }
    },

    methods: {
      flipSwitch () {
        let action = this.switchOn ? 'turn_off' : 'turn_on'

        this.$store.dispatch({
          type: 'flipSwitch',
          id: this.switcher.entity_id,
          action: action
        })
      }
    }
  }
</script>
