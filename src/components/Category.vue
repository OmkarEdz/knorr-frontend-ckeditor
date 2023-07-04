<template>
  <div class="categoriesMainWrap">
    <div class="sixteentosix omt-6 omt-md-25">
      <div
        class="kachelimage header-image large"
        style="background: url('/static/img/header_homepage.jpg')"
      >
        <div class="kb-clip-container">
          <div class="kb-clip-aspectratio">
            <img
              class="kachelimage"
              src="../assets/img/trainingsakademie_klammer.png"
            />
          </div>
        </div>
        <div class="headline">
          <div class="text-subtitle-2 text-md-h5">
            {{ $t("welcome_homepage") }}
          </div>
        </div>
      </div>
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
            v-model="search"
            @keypress.enter="redirectToSearchPage()"
            :label="$t('search')"><template v-slot:append>
                  <v-icon color="#003A60">fas fa-search</v-icon>
                </template></v-text-field>
        </div>
    <div>
      <div class="align-items-start">
        <!-- Left Area -->
        <div class="">
          <div class="pl-8 pl-md-12 mx-0 pa-0 text-content">
            <h3 class="text-uppercase">{{ $t("our_training_portfolio") }}</h3>
            <div class="divider"></div>
          </div>
          <div class="">
            <div class="row">
              <div
                class="mx-0 col-xl-4 col-md-6"
                v-for="category in categories"
                :key="category.id"
              >
                <div class="category-box">
                  <v-card
                    flat
                    class="no-border-radius sixteentonine"
                    height="100%"
                    :to="'/category/' + category.designationUrl"
                  >
                    <v-img
                      class="kachelimage"
                      height="100%"
                      :src="`/files/images/${category.image}`"
                    ></v-img>
                    <div
                      class="text-md-h6 pl-8 pl-md-12 py-1 bottom-row bg-blue"
                    >
                      {{ category.designationMap[$locale] }}
                    </div>
                  </v-card>
                </div>
              </div>
              <div class="mx-0 col-12 pb-0">
                <div class="category-box">
                  <v-card
                    flat
                    class="no-border-radius"
                    style="min-height: 210px;"
                    @click="openRailServicesWebsite()"
                  >
                    <v-img
                      class="kachelimage"
                      height="100%"
                      src="/static/img/secondbanner.jpg"
                    ></v-img>
                    <div class="headline bottom-banner">
                      <div class="text-subtitle-2 text-md-h5-snd">
                        {{ $t("welcome_homepage_secondbanner") }}
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>
            </div>
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

  data() {
    return {
      categories: [],
      search: "",
    };
  },

  mounted() {
    this.fetchCategories();
  },

  methods: {
    redirectToSearchPage() {
    const searchTerm = this.search;
    this.$router.push('/category-training?term='+searchTerm);
  },
    onError(err) {
      if (err.response != null && err.response.data != null) {
        this.$noty.error(err.response.data);
      } else {
        console.error(err);
      }
    },

    fetchCategories() {
      var _this = this;
      this.$axios
        .get("api/category/root")
        .then(function (response) {
          _this.categories = response.data;
        })
        .catch(this.onError)
        .finally(this.onFinally);
    },

    onFinally() {
      showLoadingCircle(false);
    },

    openRailServicesWebsite() {
      window.open("https://rail.knorr-bremse.com", "_blank").focus();
    }
  },
};
</script>
