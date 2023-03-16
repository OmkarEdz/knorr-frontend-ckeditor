<template>
<div>
  <div>
    <div class="sixteentosix omt-6 omt-md-25">
      <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5" v-if="editMode">{{$t("edit_category")}}</div>
        <div class="text-subtitle-2 text-md-h5" v-else>{{$t("create_category")}}</div>
      </div>
      </div>
    </div>
  </div>
  <div class="pt-8">
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
          <div class="col-md-12 mt-2">
            <v-text-field  
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-1"
            dense
            outlined
            :label="$t('designation')"
            v-model="category.designations[language.shortForm]"
            ></v-text-field>
          </div>
          <div class="col-md-12">
              <v-autocomplete  
                v-model="category.parentCategoryId"
                hide-details="auto"
                class="datainput justify-content-end searchbar align-self-center pb-1"
                :items="categories"
                item-text='text'
                item-value='value'
                style="padding-right:2px"
                dense
                outlined
                clearable
                :label="$t('parent_category')">
              </v-autocomplete>
          </div>
          <div class="col-md-12">
            <Upload v-model="category.image" />
          </div>

        </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <div class="col-xl-3 px-0 pl-8 pl-md-12 row pt-0">
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn v-show="editMode" @click="deleteCategory()" outlined depressed tile class="deletebutton mr-2 mb-2"> <v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
          <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn @click="saveCategory()" outlined depressed tile class="save mr-2 mb-2">{{ $t("save") }}</v-btn>
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
      categoryId: Number,
    },

    data() {
      return {
        editMode: false,
        languageTab: null,
        categories: [],

        category: {
          designations: {},
          image: null,
        }
      }
    },

    mounted(){
      if(this.categoryId != null){
        this.editMode = true;
        this.fetchEditingCategory();
      }
      this.fetchCategories();
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

      fetchEditingCategory(){
        var _this = this;
        this.$axios
          .get("/api/category/" + this.categoryId)
          .then(function (response) {
            _this.category = response.data;

            _this.category.designations = _this.category.designationMap;
            _this.category.parentCategoryId = _this.category.parentCategory != null ? _this.category.parentCategory.id : null;
            _this.lowerCaseMapKeys(_this.category.designations);
          })
          .catch(this.onError);
      },

      fetchCategories(){
        var _this = this;
        this.$axios
          .get("api/category")
          .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
              const category = response.data[i];
              // Skip Categories which already have a parent Category (to restrict amount of Category layers)
              if(category.parentCategory != null) continue;
              _this.categories.push({
                value: category.id,
                text: category.designationMap[_this.$locale]
              });
            }
          })
          .catch(this.onError)
          .finally(this.onFinally);
      },

      saveCategory() {
        var _this = this;
        var category = {};
        category = Object.assign(category, this.category);

      
        // if(category.designations.DE == null && category.designations.EN == null){
        //   this.$noty.error(this.$t("english_or_german_mandatory"));
        //   return;
        // }
        if(category.image == null){
          this.$noty.error(this.$t("please_select_an_image"));
          return;
        }

        if(this.editMode){
          // Edit Category
          this.$axios
            .put("/api/category/" + this.categoryId, category)
            .then(function (response) {
              _this.$noty.success(_this.$t("category_edited", { name: response.data.designationMap[_this.$locale] }));
              _this.$router.push("/");
            })
            .catch(this.onError);
        }else{
          // Create new Category
          this.$axios
            .post("/api/category", category)
            .then(function (response) {
              _this.$noty.success(_this.$t("category_saved", { name: response.data.designationMap[_this.$locale] }));
              _this.$router.push("/");
            })
            .catch(this.onError);
        }
      },

      deleteCategory(){
        if(this.categoryId == null){
          console.error("You are not editing an existing category.");
          return;
        }

        var _this = this;

        this.$axios
          .delete("/api/category/" + this.categoryId)
          .then(function (response) {
            _this.$noty.success(_this.$t("category_deleted", { name: _this.category.designationMap[_this.$locale] }));
            _this.$router.push("/");
          })
          .catch(this.onError);
      },

      onFinally(){
        showLoadingCircle(false);
      },

    }
}
</script>