<template>
<div>
  <div>
    <div class="sixteentosix omt-6 omt-md-25">
      <div class="kachelimage header-image" style="background: url('/static/img/laptop_lock.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5" v-if="editMode">{{ $t("edit_user") }}</div>
        <div class="text-subtitle-2 text-md-h5" v-else>{{ $t("create_user") }}</div>
      </div>
      </div>
    </div>
  </div>

  <div>
    <div class="pt-8">
    <div class="row disablerow justify-content-between align-items-start">

    <!-- Tabs -->
    <v-tabs
      v-model="selectedTab"
      align-with-title
      class="LanguageselectTabgroup pt-md-4 pt-lg-0 pl-md-8 pl-4"
    >
      <v-tabs-slider color="indigo"></v-tabs-slider>

      <v-tab v-for="userType in userTypes"
        :key="userType" class="LanguageselectTab">
        {{ $t(userType) }}
      </v-tab>
    </v-tabs>
    <div class="col-md-12 col-xl-9 innercreatetraining mb-3 mb-lg-0 pt-5 px-md-8 px-4 mx-0 pa-0">
        <!-- Put Content here -->
        <v-tabs-items v-model="selectedTab">
          <v-tab-item v-for="userType in userTypes"
            :key="userType">
            <div class="row disablerow justify-content-between pt-4">

                <div v-bind:class="userTypes[selectedTab] == 'all'? 'col-md-4' : 'col-md-6'" class="row disablerow">
                    <div v-show="userTypes[selectedTab] == 'all'" class="col-md-12 pt-0">
                        <span class="headlinecolor text-h6"> {{$t("general")}}</span>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'all'" class="col-sm-12 col-md-12 ">
                        <v-text-field  
                        
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('firstname') + '*'"
                        v-model="user.firstname"
                        ></v-text-field>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'all'" class="col-sm-12 col-md-12">
                        <v-text-field  
                        
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('lastname') + '*'"
                        v-model="user.lastname"
                        ></v-text-field>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'all'" class="col-sm-12 col-md-12 ">
                        <v-select  
                        hide-details="auto"
                        :items="roles"
                        item-text='name'
                        item-value='id'
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        multiple
                        :label="$t('role') + '*'"
                        v-model="user.roles"
                        @change="showInfoToEnterTab()"
                        >
                        <template slot="item" slot-scope="data">
                          {{ $t(data.item)}}
                        </template>
                        <template slot="selection" slot-scope="data">
                          {{ $t(data.item)}}
                        </template></v-select>
                    </div>
                    <div v-show="$rights.includes('TENANT_INDEPENDENCE') && (userTypes[selectedTab] == 'trainer' || userTypes[selectedTab] == 'translator'|| userTypes[selectedTab] == 'contact_person')" class="col-sm-12 col-md-12 " >
                        <v-autocomplete  
                        v-model="user.tenantId"
                        hide-details="auto"
                        class="datainput justify-content-end searchbar align-self-center pb-1"
                        :items="tenants"
                        item-text='name'
                        item-value='id'
                        style="padding-right:2px"
                        dense
                        outlined
                        :label="$t('tenant')">
                        <!-- <template slot="item" slot-scope="data">
                          {{data.item.firstname}} {{data.item.lastname}}
                        </template>
                        <template slot="selection" slot-scope="data">
                          {{data.item.firstname}} {{data.item.lastname}};
                        </template> 
                        <template v-slot:append>
                              <v-icon color="#003A60">fas fa-home</v-icon>
                        </template>-->
                        </v-autocomplete> 
                    </div>
                    <div v-show="userTypes[selectedTab] == 'trainer'" class="col-sm-12 col-md-12">
                        <v-checkbox
                            v-model="user.trainer"
                            class="no-margin-top"
                            :label="$t('trainer')"
                            :disabled="user.contactPerson || user.participant || user.booker"
                            hide-details="auto"
                            :messages="hintMessages.trainermessage"
                        ></v-checkbox>
                        <div>
                        <p class="mt-5">{{$t("partTimeFullTimeText")}}</p>
                        <v-radio-group v-model="user.trainerType"  dense class="justify-content-end align-self-center">
                         <v-radio
                             :key="'partTime'"
                             :label="$t('partTime')"
                             :value="'partTime'"
                         ></v-radio>
                         <v-radio
                             :key="'fullTime'"
                             :label="$t('fullTime')"
                             :value="'fullTime'"
                          > </v-radio>
                        </v-radio-group>
                        </div>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'translator'" class="col-sm-12 col-md-12 ">
                        <v-autocomplete  
                        hide-details="auto"
                        :items="$selectableLanguages"
                        class="datainput justify-content-end align-self-center pb-1"
                        item-text="name"
                        item-value="key"
                        dense
                        outlined
                        multiple
                        :label="$t('languages')"
                        v-model="user.languages"
                        >
                        </v-autocomplete>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'translator'" class="col-sm-12 col-md-12">
                        <v-checkbox
                            v-model="user.translator"
                            class="no-margin-top"
                            :label="$t('translator')"
                            hide-details="auto"
                            :disabled="user.participant || user.booker"
                            :messages="hintMessages.translatormessage"
                        ></v-checkbox>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'contact_person'" class="col-sm-12 col-md-12">
                        <v-checkbox
                            v-model="user.contactPerson"
                            class="no-margin-top"
                            :label="$t('contactPerson')"
                            :disabled="user.trainer || user.participant || user.booker"
                            hide-details="auto"
                            :messages="hintMessages.contactPersonmessage"
                        ></v-checkbox>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'contact_person'" class="col-sm-12 col-md-12">
                        <v-checkbox
                            v-model="user.headOffice"
                            class="no-margin-top"
                            hide-details="auto"
                            :label="$t('head_office')"
                        ></v-checkbox>
                    </div>
                    
                    <div v-show="userTypes[selectedTab] == 'booker' || userTypes[selectedTab] == 'participant'" class="col-sm-12 col-md-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('debitor')"
                        v-model="user.debitor"
                        ></v-text-field>
                    </div>
                    <!-- <div v-show="userTypes[selectedTab] == 'booker' || userTypes[selectedTab] == 'participant'" class="col-sm-12 col-md-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('personnelnumber')"
                        v-model="user.personnelnumber"
                        ></v-text-field>
                    </div> -->
                    <div v-show="userTypes[selectedTab] == 'participant'" class="col-sm-12 col-md-12 pt-0">
                        <v-checkbox
                            v-model="user.participant"
                            class="no-margin-top"
                            :label="$t('participant')"
                            hide-details="auto"
                            :disabled="user.contactPerson || user.translator || user.trainer"
                            :messages="hintMessages.participantmessage"
                        ></v-checkbox>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'booker'" class="col-sm-12 col-md-12 pt-0">
                        <v-checkbox
                            v-model="user.booker"
                            class="no-margin-top"
                            :label="$t('booker')"
                            hide-details="auto"
                            :disabled="user.contactPerson || user.translator || user.trainer"
                            :messages="hintMessages.bookermessage"
                        ></v-checkbox>
                    </div>
                </div>

                <div v-bind:class="userTypes[selectedTab] == 'all'? 'col-md-4' : 'col-md-6'" class="disablerow">
                    <div v-show="userTypes[selectedTab] == 'all'" class="col-md-12 pt-0">
                        <span class="headlinecolor  text-h6"> {{$t("contact")}}</span>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'all'" class="col-sm-12 col-md-12">
                        <v-text-field  
                        
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('email') + '*'"
                        v-model="user.email"
                        ></v-text-field>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'all'" class="col-sm-12 col-md-12">
                        <v-text-field  
                        
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('password')"
                        type="password"
                        :rules="[rules.password]"
                        v-model="user.password"
                        ></v-text-field>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'all'" class="col-sm-12 col-md-12">
                        <v-select  
                        hide-details="auto"
                        :items="positions"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('position')"
                        v-model="user.position"
                        >
                        <!-- <template slot="item" slot-scope="data">
                          {{ $t(data.item)}}
                        </template>
                        <template slot="selection" slot-scope="data">
                          {{ $t(data.item)}}
                        </template> -->
                        </v-select>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'booker' || userTypes[selectedTab] == 'participant'" class="col-sm-12 col-md-12">
                        <v-autocomplete  
                        v-model="user.tenantId"
                        hide-details="auto"
                        class="datainput justify-content-end searchbar align-self-center pb-1"
                        :items="customers"
                        item-text='name'
                        item-value='id'
                        style="padding-right:2px"
                        dense
                        outlined
                        :label="$t('customer')"/>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'booker' || userTypes[selectedTab] == 'participant'" class="col-sm-12 col-md-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('location')"
                        v-model="user.location"
                        ></v-text-field>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'trainer' || userTypes[selectedTab] == 'contact_person'" class="col-md-12 pt-4">
                      <Upload v-model="user.trainerImage" />
                    </div>
                    <div v-show="userTypes[selectedTab] == 'trainer' || userTypes[selectedTab] == 'contact_person'" class="col-sm-12 col-md-12 pt-0">
                        <v-checkbox
                            v-model="user.showPublic"
                            class="no-margin-top"
                            :label="$t('showPublic')"
                        ></v-checkbox>                        
                    </div>                
                </div>

                <div v-bind:class="userTypes[selectedTab] == 'all'? 'col-md-4' : 'hide'" class="disablerow">
                    <div v-show="userTypes[selectedTab] == 'all'" class="col-md-12 pt-0">
                        <span class="headlinecolor  text-h6"> {{$t("organization")}}</span>
                    </div>
                    <div v-show="userTypes[selectedTab] == 'all'" class="col-sm-12 col-md-12 ">
                        <v-select  
                        :items="states"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        item-text="text"
                        item-value="id"
                        :label="$t('status')"
                        v-model="user.status"
                        ></v-select>
                    </div>
                    <div v-show="$rights.includes('TENANT_INDEPENDENCE') && userTypes[selectedTab] == 'all'" class="col-sm-12 col-md-12 " >
                        <v-autocomplete  
                        v-model="user.tenantId"
                        hide-details="auto"
                        class="datainput justify-content-end searchbar align-self-center pb-1"
                        :items="tenants"
                        item-text='name'
                        item-value='id'
                        style="padding-right:2px"
                        dense
                        outlined
                        :label="$t('tenant')"/>
                    </div>
                </div>
            </div>
            </v-tab-item>
            <div class="text-right">
            <div v-show="user.blockedAtFormatted != ''"><v-label>{{ $t("blocked_since") }} {{ user.blockedAtFormatted }}</v-label></div>
            &nbsp;&nbsp;&nbsp;
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
          <v-btn v-show="editMode" @click="deleteUser()" outlined depressed tile class="mr-2 mb-2 deletebutton"> <v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
          <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn @click="saveUser()" outlined depressed tile class="save mr-2 mb-2">{{ $t("save") }}</v-btn>
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
    userId: Number,
  },

  data() {
    return {
      editMode: false,
      allCategories: [], // Full data of category list
      categories: [], // only data for select boxes
      countries: [], // only data for select boxes
      selectedCategory: null,
      roles:[],
      customers: [],
      allRooms: [],
      positions: [
        {
          id: "Management",
          text: this.$t("management"),
        },
        {
          id: "Purchasing",
          text: this.$t("purchasing"),
        },
        {
          id: "Marketing",
          text: this.$t("marketing"),
        },
        {
          id: "Technic",
          text: this.$t("technic"),
        },
      ],
      states: [
        {
          id: "ACTIVE",
          text: this.$t("active"),
        },
        {
          id: "BLOCKED",
          text: this.$t("blocked"),
        },
      ],
      tenants:[],
      selectedTab:null,
      hintMessages:{
        contactPersonmessage: [],
        trainermessage: [],
        translatormessage: [],
        bookermessage: [],
        participantmessage: [],
      },
      userTypes: [
        "all",
        "trainer",
        "translator",
        "contact_person",
        // "participant",
        "booker"
      ],

      rules: {
          password: value => {
            if((value == null || value == "")) return true;
            const pattern = /^(?=.{12,})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])).*/;
            return (
              pattern.test(value) || this.$t("password_error")
            )
          }
        },


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

      user: {
        firstname: null,
        lastname: null,
        password: null,
        status: null,
        active: true,
        position: null,
        contactRole:null,
        trainer: null,
        trainerImage: null,
        personnelnumber: null,
        debitor: null,
        company: null,
        roles: [],
        languages: [],
        location:null,
        email: null,
        tenant:{},
        trainer:false,
        translator:false,
        contactPerson:false,
        participant:false,
        booker:false,
        blocked: false,
        trainerType:"fullTime"
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
  computed:{
      valdidateCheckbox(){
          return [this.user.trainer != true || "Man darf nicht Trainer und Ansprechpartner angehakt haben"]
      }
  },

  watch: {
      'user.contactPerson':function(){
        if(this.user.contactPerson){
          this.hintMessages.trainermessage.push(this.$t("HINT_ISCONTACTPERSON_ISTRAINER"));
          this.hintMessages.participantmessage.push(this.$t("HINT_ISCONTACTPERSON_ISPARTICIPANT"));
          this.hintMessages.bookermessage.push(this.$t("HINT_ISCONTACTPERSON_ISBOOKER"));

          // Add Role if not already present
          if(!this.user.roles.includes("CONTACTPERSON")) this.user.roles.push("CONTACTPERSON");
        }else{
          this.hintMessages.trainermessage = this.hintMessages.trainermessage.filter(e => e !== this.$t("HINT_ISCONTACTPERSON_ISTRAINER"));
          this.hintMessages.participantmessage = this.hintMessages.participantmessage.filter(e => e !== this.$t("HINT_ISCONTACTPERSON_ISPARTICIPANT"));
          this.hintMessages.bookermessage = this.hintMessages.bookermessage.filter(e => e !== this.$t("HINT_ISCONTACTPERSON_ISBOOKER"));

          // Remove Role if present
          if(this.user.roles.includes("CONTACTPERSON")) this.user.roles = this.user.roles.filter(e => e !== "CONTACTPERSON");
        }
      },

      'user.trainer':function(){
        if(this.user.trainer){
          this.hintMessages.contactPersonmessage.push(this.$t("HINT_ISTRAINER_ISCONTACTPERSON"));
          this.hintMessages.participantmessage.push(this.$t("HINT_ISTRAINER_ISPARTICIPANT"));
          this.hintMessages.bookermessage.push(this.$t("HINT_ISTRAINER_ISBOOKER"));

          // Add Role if not already present
          if(!this.user.roles.includes("TRAINER")) this.user.roles.push("TRAINER");
        }else{
          this.hintMessages.contactPersonmessage = this.hintMessages.contactPersonmessage.filter(e => e !== this.$t("HINT_ISTRAINER_ISCONTACTPERSON"));
          this.hintMessages.participantmessage = this.hintMessages.participantmessage.filter(e => e !== this.$t("HINT_ISTRAINER_ISPARTICIPANT"));
          this.hintMessages.bookermessage = this.hintMessages.bookermessage.filter(e => e !== this.$t("HINT_ISTRAINER_ISBOOKER"));

          // Remove Role if present
          if(this.user.roles.includes("TRAINER")) this.user.roles = this.user.roles.filter(e => e !== "TRAINER");
        }
      },

      'user.translator':function(){
        if(this.user.translator){
          this.hintMessages.participantmessage.push(this.$t("HINT_ISTRANSLATOR_ISPARTICIPANT"));
          this.hintMessages.bookermessage.push(this.$t("HINT_ISTRANSLATOR_ISBOOKER"));
        }else{
          this.hintMessages.participantmessage = this.hintMessages.participantmessage.filter(e => e !== this.$t("HINT_ISTRANSLATOR_ISPARTICIPANT"));
          this.hintMessages.bookermessage = this.hintMessages.bookermessage.filter(e => e !== this.$t("HINT_ISTRANSLATOR_ISBOOKER"));
        }
      },

      'user.participant':function(){
        if(this.user.participant){
          this.hintMessages.contactPersonmessage.push(this.$t("HINT_ISPARTICIPANT_ISCONTACTPERSON"));
          this.hintMessages.trainermessage.push(this.$t("HINT_ISPARTICIPANT_ISTRAINER"));
          this.hintMessages.translatormessage.push(this.$t("HINT_ISPARTICIPANT_ISTRANSLATOR"));
        }else{
          this.hintMessages.contactPersonmessage = this.hintMessages.contactPersonmessage.filter(e => e !== this.$t("HINT_ISPARTICIPANT_ISCONTACTPERSON"));
          this.hintMessages.trainermessage = this.hintMessages.trainermessage.filter(e => e !== this.$t("HINT_ISPARTICIPANT_ISTRAINER"));
          this.hintMessages.translatormessage = this.hintMessages.translatormessage.filter(e => e !== this.$t("HINT_ISPARTICIPANT_ISTRANSLATOR"));
        }
      },

      'user.booker':function(){
        if(this.user.booker){
          this.hintMessages.contactPersonmessage.push(this.$t("HINT_ISBOOKER_ISCONTACTPERSON"));
          this.hintMessages.trainermessage.push(this.$t("HINT_ISBOOKER_ISTRAINER"));
          this.hintMessages.translatormessage.push(this.$t("HINT_ISBOOKER_ISTRANSLATOR"));

          // Add Role if not already present
          if(!this.user.roles.includes("BOOKER")) this.user.roles.push("BOOKER");
        }else{
          this.hintMessages.contactPersonmessage = this.hintMessages.contactPersonmessage.filter(e => e !== this.$t("HINT_ISBOOKER_ISCONTACTPERSON"));
          this.hintMessages.trainermessage = this.hintMessages.trainermessage.filter(e => e !== this.$t("HINT_ISBOOKER_ISTRAINER"));
          this.hintMessages.translatormessage = this.hintMessages.translatormessage.filter(e => e !== this.$t("HINT_ISBOOKER_ISTRANSLATOR"));

          // Remove Role if present
          if(this.user.roles.includes("BOOKER")) this.user.roles = this.user.roles.filter(e => e !== "BOOKER");
        }
      },

      'user.roles': function(){
        if(this.user.roles.includes("TRAINER")){
          this.user.trainer = true;
          this.user.booker = false;
          if(this.user.roles.includes("BOOKER")) this.user.roles = this.user.roles.filter(e => e !== "BOOKER");
        }else{
          this.user.trainer = false;
        }
        if(this.user.roles.includes("CONTACTPERSON")){
          this.user.contactPerson = true;
          this.user.booker = false;
          if(this.user.roles.includes("BOOKER")) this.user.roles = this.user.roles.filter(e => e !== "BOOKER");
        }else{
          this.user.contactPerson = false;
        }
        if(this.user.roles.includes("BOOKER")){
          this.user.booker = true;
          this.user.trainer = false;
          this.user.concactPerson = false;
          this.user.translator = false;
        }else{
          this.user.booker = false;
        }
        
      }

  },

  mounted() {
    //   if(this.categoryName != null){
    //     this.fetchSelectedCategory();
    //   }
    this.log();
    this.fetchCountries();
    this.fetchCustomers();
    this.fetchTenants();
    this.fetchRooms();
    this.fetchRoles();
    if (this.userId != null) {
      this.editMode = true;
      this.fetchEditingUser();
    }
    //   this.fetchUsers();
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
    log(){
        console.log(this.$languages);
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
          _this.countries = response.data;
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
          const tenants = response.data.content;
          for (let i = 0; i < tenants.length; i++) {
            const tenant = tenants[i];
            _this.tenants.push(tenant);
          }
          // _this.tenantFilter = _this.tenants[0].id;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
    fetchCustomers() {
      var _this = this;
      this.$axios
        .get("/api/tenant/customers")
        .then(function (response) {
          _this.customers = response.data.content;
          if(_this.$external && _this.customers.length == 1){
            _this.trainingEvent.customerId = _this.customers[0].id;
          }
        })
        .catch(this.onError);
    },
    fetchRoles(){
      var _this = this;
      this.$axios
        .get("/api/user/roles")
        .then(function (response) {
          _this.roles = response.data;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
    fetchRooms() {
      var _this = this;
      this.$axios
        .get("/api/room")
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

    lowerCaseMapKeys(map) {
      for (var key in map) {
        if (map.hasOwnProperty(key)) {
          if (key == key.toUpperCase()) continue;
          map[key.toUpperCase()] = map[key];
          delete map[key];
        }
      }
    },

    fetchEditingUser() {
      var _this = this;
      this.$axios
        .get("/api/user/" + this.userId)
        .then(function (response) {
          delete response.data.language;
          delete response.data.createdBy;
          _this.user = response.data;
          _this.user.status = response.data.blocked ? "BLOCKED" : "ACTIVE";
        })
        .catch(this.onError);
    },

    saveUser() {
      var _this = this;
      var user = {};
      var roles = "";
      var pwre = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
      user = Object.assign(user, this.user);
      
      user.roles = user.roles == null ? [] : user.roles;
      for (var i = 0; i < user.roles.length; i++) {
        roles = roles + user.roles[i] + ";";
      }
      user.roles = roles;
      if(user.languages != null){
        var languages = "";
        for (var i = 0; i < user.languages.length; i++) {
          languages = languages + user.languages[i] + ";";
        }
        user.languages = languages;
      }
      delete user.language;

      const userStatus = user.status + "";
      delete user.status;

      user.status = true;
      user.blocked = userStatus == "BLOCKED" ? true : false;
      if ((user.password != null && user.password != "") && !pwre.test(user.password)) {
        this.$noty.error(this.$t("password_dont_match"));
        return;
      }
      if (user.firstname == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("firstname") }));
        return;
      }
      if (user.lastname == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("lastname") }));
        return;
      }
      if (user.email == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("email") }));
        return;
      }
      if (user.roles == null || user.roles == "" || user.roles.length == 0) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("roles") }));
        return;
      }

      // training.categoryId = training.category.value == null ? training.category : training.category.value;

      progressIndicator.hidden = false;
      showLoadingCircle(true);
      
      if (this.editMode) {
        // Edit User
        this.$axios
          .put("/api/user/" + this.userId, user)
          .then(function (response) {
            _this.$noty.success(
              _this.$t("user_updated", { name: response.data.firstname + " " + response.data.lastname})
            );
             _this.$router.push("/users/");
          })
          .catch(this.onError)
          .finally(this.onFinally);
      } else {
        // Create new User
        this.$axios
          .post("/api/user", user)
          .then(function (response) {
            if(typeof response.data == "string"){
              _this.$noty.success(response.data);
            }else{
              _this.$noty.success(
                _this.$t("user_created", { name: response.data.firstname + " " + response.data.lastname })
              );
            }
             _this.$router.push("/users");
          })
          .catch(this.onError)
          .finally(this.onFinally);
      }
    },

    deleteUser() {
      if (this.userId == null) {
        console.error("You are not editing an existing user.");
        return;
      }

      var _this = this;

      this.$axios
        .delete("/api/user/" + this.userId)
        .then(function (response) {
          _this.$noty.success(
            _this.$t("user_deleted", { name: response.data.firstname + " " + response.data.lastname })
          );
          _this.$router.push("/users");
        })
        .catch(this.onError);
    },

    onFinally() {
      showLoadingCircle(false);
    },

    showInfoToEnterTab() {
      var tabs = [];
      if(this.user.roles.includes("BOOKER") && (this.user.roles.includes("TRAINER") || this.user.roles.includes("CONTACTPERSON"))) return;

      for (let i = 0; i < this.user.roles.length; i++) {
        const role = this.user.roles[i];
        switch (role) {
          case "TRAINER":
            tabs.push(this.$t("trainer"));
            break;
          case "CONTACTPERSON":
            tabs.push(this.$t("contact_person"));
            break;
          case "BOOKER":
            tabs.push(this.$t("booker"));
            break;
          default:
            break;
        }
      }
      if(tabs.length == 0) return;  
      const text = tabs.length == 1 ? this.$t("create_user_enter_tab_prefix_singular", {name: tabs.join(", ")}) : this.$t("create_user_enter_tab_prefix_plural", {name: tabs.join(", ")})
      this.$noty.info(text);
    }
  },
};
</script>
