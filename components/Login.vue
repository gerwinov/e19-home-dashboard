<template>
  <v-dialog persistent :value="true" max-width="500px">
    <v-card id="login-card">
      <v-card-title>
        <span class="headline" v-text="'Home assistant login'"></span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-alert type="error" :value="true" v-text="error" v-show="error"></v-alert>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Adres" type="text" required v-model="address" color="cyan accent-4"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Poort" type="number" required v-model="port" color="cyan accent-4"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Wachtwoord"
                required
                v-model="password"
                :append-icon="hidePW ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => { hidePW = !hidePW }"
                :type="hidePW ? 'password' : 'text'"
                color="cyan accent-4"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="btn-orange" ripple @click.native="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        address: null,
        port: 17189,
        password: null,
        error: null,
        hidePW: true
      }
    },

    methods: {
      login () {
        this.$store.dispatch({
          type: 'login',
          address: this.address,
          port: this.port,
          password: this.password
        })
          .then(() => {
            this.$router.push('/')
          })
          .catch((error) => {
            this.error = `Home assistant code: ${error}`
          })
      }
    }
  }
</script>

<style>
  #login-card {
    background-color: #84807B;
  }
</style>