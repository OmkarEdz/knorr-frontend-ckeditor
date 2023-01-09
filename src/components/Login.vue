<template>
  <div>
    <div class="side-background" style="background-image: url('/static/img/header_homepage.jpg')">
      <div class="side-background-foreground">
        <v-card class="mx-auto">
          <v-card-title>
            <img src="../assets/img/logo-transparent.png" width="250px" style="margin: 0 auto;">   
          </v-card-title>
          <v-card-text>
            <!-- Email Field -->
            <v-text-field  
              hide-details="auto"
              class="datainput justify-content-end align-self-center pb-1"
              dense
              outlined
              :label="$t('email')"
              v-model="credentials.mail"
              @keypress.enter="login()"
            ></v-text-field>
            <br>
            <!-- Password Field -->
            <v-text-field  
              hide-details="auto"
              class="datainput justify-content-end align-self-center pb-1"
              dense
              outlined
              :label="$t('password')"
              type="password"
              v-model="credentials.password"
              @keypress.enter="login()"
            ></v-text-field>
            <a class="password-reset-link" href="/forgot-password">{{ $t("forgot_password") }}</a><br>
            <a class="password-reset-link" target="_blank" :href="`/files/images/KB_DS-Hinweise_Customer_Training_Portal_${$locale}.pdf`">{{ $t("read_privacy_policy") }}</a>
            <br>
            <v-btn @click="login()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("login") }}</v-btn>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    routingTarget: String,
  },

  
  data() {
    return {
      showPassword: false,

      credentials: {
        mail: "",
        password: ""
      },
    };
  },

  mounted() {
    this.$axios.checkBearer().then(this.onLoggedIn).catch(this.discardError);
  },

  methods: {
    login() {
      this.$axios.credentials = this.credentials;
      this.$axios.authorize().then(this.onLoggedIn).catch(this.onLoginFailed);
    },
    onLoggedIn(response) {
      this.$axios
        .get("/api/user/me")
        .then(this.onSuccessfulLogin)
        .catch(this.onLoginFailed);
    },
    onSuccessfulLogin(response){
      if(this.routingTarget != null){
        this.$router.push(this.routingTarget);
        window.location.reload();
        return;
      }
      this.$router.push("categories");
      window.location.reload();
    },
    onLoginFailed(error) {
      this.$noty.error(this.$t("ERROR_INVALID_CREDENTIALS"));
      showLoadingCircle(false);
    },
    logError(error) {
      console.log(error);
    },
    discardError(error) {}
  },
};
</script>

<style>
</style>