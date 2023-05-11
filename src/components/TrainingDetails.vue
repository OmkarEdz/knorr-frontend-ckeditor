<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div v-if="training != null" class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ training.category.designationMap[$locale] }} <img class="ml-2" src="../assets/img/arrow_right.svg" height="18px"><img class="mr-2" src="../assets/img/arrow_right.svg" height="18px"> {{ training.designationsMap[$locale] }}</div></div>
    </div>
    <div v-else>
      <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
        <div class="headline">
          <div class="text-subtitle-2 text-md-h5">{{ $t("training") }}</div>
        </div>
      </div>
    </div>

  </div>
  <div>
    <div class="row align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 px-0" v-if="training != null">        
        <div class="pl-12 pl-md-16 mx-0 pa-0 text-content">
          <h4>{{ $t("training_goals") }}</h4>
          <p v-html="training.goalsMap[$locale]"></p>
          <div class="mt-10"></div>

          <h4>{{ $t("targetgroup") }}</h4>
          <p v-html="training.targetGroupsMap[$locale]"></p>
          <div class="mt-10"></div>

          <h4>{{ $t("training_content") }}</h4>
          <p v-html="training.descriptionsMap[$locale]"></p>
          <div class="mt-10"></div>

          <h4>{{ $t("prerequesites") }}</h4>
          <p v-html="training.prerequesitesMap[$locale]"></p>
          <div class="mt-10"></div>

          <h4>{{ $t("further_information") }}</h4>
          <p><b>{{ $t("location") }}:</b> {{ training.possibleLocations }}</p>
          <p><b>{{ $t("training_method") }}:</b> {{ $t(training.type) }}</p>
          <p><b>{{ $t("training_duration") }}:</b> {{ $t(training.durationInDays) }} {{ $t("days") }}</p>
          <p><b>{{ $t("price") }}:</b>&nbsp;<span v-show="training.priceFormatted == null">{{ $t("by_request") }}</span><span v-show="training.priceFormatted != null">{{ training.priceFormatted }}€</span></p>
        </div>

        <div class="mt-14 mx-0 pa-0 text-content" v-if="training.showUpcomingSchedules">
          <h4 class="pl-12 pl-md-16">{{ $t("upcoming_events") }}</h4>
          <div class="row pl-4">
            <div class="event-tile px-0 py-4 mr-2 col-xl-4 pb-10" v-for="event in events" :key="event.id" @click="eventClicked(event)">
              <div class="event-background-image"></div>
              <h4 class="pl-12 pl-md-16 font-weight-bold font-grey">{{ event.startDateFormatted }}</h4>
              <p class="pl-12 pl-md-16">{{ event.timesFormatted }}</p><br>
              <p class="pl-12 pl-md-16 font-weight-bold">{{ event.room.location.designation }}</p>
              <p class="pl-12 pl-md-16">{{ event.room.designation }}</p>
              <div class="pl-12 pl-md-16 bottom-row bg-blue">{{ $t("take_part_now") }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Right Area -->
      <div class="col-xl-4 pl-12 pl-md-16 row" v-if="training != null">
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn @click="bookingRequestClicked()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("booking_request") }}</v-btn>
        </div>
        <Contact />
        <Share :headline="$t('share_training')" :mailSubject="$t('share_mail_subject', {name: training.designationsMap[$locale]})" :mailText="getShareMailText()" />
      </div>
    </div>


    <!-- Dialogs -->
    <v-dialog v-model="openRequestQuestionDialog">
      <h4 >{{ $t("have_you_seen_our_events") }}</h4>
      <div class="row">
        <div class="event-tile ma-4 col-xl-4 pb-10" v-for="event in events" :key="event.id" @click="eventClicked(event)">
          <div class="event-background-image"></div>
          <h4 class="font-weight-bold font-grey">{{ event.startDateFormatted }}</h4>
          <p>{{ event.timesFormatted }}</p><br>
          <p class="font-weight-bold">{{ event.room.location.designation }}</p>
          <p>{{ event.room.designation }}</p>
          <div class="bottom-row bg-blue">{{ $t("take_part_now") }}</div>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="openRequestQuestionDialog = false" outlined depressed tile class="cancelbutton mr-2 mb-2"> {{ $t("cancel") }}</v-btn>
        <v-btn :to="bookingRequestUrl" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("custom_request") }}</v-btn>
      </v-card-actions>
    </v-dialog>
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
      training: null,
      events: [],
      openRequestQuestionDialog: false,

      routes: {
        training: "/api/training/url/",
        events: "/api/training/event/training/id/",
        location: "/api/location/",
      },
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  computed: {
    bookingRequestUrl: {
      get: function(){
        if(this.training == null) return "/request";
        return "/request?trainingId=" + this.training.id;
      },
    }
  },

  mounted() {
    this.trainingName = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
    if(this.trainingName.includes("?")){
      this.trainingName = this.trainingName.substring(0, this.trainingName.indexOf("?"));
    }
    this.fetchSelectedTraining();
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
    fetchSelectedTraining() {
      var _this = this;
      
      this.$axios
        .get(this.routes.training, {
          params: {
            url: _this.trainingName
          }
        })
        .then(function (response) {
          _this.training = response.data;
          _this.fetchEventsForTraining();
        })
        .catch(this.onError);
    },

    fetchEventsForTraining(){
      var _this = this;
      
      this.$axios
        .get(this.routes.events + this.training.id)
        .then(function (response) {
          _this.events = response.data.content;
          for (let i = 0; i < _this.events.length; i++) {
            const event = _this.events[i];
            if(event.room !==null && typeof event.room.location == 'number'){
              _this.$axios
                .get(_this.routes.location + event.room.location)
                .then(function (response) {
                  event.room.location = response.data;
                }).catch(_this.onError);
            }
            else if(event.room === null){ 
                  event.room = {};
                  event.room.location = {};
                  event.room.designation = "";
                  event.room.location.designation = _this.$t("virtual");
            }           
          }
        })
        .catch(this.onError);
    },

    bookingRequestClicked(){
      if(this.events.length > 0 && this.training.showUpcomingSchedules){
        this.openRequestQuestionDialog = true;
        return;
      }
      this.$router.push(this.bookingRequestUrl);
    },

    eventClicked(event){
      if(this.$user == null){
        // Not logged in
        this.$router.push("/login?routingTarget=/edit-training-event?trainingEventId=" + event.id);
        return;
      }
      this.$router.push("/edit-training-event?trainingEventId=" + event.id);
    },

    getShareMailText(){
      return this.$t('share_mail_content', {link: window.location.href});
    }
  },
};
</script>
