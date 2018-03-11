<template>
  <v-dialog persistent :value="true" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline" v-text="'Home assistant login'"></span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-alert type="error" :value="true" v-text="error" v-show="error"></v-alert>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Adres" type="text" required v-model="address"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Poort" type="number" required v-model="port"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Wachtwoord"
                required
                v-model="password"
                :append-icon="hidePW ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => { hidePW = !hidePW }"
                :type="hidePW ? 'password' : 'text'"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        address: '',
        port: 8123,
        password: '',
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
            this.error = error
          })
      }
    }
  }
</script>