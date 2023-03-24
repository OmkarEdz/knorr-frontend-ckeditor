<template>
  <div class="col-xl-12 right-side-block">
        <h4 class="text-uppercase">{{ $t("contact") }}</h4>
        <div class="right-side divider"></div>
        <div class="mt-6"></div>
        <span class="font-blue font-bigger font-weight-bold">RailServices</span><br>
        <span class="font-blue">Knorr- Bremse Rail Vehicle Systems GmbH Training Academy</span><br>
        <span class="font-blue">+49 (0) 30 9392-2223</span><br><br>
        <span >{{ $t("contact_available") }} 07:00 – 17:00 {{ $t("oclock") }}.</span>
        <p class="text-dark">Georg Knorr Strasse 4<br>
        D-12681 Berlin<br><br>
        <a class="wordbreak font-grey" href="mailto:trainingsakademie.railservices.germany@knorr-bremse.com">trainingsakademie.railservices.germany@knorr-bremse.com</a><br>
        <a class="font-grey" href="https://rail.knorr-bremse.com/de/de/" target="_blank">rail.knorr-bremse.com</a><br>
        <a class="font-grey" href="/contact">{{ $t("to_contact_form") }}</a></p>
        <span v-if="showBuildNumber && build_number != null" class="font-grey">{{ build_number }}</span>
  </div>
</template>

<script>
export default {

  props: {
    showBuildNumber: {
      type: Boolean,
      default: function(){
        return false;
      }
    },
  },

  data() {
    return {
      build_number: null,
    }
  },

  mounted(){
    if(this.showBuildNumber){
      this.fetchBuildNumber();
    }
  },

  methods: {
    fetchBuildNumber() {
      var _this = this;
      this.$axios
        .get("/api/app")
        .then(function (response) {
          _this.build_number = response.data;
        })
        .catch(this.onError);
    },
  }

}
</script>

<style>

</style>