<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25 otp-screen-wrap">
    <div class="kachelimage header-image" style="background: url('/static/img/header_homepage.jpg')">
      <div class="otp-white-wrapper">
        <h2 class="otp-head">OTP Verification</h2>
        <p class="inner-form-head">Please enter the One-Time-Password <br/>to download documents</p>
        <p class="inner-form-info">6 digits OTP has been sent in your invitation email</p>
        <div class="opt-form-wrap">
          <v-text-field  
            hide-details="auto"
            class="otp-input"
            dense
            outlined
            :label="$t('Enter OTP')"
            v-model="otp"
          ></v-text-field>          
          <v-btn outlined depressed tile class="savebutton" @click="verifyOtp()">{{ $t("Continue") }} <v-icon>fa-solid fa-caret-right</v-icon></v-btn>
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
      let bookingId=parseInt(_this.bookingId);
      let trainingId= parseInt(_this.trainingId);
      let otp= parseInt(_this.otp);
      this.$axios
        .get("/api/booking/otpVerification/"+bookingId+ "/"+ trainingId+ "/"+ otp)
        .then(function (response) {
         _this.$router.push('/download-documents?trainingId=' + _this.trainingId +"&bookingId="+_this.bookingId+"&otp="+_this.otp);
        })
        .catch(this.onError);
    },
} 
}
</script>
