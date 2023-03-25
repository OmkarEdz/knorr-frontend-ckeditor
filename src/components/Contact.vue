<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/meeting_old.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("contact") }}</div>
      </div>
    </div>
  </div>
  <div class="pl-md-12 pa-8">
    <div class="mx-0 row disablerow align-items-start">

      <!-- Left Area -->
      <div class="col-xl-8 innercreatetraining">        
        <div class="px-md-4 mx-0 pa-0 text-content">

          <div class="row disablerow justify-content-between">
                <div class="col-md-12 row disablerow justify-content-between">
                    <div class="col-md-12 pt-0">
                        <span class="headlinecolor text-uppercase text-h6"> {{$t("your_request")}}</span>
                    </div>
                    <div class="col-md-6">
                      <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('firstname') + '*'"
                        v-model="request.firstname"
                      ></v-text-field>
                    </div>
                    <div class="col-md-6">
                      <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('lastname') + '*'"
                        v-model="request.lastname"
                      ></v-text-field>
                    </div>
                    <div class="col-md-12">
                      <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('email') + '*'"
                        v-model="request.email"
                      ></v-text-field>
                    </div>
                    <div class="col-md-12">
                      <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('company')"
                        v-model="request.company"
                      ></v-text-field>
                    </div>
                    <div class="col-md-12">
                      <v-textarea  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('your_message') + '*'"
                        v-model="request.comment"
                      ></v-textarea>
                    </div>
                <div class="col-md-12">
                      <v-checkbox
                        v-model="consentprivacy"
                        class="no-margin-top"
                        hide-details="auto"
                      >
                      <template v-slot:label>
                        <v-span>{{ $t('agree_privacy_policy2_part1') }} <a :href="`/files/images/KB_DS-Hinweise_Customer_Training_Portal_${$locale}.pdf`" target="_blank" @click.stop>  {{$t('agree_privacy_policy2_part2')}}</a>   {{$t('agree_privacy_policy2_part3') }}</v-span>
                      </template>
                      </v-checkbox>
               </div>
                </div> 
            </div>
            <div class="text-right">
              <v-label>
                * {{ $t("mandatory_fields") }}
              </v-label>
            </div>
        </div>
      </div>

      <!-- Right Area -->
      <div class="col-xl-4 px-0 pl-12 pl-8 pl-md-12 pl-lg-8  row pt-0">
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn @click="sendRequest()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("send_request") }}</v-btn>
          <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
        </div>
        <Contact />
      </div>

    </div>
  </div>
</div>
</template>

<script>
export default {

    props: {
      trainingId: Number,
      trainingRequestId: Number,
    },

    data() {
      return {
        request: {
          firstname: null,
          lastname: null,
          email: null,
          company: null,
          comment: null,
          

        },
        consentprivacy: false,
      }
    },

    mounted(){
      
    },
    
    methods: {

      onError(err) {
        if (err.response != null && err.response.data != null) {
          this.$noty.error(err.response.data);
        } else {
          console.error(err);
        }
      },

      onFinally(){
        showLoadingCircle(false);
      },

      

      sendRequest(){
        var _this = this;
        var request = {};
        request = Object.assign(request, this.request);

        console.log(request);

        if(this.editMode && this.trainingRequestId) request.id = this.trainingRequestId;
      
        if(request.firstname == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("firstname")}));
          return;
        }
        if(request.lastname == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("lastname")}));
          return;
        }
        if(request.email == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("email")}));
          return;
        }
        if(request.comment == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("comment")}));
          return;
        }
        if(!this.consentprivacy){
          this.$noty.error(this.$t("please_accept_privacy_policy"));
          return;
        }
        

        progressIndicator.hidden = false;
        showLoadingCircle(true);

        this.$axios
          .post("/api/contact", request)
          .then(function (response) {
            _this.$noty.success(_this.$t("contact_request_sent"));
            _this.$router.push("/");
          })
          .catch(this.onError)
          .finally(this.onFinally);
      },

    }
}
</script>
