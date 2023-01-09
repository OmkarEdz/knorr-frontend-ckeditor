<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">Upload Application - ONLY FOR CODEGUIDES USERS</div>
      </div>
    </div>
  </div>
  <div>
    <div class="row align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 px-8 pr-sm-16">        
        <div class="px-md-4 mx-0 pa-5 text-content innercreatetraining aboutus">
          <h3>Upload Application</h3><br>
          <Upload v-model="uploadedFile" allowOtherFileTypes application />
        </div>
      </div>
      <!-- Right Area -->
      <div class="col-xl-4 pl-8 pl-md-12 pl-xl-8 row">
        <Contact showBuildNumber />
      </div>
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
      uploadedFile: null,
    };
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

  },
};
</script>
