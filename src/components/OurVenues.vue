<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("locations") }}</div>
      </div>
    </div>
  </div>
  <div>
    <div class="mx-0 row align-items-start cp_wrapper">
      <!-- Left Area -->
      <div class="col-xl-8 px-0">        
        <div class="mx-0 pa-0 text-content">
          <v-expansion-panels v-model="open" multiple> 
            <v-expansion-panel v-show="sortedVenues[tenant.id].length != 0 " v-for="(tenant,i) in tenants" :key="i">
              <v-expansion-panel-header class="pl-8 py-1 pl-md-12 ">
                <h6 class="text-md-h6 mb-0">
                 {{ tenant.name }}
                </h6>
                <template v-slot:actions>
                    <div><img v-bind:class="open == i ? 'panelarrow_up':'panelarrow_down'" class=" ml-2 clickable" src="../assets/img/arrow_right.svg" height="18px"></div>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-bind:class="sortedVenues[tenant.id].length > 2 ? 'justify-content-between':''" class="row px-4">
                  <div @click="$router.push('/venue?venueId=' + venue.id)" v-bind:class="sortedVenues[tenant.id].length <= 2 ? 'mr-2':''" class="col-md-4 row justify-content-center" v-for="venue in sortedVenues[tenant.id]" :key="venue.id">
                    <div class="block-tile col-md-12 clickable sixteentonine" >
                        <div class="kachelimage block-background-image" :style="{'background-image': 'url(\'/files/images/' + venue.image + '\')'}"></div>
                        <div class="py-1 pr-2 pl-2 pl-md-6 bottom-row bg-blue">{{venue.designation}}</div>
                    </div>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
      selectedTenantPanel: null,
      open: [],
    };
  },

  mounted() {
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
    fetchVenues() {
      var _this = this;
      this.$axios
        .get("/api/location")
        .then(function (response) {
          _this.venues = response.data.content;
          for (let i = 0; i < _this.venues.length; i++) {
            const venue = _this.venues[i];
            
            if(venue.tenant == null) continue;
            
            // Check if already Added to list of Tenants
            var alreadyAdded = false;
            for (let p = 0; p < _this.tenants.length; p++) {
              const tenant = _this.tenants[p];
              if(tenant.id == venue.tenant.id){
                alreadyAdded = true;
                break;
              }
            }
            
            if(!alreadyAdded) _this.tenants.push(venue.tenant);
            _this.open[i]=i;
          }
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
        const tenants = this.tenants;


        for(var i = 0; i < tenants.length; i++){
            const tenant = tenants[i];
            sortedVenues[tenants[i].id] = [];
        }
        for(var j = 0; j < venues.length; j++){
            for(var i = 0; i < tenants.length; i++){
                const tenant = tenants[i];
                if(venues[j].tenant == null) continue;
                if(tenant.id == venues[j].tenant.id){
                    sortedVenues[tenants[i].id].push(venues[j]);

                }
            }

        }
        this.sortedVenues = sortedVenues;
    }


  },
};
</script>
