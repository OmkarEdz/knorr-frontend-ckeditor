<template>
<div id="feedbackform">
    <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5"> {{$t("feedBackForm")}} </div>
      </div>
    </div>
    </div>
  <div class="pl-md-12 pa-8">
  <div class="mx-0 row disablerow align-items-start">
        <!-- Left Area -->
    <div class="col-xl-8 innercreatetraining"> 
    <v-row>
    <v-col cols="6">
    <div>
      <!-- First section -->
         <h5>  {{$t("informationSection")}} </h5>
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5 pt-2"
            dense
            outlined
            :label="$t('nameOftheTraining')"
            v-model="request.trainingName"
            :disabled="true"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5"
            dense
            outlined
            :label="$t('trainersName')"
            v-model="request.trainerName"
            :disabled="true"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5"
            dense
            outlined
            :label="$t('periodOfTraining')"
            v-model="request.trainingDate"
            :disabled="true"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5"
            dense
            outlined
            :label="$t('trainingLocation')"
            v-model="request.trainingLocation"
            :disabled="true"
          ></v-text-field>
       
    </div>
    <div >
      <!-- Second section -->
        <h5> {{ $t('preparationSection')}}</h5>
  
        <v-radio-group class="feedback-radio" v-model="request.receivedInvitation">
                <p>{{ $t('receivedInvitation')}}</p>
            <div class="d-flex">
              <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>  
            </div>
            <div class="d-flex">
              <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

            <v-radio-group class="feedback-radio" v-model="request.satisfiedPreparation">
                      <p>{{ $t('satisfiedPreparation')}}</p>
             <div class="d-flex">
             <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
               <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
    </div>
    <div >
      <!-- Third section -->
        <h5> {{ $t('trainingRoom')}}</h5>
      
        <v-radio-group class="feedback-radio" v-model="request.suitableTrainingRoom">
            <p>{{ $t('suitableTrainingRoom')}}</p>
           <div class="d-flex">
             <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
                <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
      
            <v-radio-group class="feedback-radio" v-model="request.expectedTrainingRoom">
                <p>{{ $t('expectedTrainingRoom')}}</p>
             <div class="d-flex">
               <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>


        <v-radio-group class="feedback-radio" v-model="request.breakTimes">
          <p>{{ $t('breakTimes')}}</p>
             <div class="d-flex">
              <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
             <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
      
        <v-radio-group class="feedback-radio" v-model="request.cleanTrainingRoom">
              <p>{{ $t('cleanTrainingRoom')}}</p>
            <div class="d-flex">
             <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
    </div>
    <div >
      <!-- Fourth section -->
        <h5> {{ $t('trainingStructure')}}</h5>
        <p>{{ $t('easyTrainingMaterial')}}</p>
        <v-radio-group class="feedback-radio" v-model="request.easyTrainingMaterial">
           <div class="d-flex">
              <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
             <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
        <p>{{ $t('theorypractice')}}</p>
            <v-radio-group class="feedback-radio"  v-model="request.theorypractice">
             <div class="d-flex">
               <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
               <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

<p>{{ $t('supportedlearningprocess')}}</p>
        <v-radio-group class="feedback-radio" v-model="request.supportedlearningprocess">
             <div class="d-flex">
              <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
    </div>
    </v-col>

    <v-col cols="6">
   <div >
      <!-- Fifth section -->
        <h5> {{ $t('trainingImplementation')}}</h5>
  
        <v-radio-group class="feedback-radio" v-model="request.learningspeed">
                <p>{{ $t('learningspeed')}}</p>
            <div class="d-flex">
              <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

            <v-radio-group class="feedback-radio" v-model="request.involvedtraining">
                      <p>{{ $t('involvedtraining')}}</p>
             <div class="d-flex">
              <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

             <v-radio-group class="feedback-radio" v-model="request.newthings">
                      <p>{{ $t('newthings')}}</p>
             <div class="d-flex">
               <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
    </div>
    <div >
      <!-- Sixth section -->
        <h5> {{ $t('trainerSection')}}</h5>
        <v-radio-group class="feedback-radio" v-model="request.trainerwellprepared">
                <p>{{ $t('trainerwellprepared')}}</p>
            <div class="d-flex">
              <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
            <v-radio-group class="feedback-radio" v-model="request.trainerprofessional">
                      <p>{{ $t('trainerprofessional')}}</p>
             <div class="d-flex">
               <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
                <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

             <v-radio-group class="feedback-radio" v-model="request.trainerexplained">
                      <p>{{ $t('trainerexplained')}}</p>
             <div class="d-flex">
              <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
                <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

           <v-radio-group class="feedback-radio" v-model="request.trainerorganized">
                      <p>{{ $t('trainerorganized')}}</p>
             <div class="d-flex">
              <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
               <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
    </div>
    <div >  
      <!-- Seventh section -->
        <h5>{{ $t('conclusion')}}</h5>
        <v-radio-group class="feedback-radio" v-model="request.benefitseveryday">
                <p>{{ $t('benefitseveryday')}}</p>
            <div class="d-flex">
              <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio> 
            </div>
            <div class="d-flex">
              <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

            <v-radio-group class="feedback-radio" v-model="request.recommendKnorr">
                      <p>{{ $t('recommendKnorr')}}</p>
             <div class="d-flex">
              <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio> 
            </div>
            <div class="d-flex">
              <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

             <v-radio-group class="feedback-radio" v-model="request.recommendtraining">
                      <p>{{ $t('recommendtraining')}}</p>
             <div class="d-flex">
             <v-radio :label="$t('excellent')" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('good')" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('satisfactory')" value="Satisfactory" class="mr-5 pr-5"></v-radio> 
            </div>
            <div class="d-flex">
              <v-radio :label="$t('sufficient')" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('insufficient')" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio :label="$t('deficient')" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
    </div>
    </v-col>

   </v-row>
  </div>

  <!-- Right Area -->
      <div class="col-xl-4 px-0 pl-12 pl-8 pl-md-12 pl-lg-8  row pt-0">
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn  outlined depressed tile class="savebutton mr-2 mb-2" @click="submitfeedback()">{{ $t("send_request") }}</v-btn>
          <v-btn  outlined depressed tile class="cancelbutton mr-2 mb-2">{{ $t("back") }}</v-btn>
        </div>
        <Contact />
      </div>

  </div>
  </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        request:{
        bookingId:null,
        trainingEventId:null,
        trainingName:null,
        trainerName:null,
        trainingDate:null,
        trainingLocation:null,
        receivedInvitation:null,
        satisfiedPreparation:null,
        suitableTrainingRoom:null,
        expectedTrainingRoom:null,
        breakTimes:null,
        cleanTrainingRoom:null,
        easyTrainingMaterial:null,
        theorypractice:null,
        supportedlearningprocess:null,
        learningspeed:null,
        involvedtraining:null,
        newthings:null,
        trainerwellprepared:null,
        trainerprofessional:null,
        trainerexplained:null,
        trainerorganized:null,
        benefitseveryday:null,
        recommendKnorr:null,
        recommendtraining:null
        }
    }
    },

     mounted() {
      this.bookingId=this.$route.query.bookingId;
      this.trainingEventId=this.$route.query.trainingEventId;
      this.fetchEditingTrainingEvent();
      this.fetchFeedBackForm();
     },

   methods: {
      fetchEditingTrainingEvent() {
       var _this = this;
       this.$axios
        .get("/api/training/event/" + this.trainingEventId)
        .then(function (response) {
          _this.request.trainerName = response.data.trainer.fullname;
          _this.request.trainingName = response.data.training.designationsMap[_this.$locale];
          _this.request.trainingDate=response.data.startDateFormatted ;
          _this.request.trainingLocation=response.data.locationFormatted
          })
          .catch(this.onError);
    },

    fetchFeedBackForm() {
       var _this = this;
       this.$axios
        .get("/api/booking/feedback/" + this.bookingId)
        .then(function (response) {
          _this.request.receivedInvitation=response.data.receivedInvitation;
          _this.request.satisfiedPreparation=response.data.satisfiedPreparation;
          _this.request.suitableTrainingRoom=response.data.suitableTrainingRoom;
          _this.request.expectedTrainingRoom=response.data.expectedTrainingRoom;
          _this.request.breakTimes=response.data.breakTimes;
          _this.request.cleanTrainingRoom=response.data.cleanTrainingRoom;
          _this.request.easyTrainingMaterial=response.data.easyTrainingMaterial;
          _this.request.theorypractice=response.data.theorypractice;
          _this.request.supportedlearningprocess=response.data.supportedlearningprocess;
          _this.request.learningspeed=response.data.learningspeed;
          _this.request.involvedtraining=response.data.involvedtraining;
          _this.request.newthings=response.data.newthings;
          _this.request.trainerwellprepared=response.data.trainerwellprepared;
          _this.request.trainingLocation=response.data.trainerprofessional;
          _this.request.trainingLocation=response.data.trainerexplained;
          _this.request.trainingLocation=response.data.trainerorganized;
          _this.request.trainingLocation=response.data.benefitseveryday;
          _this.request.trainingLocation=response.data.recommendKnorr;
          _this.request.trainingLocation=response.data.recommendtraining;
          })
          .catch(this.onError);
    }
   },
   submitfeedback()
    {
        this.$axios
        .post("/api/booking/feedback", request)
        .then(function (response) {
         
        })
        .catch(this.onError)
        .finally(() => {
        });
    }
}
</script>
<style >
.feedback-radio .v-label
{
  font-size:12px;
}
@media (max-width: 1000px) {
  #feedbackform .col-6 {
    max-width: 100%;
    flex: 0 0 100%;
  }
}
</style>

