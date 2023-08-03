<template>
<div>
  <div>
    <div class="sixteentosix omt-6 omt-md-25">
      <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5" v-if="selectedCategory != null">{{ selectedCategory.designationMap[$locale] }} <img class="ml-2" src="../assets/img/arrow_right.svg" height="18px"><img class="mr-2" src="../assets/img/arrow_right.svg" height="18px"> {{$t("create_training")}}</div>
        <div class="text-subtitle-2 text-md-h5" v-else-if="editMode">{{$t("edit_training")}}</div><div class="text-subtitle-2 text-md-h5" v-else>{{$t("create_training")}}</div></div>
      </div>
      </div>
  </div>
   <div class="text-center">
      <v-dialog v-model="openDeleteDialog" width="500">
        <h4>{{ $t("confirm_delete_training") }}</h4>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="openDeleteDialog = false" outlined depressed tile class="cancelbutton mr-2 mb-2"> {{ $t("cancel") }}</v-btn>
          <v-btn @click="deleteTraining()" outlined depressed tile class="deletebutton mr-2 mb-2"> <v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
        </v-card-actions>
      </v-dialog>
    </div>
  <div class="pt-8">
    <!-- <div class="row justify-content-between ml-0 mr-n8">
      	<span v-if="selectedCategory != null" class="text-uppercase text-h6 text-sm-h5 text-md-h5 mb-0 pt-1">{{ selectedCategory.designationMap[$locale] }} >> {{$t("create_training")}} </span>
        <span v-else-if="editMode" class="text-uppercase text-h6 text-sm-h5 text-md-h5 mb-0 pt-1">{{$t("edit_training")}} </span>
        <span v-else class="text-uppercase text-h6 text-sm-h5 text-md-h5 mb-0 pt-1">{{$t("create_training")}} </span>
        <div class="mx-0 pb-1 button-container row justify-content-end">
          <v-btn v-show="editMode" @click="deleteTraining()" outlined depressed tile class="mr-2">{{ $t("delete") }}</v-btn>
          <v-btn :to="`/category/${categoryName}`" outlined depressed tile class="cancelbutton mr-2">{{ $t("cancel") }}</v-btn>
          <v-btn @click="saveTraining()" outlined depressed tile class="savebutton mr-2">{{ $t("save") }}</v-btn>
        </div>
        
    </div> -->
    <!-- <v-divider class="col-sm-12 mt-0 mb-0"></v-divider> -->
    <div class="row disablerow justify-content-between align-items-start">

    <!-- Tabs -->
    <v-tabs
      v-model="languageTab"
      align-with-title
      class="LanguageselectTabgroup pt-md-4 pt-lg-0 pl-md-8 pl-4"
    >
      <v-tabs-slider color="indigo"></v-tabs-slider>

      <v-tab
        v-for="language in $languageTabs"
        :key="language"
        class="LanguageselectTab"
      >
        <img style="width:26px;height:17px;vertical-align: unset;" :src="'/files/flags/' + language.flag">&nbsp;&nbsp;{{ $t(language.language) }}
      </v-tab>
    </v-tabs>
    <div class="col-md-12 col-xl-9 innercreatetraining mb-3 mb-lg-0 pt-5 px-md-8 px-4 mx-0 pa-0">


      <v-tabs-items v-model="languageTab">
        <v-tab-item
          v-for="language in $languageTabs"
          :key="language"
        >
        <div class="row disablerow justify-content-between">
          <!-- Put Content here -->
          <div class="col-md-4 px-0">
            <div class="col-md-12 ">
              <v-text-field  
              hide-details="auto"
              class="datainput justify-content-end align-self-center pb-1"
              dense
              outlined
              :label="$t('designation') + '*'"
              v-model="training.designations[language.shortForm]"
              ></v-text-field>
            </div>
            <!-- <div class="col-md-12 ">
              <v-text-field  
              hide-details="auto"
              class="datainput justify-content-end align-self-center pb-1"
              dense
              outlined
              :label="$t('qualification_number')"
              v-model="training.qualificationNumber"
              ></v-text-field>
            </div> -->
            <div class="col-md-12 ">
              <v-text-field  
              hide-details="auto"
              class="datainput justify-content-end align-self-center pb-1"
              dense
              outlined
              readonly
              disabled
              :label="$t('training_idnr')"
              v-model="trainingId"
              ></v-text-field>
            </div>
            <div class="col-md-12  disablemrow row justify-content-between">
              <div class="col-md-6 pb-md-0 row disablerow justify-content-start">
                <v-text-field  
                hide-details="auto"
                class="col-md-11 datainput pb-1"
                dense
                outlined
                type="number"
                :label="$t('minParticipants') + '*'"
                v-model="training.minParticipants"
                ></v-text-field>
              </div>
              <div class="col-md-6 row disablerow justify-content-end">
                <v-text-field  
                hide-details="auto"
                class="col-md-11 datainput  pb-1"
                dense
                outlined
                type="number"
                :label="$t('maxParticipants') + '*'"
                v-model="training.maxParticipants"
                ></v-text-field>
              </div>
            </div>
            <div class="col-md-12 ">
              <v-text-field  
              hide-details="auto"
              class="datainput justify-content-end align-self-center pb-1"
              dense
              outlined
              :label="$t('price_eur')"
              v-model="training.price"
              ></v-text-field>
            </div>
          </div>
          <div class="col-md-4 px-0">
            <div class="col-md-12 pb-4">
              <v-select
                dense
                outlined
                class="datainput"
                hide-details="auto"
                :disabled="!editMode"
                :items="categories"
                item-text="text"
                item-value="value"
                :label="$t('category') + '*'"
                v-model="training.category"
              ></v-select>
            </div>
            <div class="col-md-12 pb-4">
              <v-select
                hide-details="auto"
                dense
                outlined
                class="datainput"
                :items="types"
                :label="$t('training_type') + '*'"
                item-text="text"
                item-value="value"
                v-model="training.type"
              ></v-select>
            </div>
            <div class="col-md-12 pb-4">
              <v-autocomplete
                dense
                outlined
                multiple
                hide-details="auto"
                class="datainput"
                :items="selectableLocations"
                item-text="name"
                item-value="id"
                :label="$t('location') + '*'"
                v-model="training.selectedLocations"
              ></v-autocomplete>
            </div>
            <div class="col-md-12 ">
              <v-text-field  
              hide-details="auto"
              class="datainput justify-content-end align-self-center pb-1"
              dense
              outlined
              :label="$t('duration_in_days')"
              v-model="training.durationInDays"
              ></v-text-field>
          </div>
          </div>
          <div class="col-md-4 px-0">
            <div class="col-md-12">
              <Upload v-model="training.documents" multiple allowOtherFileTypes />
            </div>
             <v-checkbox
                    v-model="training.isPopular"
                    class="ml-3"
                    :label="$t('popular')"
                    hide-details="auto"
                ></v-checkbox>
          </div>

          <div class="col-md-12 px-0 new-html-editor-wrap">
            <div class="col-md-12 pb-4">
              <div class="html-editor">
                <label class="html-editor-headline">
                  {{ $t("goals") }}
                </label>
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="training.goals[language.shortForm]"
                />
              </div>
            </div>
            <div class="col-md-12 pb-4">
              <div class="html-editor">
                <label class="html-editor-headline">
                  {{ $t("targetgroup") }}
                </label>
                <ckeditor
                  :editor="editorTwo"
                  :config="editorConfigTwo"
                  v-model="training.targetGroups[language.shortForm]"
                />
              </div>
            </div>
            <div class="col-md-12 pb-4">
              <div class="html-editor">
                <label class="html-editor-headline">
                  {{ $t("content") }}
                </label>
                <ckeditor
                  :editor="editorThree"
                  :config="editorConfigThree"
                  v-model="training.descriptions[language.shortForm]"
                />
              </div>
            </div>
            <div class="col-md-12  pb-4">
              <div class="html-editor">
                <label class="html-editor-headline">
                  {{ $t("prerequesites") }}
                </label>
                <ckeditor
                  :editor="editorFour"
                  :config="editorConfigFour"
                  v-model="training.prerequesites[language.shortForm]"
                />
              </div>
            </div>
          </div>

        </div>

        </v-tab-item>
        <div class="col-md-12 lastBtnSubmit">
          <v-btn @click="saveTraining()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("save") }}</v-btn>
          <v-btn @click="$routerBack()" outlined depressed tile class="cancelBtn mr-2 mb-2">{{ $t("cancel") }}</v-btn>
          <v-btn v-show="editMode" @click="openDeleteDialog= true"  outlined depressed tile class="deletebutton cancelBtn mr-2 mb-2"><v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
        </div>
        <div class="text-right mb-4">
          <v-label>
              * {{ $t("mandatory_fields") }}
          </v-label>
        </div>
      </v-tabs-items>
    </div>
    <div class="col-xl-3 px-0 pl-8 pl-md-4 row pt-0 onlyContact">
        <div class="col-xl-12 right-side-block hide">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn v-show="editMode" @click="openDeleteDialog= true"  outlined depressed tile class="deletebutton mr-2 mb-2"><v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
          <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn @click="saveTraining()" outlined depressed tile class="save mr-2 mb-2">{{ $t("save") }}</v-btn>
        </div>
        <Contact />
    </div>

    </div>
  </div>
  </div>
</template>

<script>
import Card from './custom/Card.vue'  

export default {
    components:{
      Card,
    },

    props: {
      categoryName: String,
      trainingId: Number,
    },

    data() {
      return {
        editMode: false,
        allCategories: [],  // Full data of category list
        categories: [],     // only data for select boxes
        languageTab: null,
        selectedCategory: null,
        openDeleteDialog:false,
        customToolbar: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["code"],
          ["clean"]
        ],
        locations: [],
        selectableLocations: [],

        types: [
          { value: "PRESENCE", text: this.$t("PRESENCE") },
          { value: "VIDEO", text: this.$t("VIDEO") },
          { value: "VIRTUAL", text: this.$t("VIRTUAL") },
          { value: "PRESENCE_AND_VIRTUAL", text: this.$t("PRESENCE_AND_VIRTUAL") },
        ],

        trainingLocationTypes: {
          CUSTOMER: {id: -1, name: this.$t("training_at_customer")},
          VIRTUAL: {id: -2, name: this.$t("virtual")},
          ACADEMY: {id: -3, name: this.$t("at_trainingacademy")}
        },

        training: {
          designations: {},
          goals: {},
          targetGroups: {},
          prerequesites: {},
          descriptions: {},
          type: null,
          qualificationNumber: null,
          category: null,
          minParticipants: null,
          maxParticipants: null,
          showUpcomingSchedules: true,
          selectedLocations: [],
          isPopular:false
        },

        content: {
            ops: [],
        },
        config: {
            readOnly: false,
            placeholder: 'Compose an epic...',
        },

        editor: 'ClassicEditor',
        editorConfig: {
          toolbar: [
            ["Bold","Italic","Strike"],
            ["RemoveFormat"],
            ["NumberedList", "BulletedList"],
            [ "Outdent", "Indent"],
            ["Link", "Unlink"],
            ["Source"]
          ],  
        },
        editorTwo: 'ClassicEditor',
        editorConfigTwo: {
          toolbar: [
            ["Bold","Italic","Strike"],
            ["RemoveFormat"],
            ["NumberedList", "BulletedList"],
            [ "Outdent", "Indent"],
            ["Link", "Unlink"],
            ["Source"]
          ],  
        },
        editorThree: 'ClassicEditor',
        editorConfigThree: {
          toolbar: [
            ["Bold","Italic","Strike"],
            ["RemoveFormat"],
            ["NumberedList", "BulletedList"],
            [ "Outdent", "Indent"],
            ["Link", "Unlink"],
            ["Source"]
          ],  
        },
        editorFour: 'ClassicEditor',
        editorConfigFour: {
          toolbar: [
            ["Bold","Italic","Strike"],
            ["RemoveFormat"],
            ["NumberedList", "BulletedList"],
            [ "Outdent", "Indent"],
            ["Link", "Unlink"],
            ["Source"]
          ],  
        },
      }
    },

    mounted(){
      if(this.categoryName == null && window.location.href.includes("create-training")){
        this.categoryName = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
        if(this.categoryName.includes("?")){
          this.categoryName = this.categoryName.substring(0, this.categoryName.indexOf("?"));
        }
      }

      if(this.categoryName != null){
        this.fetchSelectedCategory();
      }
      this.fetchCategories();
      
      this.selectableLocations = [];
      this.selectableLocations.push(this.trainingLocationTypes.CUSTOMER);
      this.selectableLocations.push(this.trainingLocationTypes.VIRTUAL);
      this.selectableLocations.push(this.trainingLocationTypes.ACADEMY);

      if(this.trainingId != null){
        this.editMode = true;
        this.fetchEditingTraining();
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

      fetchCategories(){
        var _this = this;
        this.$axios
          .get("api/category")
          .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
              const category = response.data[i];
              _this.categories.push({
                value: category.id,
                text: category.designationMap[_this.$locale]
              })
            }
            _this.allCategories = response.data;
          })
          .catch(this.onError)
          .finally(this.onFinally);
      },     

      fetchSelectedCategory() {
        var _this = this;
        this.$axios
          .get("/api/category/url", {
            params: {
              url: _this.categoryName
            }
          })
          .then(function (response) {
            _this.training.category = {
              value: response.data.id,
              text: response.data.designationMap[_this.$locale]
            };
            _this.selectedCategory = response.data;
          })
          .catch(this.onError);
      },

      fetchEditingTraining(){
        var _this = this;
        this.$axios
          .get("/api/training/" + this.trainingId)
          .then(function (response) {
            _this.training = response.data;

            _this.categoryName = _this.training.category.designationUrl;

            _this.training.category = {
              value: _this.training.category.id,
              text: _this.training.category.designationMap[_this.$locale]
            }
            _this.training.designations = _this.training.designationsMap;
            _this.lowerCaseMapKeys(_this.training.designations);
            _this.training.descriptions = _this.training.descriptionsMap;
            _this.lowerCaseMapKeys(_this.training.descriptions);
            _this.training.goals = _this.training.goalsMap;
            _this.lowerCaseMapKeys(_this.training.goals);
            _this.training.targetGroups = _this.training.targetGroupsMap;
            _this.lowerCaseMapKeys(_this.training.targetGroups);
            _this.training.prerequesites = _this.training.prerequesitesMap;
            _this.lowerCaseMapKeys(_this.training.prerequesites);

            // Preselect Training Locations and Types
            _this.training.selectedLocations = [];

            for (let i = 0; i < _this.training.locationTypes.length; i++) {
              const locationType = _this.training.locationTypes[i];
              if(locationType == "CUSTOMER") {
                _this.training.selectedLocations.push(_this.trainingLocationTypes.CUSTOMER.id);
              }
              if(locationType == "VIRTUAL") {
                _this.training.selectedLocations.push(_this.trainingLocationTypes.VIRTUAL.id);
              }
              if(locationType == "ACADEMY") {
                _this.training.selectedLocations.push(_this.trainingLocationTypes.ACADEMY.id);
              }
            }

            for (let i = 0; i < _this.training.locations.length; i++) {
              const location = _this.training.locations[i];
              _this.training.selectedLocations.push(location.id);
            }

            // _this.training.category = {
            //   value: response.data.id,
            //   text: response.data.designationMap[_this.$locale]
            // };
          })
          .catch(this.onError);
      },

      saveTraining() {
        var _this = this;
        var training = {};
        training = Object.assign(training, this.training);
      
        // if(training.designations.DE == null && training.designations.EN == null){
        //   this.$noty.error(this.$t("english_or_german_mandatory"));
        //   return;
        // }
        if(training.type == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("training_type")}));
          return;
        }
        if(training.category == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("category")}));
          return;
        }
        if(training.minParticipants == null || training.minParticipants == "" || isNaN(training.minParticipants)){
          this.$noty.error(this.$t("invalid_value", {name: this.$t("minParticipants")}));
          return;
        }
        if(training.maxParticipants == null || training.maxParticipants == "" || isNaN(training.maxParticipants)){
          this.$noty.error(this.$t("invalid_value", {name: this.$t("maxParticipants")}));
          return;
        }
        
        training.minParticipants = parseInt(training.minParticipants);
        training.maxParticipants = parseInt(training.maxParticipants);
        if(training.minParticipants > training.maxParticipants){
          this.$noty.error(this.$t("invalid_value", {name: this.$t("maxParticipants")}));
          return;
        }
        if(training.selectedLocations == null || training.selectedLocations.length == 0){
          this.$noty.error(this.$t("invalid_value", {name: this.$t("location")}));
          return;
        }

        training.locationTypes = "";
        training.locations = "";

        for (let i = 0; i < training.selectedLocations.length; i++) {
          var selectedLocation = training.selectedLocations[i]; // id 
          if(selectedLocation <= 0){
            if(selectedLocation == this.trainingLocationTypes.CUSTOMER.id){
              selectedLocation = "CUSTOMER";
            }
            if(selectedLocation == this.trainingLocationTypes.VIRTUAL.id){
              selectedLocation = "VIRTUAL";
            }
            if(selectedLocation == this.trainingLocationTypes.ACADEMY.id){
              selectedLocation = "ACADEMY";
            }
            training.locationTypes += ";" + selectedLocation;
          }else{
            training.locations += ";" + selectedLocation;
          }
        }
        if(training.locationTypes.startsWith(";")){
          training.locationTypes = training.locationTypes.substring(1);
        }
        if(training.locations.startsWith(";")){
          training.locations = training.locations.substring(1);
        }

        training.categoryId = training.category.value == null ? training.category : training.category.value;

        if (typeof training.durationInDays === 'string' || training.durationInDays instanceof String){
          training.durationInDays = training.durationInDays.replace(",", ".");
        }
        

        this.$convertHtmlDescriptionText(training.goals);
        this.$convertHtmlDescriptionText(training.targetGroups);
        this.$convertHtmlDescriptionText(training.descriptions);
        this.$convertHtmlDescriptionText(training.prerequesites);

        if(this.editMode){
          // Edit Training
          this.$axios
            .put("/api/training/" + this.trainingId, training)
            .then(function (response) {
              _this.$noty.success(_this.$t("training_edited", { name: response.data.designationsMap[_this.$locale] == 'undefined' ? response.data.designationsMap['EN'] : response.data.designationsMap[_this.$locale]}));
              _this.$router.push("/category/" + _this.categoryName);
            })
            .catch(this.onError);
        }else{
          // Create new Training
          this.$axios
            .post("/api/training", training)
            .then(function (response) {
              _this.$noty.success(_this.$t("training_saved", { name: response.data.designationsMap[_this.$locale] }));
              _this.$router.push("/category/" + _this.categoryName);
            })
            .catch(this.onError);
        }
      },

      deleteTraining(){
        if(this.trainingId == null){
          console.error("You are not editing an existing training.");
          return;
        }

        var _this = this;

        this.$axios
          .delete("/api/training/" + this.trainingId)
          .then(function (response) {
            _this.$noty.success(_this.$t("training_deleted", { name: _this.training.designationsMap[_this.$locale] }));
            _this.$router.push("/category/" + _this.categoryName);
          })
          .catch(this.onError);
      },

      onFinally(){
        showLoadingCircle(false);
      },

    }
}
</script>