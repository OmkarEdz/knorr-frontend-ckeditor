<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("contactpersons") }}</div>
      </div>
    </div>
  </div>
  <div>
    <div class="mx-0 row align-items-start cp_wrapper cp_wrapper_new">
      <!-- Left Area -->
      <div class="col-xl-8 px-0">        
        <div class="mx-0 pa-0 text-content">
          <v-expansion-panels v-model="open" multiple>
            <v-expansion-panel v-for="(tenant,i) in tenants" :key="i">
              <v-expansion-panel-header class="py-1 pl-8 pl-md-12">
                <h6 class="text-md-h6 mb-0">
                  {{ tenant.name }}
                </h6>
                <template v-slot:actions>
                    <div><img v-bind:class="open == i ? 'panelarrow_up':'panelarrow_down'" class=" ml-2 clickable" src="../assets/img/arrow_right.svg" height="18px"></div>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="row px-4">
                  <div class="col-xl-12 pb-0 pl-0 pl-md-6 pl-2" v-show="tenant.contactPersons.headOffice.length > 0"><h4>{{ $t("head_office") }}</h4></div>
                  <div class="trainer-block mr-2 col-md-4 row justify-content-center" v-for="contactPerson in tenant.contactPersons.headOffice" :key="contactPerson.id">
                    <div class="block-tile col-md-12 sixteentonine">
                      <div class="block-tile kachelimage block-background-image" :style="{'background-image': 'url(\'/files/images/' + contactPerson.trainerImage + '\')'}"></div>
                      <div class="py-1 pr-2 pl-2 pl-md-6 bottom-row bg-blue">{{ contactPerson.fullname }}</div>
                      <div v-if="contactPerson.designation" class="py-1 pr-2 pl-2 pl-md-6  bg-blue">{{ contactPerson.designation }}</div>
                      <div v-if="contactPerson.company" class="py-1 pr-2 pl-2 pl-md-6 ">{{ contactPerson.company }}</div>
                      <div v-if="tenant.addressFormattedSingleLineWithCountry" class="py-1 pr-2 pl-2 pl-md-6 ">{{ tenant.addressFormattedSingleLineWithCountry }}</div>  
                      <div v-if="contactPerson.personnelnumber" class="py-1 pr-2 pl-2 pl-md-6 ">Tel:{{ contactPerson.personnelnumber }}</div>    
                      <div  v-if="contactPerson.email" class="pr-2 pl-2 pl-md-6 ">Tel: {{ contactPerson.email }}</div>               
                    </div>
                  </div>
                  <div class="col-xl-12 pb-0 pl-0 pl-md-6 pl-2" v-show="tenant.contactPersons.trainers.length > 0"><h4>{{ $t("trainers") }}</h4></div>
                  <div class="trainer-block mr-2 col-md-4 row justify-content-center" v-for="contactPerson in tenant.contactPersons.trainers" :key="contactPerson.id">
                    <div class="block-tile col-md-12 sixteentonine">
                      <div class="kachelimage block-background-image" :style="{'background-image': 'url(\'/files/images/' + contactPerson.trainerImage + '\')'}"></div>
                      <div class="pr-2 pl-2 pl-md-6 bg-blue">{{ contactPerson.fullname }}</div>
                      <div v-if="contactPerson.designation" class="pr-2 pl-2 pl-md-6 bg-blue">{{ contactPerson.designation }}</div>
                      <div v-if="contactPerson.company" class="py-1 pr-2 pl-2 pl-md-6 ">{{ contactPerson.company }}</div>
                      <div v-if="tenant.addressFormattedSingleLineWithCountry" class="py-1 pr-2 pl-2 pl-md-6 ">{{ tenant.addressFormattedSingleLineWithCountry }}</div>  
                      <div  v-if="contactPerson.personnelnumber" class="pr-2 pl-2 pl-md-6 ">Tel: {{ contactPerson.personnelnumber }}</div>
                      <div  v-if="contactPerson.email" class="pr-2 pl-2 pl-md-6 ">Tel: {{ contactPerson.email }}</div>
                    </div>
                  </div>
                  <div class="col-xl-12 pb-0 pl-0 pl-md-6 pl-2" v-show="tenant.contactPersons.others.length > 0"><h4>{{ $t("contactpersons") }}</h4></div>
                  <div class="trainer-block mr-2 col-md-4 row justify-content-center" v-for="contactPerson in tenant.contactPersons.others" :key="contactPerson.id">
                    <div class="block-tile col-md-12 sixteentonine">
                      <div class="kachelimage block-background-image" :style="{'background-image': 'url(\'/files/images/' + contactPerson.trainerImage + '\')'}"></div>
                      <div class="py-1 pr-2 pl-2 pl-md-6  bg-blue">{{ contactPerson.fullname }}</div>
                      <div v-if="contactPerson.designation" class="py-1 pr-2 pl-2 pl-md-6  bg-blue">{{ contactPerson.designation }}</div>
                      <div v-if="contactPerson.company" class="py-1 pr-2 pl-2 pl-md-6 ">{{ contactPerson.company }}</div>
                      <div v-if="tenant.addressFormattedSingleLineWithCountry" class="py-1 pr-2 pl-2 pl-md-6 ">{{ tenant.addressFormattedSingleLineWithCountry }}</div> 
                      <div v-if="contactPerson.personnelnumber" class="py-1 pr-2 pl-2 pl-md-6  ">Tel:{{ contactPerson.personnelnumber }}</div> 
                      <div  v-if="contactPerson.email" class="pr-2 pl-2 pl-md-6 ">Tel: {{ contactPerson.email }}</div>
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
      contactPersons: [],
      selectedTenantPanel: null,
      open: [],

    };
  },

  mounted() {
    this.fetchTenants();
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

    fetchTenants() {
      var _this = this;

      this.$axios
        .get("/api/tenant/public")
        .then(function (response) {
          _this.tenants = response.data.content;
          // _this.selectedTenantPanel = _this.tenants[0].id;
          for (let i = 0; i < _this.tenants.length; i++) {
            const element = _this.tenants[i];          
            _this.fetchContactPersons(i);
            _this.open[i]=i;
          }
        })
        .catch(this.onError);
    },

    fetchContactPersons(tenantIndex) {
      var _this = this;

      const tenantId = this.tenants[tenantIndex].id;

      var trainers = [];
      var headOffice = [];
      var others = [];
      
      this.$axios
        .get("/api/user/public/" + tenantId)
        .then(function (response) {
          var contactPersons = response.data.content;

          for (let i = 0; i < contactPersons.length; i++) {
            const contactPerson = contactPersons[i];
            if(contactPerson.headOffice){
              headOffice.push(contactPerson);
            }else if(contactPerson.trainer){
              trainers.push(contactPerson);
            }else{
              others.push(contactPerson);
            }
          }
          _this.tenants[tenantIndex].contactPersons = {
            headOffice: headOffice,
            trainers: trainers,
            others: others,
          }
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
  },
};
</script>
