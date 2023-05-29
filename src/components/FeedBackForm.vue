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
    <v-col cols="12">
    <div >
      <!-- First section -->
         <h5>  {{$t("informationSection")}} </h5>
         <v-row>
          <v-col cols="6">
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5 pt-2"
            dense
            outlined
            :label="$t('nameOftheTraining')"
            v-model="request.trainingName"
            :disabled="true"
          ></v-text-field>
           </v-col>
           <v-col cols="6">
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5"
            dense
            outlined
            :label="$t('trainersName')"
            v-model="request.trainerName"
            :disabled="true"
          ></v-text-field>
           </v-col>
        </v-row>
       <v-row>
       <v-col cols="6">
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5"
            dense
            outlined
            :label="$t('periodOfTraining')"
            v-model="request.trainingDate"
            :disabled="true"
          ></v-text-field>
           </v-col>
           <v-col cols="6">
          <v-text-field
            hide-details="auto"
            class="datainput justify-content-end align-self-center pb-5"
            dense
            outlined
            :label="$t('trainingLocation')"
            v-model="request.trainingLocation"
            :disabled="true"
          ></v-text-field>
        </v-col>
    </v-row>
    </div>
   <div>
    <p class="font-weight-bold">{{ $t('pleaseRate') }}</p>
    <p>{{ $t('rateOptions') }}</p>
  <!-- Second section -->
  <table class="border border-dark table table-bordered">
    <thead>
    <tr>
      <th class="invitation-column" >{{ $t('preparationSection') }}</th>
      <th class="text-center">1</th>
      <th class="text-center">2</th>
      <th class="text-center">3</th>
      <th class="text-center">4</th>
      <th class="text-center">5</th>
      <th class="text-center">6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="invitation-column">
        <p>{{ $t('receivedInvitation')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.receivedInvitation" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.receivedInvitation" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.receivedInvitation" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.receivedInvitation" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.receivedInvitation" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.receivedInvitation" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>
    <tr>
      <td class="invitation-column">
        <p>{{ $t('satisfiedPreparation')}}</p>
      </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.satisfiedPreparation" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
             </v-radio-group  >
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.satisfiedPreparation" >
            <v-radio class="feedback-radio"  value="Good"></v-radio>
            </v-radio-group  >
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.satisfiedPreparation" >
            <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
           <v-radio-group class="text-center" v-model="request.satisfiedPreparation" >
            <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.satisfiedPreparation" >
            <v-radio class="feedback-radio"   value="Insufficient"></v-radio>
            </v-radio-group  >
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.satisfiedPreparation" >
            <v-radio class="feedback-radio"   value="Deficient"></v-radio>
            </v-radio-group  >
          </td>
    </tr>
    </tbody>
    </table>
   </div>
    <div >
      <!-- Third section -->
  
      <table class="border border-dark table table-bordered">
    <thead>
    <tr>
      <th class="invitation-column" >{{ $t('trainingRoom')}}</th>
      <th class="text-center">1</th>
      <th class="text-center">2</th>
      <th class="text-center">3</th>
      <th class="text-center">4</th>
      <th class="text-center">5</th>
      <th class="text-center">6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="invitation-column">
        <p>{{ $t('suitableTrainingRoom')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.suitableTrainingRoom" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.suitableTrainingRoom" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.suitableTrainingRoom" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.suitableTrainingRoom" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.suitableTrainingRoom" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.suitableTrainingRoom" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>
    <tr>
      <td class="invitation-column">
        <p>{{ $t('expectedTrainingRoom')}}</p>
      </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.expectedTrainingRoom" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
             </v-radio-group  >
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.expectedTrainingRoom" >
            <v-radio class="feedback-radio"  value="Good"></v-radio>
            </v-radio-group  >
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.expectedTrainingRoom" >
            <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
           <v-radio-group class="text-center" v-model="request.expectedTrainingRoom" >
            <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.expectedTrainingRoom" >
            <v-radio class="feedback-radio"   value="Insufficient"></v-radio>
            </v-radio-group  >
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.expectedTrainingRoom" >
            <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group  >
          </td>
    </tr>
      <tr>
      <td class="invitation-column">
        <p>{{ $t('breakTimes')}}</p>
      </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.breakTimes" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
             </v-radio-group  >
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.breakTimes" >
            <v-radio class="feedback-radio"  value="Good"></v-radio>
            </v-radio-group  >
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.breakTimes" >
            <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
           <v-radio-group class="text-center" v-model="request.breakTimes" >
            <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.breakTimes" >
            <v-radio class="feedback-radio"   value="Insufficient"></v-radio>
            </v-radio-group  >
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.breakTimes" >
            <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group  >
          </td>
    </tr>
     <tr>
      <td class="invitation-column">
        <p>{{ $t('cleanTrainingRoom')}}</p>
      </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.cleanTrainingRoom" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
             </v-radio-group  >
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.cleanTrainingRoom" >
            <v-radio class="feedback-radio"  value="Good"></v-radio>
            </v-radio-group  >
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.cleanTrainingRoom" >
            <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
           <v-radio-group class="text-center" v-model="request.cleanTrainingRoom" >
            <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
            <v-radio-group class="text-center" v-model="request.cleanTrainingRoom" >
            <v-radio class="feedback-radio"   value="Insufficient"></v-radio>
            </v-radio-group  >
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.cleanTrainingRoom" >
            <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group  >
          </td>
    </tr>
    </tbody>
    </table>
    </div>
    <div >
      <!-- Fourth section -->
        <table class="border border-dark table table-bordered">
    <thead>
    <tr>
      <th class="invitation-column" >{{ $t('trainingStructure')}}</th>
      <th class="text-center">1</th>
      <th class="text-center">2</th>
      <th class="text-center">3</th>
      <th class="text-center">4</th>
      <th class="text-center">5</th>
      <th class="text-center">6</th>
    </tr>
  </thead>
<tbody>
    <tr>
      <td class="invitation-column">
        <p>{{ $t('easyTrainingMaterial')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.easyTrainingMaterial" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.easyTrainingMaterial" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.easyTrainingMaterial" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.easyTrainingMaterial" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.easyTrainingMaterial" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.easyTrainingMaterial" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>


        <tr>
      <td class="invitation-column">
        <p>{{ $t('theorypractice')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.theorypractice" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.theorypractice" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.theorypractice" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.theorypractice" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.theorypractice" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.theorypractice" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>
     
        <tr>
      <td class="invitation-column">
        <p>{{ $t('supportedlearningprocess')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.supportedlearningprocess" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.supportedlearningprocess" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.supportedlearningprocess" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.supportedlearningprocess" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.supportedlearningprocess" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.supportedlearningprocess" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>
    </tbody>
    </table>
    </div>
    </v-col>

    <v-col cols="12">
   <div >
   <!-- Fifth section -->
    <table class="border border-dark table table-bordered">
    <thead>
    <tr>
      <th class="invitation-column" >{{ $t('trainingImplementation') }}</th>
      <th class="text-center">1</th>
      <th class="text-center">2</th>
      <th class="text-center">3</th>
      <th class="text-center">4</th>
      <th class="text-center">5</th>
      <th class="text-center">6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="invitation-column">
        <p>{{ $t('learningspeed')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.learningspeed" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.learningspeed" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.learningspeed" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.learningspeed" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.learningspeed" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.learningspeed" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>
  

  <tr>
      <td class="invitation-column">
        <p>{{ $t('involvedtraining')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.involvedtraining" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.involvedtraining" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.involvedtraining" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.involvedtraining" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.involvedtraining" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.involvedtraining" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>
  
 <tr>
      <td class="invitation-column">
        <p>{{ $t('newthings')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.newthings" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.newthings" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.newthings" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.newthings" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.newthings" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.newthings" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>

    </tbody>
    </table>
    </div>
    <div >
      <!-- Sixth section -->

      <table class="border border-dark table table-bordered">
    <thead>
    <tr>
      <th class="invitation-column" >{{ $t('trainerSection') }}</th>
      <th class="text-center">1</th>
      <th class="text-center">2</th>
      <th class="text-center">3</th>
      <th class="text-center">4</th>
      <th class="text-center">5</th>
      <th class="text-center">6</th>
    </tr>
  </thead>
       <tbody>
<tr>
      <td class="invitation-column">
        <p>{{ $t('trainerwellprepared')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.trainerwellprepared" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.trainerwellprepared" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerwellprepared" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerwellprepared" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerwellprepared" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerwellprepared" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>


<tr>
      <td class="invitation-column">
        <p>{{ $t('trainerprofessional')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.trainerprofessional" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.trainerprofessional" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerprofessional" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerprofessional" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerprofessional" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerprofessional" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>



<tr>
      <td class="invitation-column">
        <p>{{ $t('trainerexplained')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.trainerexplained" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.trainerexplained" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerexplained" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerexplained" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerexplained" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerexplained" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>


    <tr>
      <td class="invitation-column">
        <p>{{ $t('trainerorganized')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.trainerorganized" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.trainerorganized" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerorganized" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerorganized" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerorganized" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.trainerorganized" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>
        </tbody>
        </table>
    </div>
    <div >  
      <!-- Seventh section -->

  <table class="border border-dark table table-bordered">
    <thead>
    <tr>
      <th class="invitation-column" >{{ $t('conclusion') }}</th>
      <th class="text-center">1</th>
      <th class="text-center">2</th>
      <th class="text-center">3</th>
      <th class="text-center">4</th>
      <th class="text-center">5</th>
      <th class="text-center">6</th>
    </tr>
  </thead>
<tbody>

<tr>
      <td class="invitation-column">
        <p>{{ $t('benefitseveryday')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.benefitseveryday" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.benefitseveryday" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.benefitseveryday" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.benefitseveryday" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.benefitseveryday" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.benefitseveryday" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>

<tr>
      <td class="invitation-column">
        <p>{{ $t('recommendKnorr')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.recommendKnorr" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.recommendKnorr" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.recommendKnorr" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.recommendKnorr" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.recommendKnorr" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.recommendKnorr" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>


<tr>
      <td class="invitation-column">
        <p>{{ $t('recommendtraining')}}</p>
      </td>
         <td class="text-center">
          <v-radio-group class="text-center" v-model="request.recommendtraining" >
            <v-radio class="feedback-radio"  value="Excellent"></v-radio>
          </v-radio-group>
          </td>
          <td class="text-center">
             <v-radio-group class="text-center" v-model="request.recommendtraining" >
            <v-radio class="feedback-radio" value="Good"></v-radio>
            </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.recommendtraining" >
              <v-radio class="feedback-radio"  value="Satisfactory"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.recommendtraining" >
              <v-radio class="feedback-radio"  value="Sufficient"></v-radio>
              </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.recommendtraining" >
              <v-radio class="feedback-radio"  value="Insufficient"></v-radio>
             </v-radio-group>
          </td>
          <td class="text-center">
              <v-radio-group class="text-center" v-model="request.recommendtraining" >
             <v-radio class="feedback-radio"  value="Deficient"></v-radio>
            </v-radio-group>
          </td>
    </tr>
</tbody>
  </table>
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
          <v-btn  outlined depressed tile class="save mr-2 mb-2" v-if="!$rights.includes('CREATE_TRAINING_EVENT') || (addmanual==='true' && $rights.includes('CREATE_TRAINING_EVENT'))" @click="submitfeedback()">{{ $t("save") }}</v-btn>
          <v-btn  outlined depressed tile class="cancelbutton mr-2 mb-2" @click="$routerBack()">{{ $t("back") }}</v-btn>
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
        addmanual:null,
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
      this.addmanual=this.$route.query.addmanual;
      this.request.bookingId=this.$route.query.bookingId;
      this.request.trainingEventId=this.$route.query.trainingEventId;
      this.fetchEditingTrainingEvent();
      if(this.request.bookingId && this.request.trainingEventId)
      {
      this.fetchOnlineFeedBackForm();
      }
      else if(this.request.trainingEventId && this.addmanual==='true')
      {
      this.fetchManualFeedBackForm();
      }
      else if(this.$route.query.feedbackId!=null)
      {
      this.viewFeedBackForm();
      }
     },

   methods: {
    fetchEditingTrainingEvent() {
       var _this = this;
       this.$axios
        .get("/api/training/event/" + this.request.trainingEventId)
        .then(function (response) {
          _this.request.trainerName = response.data.trainers;
          _this.request.trainingName = response.data.training.designationsMap[_this.$locale];
          _this.request.trainingDate=response.data.startDateFormatted ;
          _this.request.trainingLocation=response.data.locationFormatted;
          })
          .catch(this.onError);
    },

    fetchOnlineFeedBackForm() {
       var _this = this;
       this.$axios
        .get("/api/booking/feedback/" + parseInt(this.request.bookingId, 10))
        .then(function (response) {
          if(response.data.feedback!==null)
          {
          _this.request.receivedInvitation=response.data.feedback.receivedInvitation;
          _this.request.satisfiedPreparation=response.data.feedback.satisfiedPreparation;
          _this.request.suitableTrainingRoom=response.data.feedback.suitableTrainingRoom;
          _this.request.expectedTrainingRoom=response.data.feedback.expectedTrainingRoom;
          _this.request.breakTimes=response.data.feedback.breakTimes;
          _this.request.cleanTrainingRoom=response.data.feedback.cleanTrainingRoom;
          _this.request.easyTrainingMaterial=response.data.feedback.easyTrainingMaterial;
          _this.request.theorypractice=response.data.feedback.theorypractice;
          _this.request.supportedlearningprocess=response.data.feedback.supportedlearningprocess;
          _this.request.learningspeed=response.data.feedback.learningspeed;
          _this.request.involvedtraining=response.data.feedback.involvedtraining;
          _this.request.newthings=response.data.feedback.newthings;
          _this.request.trainerwellprepared=response.data.feedback.trainerwellprepared;
          _this.request.trainerprofessional=response.data.feedback.trainerprofessional;
          _this.request.trainerexplained=response.data.feedback.trainerexplained;
          _this.request.trainerorganized=response.data.feedback.trainerorganized;
          _this.request.benefitseveryday=response.data.feedback.benefitseveryday;
          _this.request.recommendKnorr=response.data.feedback.recommendKnorr;
          _this.request.recommendtraining=response.data.feedback.recommendtraining;
          }
          })
          .catch(this.onError);
    },

    fetchManualFeedBackForm(){
       var _this = this;
       this.$axios
        .get("/api/training/event/feedback/" + parseInt(this.$route.query.trainingEventId, 10)+"/"+parseInt(this.$route.query.feedbackId, 10))
        .then(function (response) {
           if(response.data!==null)
          {
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
          _this.request.trainerprofessional=response.data.trainerprofessional;
          _this.request.trainerexplained=response.data.trainerexplained;
          _this.request.trainerorganized=response.data.trainerorganized;
          _this.request.benefitseveryday=response.data.benefitseveryday;
          _this.request.recommendKnorr=response.data.recommendKnorr;
          _this.request.recommendtraining=response.data.recommendtraining;
          }
          })
    },
    submitfeedback()
    {
      let _this=this;
      if(this.request.bookingId)
      {
      this.request.bookingId=parseInt(this.request.bookingId, 10);
        this.$axios
        .post("/api/booking/feedback", this.request)
        .then(function (response) {
          _this.$noty.success(
              _this.$t("feedback_submitted")
            );
            
        })
        .catch(this.onError)
        .finally(() => {
        });
      }
      else{
        if(this.$route.query.feedbackId)
        {
        this.request.id=parseInt(this.$route.query.feedbackId, 10)
        }
        this.$axios
        .put("/api/training/event/manualfeedback", this.request)
        .then(function (response) {
          _this.$noty.success(
              _this.$t("feedback_submitted")
            );
            _this.$routerBack();
        })
        .catch(this.onError)
        .finally(() => {
        });

      }
    },
    viewFeedBackForm()
    {
       var _this = this;
       this.$axios
        .get("/api/booking/feedback/" + parseInt(this.$route.query.trainingEventId, 10)+"/"+parseInt(this.$route.query.feedbackId, 10))
        .then(function (response) {
           if(response.data!==null)
          {
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
          _this.request.trainerprofessional=response.data.trainerprofessional;
          _this.request.trainerexplained=response.data.trainerexplained;
          _this.request.trainerorganized=response.data.trainerorganized;
          _this.request.benefitseveryday=response.data.benefitseveryday;
          _this.request.recommendKnorr=response.data.recommendKnorr;
          _this.request.recommendtraining=response.data.recommendtraining;
          }
          })
    }
   }

}
</script>


