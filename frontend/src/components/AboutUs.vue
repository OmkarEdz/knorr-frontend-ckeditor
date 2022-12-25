<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/meeting_old.jpg'); background-position: top !important">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("aboutus") }}</div>
      </div>
    </div>
  </div>
  <div>
    <div class="mx-0 row align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 px-8 pr-sm-16">        
        <div class="px-md-4 mx-0 pa-0 text-content aboutus">
          <h3>{{ $t("aboutus_headline") }}</h3>
          <div class="row">
            <div class="col-md-4">
              <div class="aboutus-image" style="background-image: url('/static/img/brakes.jpg')"></div>
              <h4>{{ $t("aboutus_knowhow_headline") }}</h4>
              <ul style="list-style: square">
                <li>{{ $t("aboutus_knowhow_line1") }}</li>
                <li>{{ $t("aboutus_knowhow_line2") }}</li>
                <li>{{ $t("aboutus_knowhow_line3") }}</li>
              </ul>
            </div>
            <div class="col-md-4">
              <div class="aboutus-image" style="background-image: url('/static/img/worldmap.jpg')"></div>
              <h4>{{ $t("aboutus_partnership_headline") }}</h4>
              <ul style="list-style: square">
                <li>{{ $t("aboutus_partnership_line1") }}</li>
                <li>{{ $t("aboutus_partnership_line2") }}</li>
              </ul>
            </div>
            <div class="col-md-4">
              <div class="aboutus-image" style="background-image: url('/static/img/show_drill.jpg')"></div>
              <h4>{{ $t("aboutus_security_headline") }}</h4>
              <ul style="list-style: square">
                <li>{{ $t("aboutus_security_line1") }}</li>
                <li>{{ $t("aboutus_security_line2") }}</li>
              </ul>
            </div>
          </div>
          <br>
          <div class="aboutus-image-big" style="background-image: url('/static/img/lesson.jpg')"></div>
          <h4>{{ $t("aboutus_quality_headline") }}</h4>
          <ul style="list-style: square">
            <li>{{ $t("aboutus_quality_line1") }}</li>
            <li>{{ $t("aboutus_quality_line2") }}</li>
            <li>{{ $t("aboutus_quality_line3") }}</li>
            <li>{{ $t("aboutus_quality_line4") }}</li>
            <li>{{ $t("aboutus_quality_line5") }}</li>
            <li>{{ $t("aboutus_quality_line6") }}</li>
            <li>{{ $t("aboutus_quality_line7") }}</li>
            <li>{{ $t("aboutus_quality_line8") }}</li>
            <li>{{ $t("aboutus_quality_line9") }}</li>
            <li>{{ $t("aboutus_quality_line10") }}</li>
            <li>{{ $t("aboutus_quality_line11") }}</li>
          </ul>
        </div>
      </div>
      <!-- Right Area -->
      <div class="col-xl-4 pl-8 pl-md-12 pl-xl-8 row">
        <Contact />
      </div>
    </div>
  </div>
</div>
</template>

<script>

import pagination from './custom/pagination.vue'

export default {

  components: {
    pagination
  },

  data() {
    return {
      tenants: [],
      venues:[],
      sortedVenues:[],
      contactPersons: [],
      countries: [],
      selectedTenantPanel: null,
    };
  },

  mounted() {
    this.fetchCountries();
    this.fetchVenues();
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
    fetchCountries() {
      var _this = this;
      this.$axios
        .get("/api/location/countries")
        .then(function (response) {
          _this.countries = response.data;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
    fetchVenues() {
      var _this = this;
      this.$axios
        .get("/api/location")
        .then(function (response) {
          _this.venues = response.data.content;
          _this.sortVenues();
          
          _this.totalPages = response.data.totalPages;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
    sortVenues(){
        var _this = this;
        const sortedVenues = [];
        const venues = this.venues;
        const countries = this.countries;


        for(var i = 0; i < countries.length; i++){
            const country = countries[i];
            sortedVenues[countries[i]] = [];
        }
        for(var j = 0; j < venues.length; j++){
            for(var i = 0; i < countries.length; i++){
                const country = countries[i];
                if(country == venues[j].country){
                    sortedVenues[countries[i]].push(venues[j]);

                }
            }

        }
        this.sortedVenues = sortedVenues;
    }


  },
};
</script>
