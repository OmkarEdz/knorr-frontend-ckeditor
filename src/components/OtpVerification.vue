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