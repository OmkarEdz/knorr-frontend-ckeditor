<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class=" kachelimage header-image" style="background: url('/static/img/laptop_lock.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("reset_password_headline") }}</div>
      </div>
    </div>
  </div>
  <div class="pt-8">
    <div class="row disablerow align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 pl-8 innercreatetraining">        
        <div class="px-md-4 mx-0 pa-0 text-content">

          <div class="row pt-0">
              <div class="col-md-12 pt-0">
                <span class="headlinecolor text-uppercase text-h6"> {{$t("reset_password_headline")}}</span>
              </div>
              <div class="col-sm-12 col-md-12 pt-0">
                <v-text-field  
                hide-details="auto"
                class="datainput justify-content-end align-self-center pb-1"
                dense
                outlined
                type="password"
                :label="$t('new_password')"
                :rules="[rules.password]"
                v-model="resetPassword.password"
                ></v-text-field>
              </div>
              <div class="col-sm-12 col-md-12 pt-0">
                <v-text-field  
                hide-details="auto"
                class="datainput justify-content-end align-self-center pb-1"
                dense
                outlined
                type="password"
                :label="$t('confirm_password')"
                v-model="resetPassword.passwordRepeat"
                ></v-text-field>
              </div>
              <div class="col-sm-12 col-md-12 pt-0" v-show="newUser">
                <v-checkbox
                    v-model="consent.privacy"
                    class="no-margin-top"
                    hide-details="auto"
                >
                <template v-slot:label>
                  <v-span>{{ $t('agree_privacy_policy_part1') }} <a :href="`/files/images/KB_DS-Hinweise_Customer_Training_Portal_${$locale}.pdf`" target="_blank" @click.stop>  {{$t('agree_privacy_policy_part2')}}</a>   {{$t('agree_privacy_policy_part3') }}</v-span>
                </template>
                </v-checkbox>
              </div>
              <div class="col-sm-12 col-md-12 pt-0" v-show="newUser">
                <v-checkbox
                    v-model="consent.agb"
                    class="no-margin-top"
                    :label="$t('agree_agb')"
                    hide-details="auto"
                ></v-checkbox>
              </div>
              <div class="col-sm-12 col-md-12 pt-0" v-show="newUser">
                <v-checkbox
                    v-model="consent.thirdParty"
                    class="no-margin-top"
                    :label="$t('agree_third_party')"
                    hide-details="auto"
                ></v-checkbox>
              </div>
              <div class="col-sm-12 col-md-12 pt-0" v-show="newUser">
                <v-checkbox
                    v-model="consent.realYou"
                    class="no-margin-top"
                    :label="$t('agree_real_you')"
                    hide-details="auto"
                ></v-checkbox>
              </div>
          </div>
          
        </div>
      </div>

      <!-- Right Area -->
      <div class="col-xl-4 px-0 pl-md-12 pl-8 pl-md-12 pl-lg-8  row pt-0">
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn :to="`/login`" outlined depressed tile class="backbutton mr-2 mb-2"><v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn @click="savePassword()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("reset_password") }}</v-btn>
        </div>
        <Contact />
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

    props: {
      token: String,
      newUser: Boolean,
    },

    data() {
      return {
        resetPassword: {
            password: null,
            passwordRepeat: null,
        },

        consent: {
          privacy: false,
          agb: false,
          thirdParty: false,
          realYou: false
        },
        rules: {
          password: value => {
            if((value == null || value == "")) return true;
            const pattern = /^(?=.{12,})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])).*/;
            return (
              pattern.test(value) || this.$t("password_error")
            )
          }
        },
      }
    },

    mounted(){
      if(this.token == null){
        this.$noty.error(this.$t("password_reset_token_missing"));
      }
      if(this.newUser == null) this.newUser = false;
    },
    
    methods: {

      onError(err) {
        if (err.response != null && err.response.data != null) {
          this.$noty.error(err.response.data);
        } else {
          console.error(err);
        }
      },

      savePassword() {
        var _this = this;
        var resetPassword = {};
        resetPassword = Object.assign(resetPassword, this.resetPassword);
        resetPassword.token = this.token;

        if(this.newUser && !this.consent.privacy){
          this.$noty.error(this.$t("please_accept_privacy_policy"));
          return;
        }
        if(this.newUser && !this.consent.agb){
          this.$noty.error(this.$t("please_accept_agb"));
          return;
        }
        if(this.newUser && !this.consent.thirdParty){
          this.$noty.error(this.$t("please_accept_third_party"));
          return;
        }
        if(this.newUser && !this.consent.realYou){
          this.$noty.error(this.$t("please_accept_real_you"));
          return;
        }

        if(this.$user != null){
          this.$noty.error(this.$t("already_logged_in"));
          return;
        }
      
        if(resetPassword.password == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("new_password")}));
          return;
        }
        if(resetPassword.passwordRepeat == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("confirm_password")}));
          return;
        }
        if(resetPassword.token == null){
          this.$noty.error(this.$t("password_reset_token_missing"));
          return;
        }
        if(resetPassword.passwordRepeat != resetPassword.password){
          this.$noty.error(this.$t("passwords_not_equal"));
          return;
        }

        this.$axios
            .post("/api/user/reset-password", resetPassword)
            .then(function (response) {
              _this.$noty.success(_this.$t("password_resetted"));
              _this.$router.push("/login");
            })
            .catch(this.onError);
      },

      onFinally(){
        showLoadingCircle(false);
      },

    }
}
</script>