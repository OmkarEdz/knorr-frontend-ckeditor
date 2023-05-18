<template>
<div>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" :style="{'background-image': 'url(\'/static/img/' + tool.image + '\')', 'background-position': tool.backgroundPosition + ' !important'}">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t(tool.designation) }}</div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="row align-items-start toolDetailsPg">
      <!-- Left Area -->
      <div class="col-xl-8 pl-md-16 pl-12 px-8 pr-sm-16" >        
        <div class="mx-0 pa-0 text-content">
          <h4>{{ $t(tool.goal_headline) }}</h4>
          <p v-html="this.$t(tool.goal)"></p>
          <div class="mt-10"></div>


          </div>

        <div class="mt-14 mx-0 pa-0 text-content" >
          <h4 v-show="this.$t(tool.usage) != '' && isTools">{{ $t("usage") }}</h4>
          <p v-show="this.$t(tool.usage) != ''" v-html="this.$t(tool.usage)"></p>
          <div v-show="this.$t(tool.usage) != ''" class="mt-10"></div>
        </div>
      </div>
      <!-- Right Area -->
      <div class="col-xl-4 pl-12 pl-md-16 row">
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <h4 class="text-uppercase mb-5">{{ $t("openTraining") }}</h4>
          <div v-if="uniqueTrainings.length> 0">
          <div v-for="(training, index) in uniqueTrainings.slice(0, 5)" :key="index" class="mb-2">
          <a style="border-color: #333; text-decoration: underline;"  :href="'/request?trainingId=' + training.value">{{ training.text }}</a>
          </div>  
         <a class="mt-5" style="border-color: #333; text-decoration: underline;"  href="/trainings" > {{ $t("openTrainingSessions") }}</a>
         </div>
         <div v-else>{{ $t("noOpenTrainings") }}</div>
        </div>
        <Contact />
      </div>
    </div>

    <!-- Tools -->
    <div v-show="isTools" class="row moretools">
        <h4 class="pl-12 pl-md-16 col-12 pb-0 mb-0 pr-4 text-uppercase">{{ $t("further_tools") }}</h4>
        <div class="divider"></div>
        <div v-show="toolName != tool.url" class="tool mx-0 col-xl-4 col-md-6" v-for="tool in tools" :key="tool.id">
          <div class="category-box">
            <v-card
              flat
              class="no-border-radius sixteentonine"
              height="100%"
              :href="'/tools/' + tool.url"
              >
              <v-img class="kachelimage" height="100%" :src="`/static/img/${tool.image}`"></v-img>
              <div class="pl-md-12 pl-8 py-1 bottom-row bg-blue">{{ $t(tool.designation) }}</div>
            </v-card>

          </div>
        </div>
        <div class="mt-10"></div>
    </div>

    <!-- Offer -->
    <div v-show="isOffers" class="row">
            <h4 class="pl-12 pl-md-16 col-12 pb-0 mb-0 pr-4 text-uppercase" >{{ $t("further_offers") }}</h4>
            <div class="divider"></div>
            <div v-show="toolName != offer.url" class="mx-0 col-xl-4 col-md-6" v-for="offer in offers" :key="offer.id">
              <div class="category-box">
                <v-card
                  flat
                  class="no-border-radius sixteentonine"
                  height="100%"
                  :href="'/offers/' + offer.url"
                  >
                  <v-img class="kachelimage" height="100%" :src="`/static/img/${offer.image}`"></v-img>
                  <div class="pl-md-12 pl-8 py-1 bottom-row bg-blue">{{ $t(offer.designation) }}</div>
                </v-card>
              </div>
              </div>
            <div class="mt-10"></div>
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
  },

  data() {
    return {
      trainings: [],
      isOffers:null,
      isTools:null,
      tool: null,
      toolName:null,
      tools: {
          practical: {
              url: "practical",
              designation: "practical training",
              goal_headline: "goal_headline_practical_training",
              goal: "practical_goal",
              usage: "practical_usage",
              image: "practical_header.jpg",
              backgroundPosition: "top",
          },
          technical: {
              url: "technical",
              designation: "technical coaching",
              goal_headline: "goal_headline_technical_coaching",
              goal: "technical_goal",
              usage: "technical_usage",
              image: "technicalcoaching_header.jpg",
              backgroundPosition: "center",
          },
          virtualclassroom: {
              url: "virtualclassroom",
              designation: "virtual classroom",
              goal_headline: "goal_headline_virtual_classroom",
              goal: "virtualclassroom_goal",
              usage: "virtualclassroom_usage",
              image: "virtualclassroom_header.jpg",
              backgroundPosition: "center",
          },
          theory: {
              url: "theory",
              designation: "theory training",
              goal_headline: "goal_headline_theory_training",
              goal: "theory_goal",
              usage: "theory_usage",
              image: "theory_header.jpg",
              backgroundPosition: "top",
          },
          advisory: {
              url: "advisory",
              designation: "advisory",
              goal_headline: "goal_headline_advisory",
              goal: "advisory_goal",
              usage: "advisory_usage",
              image: "advisory_header.jpg",
              backgroundPosition: "center",
          },
          virtualreality: {
              url: "virtualreality",
              designation:"virtual reality",
              goal_headline: "goal_headline_virtual_reality",
              goal: "virtualreality_goal",
              usage: "virtualreality_usage",
              image: "virtualreality_header.jpg",
              backgroundPosition: "center",
          }
      },

      offers: {
          producttraining: {
              url: "producttraining",
              designation: "producttraining",
              goal_headline: "goal_headline_product_training",
              goal: "producttraining_goal",
              usage: "producttraining_usage",
              image: "producttraining_header.jpg",
              backgroundPosition: "center",
          },
          hydraulic: {
              url: "hydraulic",
              designation: "hydraulic",
              goal_headline: "goal_headline_hydraulic",
              goal: "hydraulic_goal",
              usage: "hydraulic_usage",
              image: "hydraulic_header.jpg",
              backgroundPosition: "center",
          },
          pressure: {
              url: "pressure",
              designation: "pressure",
              goal_headline: "goal_headline_pressure",
              goal: "pressure_goal",
              usage: "pressure_usage",
              image: "pressure_header.jpg",
              backgroundPosition: "top",
          }
      }
    };
  },



  computed: {
    uniqueTrainings() {
      return Array.from(new Set(this.trainings.map(training => training.value)))
        .map(value => {
          return this.trainings.find(training => training.value === value)
        })
    }
},

  watch: {
    tool(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  mounted() {
    this.fetchTrainings();
    this.toolName = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
    if(this.toolName.includes("?")){
        this.toolName = this.toolName.substring(0, this.toolName.indexOf("?"));
    }
    if( window.location.href.includes("tools")){
      this.tool = this.tools[this.toolName];
      this.isTools = true;
    }else if( window.location.href.includes("offers")){
      this.tool = this.offers[this.toolName];
      this.isOffers = true;
    }
  },

  methods: {
     fetchTrainings() {
        var _this = this;
        this.$axios
          .get("/api/training/opentrainings")
          .then(function (response) {
            const trainings = response.data;
            for (let i = 0; i < trainings.length; i++) {
              const training = trainings[i];
              _this.trainings.push({
                text: training.designationsMap[_this.$locale],
                value: training.id,
                isPopular:training.isPopular
              });
            }
            _this.$forceUpdate();
          })
          .catch(this.onError);
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
