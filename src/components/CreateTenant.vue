<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/laptop_lock.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5" v-if="editMode">{{ $t("edit_tenant") }}</div>
        <div class="text-subtitle-2 text-md-h5" v-else>{{ $t("create_tenant") }}</div>
      </div>
    </div>
  </div>
  <div class="pt-8">
    <div class="mx-0 row disablerow align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 innercreatetraining px-md-12 px-8 pr-sm-16">        
        <div class="mx-0 pa-0 text-content">

          <div class="row pt-0">
              <div class="col-md-12 pt-0">
                <span class="headlinecolor text-h6"> {{$t("general")}}</span>
              </div>
              <div class="col-sm-12 col-md-12 pt-0">
                <v-text-field  
                hide-details="auto"
                class="datainput justify-content-end align-self-center pb-1"
                dense
                outlined
                :label="$t('designation') + '*'"
                @keypress.enter="saveTenant()"
                v-model="tenant.name"
                ></v-text-field>
              </div>
              <div class="col-sm-12 col-md-12 pt-0">
                <v-checkbox
                  v-model="tenant.customer"
                  :disabled="!allowedToCreateKBTenants"
                  class="no-margin-top"
                  :label="$t('customer')"
                ></v-checkbox>
              </div>
          </div>

          <div class="row pt-0">
              <div class="col-md-12 pt-0">
                <span class="headlinecolor text-h6"> {{$t("address")}}</span>
              </div>
              <div class="col-sm-10 col-md-10 ">
                  <v-text-field  
                  hide-details="auto"
                  class="datainput justify-content-end align-self-center pb-1"
                  dense
                  outlined
                  :label="$t('street') + '*'"
                  v-model="tenant.street"
                  ></v-text-field>
              </div>
              <div class="col-12 col-sm-2 col-md-2 pl-sm-0 ">
                  <v-text-field  
                  hide-details="auto"
                  class="datainput justify-content-end align-self-center pb-1"
                  dense
                  outlined
                  :label="$t('number') + '*'"
                  v-model="tenant.hnr"
                  ></v-text-field>
              </div>
              <div class="col-sm-4 col-md-3 pr-sm-0 ">
                  <v-text-field  
                  hide-details="auto"
                  class="datainput justify-content-end align-self-center pb-1"
                  dense
                  outlined
                  :label="$t('postal code') + '*'"
                  v-model="tenant.zip"
                  ></v-text-field>
              </div>
              <div class="col-sm-8 col-md-9 ">
                  <v-text-field  
                  hide-details="auto"
                  class="datainput justify-content-end align-self-center pb-1"
                  dense
                  outlined
                  :label="$t('location') + '*'"
                  v-model="tenant.city"
                  ></v-text-field>
              </div>
              <div class="col-sm-12 col-md-12">
                <v-text-field  
                  hide-details="auto"
                  class="datainput justify-content-end align-self-center pb-1"
                  dense
                  outlined
                  :label="$t('debitor')"
                  v-model="tenant.debitor"
                ></v-text-field>
              </div>

              <div class="col-sm-12 col-md-12 ">
                  <v-select  
                  hide-details="auto"
                  :items="countries"
                  class="datainput justify-content-end align-self-center pb-1"
                  dense
                  outlined
                  :label="$t('country') + '*'"
                  v-model="tenant.country"
                  ></v-select>
              </div>

          </div>
          <div class="text-right">
            <v-label>
              * {{ $t("mandatory_fields") }}
            </v-label>
          </div>
        </div>
      </div>

      <!-- Right Area -->
      <div class="col-xl-4 px-0 pl-8 pl-md-12 row pt-0">
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn :to="`/tenants`" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn @click="saveTenant()" outlined depressed tile class="save mr-2 mb-2">{{ $t("save") }}</v-btn>
          <v-btn v-show="editMode" @click="deleteTenant()" outlined depressed tile class="deletebutton mr-2 mb-2"> <v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
        </div>
        <Contact />
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

    props: {
      tenantId: Number,
    },

    data() {
      return {
        editMode: false,
        allowedToCreateKBTenants: false,

        tenant: {
            name: null,
            customer: false,
            hnr: null,
            street: null,
            zip: null,
            city: null,
            country: null,
            debitor: null,
        }
      }
    },

    mounted(){
      if(this.$rights.includes("TENANT_INDEPENDENCE")){
        this.allowedToCreateKBTenants = true;
      }else{
        this.tenant.customer = true;
      }

      this.fetchCountries();
      
      if(this.tenantId != null){
        this.editMode = true;
        this.fetchEditingTenant();
      }
    },
    
    methods: {

      onError(err) {
        if (err.response != null && err.response.data != null) {
          this.$noty.error(err.response.data);
        } else {
          console.error(err);
        }
      },

      lowerCaseMapKeys(map){
        for (var key in map) {
          if (map.hasOwnProperty(key)) {
            if(key == key.toUpperCase()) continue;
            map[key.toUpperCase()] = map[key];
            delete map[key];
          }
        }
      },

      fetchCountries() {
        var _this = this;
        this.$axios
          .get("/api/location/countries")
          .then(function (response) {
            const countriesFromServer = response.data;
            _this.countries = [];
            for (let i = 0; i < countriesFromServer.length; i++) {
              const country = countriesFromServer[i];
              _this.countries.push({
                text: _this.$t(country),
                value: country
              });
            }
            _this.countries.sort((a,b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
            _this.$forceUpdate();
          })
          .catch(this.onError);
      },

      fetchEditingTenant(){
        var _this = this;
        this.$axios
          .get("/api/tenant/" + this.tenantId)
          .then(function (response) {
            _this.tenant = response.data;
          })
          .catch(this.onError);
      },

      saveTenant() {
        var _this = this;
        var tenant = {};
        tenant = Object.assign(tenant, this.tenant);
      
        if(tenant.name == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("designation")}));
          return;
        }

        if(tenant.street == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("street")}));
          return;
        }

        if(tenant.hnr == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("number")}));
          return;
        }

        if(tenant.zip == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("postal code")}));
          return;
        }

        if(tenant.city == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("location")}));
          return;
        }

        if(tenant.country == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("country")}));
          return;
        }

        if(this.editMode){
          // Edit Training
          this.$axios
            .put("/api/tenant/" + this.tenantId, this.tenant)
            .then(function (response) {
              _this.$noty.success(_this.$t("tenant_edited", { name: response.data.name }));
              _this.$router.push("/tenants");
            })
            .catch(this.onError);
        }else{
          // Create new Training
          this.$axios
            .post("/api/tenant", this.tenant)
            .then(function (response) {
              _this.$noty.success(_this.$t("tenant_saved", { name: response.data.name }));
              _this.$router.push("/tenants");
            })
            .catch(this.onError);
        }
      },

      deleteTenant(){
        if(this.tenantId == null){
          console.error("You are not editing an existing tenant.");
          return;
        }

        var _this = this;

        this.$axios
          .delete("/api/tenant/" + this.tenantId)
          .then(function (response) {
            _this.$noty.success(_this.$t("tenant_deleted", { name: _this.tenant.name}));
            _this.$router.push("/tenants");
          })
          .catch(this.onError);
      },

      onFinally(){
        showLoadingCircle(false);
      },

    }
}
</script>