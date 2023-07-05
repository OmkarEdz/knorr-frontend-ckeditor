<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/trainingrequest.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("training_requests") }}</div>
      </div>
    </div>
  </div>
  <div>
    <div class="mx-0 row align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 px-8 pr-md-10 pr-lg-0">        
        <div class="px-md-4 mx-0 pa-0">

          <v-simple-table class="userstable" style="width:100%" hide-default-footer>
            <thead>
              <tr>
                <th @click="sort = 'id', order = !order,page = 1, fetchTrainingRequests()" class="text-uppercase align-bottom">
                  {{$t("number")}} <v-icon v-show="sort == 'id' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'id' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'name', order = !order,page = 1, fetchTrainingRequests()" class="text-uppercase align-bottom">
                  {{$t("name")}} <v-icon v-show="sort == 'name' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'name' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'training.id', order = !order,page = 1, fetchTrainingRequests()" class="text-uppercase align-bottom">
                  {{$t("training")}} <v-icon v-show="sort == 'training.id' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'training.id' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'createdAt', order = !order,page = 1, fetchTrainingRequests()" class="text-uppercase align-bottom">
                  {{$t("last_edit")}} <v-icon v-show="sort == 'createdAt' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'createdAt' && !order" >fas fa-chevron-up</v-icon>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trainingRequest in trainingRequests" :key="trainingRequest.id" @click="tableRowClicked(trainingRequest.id)">
                <td class="pb-1 text-uppercase align-bottom">R{{trainingRequest.id}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{trainingRequest.fullCustomerName}}</td>
                <td class="pb-1 text-uppercase align-bottom"><span v-if="trainingRequest.training != null">{{trainingRequest.training.designationsMap[$locale]}}</span></td>
                <td class="pb-1 text-uppercase align-bottom">{{$formatDateTime(trainingRequest.lastEdited)}}</td>
              </tr>
            </tbody>
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
          <v-btn v-show="$rights.includes('EDIT_TRAINING_REQUESTS')" :to="`/request`" outlined depressed tile class="savebutton mr-2">{{ $t("create_training_request") }}</v-btn>
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
            @keypress.enter="fetchTrainingRequests()"
            :label="$t('search')"><template v-slot:append>
                  <v-icon color="#003A60">fas fa-search</v-icon>
                </template></v-text-field>
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

  data() {
    return {
      page: 1,
      totalPages: 1,
      ElementPerPage: 50,
      sort: null,
      order: true,
      routes: {
        trainingRequests: "/api/training/request"
      },
      search: "",
      convertedTrainingRequests: [],
      trainingRequestFilter: null,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      rules: [(value) => !!value || this.$t("required")],
      trainingRequests: [],
      roles: [],
      createTrainingRequestPopup: false,
      menu: false,
      createmode: true,

      // Personal Data
      me: null,
    };
  },

  watch: {
    
  },

  mounted() {
    this.fetchTrainingRequests();
  },

  methods: {
    previousPage() {
      this.page = this.page - 1;
      this.fetchTrainingRequests();
    },
    nextPage() {
      this.page = this.page + 1;
      this.fetchTrainingRequests();
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
    fetchTrainingRequests() {
      var _this = this;
      this.$axios
        .get(this.routes.trainingRequests, {
          params: {
            search: _this.search,
            sort: _this.sort,
            order: _this.order ? "ASC":"DESC",
            page: _this.page -1,
            size: _this.ElementPerPage
          }
        })
        .then(function (response) {
          _this.trainingRequests = response.data.content;
          _this.totalPages = response.data.totalPages;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },

    tableRowClicked(trainingRequestId){
      if(this.$rights.includes('EDIT_CUSTOMERS') || this.$rights.includes('TENANT_INDEPENDENCE')){
        this.$router.push('/request?trainingRequestId=' + trainingRequestId)
      }
    },

    createTrainingRequest() {
      var _this = this;

      var saveTrainingRequest = {};
      Object.assign(saveTrainingRequest, this.editedTrainingRequest);

      saveTrainingRequest.trainingRequestId = saveTrainingRequest.customer != null ? saveTrainingRequest.customer.id : -1;
      saveTrainingRequest.trainingRequestname = saveTrainingRequest.mail;

      this.$axios
        .post(this.routes.trainingRequests, saveTrainingRequest)
        .then(function (response) {
          _this.$noty.success(_this.$t("trainingRequest_created"));
          var trainingRequest = response.data;
          if (_this.editedTrainingRequest.role != null && _this.editedTrainingRequest.role.id != null) {
            _this.addRoleToTrainingRequest(trainingRequest.id, _this.editedTrainingRequest.role.id);
          }
          _this.addRightsToTrainingRequest(trainingRequest.id, _this.editedTrainingRequest.rights);
          _this.resetEditedTrainingRequest();
          _this.createTrainingRequestPopup = false;
          _this.page = 1;
          _this.fetchTrainingRequests();
        })
        .catch(this.onError);
    },
    editTrainingRequest() {
      var _this = this;

      var saveTrainingRequest = {};
      Object.assign(saveTrainingRequest, this.editedTrainingRequest);

      saveTrainingRequest.trainingRequestId = saveTrainingRequest.customer != null ? saveTrainingRequest.customer.id : -1;
      saveTrainingRequest.trainingRequestname = saveTrainingRequest.mail;

      this.$axios
        .put(this.routes.trainingRequests, saveTrainingRequest)
        .then(function (response) {
          var trainingRequest = response.data;
          _this.$noty.success(_this.$t("trainingRequest_updated"));
          if (_this.editedTrainingRequest.role != null && _this.editedTrainingRequest.role != null) {
            _this.addRoleToTrainingRequest(trainingRequest.id, _this.editedTrainingRequest.role.id);
          }
          _this.addRightsToTrainingRequest(trainingRequest.id, _this.editedTrainingRequest.rights);
          _this.resetEditedTrainingRequest();
          _this.createTrainingRequestPopup = false;
          _this.fetchTrainingRequests();
        })
        .catch(this.onError);
    },
    deleteTrainingRequest(trainingRequestid) {
      var _this = this;
      this.$axios
        .delete("api/trainingRequests/" + trainingRequestid)
        .then(function (response) {
          _this.$noty.success(_this.$t("trainingRequest_deleted"));
          _this.fetchTrainingRequests();
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
};
</script>

<style scoped>
.v-dialog > .v-card > .v-card__actions {
  padding: 8px 16px;
}
</style>

