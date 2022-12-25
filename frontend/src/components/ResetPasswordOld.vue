<template>
  <div>
    <div class="side-background">
      <div class="side-background-foreground">
        <v-card elevation="2" class="mx-auto" v-if="!codeIsPresent">
          <v-card-title>Enter mail:</v-card-title>
          <v-card-text>
            <!-- Mail field -->
            <v-text-field
                :label="$t('email')"
                hide-details="auto"
                v-model="mail">
              <v-icon slot="prepend">fas fa-envelope</v-icon>
            </v-text-field>

            <v-btn-toggle>
              <v-btn elevation="2" color="primary" @click="routeBackToLogin()">{{ $t("back_to_login") }}</v-btn>
              <v-btn elevation="2" color="normal" @click="checkState()">{{ $t("reset_password") }}</v-btn>
            </v-btn-toggle>

          </v-card-text>
        </v-card>

        <v-card elevation="2" class="mx-auto" v-if="codeIsPresent">
          <v-card-title>Reset password:</v-card-title>
          <v-card-text>
            <!-- Email Field -->
            <v-text-field
                :label="$t('reset-code')"
                hide-details="auto"
                v-model="credentials.code">
              <v-icon slot="prepend">fas fa-envelope</v-icon>
            </v-text-field>

            <!-- Password field -->
            <v-text-field
                v-model="credentials.password"
                :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                :type="showPassword ? 'text' : 'password'"
                :label="$t('password')"
                @click:append="showPassword = !showPassword">
              <v-icon slot="prepend">fas fa-key</v-icon>
            </v-text-field>

            <!-- Confirm password field -->
            <v-text-field
                v-model="credentials.confirmPassword"
                :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                :type="showPassword ? 'text' : 'password'"
                :label="$t('confirm_password')"
                @click:append="showPassword = !showPassword">
              <v-icon slot="prepend">fas fa-key</v-icon>
            </v-text-field>

            <v-btn-toggle>
              <v-btn elevation="2" color="primary" @click="routeBackToLogin()">{{ $t("back_to_login") }}</v-btn>
              <v-btn elevation="2" color="normal" @click="startReset(null)">{{ $t("resend_mail") }}</v-btn>
              <v-btn elevation="2" color="error" @click="resetPassword()">{{ $t("continue") }}</v-btn>
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      codeIsPresent: false,

      showPassword: false,

      mail: "",
      credentials: {
        code: "",
        password: "",
        confirmPassword: ""
      },
      routes: {
        userByMail: "/api/users/mail/",
        passwordResetState: "/code/exists",
        resetPassword: "/password/lost",
        patchPassword: "/password"
      },

      mailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };
  },

  mounted() {

  },

  methods: {
    validateEmail(email) {
      return this.mailRegex.test(String(email).toLowerCase());
    },
    checkState() {
      if (!this.validateEmail(this.mail)) {
        this.$noty.error(this.$t("ERROR_MAIL_INVALID"));
        return;
      }
      this.$axios.get(this.routes.userByMail + this.mail + this.routes.passwordResetState).then(this.codeFound).catch(this.startReset);
    },
    codeFound() {
      this.codeIsPresent = true;
      this.$noty.success(this.$t("ALERT_CHECK_MAIL"));
    },
    startReset(error) {
      this.$axios.post(this.routes.userByMail + this.mail + this.routes.resetPassword).then(this.codeFound).catch(this.resetStartFailed);
    },
    resetPassword() {
      if (this.credentials.password !== this.credentials.confirmPassword) {
        this.$noty.error(this.$t("ERROR_PASSWORDS_DONT_MATCH"));
        return;
      }
      this.$axios.patch(this.routes.userByMail + this.mail + this.routes.patchPassword, this.credentials).then(this.successfulReset).catch(this.resetStartFailed)
    },
    logError(error) {
      console.log(error);
    },
    resetStartFailed(error) {
      if (error.response.status === 404) {
        this.$noty.error(this.$t("ERROR_USER_BY_MAIL_NOT_FOUND"));
      }
      else if (error.response.status === 409) {
        this.$noty.error(this.$t("ERROR_INVALID_RESET_CODE"));
      }
      else if (error.response.status === 412) {
        this.codeIsPresent = false
        this.$noty.error(this.$t("ERROR_CODE_EXPIRED"))
      }
      else {
        this.$noty.error(this.$t("UNEXPECTED_ERROR"));
        console.log(error);
      }
    },
    discardError(error) {},
    successfulReset() {
      this.$noty.success(this.$t("ALERT_PASSWORD_RESET_SUCCESSFUL"));
      this.routeBackToLogin();
    },
    routeBackToLogin() {
      this.$router.push("login");
    }
  },
};
</script>

<style>
</style>