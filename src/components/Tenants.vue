<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/laptop_lock.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("tenants") }}</div>
      </div>
    </div>
  </div>
  <div>
    <div class="mx-0 row align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 px-8 pr-md-10 pr-lg-0">        
        <div class="px-md-4 mx-0 pa-0">

          <v-simple-table class="tenantstable" style="width:100%" hide-default-footer>
            <thead>
              <tr>
                <th @click="sort = 'name', order = !order,page = 1, fetchTenants()" class="text-uppercase align-bottom">
                  {{$t("name")}} <v-icon v-show="sort == 'name' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'name' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'street', order = !order,page = 1, fetchTenants()" class="text-uppercase align-bottom">
                  {{$t("address")}} <v-icon v-show="sort == 'street' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'street' && !order" >fas fa-chevron-up</v-icon>
                </th>
              </tr>
            </thead>
            <draggable tag="tbody" :component-data="{ tag: 'tbody', name: 'flip-list', type: 'transition' }" animation="300" :list="tenants" v-bind="dragOptions" @end="checkMove" id="tableId" >
              <tr v-for="tenant in tenants" :key="tenant.id" @click="tableRowClicked(tenant.id)" v-bind:id="tenant.id">
                <td class="pb-1 text-uppercase align-bottom">{{tenant.name}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{tenant.addressFormattedSingleLineWithCountry}}</td>
              </tr>
            </draggable>
          </v-simple-table>
          <pagination
              class="my-2"
              :current-page="page"
              :total-pages="totalPages"
              :show-previous-page="previousPage"
              :show-next-page="nextPage"
          ></pagination>
        </div>
      </div>

      <!-- Right Area -->
      <div class="col-xl-4 pl-8 pl-md-12 pl-xl-8 row">
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn v-show="$rights.includes('EDIT_CUSTOMERS') || $rights.includes('TENANT_INDEPENDENCE')" :to="`/create-tenant`" outlined depressed tile class="savebutton mb-2 mr-2">{{ $t("create_tenant") }}</v-btn>
          <v-btn :href="`/api/tenant/export`" v-show="$rights.includes('TENANT_INDEPENDENCE')" outlined depressed tile class="savebutton mb-2 mr-2">{{ $t("export_csv") }}</v-btn>
        </div>
        <div class="col-xl-12 right-side-block">
          <h3 class="text-uppercase">{{ $t("search") }}</h3>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-text-field  
            hide-details="auto"
            class="justify-content-end searchbar align-self-center pb-1"
            style="padding-right:2px"
            dense
            outlined
            v-model="search"
            @keypress.enter="fetchTenants()"
            :label="$t('search')"><template v-slot:append>
                  <v-icon color="#003A60">fas fa-search</v-icon>
                </template></v-text-field>
        </div>
        <Contact :showBuildNumber="$user != null && $user.allRights.includes('TENANT_INDEPENDENCE')" />
      </div>
    </div>
  </div>
</div>
</template>

<script>

import pagination from './custom/pagination.vue'
import draggable from "vuedraggable";
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];

export default {
  name: "transition-example",
  display: "Transition",
  order: 6,
  components: {
    draggable,
    pagination
  },

  data() {
    return {
      page: 1,
      totalPages: 1,
      ElementPerPage: 50,
      sort: null,
      order: true,
      routes: {
        tenants: "/api/tenant",
        filter: "/api/tenants/search/"
      },
      search: "",
      convertedTenants: [],
      tenantFilter: null,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      rules: [(value) => !!value || this.$t("required")],
      tenants: [],
      roles: [],
      createTenantPopup: false,
      menu: false,
      createmode: true,

      // Personal Data
      me: null,
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  mounted() {
    this.fetchTenants();
  },

  methods: {
    getableData(){
      this.tableBody = document.getElementById("tableId");
      this.tbodyRowCount = this.tableBody.rows;
      for(let i = 0; i < this.tbodyRowCount.length; i++) {
        this.tbodyRowCount[i].setAttribute("data-id", i + 1);
      }
    },
    checkMove: function(e) {
      this.onChangeRole();
    },
    onChangeRole(){
      this.isDraggable = true;
      setTimeout(function() {
        this.tableBody = document.getElementById("tableId");
        this.tbodyRowCount = this.tableBody.rows;
        for(let i = 0; i < this.tbodyRowCount.length; i++) {
          this.tbodyRowCount[i].setAttribute("data-id", i + 1);
          const updatedValues = this.tbodyRowCount[i].getAttribute("data-id");
          const updatedId = this.tbodyRowCount[i].getAttribute("id");
          console.log(updatedValues, updatedId);
        }
      }, 500);
    },
    previousPage() {
      this.page = this.page - 1;
      this.fetchTenants();
    },
    nextPage() {
      this.page = this.page + 1;
      this.fetchTenants();
    },
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
        .get(this.routes.tenants, {
          params: {
            search: _this.search,
            sort: _this.sort,
            order: _this.order ? "ASC":"DESC",
            page: _this.page -1,
            size: _this.ElementPerPage
          }
        })
        .then(function (response) {
          _this.tenants = response.data.content;
          _this.totalPages = response.data.totalPages;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
    updatePage() {
      this.fetchTenants();
    },
    updateVisibleTenants() {
      var _this = this;
      this.tenants = this.tenants.slice(
        (_this.page = _this.ElementPerPage),
        (_this.page = _this.ElementPerPage) + _this.ElementPerPage
      );

      if (this.tenants.length == 0 && this.page > 0) {
        this.updatePage(this.page - 1);
      }
    },

    tableRowClicked(tenantId){
      if(this.$rights.includes('EDIT_CUSTOMERS') || this.$rights.includes('TENANT_INDEPENDENCE')){
        this.$router.push('/edit-tenant?tenantId=' + tenantId)
      }
    },

    createTenant() {
      var _this = this;

      var saveTenant = {};
      Object.assign(saveTenant, this.editedTenant);

      saveTenant.tenantId = saveTenant.customer != null ? saveTenant.customer.id : -1;
      saveTenant.tenantname = saveTenant.mail;

      this.$axios
        .post(this.routes.tenants, saveTenant)
        .then(function (response) {
          _this.$noty.success(_this.$t("tenant_created"));
          var tenant = response.data;
          if (_this.editedTenant.role != null && _this.editedTenant.role.id != null) {
            _this.addRoleToTenant(tenant.id, _this.editedTenant.role.id);
          }
          _this.addRightsToTenant(tenant.id, _this.editedTenant.rights);
          _this.resetEditedTenant();
          _this.createTenantPopup = false;
          _this.page = 1;
          _this.fetchTenants();
        })
        .catch(this.onError);
    },
    editTenant() {
      var _this = this;

      var saveTenant = {};
      Object.assign(saveTenant, this.editedTenant);

      saveTenant.tenantId = saveTenant.customer != null ? saveTenant.customer.id : -1;
      saveTenant.tenantname = saveTenant.mail;

      this.$axios
        .put(this.routes.tenants, saveTenant)
        .then(function (response) {
          var tenant = response.data;
          _this.$noty.success(_this.$t("tenant_updated"));
          if (_this.editedTenant.role != null && _this.editedTenant.role != null) {
            _this.addRoleToTenant(tenant.id, _this.editedTenant.role.id);
          }
          _this.addRightsToTenant(tenant.id, _this.editedTenant.rights);
          _this.resetEditedTenant();
          _this.createTenantPopup = false;
          _this.fetchTenants();
        })
        .catch(this.onError);
    },
    deleteTenant(tenantid) {
      var _this = this;
      this.$axios
        .delete("api/tenants/" + tenantid)
        .then(function (response) {
          _this.$noty.success(_this.$t("tenant_deleted"));
          _this.fetchTenants();
        })
        .catch(this.onError);
    },
    getJsonOptions() {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return options;
    },
  },

  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
};
</script>

<style scoped>
.v-dialog > .v-card > .v-card__actions {
  padding: 8px 16px;
}
</style>

