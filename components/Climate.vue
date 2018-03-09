<template>
  <v-card id="climate-card" dark flat tile>
    <v-layout row>
      <v-flex xs12 class="mr-3">
        <h1 class="header-1 text-xs-right" v-text="currentTemperature"></h1>
        <v-layout class="card-sub text-xs-right mr-3" align-center>
          <v-flex>
            <v-icon medium>web</v-icon>
          </v-flex>
          <v-flex xs2 class="sub-1" v-text="targetTemperature"></v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row justify-end class="mr-2">
      <v-btn class="card-button" outline medium fab icon @click.native="toggleThermostat('Comfort')">
        <img src="/icons/thermo_on.svg">
      </v-btn>
      <v-btn class="card-button" outline medium fab icon @click.native="toggleThermostat('Away')">
        <img src="/icons/thermo_off.svg">
      </v-btn>
    </v-layout>

    <img class="card-icon-bg" src="/icons/thermo_lg.svg">
  </v-card>
</template>

<script>
  export default {
    props: {
      climate: { required: true }
    },

    computed: {
      currentTemperature () {
        return this.climate.attributes.current_temperature.toLocaleString('nl-NL') +
          this.climate.attributes.unit_of_measurement
      },
      targetTemperature () {
        return this.climate.attributes.temperature.toLocaleString('nl-NL') +
          this.climate.attributes.unit_of_measurement
      }
    },

    methods: {
      toggleThermostat (operationMode) {
        this.$store.commit({
          type: 'toggleThermostat',
          id: this.climate.entity_id,
          action: 'set_operation_mode',
          operationMode: operationMode
        })
      }
    }
  }
</script>

<style>
  #climate-card {
    background-color: #C85F66;
  }
</style>
