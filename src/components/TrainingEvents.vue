<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/graph_pen.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("trainingevents") }}</div>
      </div>
    </div>
  </div>
  <div>
    <div class="mx-0 row align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 px-8 pr-md-10 pr-lg-0">        
        <div class="px-md-4 mx-0 pa-0">

          <v-simple-table class="trainingEventstable" style="width:100%" hide-default-footer>
            <thead>
              <tr>
                <th @click="sort = 'descriptionText.description', order = !order,page = 1, fetchTrainingEvents()" class="text-uppercase align-bottom">
                  {{$t("training")}} <v-icon v-show="sort == 'descriptionText.description' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'descriptionText.description' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'startDate', order = !order,page = 1, fetchTrainingEvents()" class="text-uppercase align-bottom">
                  {{$t("date")}} <v-icon v-show="sort == 'startDate' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'startDate' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'eventNumber', order = !order,page = 1, fetchTrainingEvents()" class="text-uppercase align-bottom">
                  {{$t("eventNr")}} <v-icon v-show="sort == 'eventNumber' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'eventNumber' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'room.location.id', order = !order,page = 1, fetchTrainingEvents()" class="text-uppercase align-bottom">
                  {{$t("location")}} <v-icon v-show="sort == 'room.location.id' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'room.location.id' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th class="text-uppercase align-bottom">
                  {{$t("customer")}}
                </th>
                <th class="text-uppercase align-bottom">
                  {{$t("free_spaces")}}
                </th>
                <th @click="sort = 'status', order = !order,page = 1, fetchTrainingEvents()" class="text-uppercase align-bottom">
                  {{$t("type")}} <v-icon v-show="sort == 'status' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'status' && !order" >fas fa-chevron-up</v-icon>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trainingEvent in trainingEvents" :key="trainingEvent.id" @click="$router.push('/edit-training-event?trainingEventId=' + trainingEvent.id)">
                <td class="pb-1 text-uppercase align-bottom">{{trainingEvent.training ? trainingEvent.training.designationsMap[$locale] : ""}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{trainingEvent.startDateFormatted}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{trainingEvent.eventNumber}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{trainingEvent.locationFormatted}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{trainingEvent.tenant != null ? trainingEvent.tenant.name : null}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{trainingEvent.freeSpaces}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{ $t(trainingEvent.status)}}</td>
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
        <div class="col-xl-12 right-side-block" v-show="!$external && $rights.includes('CREATE_TRAINING_EVENT')">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
           <v-btn :to="`/create-training-event`" outlined depressed tile class="save mr-2 mb-2">{{ $t("create_trainingEvent") }}</v-btn>
           <v-btn :to="{ path: '/inactive-events', query: { eventStatus: 'cancelled' } }" outlined depressed tile class="savebutton mr-2 mb-2"><v-icon dark left>mdi-minus-circle</v-icon>{{ $t("viewCancelledEvents") }}</v-btn>
           <v-btn :to="{ path: '/inactive-events', query: { eventStatus: 'drafted' } }" outlined depressed tile class="savebutton mr-2 mb-2" ><v-icon>mdi-pencil-outline</v-icon>{{ $t("viewDraftedEvents") }}</v-btn>
           <v-btn :href="`/api/training/event/export`" v-show="!$external && $rights.includes('TENANT_INDEPENDENCE')" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("export_csv") }}</v-btn>
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
            @keypress.enter="fetchTrainingEvents()"
            :label="$t('search')"><template v-slot:append>
                  <v-icon color="#003A60">fas fa-search</v-icon>
                </template></v-text-field>

          <v-autocomplete  
              v-model="trainerFilter"
              hide-details="auto"
              class="justify-content-end searchbar align-self-center pb-1"
              :items="trainers"
              item-text='fullname'
              item-value='id'
              style="padding-right:2px"
              dense
              @change="fetchTrainingEvents()"
              v-show="$rights.includes('CREATE_TRAINING_EVENT') && !this.$user.external"
              outlined
              clearable
              :label="$t('search_trainer')">
              <!-- <template slot="item" slot-scope="data">
                {{data.item.firstname}} {{data.item.lastname}}
              </template>
              <template slot="selection" slot-scope="data">
                {{data.item.firstname}} {{data.item.lastname}};
              </template> -->
              <template v-slot:append>
                    <v-icon color="#003A60">fas fa-user</v-icon>
              </template></v-autocomplete>
          <v-checkbox
            v-model="onlyMyBookingsFilter"
            class="no-margin-top"
            :label="$t('only_my_trainings')"
            @click="fetchTrainingEvents()"
          ></v-checkbox>
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
        trainingEvents: "/api/training/event",
        filter: "/api/training/event/search/"
      },
      search: "",
      convertedTrainingEvents: [],
      trainingEventFilter: null,
      trainerFilter: null,
      onlyMyBookingsFilter: false,
      trainers: [],
      
      rules: [(value) => !!value || this.$t("required")],
      trainingEvents: [],
      roles: [],
      createTrainingEventPopup: false,
      createmode: true,

      // Personal Data
      me: null,

      trainersFetched: false,
    };
  },

  mounted() {
    this.fetchTrainingEvents();
  },

  updated(){
    if(this.$user != null && !this.$user.external && !this.trainersFetched){
      this.fetchTrainers(); 
      this.trainersFetched = true;
    }
  },

  methods: {
    onFinally() {
      showLoadingCircle(false);
    },
    previousPage() {
      this.page = this.page - 1;
      this.fetchTrainingEvents();
    },
    nextPage() {
      this.page = this.page + 1;
      this.fetchTrainingEvents();
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
    fetchTrainingEvents() {
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get(this.routes.trainingEvents, {
          params: {
            search: _this.search,
            trainer: _this.trainerFilter,
            onlyMyBookings: _this.onlyMyBookingsFilter,
            sort: _this.sort,
            order: _this.order ? "ASC":"DESC",
            page: _this.page -1,
            size: _this.ElementPerPage
          }
        })
        .then(function (response) {
          _this.trainingEvents = response.data.content;
          _this.totalPages = response.data.totalPages;
          // for (let i = 0; i < _this.trainingEvents.length; i++) {
          //   const trainingEvent = _this.trainingEvents[i];
          //   if(typeof trainingEvent.trainer != 'object'){
          //     for (let p = 0; p < _this.trainingEvents.length; p++) {
          //       const search = _this.trainingEvents[p];
          //       if(typeof search.trainer == 'object' && search.trainer.id == trainingEvent.trainer){
          //         Object.assign(trainingEvent.trainer, search.trainer);
          //         break;
          //       }
          //     }
          //   }
          // }
          _this.$forceUpdate();
        })
        .catch(this.onError).finally(this.onFinally);
    },

    fetchTrainers() {
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/user/trainer")
        .then(function (response) {
          for (let i = 0; i < response.data.content.length; i++) {
            const element = response.data.content[i];
            if(Number.isInteger(element)){
              _this.fetchSingleTrainerAndPush(element);
            }else{
              _this.trainers.push(element);
            }
          }
        })
        .catch(this.onError).finally(this.onFinally);
    },

    fetchSingleTrainerAndPush(trainerId){
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/user/" + trainerId)
        .then(function (response) {
          const element = response.data;
          _this.trainers.push(element);
        })
        .catch(this.onError).finally(this.onFinally);
    },
    
    updatePage() {
      this.fetchTrainingEvents();
    },
  },
};
</script>
