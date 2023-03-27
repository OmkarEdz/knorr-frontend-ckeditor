<template>
<div id="feedbackform">
    <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/default_header.png')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5"> FeedBack Form </div>
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
         <h5> Information section</h5>
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5 pt-2"
            dense
            outlined
            label="Name of the training"
            v-model="trainingName"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5"
            dense
            outlined
            label="Trainer's name"
            v-model="trainerName"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5"
            dense
            outlined
            label="Date/Period of training"
            v-model="trainingDate"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5"
            dense
            outlined
            label="Training location"
            v-model="trainingLocation"
          ></v-text-field>
       
    </div>
    <div >
      <!-- Second section -->
        <h5> Preparation section</h5>
  
        <v-radio-group class="feedback-radio" v-model="receivedInvitation">
                <p>I have received the training invitation in advanced</p>
            <div class="d-flex">
              <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>  
            </div>
            <div class="d-flex">
              <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

            <v-radio-group class="feedback-radio" v-model="satisfiedPreparation">
                      <p>I was very satisfied with the preparation of the training</p>
             <div class="d-flex">
             <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
               <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
    </div>
    <div >
      <!-- Third section -->
        <h5> Training room</h5>
      
        <v-radio-group class="feedback-radio" v-model="suitableTrainingRoom">
            <p>The training room was suitable for the training</p>
           <div class="d-flex">
             <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
                <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
      
            <v-radio-group class="feedback-radio" v-model="expectedTrainingRoom">
                <p>The training room met my expectations</p>
             <div class="d-flex">
               <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>


        <v-radio-group class="feedback-radio" v-model="breakTimes">
          <p>The break times were well chosen</p>
             <div class="d-flex">
              <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
             <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
      
        <v-radio-group class="feedback-radio" v-model="cleanTrainingRoom">
              <p>The training room was clean</p>
            <div class="d-flex">
             <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
    </div>
    <div >
      <!-- Fourth section -->
        <h5> Training structure</h5>
        <p>The training materials were easy to understand</p>
        <v-radio-group class="feedback-radio" v-model="easyTrainingMaterial">
           <div class="d-flex">
              <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
             <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
        <p>The proportions of theory and practice were well chosen</p>
            <v-radio-group class="feedback-radio"  v-model="theorypractice">
             <div class="d-flex">
               <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
               <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

<p>The teaching methods used supported me very well in my learning process</p>
        <v-radio-group class="feedback-radio" v-model="supportedlearningprocess">
             <div class="d-flex">
              <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
    </div>
    </v-col>

    <v-col cols="6">
   <div >
      <!-- Fifth section -->
        <h5> Training implementation</h5>
  
        <v-radio-group class="feedback-radio" v-model="learningspeed">
                <p>The learning speed was reasonable</p>
            <div class="d-flex">
              <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

            <v-radio-group class="feedback-radio" v-model="involvedtraining">
                      <p>I was able to get involved in the training</p>
             <div class="d-flex">
              <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

             <v-radio-group class="feedback-radio" v-model="newthings">
                      <p>I learned a lot of new things</p>
             <div class="d-flex">
               <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
    </div>
    <div >
      <!-- Sixth section -->
        <h5> Trainer section</h5>
        <v-radio-group class="feedback-radio" v-model="trainerwellprepared">
                <p>The trainer was well prepared</p>
            <div class="d-flex">
              <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
              <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
            <v-radio-group class="feedback-radio" v-model="trainerprofessional">
                      <p>The trainer seemed professional</p>
             <div class="d-flex">
               <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
                <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

             <v-radio-group class="feedback-radio" v-model="trainerexplained">
                      <p>The trainer explained the contents of the training well</p>
             <div class="d-flex">
              <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
                <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

           <v-radio-group class="feedback-radio" v-model="trainerorganized">
                      <p>The trainer organized the learning process well</p>
             <div class="d-flex">
              <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio>
            </div>
            <div class="d-flex">
               <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>
    </div>
    <div >  
      <!-- Seventh section -->
        <h5>Conclusion</h5>
        <v-radio-group class="feedback-radio" v-model="benefitseveryday">
                <p>Benefits for everyday working life</p>
            <div class="d-flex">
              <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio> 
            </div>
            <div class="d-flex">
              <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

            <v-radio-group class="feedback-radio" v-model="recommendKnorr">
                      <p>I would recommend the Knorr-Bremse Rail Aacademy as a training provider</p>
             <div class="d-flex">
              <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio> 
            </div>
            <div class="d-flex">
              <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
            </div>
          </v-radio-group>

             <v-radio-group class="feedback-radio" v-model="recommendtraining">
                      <p>I would recommend the training to others</p>
             <div class="d-flex">
             <v-radio label="1. Excellent" value="Excellent" class="mr-5 pr-5"></v-radio>
              <v-radio label="2. Good" value="Good" class="mr-5 pr-5"></v-radio>
              <v-radio label="3. Satisfactory" value="Satisfactory" class="mr-5 pr-5"></v-radio> 
            </div>
            <div class="d-flex">
              <v-radio label="4. Sufficient" value="Sufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="5. Insufficient" value="Insufficient" class="mr-5 pr-5"></v-radio>
              <v-radio label="6. Deficient" value="Deficient" class="mr-5 pr-5 "></v-radio>
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
          <v-btn  outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("send_request") }}</v-btn>
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
        trainingName:"",
        trainerName:"",
        trainingDate:"",
        trainingLocation:"",
        invitationRadio:"",
        preparationRadio:""
      }
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

