<template>
  <div id="app">
    <v-app>
      <v-app-bar app clipped-left style="height:auto;border-bottom:#003A60 solid d-xl-none" class="flex-grow-0">
        <div class="row pl-8">
          <div class="col-md pb-0 pt-md-10">
            <div class="row justify-content-between align-self-center menu-bar">
              <div class="top-bar-title text-center">
                Customer Training Portal
              </div>
              <v-app-bar-nav-icon class="d-xl-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
              <v-toolbar-title class="d-xl-none align-self-center"><img class="resimg" src="../assets/img/kb-logo.svg" width="150px"></v-toolbar-title>
              <a href="/"><img class="mbres mb-4 kb-header-logo" src="../assets/img/kb-logo.svg" width="200px"></a>
              <div class="row col-7 pb-0 align-self-center">
                <div class="row justify-content-end align-self-center align-self-md-end pr-3 right-menu-bar">
                  <div class="mr-md-9 align-self-center" style="width:54px">
                    <v-select
                      class="languagepicker"
                      :menu-props="{minWidth: '180'}"
                      v-model="selectedlanguage"
                      :items="possiblelanguages"
                      item-text="name"
                      item-value="shortForm"
                      hide-details
                      @input="setLanguage(selectedlanguage)"
                    >
                    <template slot="item" slot-scope="data">
                      <img style="width:26px;height:17px;vertical-align: unset;" :src="'/files/flags/' + data.item.flag"> &nbsp; {{data.item.name}}
                    </template>
                    <template slot='selection' slot-scope='{item}'>
                      <img style="width:26px;height:17px;vertical-align: unset;" :src="'/files/flags/' + item.flag">
                    </template>
                    </v-select>
                    <!-- <v-img @click="nothing()" width="26px" height="17px"  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"></v-img> -->
                    <!-- <img style="width:26px;height:17px;vertical-align: unset;" :src="language.flag"> -->
                  </div>
                  <div v-if="user == null">
                    <span><v-btn class="headerbtn no-border-bottom" color="#003A60" text depressed href="/login">Login &nbsp;<v-icon color="#003A60">fas fa-user-circle</v-icon></v-btn></span>
                  </div>
                  <div v-else>
                    <span class="resbtn"><v-btn class="headerbtn pr-0 mr-1 no-border-bottom" color="#003A60" text depressed disabled>{{ user.firstname }} {{ user.lastname }}&nbsp; <v-icon color="#003A60">fas fa-user-circle</v-icon></v-btn></span>&nbsp;
                    <span><v-btn class="headerbtn no-border-bottom" color="#003A60" text depressed href="/logout">Logout</v-btn></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row col-md-12 pl-8 px-0 py-0 justify-content-between">
              <v-btn to="/categories" :ripple="false" class="pl-0 mr-2 no-background-hover headerbtn mbres" text large>{{$t("training categories")}}</v-btn>
              <v-btn to="/training-events" v-show="user != null" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("trainingevents")}}</v-btn>
              <v-btn to="/users" v-show="user != null && $rights.includes('VIEW_USER')" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("user management")}}</v-btn>
              <v-btn to="/calendar" v-show="user != null && $rights.includes('VIEW_APPOINTMENTS')" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("schedule overview")}}</v-btn>

              <v-menu class="menu-content" :close-on-content-click="false" open-on-hover tile bottom offset-y min-width="100%" style="border-bottom: 5px solid var(--beige);">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" v-show="user == null" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("tools")}}</v-btn>
                </template>
                <v-list class="pt-0 pb-0">
                  <div class="row menu-row">
                    <div class="pl-8 pl-md-12 col-12 col-xl-9 pt-0 pb-13 row pr-0">
                      <div class="col-4">
                        <v-btn :href="`/tools/practical`" :ripple="false" class="justify-start pl-0 mr-2 no-background-hover menubtn mbres" text large>{{$t("practical training")}}</v-btn>
                      </div>
                      <div class="col-4">
                        <v-btn :href="`/tools/technical`" :ripple="false" class="justify-start pl-0 mr-2 no-background-hover menubtn mbres" text large>{{$t("technical coaching")}}</v-btn>
                      </div>
                      <div class="col-4">
                        <v-btn :href="`/tools/virtualclassroom`" :ripple="false" class="justify-start pl-0 mr-2 no-background-hover menubtn mbres" text large>{{$t("virtual classroom")}}</v-btn>
                      </div>
                      <div class="col-4">
                        <v-btn :href="`/tools/theory`" :ripple="false" class="justify-start pl-0 mr-2 no-background-hover menubtn mbres" text large>{{$t("theory training")}}</v-btn>
                      </div>
                      <div class="col-4">
                        <v-btn :href="`/tools/advisory`" :ripple="false" class="justify-start pl-0 mr-2 no-background-hover menubtn mbres" text large>{{$t("advisory")}}</v-btn>
                      </div>
                      <div class="col-4">
                        <v-btn :href="`/tools/virtualreality`" :ripple="false" class="justify-start pl-0 mr-2 no-background-hover menubtn mbres" text large>{{$t("virtual reality")}}</v-btn>
                      </div>
                    </div>
                    <div class="col-xl-3 pa-0 d-none d-xl-block">
                      <div class="sixteentonine">
                        <div class="kachelimage block-background-image" style="background-image: url('/static/img/tools_header.jpg')">
                          <div class="tools-headline"><h5 class="white--text py-1 mb-0">Trainingswerkzeuge der Lernplattform</h5></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-list>
              </v-menu>

              <v-menu class="menu-content" :close-on-content-click="false" open-on-hover bottom offset-y tile min-width="100%" style="border-bottom: 5px solid var(--beige);">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" v-show="user == null" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("offer")}}</v-btn>
                </template>
                <v-list class="pt-0 pb-0">
                  <div class="row menu-row">
                    <div class="pl-8 pl-md-12 pt-0 pb-13 pr-0 row">
                      <div class="col-12 col-xl-4">
                        <v-btn :href="`/offers/producttraining`" :ripple="false" class="justify-start pl-0 mr-2 no-background-hover menubtn mbres" text large>{{$t("producttraining")}}</v-btn>
                      </div>
                      <div class="col-12 col-xl-4">
                        <v-btn :href="`/offers/pressure`" :ripple="false" class="justify-start pl-0 mr-2 no-background-hover menubtn mbres" text large>{{$t("pressure")}}</v-btn>
                      </div>
                      <div class="col-12 col-xl-4">
                        <v-btn :href="`/offers/hydraulic`" :ripple="false" class="justify-start pl-0 mr-2 no-background-hover menubtn mbres" text large>{{$t("hydraulic")}}</v-btn>
                      </div>
                    </div>
                    <div class="col-xl-3 pa-0 d-none d-xl-block">
                      <div class="sixteentonine">
                        <div class="block-background-image kachelimage" style="background-image: url('/static/img/offers_header.jpg')">
                          <div class="tools-headline"><h5 class="white--text py-1 mb-0">Trainingsangebote der Lernplattform</h5></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-list>
              </v-menu>
              
              <v-btn to="/tenants" v-show="user != null && $rights.includes('VIEW_CUSTOMERS')" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("tenants")}}</v-btn>

              <v-btn to="/contactpersons" v-show="user == null" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("contactpersons")}}</v-btn>

              <!-- Veranstaltungsorte sollen öffentlich anders dargestellt werden als wenn man eingeloggt ist und diese verwaltet -->
              <v-btn to="/ourvenues" v-show="user == null" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("venues")}}</v-btn>
              <v-btn to="/venues" v-show="user != null && $rights.includes('CREATE_LOCATION')" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("venues")}}</v-btn>
              <v-btn to="/training-requests" v-show="user != null && $rights.includes('VIEW_TRAINING_REQUESTS')" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("training_requests")}}</v-btn>
              
              <v-btn to="/aboutus" v-show="user == null" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("aboutus")}}</v-btn>
              <v-btn to="/request" v-show="user == null || user.external" :ripple="false" class="mr-2 no-background-hover headerbtn mbres" text large>{{$t("training_request")}}</v-btn>
              <!-- <v-btn :ripple="false" class="mr-2 no-background-hover headerbtn" text large>MEINE LEHRER</v-btn> -->
          </div>
          <div class="header-divider"></div>
        </div>
      </v-app-bar>
      <v-navigation-drawer class="left-nav pt-0 pt-lg-16 d-xl-none" v-bind:style="drawer ? 'transform: scaleY(100%)' : 'transform: scaleY(0%)'" app clipped v-model="drawer">
        <!-- <div class="nav-img-container">
          <img class="d-xl-none" src="../assets/img/kb-logo.svg" alt="" style="height:75px">
        </div> -->
        <v-list nav class="p-0">

          <v-list-item class="mb-0 d-xl-none" href="/categories">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase font-16px">
                {{$t("training categories")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group :value="false" class="d-xl-none group-pl" v-show="user == null" @click="(mobileMenu.group1_expanded = !mobileMenu.group1_expanded); (mobileMenu.group2_expanded = false);">
              <template v-slot:appendIcon>
                <img class="ml-2 left-nav-icon" src="../assets/img/arrow_right_blue.svg" v-bind:style="mobileMenu.group1_expanded ? 'transform: rotate(270deg)' : 'transform: rotate(90deg)'" height="20px">
              </template>
              <template v-slot:activator>
                <v-list-item-title class="text-uppercase font-16px">
                  {{$t("tools")}}
                </v-list-item-title>
              </template>

              <v-list-item sub-group link class="d-xl-none" v-show="user == null" :href="`/offers/producttraining`">
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-16px">
                    {{$t("practical training")}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
              <v-list-item sub-group link class="d-xl-none" v-show="user == null" :href="`/tools/technical`">
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-16px">
                    {{$t("technical coaching")}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item sub-group link class="d-xl-none" v-show="user == null" :href="`/tools/virtualclassroom`">
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-16px">
                    {{$t("virtual classroom")}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
              <v-list-item sub-group link class="d-xl-none" v-show="user == null" :href="`/tools/theory`">
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-16px">
                    {{$t("theory training")}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item sub-group link class="d-xl-none" v-show="user == null" :href="`/tools/advisory`">
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-16px">
                    {{$t("advisory")}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item sub-group link class="d-xl-none" v-show="user == null" :href="`/tools/virtualreality`">
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-16px">
                    {{$t("virtual reality")}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </v-list-group>

          <v-list-group :value="false" class="d-xl-none group-pl" v-show="user == null" @click="(mobileMenu.group2_expanded = !mobileMenu.group2_expanded); (mobileMenu.group1_expanded = false);">
              <template v-slot:appendIcon>
                <img class="ml-2 left-nav-icon" src="../assets/img/arrow_right_blue.svg" v-bind:style="mobileMenu.group2_expanded ? 'transform: rotate(270deg)' : 'transform: rotate(90deg)'" height="20px">
              </template>
              <template v-slot:activator>
                <v-list-item-title class="text-uppercase font-16px">
                  {{$t("offer")}}
                </v-list-item-title>
              </template>

              <v-list-item sub-group link class="d-xl-none" v-show="user == null" :href="`/offers/producttraining`">
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-16px">
                    {{$t("producttraining")}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
              <v-list-item sub-group link class="d-xl-none" v-show="user == null" :href="`/offers/pressure`">
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-16px">
                    {{$t("pressure")}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item sub-group link class="d-xl-none" v-show="user == null" :href="`/offers/hydraulic`">
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase font-16px">
                    {{$t("hydraulic")}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </v-list-group>

          <v-list-item v-show="user != null" class="d-xl-none" to="/training-events">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase font-16px">
                {{$t("trainingevents")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-show="user != null && $rights.includes('CREATE_USER')" class="d-xl-none" to="/users">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase font-16px">
                {{$t("user management")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="d-xl-none" to="/calendar" v-show="$rights.includes('CREATE_APPOINTMENT')">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase font-16px">
                {{$t("schedule overview")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="d-xl-none" to="/tenants" v-show="user != null && $rights.includes('VIEW_CUSTOMERS')">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase font-16px">
                {{$t("tenants")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="d-xl-none" to="/venues" v-show="$rights.includes('CREATE_LOCATION')">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase font-16px">
                {{$t("venues")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/contactpersons" v-show="user == null" class="d-xl-none">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase font-16px">
                {{$t("contactpersons")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/ourvenues" v-show="user == null" class="d-xl-none">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase font-16px">
                {{$t("venues")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-list-item href="/" class="d-xl-none">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase font-18px">
                {{$t("contact")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <v-list-item href="/aboutus" class="d-xl-none">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase font-16px">
                {{ $t("aboutus") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="/request" class="d-xl-none">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase font-16px">
                {{$t("training_request")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
      <v-main class="mainmobile pt-16 mb-12 mb-md-0" style="padding: 64px 0px 36px 0px !important">
        <router-view></router-view>
      </v-main>
      <!-- <v-row>
        <div class="col col-lg-2 no-padding"></div>
        <div class="col-lg-10"></div>
      </v-row> -->
      <v-bottom-navigation :input-value="footdrawer" scroll-target="#scroll-threshold-example" class="pl-4 pl-md-8 text-left" scroll-threshold="500" app absolute hide-on-scroll text horizontal style="height:auto;background-color: var(--blue); display: block;">
        <!-- <v-btn v-bind:class="{'close':footdrawer}" class="footerbtn d-md-none" @click="footdrawer = !footdrawer" fab style="position:absolute;background-color:#003A60;z-index:1;top:-24px;"><v-icon  class="mr-0" v-show="!footdrawer" color="white">fas fa-chevron-up</v-icon><v-icon class="mr-0" v-show="footdrawer" color="white">fas fa-chevron-down</v-icon></v-btn> -->
        <div class="footer" v-bind:class="{'open':drawer}">
          <v-btn :ripple="false" text class="py-6 footerbtn text-uppercase no-background-hover" href="/">{{$t("Homepage")}}</v-btn>
          <v-btn :ripple="false" href="/imprint" text class="py-6 footerbtn text-uppercase no-background-hover">{{$t("imprint")}}</v-btn>
          <!-- Important: When changing the Link to the Privacy Policy, the link needs to be changed in mail_footer.html too! -->
          <v-btn target="_blank" :href="`/files/images/KB_DS-Hinweise_knorr-bremse.com_DE_20220310_Website_${$locale}.pdf`" :ripple="false" text class="py-6 footerbtn text-uppercase no-background-hover">{{$t("privacy")}}</v-btn>
          <v-btn :ripple="false" href="/cookies" text class="py-6 footerbtn text-uppercase no-background-hover">{{$t("cookies")}}</v-btn>
          <v-btn @click="log()" target="_blank" :href="selectedlanguage == 'DE' ? '/files/images/Leistungsbedingungen_KB_Rail_Services_Trainingsakademie_Germany.pdf' : selectedlanguage == 'PL' ? '/files/images/Leistungsbedinungen_KB_RailServices_Trainingsakademie_Germany_pl.pdf' :  selectedlanguage == 'FR' ? '/files/images/Leistungsbedinungen_KB_RailServices_Trainingsakademie_Germany_fr.pdf': selectedlanguage == 'HU' ? '/files/images/Leistungsbedinungen_KB_RailServices_Trainingsakademie_Germany_hu.pdf' : '/files/images/General_performance_KB_RailServices_Trainingsakademie_Germany.pdf'" :ripple="false" text class="py-6 footerbtn text-uppercase no-background-hover">{{$t("agb")}}</v-btn>
          <v-btn @click="showCatalog()" :ripple="false" text class="py-6 footerbtn text-uppercase no-background-hover">{{$t("catalog")}}</v-btn>
          <v-btn :ripple="false" text class="py-6 footerbtn text-uppercase no-background-hover" to="/contact">{{$t("contact")}}</v-btn>
        </div>
      </v-bottom-navigation>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      drawer:null,
      footdrawer:true,
      selectedlanguage:null,
      possiblelanguages: [],
      currentRouteName:null,
      standardRoutes: [
        {
          key: "objects",
          name: this.$t("objects"),
          icon: "fas fa-bomb",
          to: "/findings",
        },
        {
          key: "masterdata",
          name: this.$t("masterdata"),
          icon: "fas fa-database",
          to: "/masterdata",
          right: "WriteMasterdata",
        },
        {
          key: "users",
          name: this.$t("users"),
          icon: "fas fa-user",
          to: "/users",
          right: "ReadUsers",
        },
        {
          key: "roles",
          name: this.$t("roles"),
          icon: "fas fa-user-tag",
          to: "/roles",
          right: "WriteUsers",
        },
        {
          key: "customers",
          name: this.$t("customers"),
          icon: "fas fa-user-tie",
          to: "/customers",
          right: "GlobalAccess",
        },
      ],
      loginRoute: {
        key: "login",
        name: this.$t("login"),
        icon: "fas fa-user",
        to: "/login",
      },
      logoutRoute: {
        key: "logout",
        name: this.$t("logout"),
        icon: "fas fa-sign-out-alt",
      },
      allowedRoutes: [],
      user: null,
      language: {
        language: null,
        flag: null,
        shortForm: null
      },
      languages: [],

      mobileMenu: {
        group1_expanded: false,
        group2_expanded: false
      }
    };
  },

  mounted() {
    this.getCurrentUser();
    this.getCurrentLanguage();
    this.getLanguages();

    if(this.$route.path == '/otp-verification' || this.$route.path == '/download-documents'){
      document.body.classList.add('optScreensWrap');
    } else{}
  },

  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },

  methods: {
    getCurrentUser() {
      progressIndicator.hidden = false;
      this.$axios
        .get("/api/user/me")
        .then(this.gotCurrentUser)
        .catch(this.getCurrentUserFailed)
        .finally(this.requestEnded);
    },
    gotCurrentUser(response) {
      this.user = response.data;
      Vue.prototype.$user = this.user;
      Vue.prototype.$rights = this.user.allRights;
      Vue.prototype.$external = this.user.external;

      this.allowedRoutes = [];
      for (let i = 0; i < this.standardRoutes.length; i++) {
        const route = this.standardRoutes[i];
        if (route.right == null || this.hasRight(route.right)) {
          this.allowedRoutes.push(route);
        }
      }
    },
    getCurrentUserFailed(error) {
      this.user = null;
      console.error(error);
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
    requestEnded() {
      progressIndicator.hidden = true;
    },

    getCurrentLanguage() {
      progressIndicator.hidden = false;
      var _this = this;
      this.$axios
        .get("/api/language/me")
        .then(function(response){
          _this.language.language = response.data.language;
          _this.language.flag = response.data.flag;
          _this.selectedlanguage = response.data.shortForm;
        })
        .catch(this.onError)
        .finally(this.requestEnded);
    },

    getLanguages() {
      progressIndicator.hidden = false;
      var _this = this;
      this.$axios
        .get("/api/language/all")
        .then(function(response){
          _this.languages = response.data;
          _this.convertLanguages(_this.languages);
          
          // Make function accessible for getting flag by language
          Vue.prototype.$languages = _this.languages;
        })
        .catch(this.onError)
        .finally(this.requestEnded);
    },
    convertLanguages(languages){
      const lnlist = [];
      for (var i in languages){
        if(languages[i].onlySelectable) continue;
        var language = {};
        var ln = languages[i].language;
        
        // console.log(this.$t(languages[i].language));
        language.name = this.$t(languages[i].language);
        language.flag = languages[i].flag;
        language.shortForm = languages[i].shortForm;
        lnlist.push(language);
      }
      this.possiblelanguages = lnlist;
    },

    setLanguage(shortForm){
      if(!window.location.href.includes('?')){
        window.location.href = window.location.href + "?lang=" + shortForm; 
      }else{
        window.location.href = window.location.href + "&lang=" + shortForm;
      }
    },

    showCatalog(){
      var win = window.open("/api/downloads/catalog", "_blank");
      win.focus();
    },

    hasRight(right) {
      if (this.user.allRights.includes(right)) return true;
      return false;
    },

    toggleAuthentication() {
      if (this.user == null) {
        this.router.push("login");
      } else {
        this.logout();
      }
    },
    logout() {
      this.$axios
        .post("/logout")
        .then(this.logoutDone)
        .catch(this.logoutFailed);
    },
    logoutDone(response) {
      this.switchToLoginPage();
    },
    logoutFailed(error) {
      this.switchToLoginPage();
    },
    switchToLoginPage() {
      this.user = null;
      this.$axios.logout();
      this.$router.push("login");
    },
    nothing() {},
  },
  watch: {
    $route(to, from) {
      if (from.path === "/login" && to.path !== "/reset-password") {
        this.getCurrentUser();
      }
    },
  },
};
</script>
