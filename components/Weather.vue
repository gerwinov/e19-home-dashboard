<template>
  <v-card id="weather-card" dark flat tile>
    <v-layout row>
      <v-flex xs12 class="mr-3">
        <h1 class="header-1 text-xs-right" v-text="formattedTemperature"></h1>
        <v-layout class="card-sub text-xs-right" justify-end>
          <v-flex class="sub-1" v-text="weatherDescription"></v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <img class="card-icon-bg" src="/icons/cloud_lg.svg">
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

<style>
  #weather-card {
    background-color: #FF977C;
  }
</style>