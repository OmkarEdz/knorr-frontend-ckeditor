<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div>
      <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
        <div class="headline">
          <div class="text-subtitle-2 text-md-h5">{{ $t("trainings") }}</div>
        </div>
      </div>
    </div>
  </div>
  <div>
      
      <div class="row mx-0">
        <div class="pl-md-12 col-md-12 col-xl-7 right-side-block">
          <div class="mt-6"></div>
            <v-text-field  
                hide-details="auto"
                class="justify-content-end searchbar align-self-center pb-1 pt-3 categorySearch"
                style="padding-right:2px"
                dense
                outlined
                v-model="search"
                @keypress.enter="fetchTrainings()"
                :label="$t('search')"><template v-slot:append>
                      <v-icon color="#003A60">fas fa-search</v-icon>
            </template></v-text-field>
        </div>
        <div class="pr-md-12 col-md-12 col-xl-5 d-flex align-end justify-end">
          <v-btn @click="$routerBack()" outlined depressed tile class="backBtnPlain"><img src="../assets/img/arrow_right_blue.svg"> Back to main</v-btn>
        </div>
      </div>
     
      <!-- Left Area -->
      <div class="px-0">   
        <div class="pl-8 pl-md-12 mx-0 pa-0 text-content">
            <h3 class="text-uppercase">{{ $t("our_training_portfolio") }}</h3>
            <div class="divider"></div>
        </div>
        <div v-bind:class="{'px-12 px-md-12': subcategories.length == 0}" class="mx-0 pa-0  text-content pt-5">
          <div>
            <v-simple-table class="trainingstable" style="width:100%" hide-default-footer>
              <thead>
                <tr>
                  <th @click="sort = 'd.description', order = !order,page = 1, fetchTrainings()" class="col-3 text-uppercase align-bottom">
                    {{$t("designation")}} <v-icon v-show="sort == 'd.description' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'd.description' && !order" >fas fa-chevron-up</v-icon>
                  </th>
                  <th @click="sort = 'minParticipants', order = !order,page = 1, fetchTrainings()" class="col-2 text-uppercase align-bottom">
                    {{$t("minParticipants")}} <v-icon v-show="sort == 'minParticipants' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'minParticipants' && !order" >fas fa-chevron-up</v-icon>
                  </th>
                  <th @click="sort = 'maxParticipants', order = !order,page = 1, fetchTrainings()" class="col-2 text-uppercase align-bottom">
                    {{$t("maxParticipants")}} <v-icon v-show="sort == 'maxParticipants' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'maxParticipants' && !order" >fas fa-chevron-up</v-icon>
                  </th>
                  <th @click="sort = 'training.category.designationsMap[$locale]', order = !order, page = 1, fetchTrainings" class="col-3 text-uppercase align-bottom">
                  {{$t("category")}}<v-icon v-show="sort == 'training.category.designationMap[$locale]' && order">fas fa-chevron-down</v-icon><v-icon v-show="sort == 'training.category.designationMap[$locale]' && !order">fas fa-chevron-up</v-icon>
                  </th>
                  <th @click="sort = 'type', order = !order,page = 1, fetchTrainings()" class="col-2 text-uppercase align-bottom">
                    {{$t("type")}} <v-icon v-show="sort == 'type' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'type' && !order" >fas fa-chevron-up</v-icon>
                  </th>
                  <th class="text-uppercase align-bottom"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="training in trainings" :key="training.id" @click="$routerPush('/edit-training?trainingId=' + training.id, 'CREATE_TRAINING', '/training/' + training.designationUrl)">
                  <td class="pb-1 text-uppercase align-bottom">{{training.designationsMap[$locale]}}</td>
                  <td class="pb-1 text-uppercase align-bottom">{{training.minParticipants}}</td>
                  <td class="pb-1 text-uppercase align-bottom">{{training.maxParticipants}}</td>
                  <!-- <td v-show="$rights.includes('CREATE_TRAINING')" class="pb-1 text-uppercase align-bottom"><img style="width:26px;height:17px;vertical-align: unset;" :src="'/files/flags/' + $languages[training.language].flag"></td> -->
                    <td class="pb-1 text-uppercase align-bottom">{{training.category.designationMap[$locale]}}</td>
                  <td class="pb-1 text-uppercase align-bottom">{{$t(training.type.toLowerCase())}}</td>
                  <td class="text-right noBorderBtn">
                    <v-btn @click.stop="$router.push('/training/' + training.designationUrl)" v-show="$rights.includes('CREATE_TRAINING')" outlined depressed tile><v-icon>mdi-eye</v-icon> {{ $t("preview") }}</v-btn>
                  </td>
                </tr>
                <tr v-show="trainings.length == 0">
                  <td class="pb-1 text-uppercase align-bottom" colspan="6">{{$t("no_trainings")}}</td>
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
      nextPrevious:false,
      page: 1,
      totalPages: 1,
      ElementPerPage: 50,
      sort: null,
      order: true,
      category: null,
      categoryName: null,
      trainings: [],
      search: null,
      subcategories: [],

      routes: {
        trainings: "/api/training/allcategory"
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      rules: [(value) => !!value || this.$t("required")],
      confirmation: {
        text: "",
        action: null,
        shown: false,
      },
      createTrainingPopup: false,
      menu: false,
      createmode: true
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  mounted() {
    this.search = this.$route.query.term;
    this.reloadEntirePage();
  },

  methods: {
    reloadEntirePage(){
      this.fetchTrainings();
    },

    backClicked(){
        this.$routerBack();
    },

    previousPage() {
      this.nextPrevious=true;
      this.page = this.page - 1;
      this.fetchTrainings();
    },
    nextPage() {
      this.nextPrevious=true;
      this.page = this.page + 1;
      this.fetchTrainings();
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
    fetchTrainings() {
      
      var _this = this;
      if(_this.search !== null && _this.search !== '' && _this.nextPrevious===false)
      {
      _this.page=1;
      }
      _this.trainings=[];
      this.$axios
        .get(this.routes.trainings, {
          params: {
            search: _this.search,
            sort: _this.sort,
            order: _this.order ? "ASC":"DESC",
            page: _this.page - 1,
            size: _this.ElementPerPage
          }
        })
        .then(function (response) {
          _this.nextPrevious=false;
          _this.trainings = response.data.content;
          _this.totalPages = response.data.totalPages;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
    updatePage() {
      this.fetchTrainings();
    },
    
  },
};
</script>

<style scoped>
.v-dialog > .v-card > .v-card__actions {
  padding: 8px 16px;
}
</style>

