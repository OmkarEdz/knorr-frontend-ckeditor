<template>
<div>
  <div>
    <div class="sixteentosix omt-6 omt-md-25">
      <div class="kachelimage header-image" style="background: url('/static/img/laptop_lock.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{$t("user management")}}</div>
      </div>
      </div>
    </div>
  </div>
  <div class="mx-0 row align-items-start">
    <div class="col-xl-8 px-8  pr-md-10 pr-lg-0">
        <div class="px-md-4 mx-0 pa-0 row justify-content-sm-between justify-content-center">
          <v-simple-table class="userstable" style="width:100%" hide-default-footer>
            <thead>
              <tr>
                <th @click="sort = 'lastname', order = !order,page = 1, fetchUsers()" class="text-uppercase align-bottom">
                  {{$t("lastname")}} <v-icon v-show="sort == 'lastname' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'lastname' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'firstname', order = !order,page = 1, fetchUsers()" class="text-uppercase align-bottom">
                  {{$t("firstname")}} <v-icon v-show="sort == 'firstname' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'firstname' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'email', order = !order,page = 1, fetchUsers()" class="text-uppercase align-bottom">
                  {{$t("email")}} <v-icon v-show="sort == 'email' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'email' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'company', order = !order,page = 1, fetchUsers()" class="text-uppercase align-bottom">
                  {{$t("company")}} <v-icon v-show="sort == 'company' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'company' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'roles', order = !order,page = 1, fetchUsers()" class="text-uppercase align-bottom">
                  {{$t("role")}} <v-icon v-show="sort == 'roles' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'roles' && !order" >fas fa-chevron-up</v-icon>
                </th>
                <th @click="sort = 'status', order = !order,page = 1, fetchUsers()" class="text-uppercase align-bottom">
                  {{$t("status")}} <v-icon v-show="sort == 'status' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'status' && !order" >fas fa-chevron-up</v-icon>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" @click="$router.push('/edit-user?userId=' + user.id)">
                <td class="pb-1 text-uppercase align-bottom">{{user.lastname}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{user.firstname}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{user.email}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{user.company}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{user.roles != null ? getRoles(user) : ""}}</td>
                <td class="pb-1 text-uppercase align-bottom">{{user.blocked ? $t("blocked") : $t("active")}}</td>
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
      <div class="col-xl-4 pl-8 pl-md-12 pl-xl-8 row">
          <div class="col-xl-12 right-side-block">
            <h4 class="text-uppercase">{{ $t("actions") }}</h4>
            <div class="right-side divider"></div>
            <div class="mt-6"></div>
            <v-btn :to="`/create-user`" v-show="$rights.includes('CREATE_USER')" outlined depressed tile class="savebutton mr-2">{{ $t("create_user") }}</v-btn>
            <v-btn :href="`/api/user/export`" v-show="$rights.includes('TENANT_INDEPENDENCE')" outlined depressed tile class="savebutton mr-2">{{ $t("export_csv") }}</v-btn>
          </div>
          <div class="col-xl-12 right-side-block">
            <h3 class="text-uppercase">{{ $t("search") }}</h3>
            <div class="right-side divider"></div>
            <div class="mt-6"></div>
            <v-autocomplete  
              v-model="tenantFilter"
              hide-details="auto"
              class="justify-content-end searchbar align-self-center pb-1"
              :items="tenants"
              item-text='name'
              item-value='id'
              style="padding-right:2px"
              dense
              @change="fetchUsers()"
              v-show="$rights.includes('TENANT_INDEPENDENCE')"
              outlined
              :label="$t('tenant')">
              <!-- <template slot="item" slot-scope="data">
                {{data.item.firstname}} {{data.item.lastname}}
              </template>
              <template slot="selection" slot-scope="data">
                {{data.item.firstname}} {{data.item.lastname}};
              </template> -->
              <template v-slot:append>
                    <v-icon color="#003A60">fas fa-home</v-icon>
              </template></v-autocomplete>

            <v-text-field  
                hide-details="auto"
                class="justify-content-end searchbar align-self-center pb-1"
                style="padding-right:2px"
                dense
                outlined
                :label="$t('search')"
                v-model="search"
                @change="fetchUsers()"
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
        users: "/api/user",
        tenants: "/api/tenant",
        filter: "/api/users/search/"
      },
      search: "",
      convertedTenants: [],
      tenantFilter: null,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      rules: [(value) => !!value || this.$t("required")],
      users: [],
      roles: [],
      createUserPopup: false,
      menu: false,
      createmode: true,

      // Personal Data
      me: null,
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  mounted() {
    this.fetchUsers();
    if(this.$rights.includes("TENANT_INDEPENDENCE")){
      this.fetchTenants();
    }
  },

  methods: {
    getRoles(user){
      var str = '';
      for (let i = 0; i < user.roles.length; i++) {
        const role = user.roles[i];
        str = user.roles.length == 1 ? role : str + role + ', '
      }
      if(str.slice(-1) == ' '){
        return str.slice(0,-2);
      }
      return str
    },
    previousPage() {
      this.page = this.page - 1;
      this.fetchUsers();
    },
    nextPage() {
      this.page = this.page + 1;
      this.fetchUsers();
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
    fetchUsers() {
      var _this = this;
      this.$axios
        .get(this.routes.users, {
          params: {
            search: _this.search,
            tenant: _this.tenantFilter,
            sort: _this.sort,
            order: _this.order ? "ASC":"DESC",
            page: _this.page -1,
            size: _this.ElementPerPage
          }
        })
        .then(function (response) {
          _this.users = response.data.content;
          for (let i = 0; i < _this.users.length; i++) {
            const user = _this.users[i];
            if(typeof user === "object") continue;
            _this.$axios.get(_this.routes.users + "/" + user)
              .then(function (response) {
                _this.users[i] = response.data;
                _this.$forceUpdate();
              });
          }
          _this.totalPages = response.data.totalPages;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
    exportUser(){
      this.$axios
        .get("/api/user/export")
        .then(function(response){
          console.log("download");
        })
    },
    fetchTenants() {
      var _this = this;
      this.tenants = [],
      this.$axios
        .get(this.routes.tenants)
        .then(function (response) {
          const tenants = response.data.content;
          _this.tenants.push({
            id: -1,
            name: _this.$t("all_tenants"),
          });
          for (let i = 0; i < tenants.length; i++) {
            const tenant = tenants[i];
            _this.tenants.push(tenant);
          }
          _this.tenantFilter = _this.tenants[0].id;
          _this.$forceUpdate();
        })
        .catch(this.onError);
    },
    updatePage() {
      this.fetchUsers();
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

