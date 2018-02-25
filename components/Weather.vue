<template>
  <v-card color="yellow darken-2" dark flat tile>
    <v-card-title primary class="title" v-text="'Weer'"></v-card-title>
    <v-card-text>
      <h1 class="display-3" v-text="formattedTemperature"></h1>
      <span class="subheading" v-text="weatherDescription"></span>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      temperature: { required: true },
      weatherDescription: { required: true }
    },

    computed: {
      formattedTemperature () {
        return Number.parseInt(this.temperature).toLocaleString('nl-NL') + '°C'
      }
    }
  }
</script>