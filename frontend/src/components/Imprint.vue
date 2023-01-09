<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("imprint") }}</div>
      </div>
    </div>
  </div>
  <div>
    <div class="mx-0 row align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 px-8 pr-sm-16">        
        <div class="px-md-4 mx-0 pa-0 text-content">
            <span>Knorr-Bremse Systeme für Schienenfahrzeuge GmbH</span><br>
            <span>Georg-Knorr Straße 4</span><br>
            <span>12681 Berlin</span><br>
            <span>Deutschland (Germany)</span><br>
            <br>
            <span>{{ $t("imprint_tel") }}: +49 89 3547-0</span><br>
            <span>{{ $t("imprint_fax") }}: +49 89 3547-2767</span><br>
            <span>{{ $t("imprint_email") }}: <a class="font-grey" href="mailto:info@knorr-bremse.com">info@knorr-bremse.com</a></span><br>
            <br>
            <span>{{ $t("imprint_managing_directors") }}: Dr. Nicolas Lange, Mario Beinert, Dr. Peter Radina, Harald Schneider</span><br>
            <br>
            <span>{{ $t("imprint_chairman") }}: Dr. Jürgen Wilder</span><br>
            <span>{{ $t("imprint_district_court_munich") }}</span><br>
            <span>{{ $t("imprint_trade_register") }}: HRB 91181</span><br>
            <span>{{ $t("imprint_location") }}</span><br>
            <span>{{ $t("imprint_vat") }}: DE129395680</span><br>
        </div>
      </div>
      <!-- Right Area -->
      <!-- <div class="col-xl-4 pl-8 row">
        <div class="col-xl-12 right-side-block">
          
      </div> -->
    </div>
  </div>
</div>
</template>

<script>


export default {


  data() {
    return {

    };
  },

  watch: {
    
  },

  computed: {
    
  },

  mounted() {
  },

  methods: {
    onError(err) {
      if (
        err.response != null &&
        err.response.data != null &&
        err.response.data.message != null
      ) {
        this.$noty.error(err.response.data.message);
      } else {
        console.error(err);
      }
    },


    getShareMailText(){
      return this.$t('share_mail_content', {link: window.location.href});
    }
  },
};
</script>
