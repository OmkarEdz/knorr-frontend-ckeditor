<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25 otp-screen-wrap">
    <div class="kachelimage header-image" style="background: url('/static/img/header_homepage.jpg')">
      <div class="otp-white-wrapper">
        <h2 class="otp-head">{{ $t("otpVerification") }}</h2>
        <p class="inner-form-head">{{ $t("oneTimePassword") }} <br/>{{ $t("toDownload") }}</p>
        <p class="inner-form-info">{{ $t("sixDigitOtp") }}</p>
        <div class="opt-form-wrap">
          <v-text-field  
            hide-details="auto"
            class="otp-input"
            dense
            outlined
            :label="$t('Enter OTP')"
            v-model="otp"
          ></v-text-field>          
          <v-btn outlined depressed tile class="savebutton" @click="verifyOtp()">{{ $t("continue") }} <v-icon>fa-solid fa-caret-right</v-icon></v-btn>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
 data() {
    return {
       bookingId:null,
       trainingId:null,
       otp:null
    }
 },
mounted() {
      this.bookingId=this.$route.query.bookingId;
      this.trainingId=this.$route.query.trainingId;
      
},
methods: {
   onError(err) {
        if (err.response != null && err.response.data != null) {
          this.$noty.error(err.response.data);
        } else {
          console.error(err);
        }
    },
    verifyOtp() {
     var _this = this;
      if(_this.otp && /^[0-9]{6}$/.test(_this.otp)){
      let bookingId=parseInt(_this.bookingId);
      let trainingId= parseInt(_this.trainingId);
      let otp= parseInt(_this.otp);
      this.$axios
        .get("/api/booking/otpVerification/"+bookingId+ "/"+ trainingId+ "/"+ otp)
        .then(function (response) {
         _this.$router.push('/download-documents?trainingId=' + _this.trainingId +"&bookingId="+_this.bookingId+"&otp="+_this.otp);
        })
        .catch(this.onError);
     } else {
        // OTP value is either empty or invalid
        this.$noty.error(this.$t("invalid_otp"));
        return;
      }
    
    },
} 
}
</script>
