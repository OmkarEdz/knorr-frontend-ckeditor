<template>
  <div>
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="top-buttons">
        <v-btn rounded color="primary" @click="createRolePopup = true">
          <v-icon left>fas fa-plus</v-icon>
          {{ $t("create") }}
        </v-btn>
      </div>
    </div>
    <div class="page-content">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">{{ $t("rights") }}</th>
              <th v-for="role in roles" :key="role.id" class="text-left">
                {{ role.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="right in rights" :key="right">
              <td>{{ $t(right) }}</td>
              <td v-for="role in roles" :key="role.id">
                <v-checkbox
                  :input-value="role.rights.includes(right)"
                  color="primary"
                  value
                  @click="assignOrRemoveRight(role, right)"
                ></v-checkbox>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td v-for="role in roles" :key="role.id">
                <v-btn
                  rounded
                  color="error"
                  @click="
                    showConfirmation($t('confirm_delete_role'), function () {
                      deleteRole(role);
                    })
                  "
                >
                  <v-icon left>fas fa-trash</v-icon>
                  Löschen
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <!-- Create Role Popup -->
      <v-dialog v-model="createRolePopup" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t("create_role") }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    :label="$t('designation')"
                    v-model="editedRole.name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    :items="rightsWithTranslations"
                    :label="$t('rights')"
                    v-model="editedRole.rights"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="createRolePopup = false">
              {{ $t("cancel") }}
            </v-btn>
            <v-btn color="primary" text @click="createRole()">
              {{ $t("save") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Confirmation Popup -->
      <v-dialog v-model="confirmation.shown" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            {{ $t("security_question") }}
          </v-card-title>

          <v-card-text>
            {{ confirmation.text }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="confirmation.shown = false">
              {{ $t("no") }}
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="
                confirmation.action();
                confirmation.shown = false;
              "
            >
              {{ $t("yes") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: {
        roles: "/api/roles",
        rights: "/api/rights",
      },
      rights: [],
      rightsWithTranslations: [],
      roles: [],

      editedRole: {
        id: null,
        name: "",
        rights: [],
      },

      confirmation: {
        text: "",
        action: null,
        shown: false,
      },

      createRolePopup: false,
    };
  },

  mounted() {
    this.fetchRights();
    this.fetchRoles();
  },

  methods: {
    // Misc Methods
    onError(err) {
      if (err.response != null && err.response.data != null) {
        this.$noty.error(err.response.data);
      } else {
        console.error(err);
      }
    },
    // Fetch Methods
    fetchRoles() {
      var _this = this;
      this.$axios
        .get(this.routes.roles)
        .then(function (response) {
          _this.roles = response.data.content;
        })
        .catch(this.onError);
    },

    fetchRights() {
      var _this = this;
      this.$axios
        .get(this.routes.rights)
        .then(function (response) {
          _this.rights = response.data;
          for (let i = 0; i < _this.rights.length; i++) {
            const right = _this.rights[i];
            _this.rightsWithTranslations.push({
              value: right,
              text: _this.$t(right),
            });
          }
        })
        .catch(this.onError);
    },

    // Save and Update Methods
    createRole() {
      var _this = this;
      this.$axios
        .post(this.routes.roles, this.editedRole)
        .then(function (response) {
          _this.$noty.success(_this.$t("role_created"));
          _this.fetchRoles();
          _this.resetEditedRole();
          _this.createRolePopup = false;
        })
        .catch(this.onError);
    },
    // TODO Die Methode oben aufrufen bei @click der Checkbox!!!!!!!!!!!!!!!!!!!!!!!!!!!
    assignOrRemoveRight(role, right) {
      this.editedRole = role;
      if (this.editedRole.rights.includes(right)) {
        var rights = this.editedRole.rights;
        for (let i = 0; i < rights.length; i++) {
          const rightToCheck = rights[i];
          if (right == rightToCheck) {
            rights.splice(i, 1);
            break;
          }
        }
        this.editedRole.rights = rights;
      } else {
        this.editedRole.rights.push(right);
      }
      this.updateRole();
    },
    updateRole(rights) {
      var _this = this;
      this.$axios
        .put(this.routes.roles, this.editedRole)
        .then(function (response) {
          // _this.$noty.success(_this.$t("role_updated"));
          _this.fetchRoles();
          _this.resetEditedRole();
          _this.createRolePopup = false;
        })
        .catch(this.onError);
    },
    deleteRole(role) {
      var _this = this;
      this.$axios
        .delete(this.routes.roles + "/" + role.id)
        .then(function (response) {
          _this.$noty.success(_this.$t("role_deleted"));
          _this.fetchRoles();
        })
        .catch(this.onError);
    },

    showConfirmation(text, action) {
      this.confirmation.text = text;
      this.confirmation.action = action;
      this.confirmation.shown = true;
    },
    resetEditedRole() {
      this.editedRole = {
        id: null,
        name: "",
        rights: [],
      };
    },
  },
};
</script>

<style>
</style>