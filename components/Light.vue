<template>
  <v-card :color="cardColor" dark flat tile ripple @click.native="toggleLight()">
    <v-card-title primary class="title" v-text="light.attributes.friendly_name"></v-card-title>
    <v-card-text>
      <v-icon x-large>lightbulb_outline</v-icon>
    </v-card-text>
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
      cardColor () {
        return this.lightOn ? 'green accent-2' : 'blue-grey lighten-1'
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
