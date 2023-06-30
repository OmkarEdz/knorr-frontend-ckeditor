<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" v-if="category != null" :style="{'background': 'url(\'/files/images/' + category.image + '\')'}">
      <div v-if="category.parentCategory != null" class="headline"><div>{{ category.parentCategory.designationMap[$locale] }} <img class="ml-2" src="../assets/img/arrow_right.svg" height="18px"><img class="mr-2" src="../assets/img/arrow_right.svg" height="18px"> {{ category.designationMap[$locale] }}</div></div>
      <div v-else class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ category.designationMap[$locale] }}</div>
      </div>
    </div>
    <div v-else>
      <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
        <div class="headline">
          <div class="text-subtitle-2 text-md-h5">{{ $t("trainings") }}</div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="row align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 px-0">        
        <div v-bind:class="{'pl-12 pl-md-16': subcategories.length == 0}" class="mx-0 pa-0  text-content">

          <div v-if="subcategories.length > 0">
            <div class="px-0 mx-0 col-xl-6 col-md-6" v-for="category in subcategories" :key="category.id">
              <v-card
                flat
                class="no-border-radius sixteentonine"
                height="200px"
                :to="'/category/' + category.designationUrl"
                @click="reloadEntirePage()"
                >
                <v-img class="kachelimage" height="100%" :src="`/files/images/${category.image}`"></v-img>
                <div class="pl-12 pl-md-16 py-1 bottom-row bg-blue">{{ category.designationMap[$locale] }}</div>
              </v-card>
            </div>
          </div>
          <div v-else>
            <v-simple-table class="trainingstable" style="width:100%" hide-default-footer>
              <thead>
                <tr>
                  <th @click="sort = 'd.description', order = !order,page = 1, fetchTrainings()" class="text-uppercase align-bottom">
                    {{$t("designation")}} <v-icon v-show="sort == 'd.description' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'd.description' && !order" >fas fa-chevron-up</v-icon>
                  </th>
                  <th v-show="$rights.includes('CREATE_TRAINING')" @click="sort = 'minParticipants', order = !order,page = 1, fetchTrainings()" class="text-uppercase align-bottom">
                    {{$t("minParticipants")}} <v-icon v-show="sort == 'minParticipants' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'minParticipants' && !order" >fas fa-chevron-up</v-icon>
                  </th>
                  <th v-show="$rights.includes('CREATE_TRAINING')" @click="sort = 'maxParticipants', order = !order,page = 1, fetchTrainings()" class="text-uppercase align-bottom">
                    {{$t("maxParticipants")}} <v-icon v-show="sort == 'maxParticipants' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'maxParticipants' && !order" >fas fa-chevron-up</v-icon>
                  </th>
                  <!-- <th v-show="$rights.includes('CREATE_TRAINING')" @click="sort = 'language', order = !order,page = 1, fetchTrainings()" class="text-uppercase align-bottom">
                    {{$t("language")}} <v-icon v-show="sort == 'language' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'language' && !order" >fas fa-chevron-up</v-icon>
                  </th> -->
                  <th @click="sort = 'type', order = !order,page = 1, fetchTrainings()" class="text-uppercase align-bottom">
                    {{$t("type")}} <v-icon v-show="sort == 'type' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'type' && !order" >fas fa-chevron-up</v-icon>
                  </th>
                  <th class="text-uppercase align-bottom"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="training in trainings" :key="training.id" @click="$routerPush('/edit-training?trainingId=' + training.id, 'CREATE_TRAINING', '/training/' + training.designationUrl)">
                  <td class="pb-1 text-uppercase align-bottom">{{training.designationsMap[$locale]}}</td>
                  <td v-show="$rights.includes('CREATE_TRAINING')" class="pb-1 text-uppercase align-bottom">{{training.minParticipants}}</td>
                  <td v-show="$rights.includes('CREATE_TRAINING')" class="pb-1 text-uppercase align-bottom">{{training.maxParticipants}}</td>
                  <!-- <td v-show="$rights.includes('CREATE_TRAINING')" class="pb-1 text-uppercase align-bottom"><img style="width:26px;height:17px;vertical-align: unset;" :src="'/files/flags/' + $languages[training.language].flag"></td> -->
                  <td class="pb-1 text-uppercase align-bottom">{{$t(training.type.toLowerCase())}}</td>
                  <td class="text-right">
                    <v-btn @click.stop="$router.push('/training/' + training.designationUrl)" v-show="$rights.includes('CREATE_TRAINING')" outlined depressed tile>{{ $t("preview") }}</v-btn>
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

      <!-- Right Area -->
      <div class="col-xl-4 pl-12 pl-md-16 row">
        <div class="col-xl-12 right-side-block" v-show="$rights.includes('CREATE_TRAINING')">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn @click="backClicked()" outlined depressed tile class="backbutton mr-2 mb-2"><v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn :to="`/create-training?category=${categoryName}`" v-show="subcategories.length == 0 && $rights.includes('CREATE_TRAINING')" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("create_training") }}</v-btn>
          <v-btn :to="`/create-category`" v-show="$rights.includes('CREATE_TRAINING')" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("create_category") }}</v-btn>
          <v-btn v-if="category != null" :to="`/edit-category?categoryId=${category.id}`" v-show="$rights.includes('CREATE_TRAINING')" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("edit_category") }}</v-btn>
        </div>
        <div class="col-xl-12 right-side-block" v-show="subcategories.length == 0">
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
            @keypress.enter="fetchTrainings()"
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
      category: null,
      categoryName: null,
      trainings: [],
      search: null,
      subcategories: [],

      routes: {
        trainings: "/api/training/category/",
        category: "/api/category/url/",
        filter: "/api/training/search/"
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
      createmode: true,
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  mounted() {
    this.reloadEntirePage();
  },

  methods: {
    reloadEntirePage(reloadCategoryName = true){
      // Only Reload Category Name if wanted
      if(reloadCategoryName){
        this.categoryName = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
        if(this.categoryName.includes("?")){
          this.categoryName = this.categoryName.substring(0, this.categoryName.indexOf("?"));
        }
      }

      this.fetchTrainings();
      this.fetchSelectedCategory();
    },

    backClicked(){
      if(this.category.parentCategory == null){
        this.$routerBack();
        return;
      }

      // Fetch Parent Category and set Category Name
      this.$routerBack();
      this.categoryName = this.category.parentCategory.designationUrl;
      this.reloadEntirePage(false);
    },

    previousPage() {
      this.page = this.page - 1;
      this.fetchTrainings();
    },
    nextPage() {
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
    fetchSelectedCategory() {
      var _this = this;
      
      this.$axios
        .get(this.routes.category, {
          params: {
            url: _this.categoryName
          }
        })
        .then(function (response) {
          _this.category = response.data;
          _this.fetchSubCategories(_this.category.id);
        })
        .catch(this.onError);
    },

    fetchSubCategories(categoryId){
      var _this = this;
      this.$axios
        .get("/api/category/parent/" + categoryId)
        .then(function (response) {
          _this.subcategories = response.data;
        })
        .catch(this.onError)
        .finally(this.onFinally);
    },

    fetchTrainings() {
      var _this = this;
      this.$axios
        .get(this.routes.trainings + this.categoryName, {
          params: {
            search: _this.search,
            sort: _this.sort,
            order: _this.order ? "ASC":"DESC",
            page: _this.page - 1,
            size: _this.ElementPerPage
          }
        })
        .then(function (response) {
          _this.trainings = response.data.content;
          _this.totalPages = response.data.totalPages;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
    updatePage() {
      this.fetchTrainings();
    },
    
    filterTraining(){
      var _this = this;

      if(this.editedTraining.personalData.lastname != "" && this.editedTraining.personalData.firstname == ""){
        this.$axios
          .get(this.routes.filter +  "lastname/" + this.editedTraining.personalData.lastname, {
            params: {
              page: this.page - 1,
              size: this.ElementPerPage,
            },
          })
          .then(function (response){
            _this.trainings = response.data.content;
            _this.totalPages = response.data.totalPages;
          })
          .catch(this.onError);
      }
      else if(this.editedTraining.personalData.lastname != "" && this.editedTraining.personalData.firstname != ""){
        this.$axios
          .get(this.routes.filter +  "name/" + this.editedTraining.personalData.firstname + "+" + this.editedTraining.personalData.lastname, {
            params: {
              page: this.page - 1,
              size: this.ElementPerPage,
            },
          })
          .then(function (response){
            _this.trainings = response.data.content;
            _this.totalPages = response.data.totalPages;
          })
          .catch(this.onError);
      }else if(this.editedTraining.mail != ""){
        this.$axios
          .get(this.routes.filter +  "mail/" + this.editedTraining.mail, {
            params: {
              page: this.page - 1,
              size: this.ElementPerPage,
            },
          })
          .then(function (response){
            _this.trainings = response.data.content;
            _this.totalPages = response.data.totalPages;
          })
          .catch(this.onError);
      }else if(this.editedTraining.role != ""){
        this.$axios
          .get(this.routes.filter +  "role/" + this.editedTraining.role.id, {
            params: {
              page: this.page - 1,
              size: this.ElementPerPage,
            },
          })
          .then(function (response){
            _this.trainings = response.data.content;
            _this.totalPages = response.data.totalPages;
          })
          .catch(this.onError);
      }

    },

    formatDate(date){
      const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
      return new Date(date).toLocaleDateString("de-DE", options);
    },
    
    showConfirmation(text, action) {
      this.confirmation.text = text;
      this.confirmation.action = action;
      this.confirmation.shown = true;
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

