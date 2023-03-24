<template>
<div>
<div>{{ this.$route.name }}</div>
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
          ></v-text-field>          
          <v-btn outlined depressed tile class="savebutton">{{ $t("Continue") }} <v-icon>fa-solid fa-caret-right</v-icon></v-btn>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style>
.optScreensWrap .v-toolbar__content .col-md > .align-self-center > .row.col-7.align-self-center, .optScreensWrap .v-toolbar__content .col-md ~ .justify-content-between {display:none;}
.optScreensWrap .v-application .kb-header-logo.mb-4 {margin-bottom: 40px!important;}
.optScreensWrap .v-main__wrap .sixteentosix.otp-screen-wrap {margin-top: 120px !important;border-bottom: 27px solid #004581;}
.optScreensWrap .v-application--wrap .v-bottom-navigation {display:none !important;}
.optScreensWrap .v-main__wrap .sixteentosix.otp-screen-wrap .kachelimage {top: 0;left: 0;display: flex;align-items: center;justify-content: center;}
.otp-screen-wrap .otp-white-wrapper {max-width: 445px;padding: 50px;border: 1px solid #B8B8B8;background: rgba(255, 255, 255, 0.9);text-align: center;}
.otp-screen-wrap .otp-white-wrapper .otp-head {margin-bottom: 16px;font-weight: 600;font-size: 22px;line-height: 30px;letter-spacing: 0.08em;text-transform: uppercase;color: #000000;}
.otp-screen-wrap .otp-white-wrapper .inner-form-head {font-weight: 400;font-size: 18px;line-height: 25px;text-align: center;color: #000000;margin-bottom:13px;}
.otp-screen-wrap .otp-white-wrapper .inner-form-info {font-size: 16px;line-height: 22px;text-align: center;color: #000000;}
.otp-screen-wrap .otp-white-wrapper .opt-form-wrap .otp-input {background:#fff;margin: 28px auto;max-width: 170px;border-radius: 0px;}
.otp-screen-wrap .otp-white-wrapper .opt-form-wrap .otp-input.v-text-field--outlined.v-input--dense .v-label {font-size: 18px;line-height: 20px;color: #A8A8A8;text-transform: uppercase;}
.otp-screen-wrap .otp-white-wrapper .opt-form-wrap .savebutton .v-icon {margin-left: 7px;line-height: 14px;font-size: 20px;}
</style>

<script>
export default {
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  }
}
</script>