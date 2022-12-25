<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" :style="{'background-image': 'url(\'/files/images/' + venue.image + '\')'}">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ venue.designation }}</div>
      </div>
    </div>
  </div>
  <div>
    <div class="mx-0 row align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 px-8 pr-sm-16" >        
        <div class="px-md-4 mx-0 pa-0 text-content">
          <h3>{{ $t("description") }}</h3>
          <p v-html="venue.onlineDescriptionsMap[$locale]"></p>
          <div class="mt-10"></div>


          </div>

        <div class="mt-14 px-md-4 mx-0 pa-0 text-content" >
          <h3>{{ $t("directions") }}</h3>
          <p v-html="venue.descriptionsMap[$locale]"></p>
          <div class="mt-10"></div>
        </div>
      </div>
      <!-- Right Area -->
      <div class=" pl-md-12 pl-xl-8 row">
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn @click="$routerBack()" outlined depressed tile class="cancelbutton mr-2 mb-2">{{ $t("back") }}</v-btn>
        </div>
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
  
  props: {
    venueId: Number,
  },

  data() {
    return {
      venue: null,
    };
  },


  computed: {
    
  },

  mounted() {
    this.fetchSelectedVenue();
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
    fetchSelectedVenue() {
      var _this = this;
      
      this.$axios
        .get("/api/location/" + this.venueId)
        .then(function (response) {
          _this.venue = response.data;
        })
        .catch(this.onError);
    },
  },
};
</script>
