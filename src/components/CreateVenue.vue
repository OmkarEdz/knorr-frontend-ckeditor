<template>
<div>
  <div>
    <div class="sixteentosix omt-6 omt-md-25">
      <div class="kachelimage header-image" style="background: url('/static/img/worldmap.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5" v-if="editMode">{{ $t("edit_venue") }}</div>
        <div class="text-subtitle-2 text-md-h5" v-else>{{ $t("create_venue") }}</div>
      </div>
      </div>
    </div>
  </div>

  <div>
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
        <!-- Put Content here -->
        <v-tabs-items v-model="languageTab">
          <v-tab-item v-for="language in $languageTabs"
          :key="language">
            <div class="row disablerow justify-content-between">

                <div class="col-md-6 row disablerow">
                    <div class="col-md-12 pt-0">
                        <span class="headlinecolor text-h6"> {{$t("general")}}</span>
                    </div>
                    <div class="col-sm-12 col-md-12 ">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('designation') + '*'"
                        v-model="venue.designation"
                        ></v-text-field>
                    </div>
                     <div class=" col-md-12 pt-0">
                <v-text-field  
                hide-details="auto"
                class="datainput justify-content-end align-self-center pb-1"
                dense
                outlined
                :label="$t('sortNumber')"
                v-model="venue.sortNumber"
                ></v-text-field>
                
              </div>
                    <div class="col-sm-10 col-md-10 ">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('street')"
                        v-model="venue.street"
                        ></v-text-field>
                    </div>
                    <div class="col-12 col-sm-2 col-md-2 pl-sm-0 ">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('number')"
                        v-model="venue.hnr"
                        ></v-text-field>
                    </div>
                    <div class="col-sm-4 col-md-3 pr-sm-0 ">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('postal code') + '*'"
                        v-model="venue.zip"
                        ></v-text-field>
                    </div>
                    <div class="col-sm-8 col-md-9 ">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('location') + '*'"
                        v-model="venue.city"
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
                        v-model="venue.country"
                        ></v-select>
                    </div>
                    <div v-show="$rights.includes('TENANT_INDEPENDENCE')" class="col-sm-12 col-md-12">
                        <v-autocomplete  
                        v-model="venue.tenantId"
                        hide-details="auto"
                        class="datainput justify-content-end searchbar align-self-center pb-1"
                        :items="tenants"
                        item-text='name'
                        item-value='id'
                        style="padding-right:2px"
                        dense
                        outlined
                        :label="$t('tenant') + '*'"/>
                    </div>
                    <div class="col-sm-12 col-md-12">
                      <v-combobox
                        v-model="rooms"
                        :filter="filter"
                        :hide-no-data="!search"
                        :items="allRooms"
                        :search-input.sync="search"
                        hide-selected
                        :label="$t('rooms')"
                        multiple
                        small-chips
                        class="datainput roominput"
                        dense
                        outlined
                        hide-details="auto"
                      >
                        <template v-slot:no-data>
                          <v-list-item>
                            <span class="subheading">{{ $t("create") }}&nbsp;</span>
                            <v-chip
                              :color="`${colors[nonce - 1]} lighten-3`"
                              label
                              small
                            >
                              {{ search }}
                            </v-chip>
                          </v-list-item>
                        </template>
                        <template v-slot:selection="{ attrs, item, parent, selected }">
                          <v-chip
                            v-if="item === Object(item)"
                            v-bind="attrs"
                            :color="`${item.color} lighten-3`"
                            :input-value="selected"
                            label
                            small
                            class="mb-1"
                          >
                            <span class="pr-2">
                              {{ item.text }}
                            </span>
                            <v-icon
                              small
                              @click="parent.selectItem(item)"
                            >
                              $delete
                            </v-icon>
                          </v-chip>
                        </template>
                        <template v-slot:item="{ index, item }">
                          <v-text-field
                            v-if="editing === item"
                            v-model="editing.text"
                            autofocus
                            flat
                            background-color="transparent"
                            hide-details
                            solo
                            @keyup.enter="edit(index, item)"
                          ></v-text-field>
                          <v-chip
                            v-else
                            :color="`${item.color} lighten-3`"
                            dark
                            label
                            small
                          >
                            {{ item.text }}
                          </v-chip>
                          <v-spacer></v-spacer>
                          <v-list-item-action @click.stop>
                            <v-btn
                              icon
                              @click.stop.prevent="edit(index, item)"
                            >
                              <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </template>
                      </v-combobox>
                    </div>
                    <div class="col-md-12">
                      <v-checkbox
                        v-model="venue.knorrBremseLocation"
                        class="no-margin-top"
                        :label="$t('knorrBremseLocation')"
                      ></v-checkbox>
                    </div>
                    <div class="col-md-12">
                      <Upload v-model="venue.image" />
                    </div>
                    <div class="col-md-12">
                      <Upload v-model="venue.directionsPdfs[language.shortForm]" accept="application/pdf" allowOtherFileTypes="true" :label="$t('directions') + ' ' + $t('email')" />
                    </div>
                    
                </div>
                <div class="col-md-6 disablerow">
                    <div class="col-md-12 pt-0">
                        <span class="headlinecolor text-h6"> {{$t("contact")}}</span>
                    </div>
                    <div class="col-md-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('name')"
                        ></v-text-field>
                    </div>
                    <div class="col-md-12 ">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('phone')"
                        ></v-text-field>
                    </div>
                    <div class="col-md-12 ">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('email')"
                        ></v-text-field>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
              <div class="col-md-12 pt-0 pl-0">
                  <span class="headlinecolor text-h6"> {{$t("directions") + ' ' + $t('online')}}</span>
              </div>
              <div class="directions html-editor">
                  <vue-editor
                  v-model="venue.descriptions[language.shortForm]"
                  :editor-toolbar="customToolbar"
                  />
              </div>
            </div>
            <div class="col-md-12">
              <div class="col-md-12 pt-0 pl-0">
                  <span class="headlinecolor text-h6"> {{$t("description")}}</span>
              </div>
              <div class="directions html-editor">
                  <vue-editor
                  v-model="venue.onlineDescriptions[language.shortForm]"
                  :editor-toolbar="customToolbar"
                  />
              </div>
            </div>
          </v-tab-item>
          <div class="text-right">
            <v-label>
              * {{ $t("mandatory_fields") }}
            </v-label>
          </div>
        </v-tabs-items>
    </div>
    <div class="col-xl-3 px-0 pl-8 pl-md-12 row pt-0">
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn v-show="editMode" @click="deleteVenue()" outlined depressed tile class="mr-2 deletebutton mb-2"> <v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
          <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn @click="saveVenue()" outlined depressed tile class="save mb-2">{{ $t("save") }}</v-btn>
        </div>
        <Contact />
      </div>

    </div>
  </div>
  </div>
  </div>
</template>

<script>
import Card from "./custom/Card.vue";
export default {
  components: {
    Card,
  },

  props: {
    //   categoryName: String,
    venueId: Number,
  },

  data() {
    return {
      editMode: false,
      allCategories: [], // Full data of category list
      categories: [], // only data for select boxes
      countries: [], // only data for select boxes
      languageTab: null,
      selectedCategory: null,
      allRooms: [],
      tenants: [],

      customToolbar: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["clean"]
        ],

      types: [
        { value: "PRESENCE", text: this.$t("PRESENCE") },
        { value: "VIDEO", text: this.$t("VIDEO") },
        { value: "VIRTUAL", text: this.$t("VIRTUAL") },
        { value: "PRESENCE_AND_VIRTUAL", text: this.$t("PRESENCE_AND_VIRTUAL") },
      ],

      // training: {
      //   designations: {},
      //   goals: {},
      //   prerequesites: {},
      //   descriptions: {},
      //   type: null,
      //   qualificationNumber: null,
      //   category: null,
      //   minParticipants: null,
      //   maxParticipants: null,
      //   showUpcomingSchedules: true,
      // }

      venue: {
        designations: {},
        descriptions: {},
        onlineDescriptions: {},
        streets: {},
        hnr: null,
        zip: null,
        cities: {},
        region: null,
        country: null,
        tenantId: null,
        descriptionsMap: {},
        onlineDescriptionsMap: {},
        image: null,
        directionsPdfs: {},
        sortNumber:null
      },

      rooms: [],

      activator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      editingIndex: -1,
      // items: [
      //   { header: 'Select an option or create one' },
      //   {
      //     text: 'Foo',
      //     color: 'blue',
      //   },
      //   {
      //     text: 'Bar',
      //     color: 'red',
      //   },
      // ],
      nonce: 1,
      menu: false,
      x: 0,
      search: null,
      y: 0,
    };
  },

  mounted() {
    //   if(this.categoryName != null){
    //     this.fetchSelectedCategory();
    //   }
    this.fetchCountries();
    this.fetchRooms();
    if (this.venueId != null) {
      this.editMode = true;
      this.fetchEditingVenue();
    }

    if(this.$rights.includes('TENANT_INDEPENDENCE')){
      this.fetchTenants();
    }
  },

  watch: {
    rooms(val, prev) {
      if (val.length === prev.length) return;

      this.rooms = val.map((v) => {
        if (typeof v === "string") {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          };

          this.allRooms.push(v);

          this.nonce++;
        }

        return v;
      });
    },
  },

  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.editingIndex = index;
      } else {
        this.editing = null;
        this.editingIndex = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },

    onError(err) {
      if (err.response != null && err.response.data != null) {
        this.$noty.error(err.response.data);
      } else {
        console.error(err);
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
    fetchRooms() {
      var _this = this;
      if(this.venueId == null) return;

      this.$axios
        .get("/api/room/location/id/" + this.venueId)
        .then(function (response) {
          const result = response.data.content;
          for (let i = 0; i < result.length; i++) {
            const resultRoom = result[i];
            _this.allRooms.push({
              id: resultRoom.id,
              text: resultRoom.designation,
              // color: null
            });
          }

          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
    fetchTenants() {
      var _this = this;
      this.tenants = [],
      this.$axios
        .get("/api/tenant")
        .then(function (response) {
          _this.tenants = response.data.content;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },

    lowerCaseMapKeys(map) {
      for (var key in map) {
        if (map.hasOwnProperty(key)) {
          if (key == key.toUpperCase()) continue;
          map[key.toUpperCase()] = map[key];
          delete map[key];
        }
      }
    },

    fetchEditingVenue() {
      var _this = this;
      this.$axios
        .get("/api/location/" + this.venueId)
        .then(function (response) {
          _this.venue = response.data;

          // _this.categoryName = _this.training.category.designationUrl;

          // _this.training.category = {
          //   value: _this.training.category.id,
          //   text: _this.training.category.designationMap[_this.$locale]
          // }

          _this.venue.descriptions = _this.venue.descriptionsMap;
          _this.lowerCaseMapKeys(_this.venue.descriptions);

          _this.venue.onlineDescriptions = _this.venue.onlineDescriptionsMap;
          _this.lowerCaseMapKeys(_this.venue.onlineDescriptions);

          _this.venue.directionsPdfs = _this.venue.directionsPdfsMap;
          _this.lowerCaseMapKeys(_this.venue.directionsPdfs);

          _this.venue.tenantId = _this.venue.tenant != null ? _this.venue.tenant.id : null;

          // _this.venue.designations = _this.venue.designationsMap;
          // _this.lowerCaseMapKeys(_this.venue.designations);
          // _this.venue.streets = _this.venue.streetsMap;
          // _this.lowerCaseMapKeys(_this.venue.designations);
          // _this.venue.hnr = _this.venue.nhrsMap;
          // _this.lowerCaseMapKeys(_this.venue.designations);
          // _this.venue.zips = _this.venue.zipsMap;
          // _this.lowerCaseMapKeys(_this.venue.designations);
          // _this.venue.cities = _this.venue.citiesMap;
          // _this.lowerCaseMapKeys(_this.venue.designations);

          // _this.venue.descriptions = _this.venue.descriptionsMap;
          // _this.lowerCaseMapKeys(_this.venue.descriptions);
          // _this.venue.goals = _this.venue.goalsMap;
          // _this.lowerCaseMapKeys(_this.venue.goals);
          // _this.venue.prerequesites = _this.venue.prerequesitesMap;
          // _this.lowerCaseMapKeys(_this.venue.prerequesites);
          // _this.training.category = {
          //   value: response.data.id,
          //   text: response.data.designationMap[_this.$locale]
          // };
        })
        .catch(this.onError);

      this.$axios
        .get("/api/room/location/id/" + this.venueId)
        .then(function (response) {
          const result = response.data.content;
          for (let i = 0; i < result.length; i++) {
            const resultRoom = result[i];
            _this.rooms.push({
              id: resultRoom.id,
              text: resultRoom.designation,
              // color: null
            });
          }
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },

    saveVenue() {
      var _this = this;
      this.venue.rooms = this.rooms;
      var venue = {};
      venue = Object.assign(venue, this.venue);


      // Preparing rooms for save
      for (let i = 0; i < venue.rooms.length; i++) {
        const room = venue.rooms[i];
        room.designation = room.text;
        delete room.text;
        delete room.color;
      }

      if (venue.designation == null) {
        this.$noty.error(
          this.$t("empty_value", { name: this.$t("designation") })
        );
        return;
      }
      // if (venue.street == null) {
      //   this.$noty.error(this.$t("empty_value", { name: this.$t("street") }));
      //   return;
      // }
      // if (venue.hnr == null) {
        
      //   this.$noty.error(this.$t("empty_value", { name: this.$t("number") }));
      //   return;
      // }
      if (venue.zip == null) {
        this.$noty.error(
          this.$t("empty_value", { name: this.$t("postal code") })
        );
        return;
      }
      if (venue.city == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("location") }));
        return;
      }
      if (venue.country == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("country") }));
        return;
      }
      if (this.$rights.includes('TENANT_INDEPENDENCE') && venue.tenantId == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("tenant") }));
        return;
      }

      this.$convertHtmlDescriptionText(venue.descriptions);
      this.$convertHtmlDescriptionText(venue.onlineDescriptions);

      // training.categoryId = training.category.value == null ? training.category : training.category.value;

      if (this.editMode) {
        // Edit Training
        this.$axios
          .put("/api/location/" + this.venueId, this.venue)
          .then(function (response) {
            _this.$noty.success(
              _this.$t("venue_edited", { name: response.data.designation })
            );
             _this.$router.push("/venues/");
          })
          .catch(this.onError);
      } else {
        // Create new Training
        this.$axios
          .post("/api/location", this.venue)
          .then(function (response) {
            _this.$noty.success(
              _this.$t("venue_saved", { name: response.data.designation })
            );
             _this.$router.push("/venues");
          })
          .catch(this.onError);
      }
    },

    deleteVenue() {
      if (this.venueId == null) {
        console.error("You are not editing an existing venue.");
        return;
      }

      var _this = this;

      this.$axios
        .delete("/api/location/" + this.venueId)
        .then(function (response) {
          _this.$noty.success(
            _this.$t("venue_deleted", { name: _this.venue.designation })
          );
          _this.$router.push("/venues");
        })
        .catch(this.onError);
    },

    onFinally() {
      showLoadingCircle(false);
    },
  },
};
</script>
