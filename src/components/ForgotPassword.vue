<template>
  <div>
    <div class="side-background" style="background-image: url('/static/img/header_homepage.jpg')">
      <div class="side-background-foreground">
        <v-card class="mx-auto">
          <v-card-title>
            <img class="mbres" src="../assets/img/logo-transparent.png" width="250px" style="margin: 0 auto;"><br>
            {{ $t("forgot_password") }}
          </v-card-title>
          <v-card-text>
            <!-- Email Field -->
            <v-text-field  
              hide-details="auto"
              class="datainput justify-content-end align-self-center pb-1"
              dense
              outlined
              :label="$t('email')"
              @keypress.enter="resetPassword()"
              v-model="email"
            ></v-text-field>
            <br>
            <!-- Password Field -->
            <br>
            <v-btn @click="resetPassword()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("send_reset_password_mail") }}</v-btn>
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
      email: null,
    };
  },

  mounted() {
    
  },

  methods: {
    resetPassword() {
      var _this = this;
      
      const email = this.email;

      progressIndicator.hidden = false;
      showLoadingCircle(true);

      this.$axios.post("/api/user/forgot-password", {email: email}).then(function(response){ 
          _this.$router.push("/login");
          _this.$noty.success(_this.$t("password_reset_mail_sent"))
      }).catch(function(error){
          if(error.response != null && error.response.data != null){
            _this.$noty.error(error.response.data);
          }else{
            console.error(error);
          }
      }).finally(() => {
        progressIndicator.hidden = true;
        showLoadingCircle(false);
      });
    }
  },
};
</script>

<style>
</style>