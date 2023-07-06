<template>
<div>
  <div>
    <div class="sixteentosix omt-6 omt-md-25">
      <div class="kachelimage header-image" style="background: url('/static/img/worldmap.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{$t("manage venues")}}</div>
      </div>
      </div>
    </div>
  </div>
  <div class="mx-0 row align-items-start">
    <div class="col-xl-8 px-8  pr-md-10 pr-lg-0">
      <div class="px-md-4 mx-0 pa-0 row justify-content-sm-between justify-content-center">
        <v-simple-table class="venuestable" style="width:100%" hide-default-footer>
          <thead>
            <tr>
              <th @click="sort = 'designation', order = !order,page = 1, fetchVenues()" class="text-uppercase align-bottom">
                {{$t("name")}} <v-icon v-show="sort == 'designation' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'designation' && !order" >fas fa-chevron-up</v-icon>
              </th>
              <th @click="sort = 'city', order = !order,page = 1, fetchVenues()" class="text-uppercase align-bottom">
                {{$t("address")}} <v-icon v-show="sort == 'city' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'city' && !order" >fas fa-chevron-up</v-icon>
              </th>
              <th @click="sort = 'country', order = !order,page = 1, fetchVenues()" class="text-uppercase align-bottom">
                {{$t("country")}} <v-icon v-show="sort == 'country' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'country' && !order" >fas fa-chevron-up</v-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="venue in venues" :key="venue.id" @click="$router.push('/edit-venue?venueId=' + venue.id)">
              <td class="pl-0 pb-1 text-uppercase align-bottom">{{venue.designation}}</td>
              <td class="pl-0 pb-1 text-uppercase align-bottom">{{venue.addressFormattedSingleLine}}</td>
              <td class="pl-0 pb-1 text-uppercase align-bottom">{{venue.country}}</td>
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
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn :to="`/create-venue`" outlined depressed tile class="savebutton mr-2">{{ $t("create_venue") }}</v-btn>
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
              :label="$t('search')"
              v-model="search"
              @change="fetchVenues()"
              ><template v-slot:append>
                    <v-icon color="#003A60">fas fa-search</v-icon>
                  </template></v-text-field>
        </div>
        <Contact />
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
        venues: "/api/location",
        filter: "/api/users/search/"
      },
      search: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      rules: [(value) => !!value || this.$t("required")],
      venues: [],
      roles: [],
      createUserPopup: false,
      menu: false,
      createmode: true,

      // Personal Data
      me: null,
      rightGlobalAccess: false,
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  

  mounted() {
    // var _this = this;
    // this.fetchMe().then(function () {
    //   _this.fetchTenants();
    // });
    // this.fetchRoles();
    // this.fetchRights();
    this.fetchVenues();
  },

  methods: {
    previousPage() {
      this.page = this.page - 1;
      this.fetchVenues();
    },
    nextPage() {
      this.page = this.page + 1;
      this.fetchVenues();
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
    async fetchMe() {
      var _this = this;
      await this.$axios
        .get("api/me")
        .then(function (response) {
          _this.me = response.data;
          _this.rightGlobalAccess = _this.hasRight("GlobalAccess");
        })
        .catch(this.onError);
    },
    hasRight(right) {
      if (this.me.rights.includes(right)) return true;
      if (this.me.role != null) {
        return this.me.role.rights.includes(right);
      }
      return false;
    },
    fetchVenues() {
      var _this = this;
      this.$axios
        .get(this.routes.venues, {
          params: {
            search: _this.search,
            sort: _this.sort,
            order: _this.order ? "ASC":"DESC",
            page: _this.page -1,
            size: _this.ElementPerPage
          }
        })
        .then(function (response) {
          _this.venues = response.data.content;
          _this.totalPages = response.data.totalPages;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
    updatePage() {
      this.fetchVenues();
    },
    updateVisibleUsers() {
      var _this = this;
      this.users = this.users.slice(
        (_this.page = _this.ElementPerPage),
        (_this.page = _this.ElementPerPage) + _this.ElementPerPage
      );

      if (this.users.length == 0 && this.page > 0) {
        this.updatePage(this.page - 1);
      }
    },
    createUser() {
      var _this = this;

      var saveUser = {};
      Object.assign(saveUser, this.editedUser);

      saveUser.tenantId = saveUser.customer != null ? saveUser.customer.id : -1;
      saveUser.username = saveUser.mail;

      this.$axios
        .post(this.routes.users, saveUser)
        .then(function (response) {
          _this.$noty.success(_this.$t("user_created"));
          var user = response.data;
          if (_this.editedUser.role != null && _this.editedUser.role.id != null) {
            _this.addRoleToUser(user.id, _this.editedUser.role.id);
          }
          _this.addRightsToUser(user.id, _this.editedUser.rights);
          _this.resetEditedUser();
          _this.createUserPopup = false;
          _this.page = 1;
          _this.fetchUsers();
        })
        .catch(this.onError);
    },
    editUser() {
      var _this = this;

      var saveUser = {};
      Object.assign(saveUser, this.editedUser);

      saveUser.tenantId = saveUser.customer != null ? saveUser.customer.id : -1;
      saveUser.username = saveUser.mail;

      this.$axios
        .put(this.routes.users, saveUser)
        .then(function (response) {
          var user = response.data;
          _this.$noty.success(_this.$t("user_updated"));
          if (_this.editedUser.role != null && _this.editedUser.role != null) {
            _this.addRoleToUser(user.id, _this.editedUser.role.id);
          }
          _this.addRightsToUser(user.id, _this.editedUser.rights);
          _this.resetEditedUser();
          _this.createUserPopup = false;
          _this.fetchUsers();
        })
        .catch(this.onError);
    },
    deleteUser(userid) {
      var _this = this;
      this.$axios
        .delete("api/users/" + userid)
        .then(function (response) {
          _this.$noty.success(_this.$t("user_deleted"));
          _this.fetchUsers();
        })
        .catch(this.onError);
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