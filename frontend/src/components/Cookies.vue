<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("cookies") }}</div>
      </div>
    </div>
  </div>
  <div>
    <div class="mx-0 row align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 px-8 pr-sm-16">        
        <div class="px-md-4 mx-0 pa-0 text-content">
            <p>{{ $t("cookies_1") }}</p>
            <h4>{{ $t("cookies_2") }}</h4>
            <p>{{ $t("cookies_3") }}</p>
            <p>{{ $t("cookies_4") }}</p>
            <p>{{ $t("cookies_5") }}</p>
            <span><b>{{ $t("cookies_6") }}</b></span><br>
            <p>{{ $t("cookies_7") }}</p>

            <v-simple-table class="userstable" hide-default-footer>
              <thead>
              <tr>
                <th>{{ $t("cookies_th_1") }}</th>
                <th>{{ $t("cookies_th_2") }}</th>
                <th>{{ $t("cookies_th_3") }}</th>
                <th>{{ $t("cookies_th_4") }}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>knorr-bremse.com</td>
                <td>JSESSIONID</td>
                <td>{{ $t("cookies_first_party") }}</td>
                <td>{{ $t("cookies_session_end") }}</td>
              </tr>
              </tbody>
            </v-simple-table>
        </div>
      </div>
      <!-- Right Area -->
      <!-- <div class="col-xl-4 pl-8 row">
        
      </div> -->
    </div>
  </div>
</div>
</template>

<script>


export default {


  data() {
    return {

    };
  },

  watch: {
    
  },

  computed: {
    
  },

  mounted() {
  },

  methods: {
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


    getShareMailText(){
      return this.$t('share_mail_content', {link: window.location.href});
    }
  },
};
</script>
