<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/trainingrequest.jpg'); background-position: top !important;">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("training_request") }}</div>
      </div>
    </div>
  </div>
  <div class="pt-8">
    <div class="row disablerow align-items-start">

      <!-- Tabs -->
      <v-tabs
        v-model="trainingRequestTab"
        align-with-title
        v-show="editMode"
        class="LanguageselectTabgroup pt-md-4 pt-lg-0 pl-md-8 pl-4"
      >
        <v-tabs-slider color="indigo"></v-tabs-slider>

        <v-tab
          class="LanguageselectTab"
        >
          {{ $t("training_request") }}
        </v-tab>
        <v-tab
          class="LanguageselectTab"
        >
          {{ $t("trainingevents") }}
        </v-tab>
      </v-tabs>

      <!-- Left Area -->
      <div class="col-xl-8 innercreatetraining">        
        <div class="px-md-4 mx-0 pa-0 text-content">

          <v-tabs-items v-model="trainingRequestTab">

          <!-- Tab for Editing Training Request -->
          <v-tab-item>

          <div class="row disablerow justify-content-between">

   <div class="col-md-12 row disablerow align-items-start">
                    <div class="col-md-12 pt-0">
                        <span class="headlinecolor text-h6"> {{$t("Training Course")}}</span>
                    </div>
                    <div class="col-md-12 row disablerow">
                       <div class="col-md-6">
                         <v-tooltip slot="append" bottom>
                             <template v-slot:activator="{ on, attrs }">
                        <v-autocomplete  
                          v-model="request.trainingId"
                          hide-details="auto"
                          class="datainput justify-content-end searchbar align-self-center pb-1"
                          :items="trainings"
                          item-text='text'
                          item-value='value'
                          style="padding-right:2px"
                          dense
                          outlined
                          v-bind="attrs"
                          v-on="on"
                          :label="$t('training') + '*'">
                        </v-autocomplete>
                          </template>     
                          <span>{{ $t("other_training_tooltip") }}</span>                   
                        </v-tooltip>    
                    </div>
                    <div class="col-6">
                        <v-tooltip slot="append" bottom>
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('other_training')"
                        v-model="request.otherTraining"
                        v-bind="attrs"
                        v-on="on"
                        >
                        </v-text-field>
                        </template>                    
                        <span>{{ $t("other_training_tooltip") }}</span>                   
                        </v-tooltip>    
                        
                    </div>
                    </div>
                </div>
                <div class="col-md-12 row disablerow align-items-start">
                    <div class="col-md-12 pt-0">
                        <span class="headlinecolor text-h6"> {{$t("customer_information")}}</span>
                    </div>
                    <div class="col-md-6 row disablerow">
                      <div class="col-12">
                          <v-text-field  
                          hide-details="auto"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('firstname') + '*'"
                          v-model="request.firstname"
                          ></v-text-field>
                      </div>
                      <div class="col-12">
                          <v-text-field  
                          hide-details="auto"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('lastname') + '*'"
                          v-model="request.lastname"
                          ></v-text-field>
                      </div>
                      <div class="col-12">
                          <v-text-field  
                          hide-details="auto"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('phone')+ '*'"
                          v-model="request.phone"
                          ></v-text-field>
                      </div>
                      <div class="col-12">
                          <v-text-field  
                          hide-details="auto"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('email') + '*'"
                          v-model="request.email"
                          ></v-text-field>
                      </div>

                      <div class="col-12">
                          <v-text-field  
                          hide-details="auto"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('customerNumber')"
                          v-model="request.customerNumber"
                          ></v-text-field>
                      </div>
                    </div>
 
                    <div class="col-md-6 row disablerow">
                      <div class="col-12">
                          <v-text-field  
                          hide-details="auto"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('company') + '*'"
                          v-model="request.customerName"
                          ></v-text-field>
                      </div>
                      <div class="col-12">
                          <v-text-field  
                          hide-details="auto"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('customer_location') + '*'"
                          v-model="request.customerLocation"
                          ></v-text-field>
                      </div>
                      <div class="col-sm-10 col-md-10 ">
                          <v-text-field  
                          hide-details="auto"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('street') + '*'"
                          v-model="request.street"
                          ></v-text-field>
                      </div>
                      <div class="col-12 col-sm-2 col-md-2 pl-sm-0 ">
                          <v-text-field  
                          hide-details="auto"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('number') + '*'"
                          v-model="request.hnr"
                          ></v-text-field>
                      </div>
                      <div class="col-sm-4 col-md-3 pr-sm-0 ">
                          <v-text-field  
                          hide-details="auto"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('postal code') + '*'"
                          v-model="request.zip"
                          ></v-text-field>
                      </div>
                      <div class="col-sm-8 col-md-9 ">
                          <v-text-field  
                          hide-details="auto"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('location') + '*'"
                          v-model="request.city"
                          ></v-text-field>
                      </div>
                      <div class="col-sm-12 col-md-12 ">
                          <v-select  
                          hide-details="auto"
                          :items="countries"
                          class="datainput justify-content-end align-self-center pb-1"
                          dense
                          outlined
                          :label="$t('country') + '*'"
                          v-model="request.country"
                          ></v-select>
                      </div>
                    </div>

                </div>
                <div class="col-md-6 row disablerow">
                    <div class="col-md-12 pt-0">
                        <span class="headlinecolor text-h6"> {{$t("training_event")}}</span>
                    </div>
                    <div class="col-12">
                       {{$t("documents in")+ '*'}}
                       <v-radio-group v-model="request.documentType"  dense class=" justify-content-end align-self-center">
                         <v-radio
                             :key="'usb'"
                             :label="$t('USBform')"
                             :value="'USB'"
                         ></v-radio>
                         <v-radio
                             :key="'print'"
                             :label="$t('printedForm')+$t('printedSet')"
                             :value="'PRINT'"
                          > </v-radio>
                        </v-radio-group>
                    </div>
                    <div class="col-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('contactPerson') + '*'"
                        v-model="request.contactPerson"
                        ></v-text-field>
                    </div>

                    <div class="col-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('training_location') + '*'"
                        v-model="request.location"
                        ></v-text-field>
                    </div>

                    <div class="col-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('available_infrastructure')"
                        :hint="$t('available_infrastructure_hint')"
                        v-model="request.infrastructure"
                        ></v-text-field>
                    </div>

                    <div class="col-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        type="number"
                        :label="$t('participantsAmount') + '*'"
                        v-model="request.participantsAmount"
                        ></v-text-field>
                    </div>

                    <div class="col-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('participantQualification') + '*'"
                        v-model="request.participantQualification"
                        ></v-text-field>
                    </div>

                    <div class="col-md-12  pb-4">
                      <v-textarea  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="editMode ? $t('customer_message') : $t('your_message')"
                        v-model="request.customerComments"
                        ></v-textarea>
                    </div>
                    
                </div>
                <div class="col-md-6 disablerow">
                    <div class="col-md-12 pt-0">
                        <span class="headlinecolor text-h6"> {{$t("training_details")}}</span>
                    </div>
                    <div class="col-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('vehicle')"
                        v-model="request.vehicle"
                        ></v-text-field>
                    </div>
                    <div class="col-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('productNumber')"
                        v-model="request.productNumber"
                        ></v-text-field>
                    </div>
                    <div class="col-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('productGroup')"
                        v-model="request.productGroup"
                        ></v-text-field>
                    </div>
                    <div class="col-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('projectNumber')"
                        v-model="request.projectNumber"
                        ></v-text-field>
                    </div>
                    <div class="col-sm-12 col-md-12 ">
                        <v-select  
                        hide-details="auto"
                        :items="$selectableLanguages"
                        item-value="key"
                        item-text="name"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('language') + '*'"
                        v-model="request.language"
                        ></v-select>
                    </div>
                    <div class="col-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        type="number"
                        :label="$t('trainingAmountNeeded') + '*'"
                        v-model="request.trainingAmountNeeded"
                        ></v-text-field>
                    </div>
                     <div class="col-12" id="trainingRequestDocument">
                        <Upload  v-model="request.trainingDocumentList" multiple allowOtherFileTypes />
                     </div>
           
                </div>
                <div class="col-md-6 disablerow" >
                    <div class="col-md-12 pt-0">
                        <span class="headlinecolor text-h6"> {{$t("logistics_by_customer")}}</span>
                    </div>
                    <div class="col-sm-12 col-md-12 ">
                        <v-select  
                        hide-details="auto"
                        :items="infrastructures"
                        item-value="value"
                        item-text="text"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        multiple
                        clearable
                        :label="$t('needed_infrastructures')"
                        v-model="request.neededInfrastructure"
                        ></v-select>
                    </div>
                    <div class="col-12" v-show="request.neededInfrastructure.includes('OTHER')">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('additional_needed_infrastructure')"
                        v-model="request.additionalNeededInfrastructure"
                        ></v-text-field>
                    </div>
                    <div class="col-sm-12 col-md-12 ">
                        <v-select  
                        hide-details="auto"
                        :items="toolsAndMaterials"
                        item-value="value"
                        item-text="text"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        multiple
                        clearable
                        :label="$t('needed_tools_and_materials')"
                        v-model="request.neededToolsAndMaterials"
                        ></v-select>
                    </div>
                    <div class="col-sm-12 col-md-12 ">
                        <v-select  
                        hide-details="auto"
                        :items="vehicles"
                        item-value="value"
                        item-text="text"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        multiple
                        clearable
                        :label="$t('needed_vehicles')"
                        v-model="request.neededVehicles"
                        ></v-select>
                    </div>
                    <div class="col-12" v-show="request.neededVehicles.includes('OTHER')">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('additional_needed_vehicles')"
                        v-model="request.additionalNeededVehicles"
                        ></v-text-field>
                    </div>
                </div>
                <div class="col-md-6 disablerow" >
                    <div class="col-md-12 pt-0">
                        <span class="headlinecolor text-h6"> {{$t("additional_information")}}</span>
                    </div>
                    <div class="col-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        type="number"
                        :label="$t('preparation_time_in_days') + '*'"
                        v-model="request.preparationTimeInDays"
                        ></v-text-field>
                    </div>
                    <div class="col-md-12 ">
                        <v-checkbox
                        v-model="request.overhaulingTraining"
                        class="no-margin-top"
                        :label="$t('overhauling_training')"
                        :hint="$t('overhauling_training_hint')"
                      ></v-checkbox>
                    </div>
                    <div class="col-md-12  pb-4">
                      <v-textarea  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('comment')"
                        v-model="request.comments"
                        ></v-textarea>
                    </div>
                </div>
                <div class="col-md-12">
                      <v-checkbox
                        v-model="consentprivacy"
                        class="no-margin-top"
                        hide-details="auto"
                        v-show = !editMode
                      >
                      <template v-slot:label>
                        <v-span>{{ $t('agree_privacy_policy2_part1') }} <a :href="`/files/images/KB_DS-Hinweise_knorr-bremse.com_DE_20220310_Website_${$locale}.pdf`" target="_blank" @click.stop>  {{$t('agree_privacy_policy2_part2')}}</a>   {{$t('agree_privacy_policy2_part3') }}</v-span>
                      </template>
                      </v-checkbox>
               </div>
               <div class="col-md-12 lastBtnSubmit">
                <v-btn v-show="!editMode" @click="sendRequest()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("send_request") }}</v-btn>
                <v-btn v-show="editMode" @click="sendRequest()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("save") }}</v-btn>
                <v-btn @click="$routerBack()" outlined depressed tile class="cancelBtn mr-2 mb-2">{{ $t("cancel") }}</v-btn>
                <v-btn v-show="editMode" @click="deleteRequest()" outlined depressed tile class="deletebutton cancelBtn mr-2 mb-2"> <v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
              </div>
            </div>
            <div class="text-right mb-1">
              <v-label>
                * {{ $t("mandatory_fields") }}
              </v-label>
            </div>
          </v-tab-item>

          <!-- Tab For Training Events -->
          <v-tab-item>
            <div class="px-md-4 mx-0 pa-0 text-content">

              <v-simple-table class="trainingstable" style="width:100%" hide-default-footer>
                <thead>
                  <tr>
                    <th @click="sort = 'training.id', order = !order,page = 1, fetchTrainingEvents()" class="text-uppercase align-bottom">
                      {{$t("training")}} <v-icon v-show="sort == 'training.id' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'training.id' && !order" >fas fa-chevron-up</v-icon>
                    </th>
                    <th @click="sort = 'startDate', order = !order,page = 1, fetchTrainingEvents()" class="text-uppercase align-bottom">
                      {{$t("date")}} <v-icon v-show="sort == 'startDate' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'startDate' && !order" >fas fa-chevron-up</v-icon>
                    </th>
                    <th @click="sort = 'room.location.id', order = !order,page = 1, fetchTrainingEvents()" class="text-uppercase align-bottom">
                      {{$t("location")}} <v-icon v-show="sort == 'room.location.id' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'room.location.id' && !order" >fas fa-chevron-up</v-icon>
                    </th>
                    <th class="text-uppercase align-bottom">
                      {{$t("free_spaces")}}
                    </th>
                    <th @click="sort = 'status', order = !order,page = 1, fetchTrainingEvents()" class="text-uppercase align-bottom">
                      {{$t("type")}} <v-icon v-show="sort == 'status' && order" >fas fa-chevron-down</v-icon><v-icon v-show="sort == 'status' && !order" >fas fa-chevron-up</v-icon>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="trainingEvent in trainingEvents" :key="trainingEvent.id" @click="$router.push('/edit-training-event?trainingEventId=' + trainingEvent.id)">
                    <td class="pb-1 text-uppercase align-bottom">{{trainingEvent.training.designationsMap[$locale]}}</td>
                    <td class="pb-1 text-uppercase align-bottom">{{trainingEvent.startDateFormatted}}</td>
                    <td class="pb-1 text-uppercase align-bottom">{{trainingEvent.locationFormatted}}</td>
                    <td class="pb-1 text-uppercase align-bottom">{{trainingEvent.freeSpaces}}</td>
                    <td class="pb-1 text-uppercase align-bottom">{{ $t(trainingEvent.status)}}</td>
                  </tr>
                  <tr v-show="trainingEvents.length == 0">
                    <td class="pb-1 text-uppercase align-bottom" colspan="6">{{$t("no_trainingEvents")}}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <pagination
                  class="my-2"
                  :current-page="events_page"
                  :total-pages="events_totalPages"
                  :show-previous-page="events_previousPage"
                  :show-next-page="events_nextPage"
              ></pagination>
            </div>
          </v-tab-item>

          </v-tabs-items>
        </div>
      </div>

      <!-- Right Area -->
      <div class="col-xl-4 px-0 pl-8 pl-8 pl-md-12 pl-lg-8  row pt-0 onlyContact">
        <div class="col-xl-12 right-side-block" v-show="editMode">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn v-show="editMode" @click="download()" outlined depressed tile class="downBtn mr-2 mb-2"> <v-icon color="#444" small >fas fa-file-pdf</v-icon> {{ $t("downloadpdf") }}</v-btn>
        </div>
        <div class="col-xl-12 right-side-block" v-show="editMode">
          <h3>{{ $t("customer") }}</h3>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn @click="createTenant()" v-show="request.customerTenant == null" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("create_tenant") }}</v-btn>
          <v-btn @click="createTrainingEvent()" v-show="request.customerTenant != null" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("create_trainingEvent") }}</v-btn>
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
        trainings: [],
        countries: [],
        infrastructures: [
          {value: "TRAINING_ROOM", text: this.$t("training_room")},
          {value: "PROJECTOR", text: this.$t("projector")},
          {value: "FLIPCHART", text: this.$t("flipchart")},
          {value: "OTHER", text: this.$t("other")},
        ],
        toolsAndMaterials: [
          {value: "SPARE", text: this.$t("spare")},
          {value: "SPECIALTOOLS", text: this.$t("specialtools")},
          {value: "OPK", text: this.$t("opk")},
          {value: "CUSTOMER_DOCUMENTATION", text: this.$t("customer_documentation")},
          {value: "TEST_BED", text: this.$t("test_bed")},
          {value: "BR_PROTOCOL", text: this.$t("br_protocol")},
        ],
        vehicles: [
          {value: "VEHICLE", text: this.$t("vehicle")},
          {value: "WORKSHOP_PIT", text: this.$t("workshop_pit")},
          {value: "SWITCHING_AUTHORISATION", text: this.$t("switching_authorisation")},
          {value: "OTHER", text: this.$t("other")},
        ],

        trainingEvents: [],
        events_page: 1,
        events_totalPages: 1,
        events_ElementPerPage: 50,
        events_sort: null,
        events_order: true,

        editMode: false,

        consentprivacy: false,

        trainingRequestTab: null,

        request: {
          firstname: null,
          lastname: null,
          phone: null,
          email: null,
          customerName: null,
          customerLocation: null,
          customerNumber: null,
          documentType:"USB",
          street: null,
          hnr: null,
          zip: null,
          city: null,
          country: null,
          trainingId: null,
          vehicle: null,
          productNumber: null,
          productGroup: null,
          projectNumber: null,
          language: null,
          otherTraining: null,
          trainingAmountNeeded: null,
          contactPerson: null,
          location: null,
          customerComments: null,
          infrastructure: null,
          participantsAmount: null,
          participantQualification: null,
          customerComments: null,
          preparationTimeInDays: null,
          neededInfrastructure: [],
          additionalNeededInfrastructure: null,
          neededToolsAndMaterials: [],
          neededVehicles: [],
          additionalNeededVehicles: null,
          comments: null,
          overhaulingTraining: false,
          trainingDocumentList:[]
        }
      }
    },

    mounted(){
      this.fetchTrainings();
      this.fetchCountries();

      if(this.trainingId != null) this.request.trainingId = parseInt(this.trainingId);
      if(this.trainingRequestId != null){
        this.editMode = true;
        this.fetchEditingTrainingRequest();
      }
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

      fetchTrainings() {
        var _this = this;
        this.$axios
          .get("/api/training/trainings")
          .then(function (response) {
            const trainings = response.data;
            for (let i = 0; i < trainings.length; i++) {
              const training = trainings[i];
              _this.trainings.push({
                text: training.designationsMap[_this.$locale],
                value: training.id,
              });
            }
            _this.$forceUpdate();
          })
          .catch(this.onError);
      },

      fetchEditingTrainingRequest() {
        var _this = this;
        this.$axios
          .get("/api/training/request/" + this.trainingRequestId)
          .then(function (response) {
            _this.request = response.data;
            _this.request.trainingId = response.data.training ? response.data.training.id : null;
            _this.trainingEvents = _this.request.trainingEvents;
            if(_this.trainingEvents.length > 0) _this.trainingRequestTab = 1;
          })
          .catch(this.onError);
      },

      fetchCountries() {
        var _this = this;
        this.$axios
          .get("/api/location/countries")
          .then(function (response) {
            const countriesFromServer = response.data;
            _this.countries = [];
            for (let i = 0; i < countriesFromServer.length; i++) {
              const country = countriesFromServer[i];
              _this.countries.push({
                text: _this.$t(country),
                value: country
              });
            }
            _this.countries.sort((a,b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
            _this.$forceUpdate();
          })
          .catch(this.onError);
      },

      deleteRequest(){
        if(this.request.id == null){
          console.error("You are not editing an existing training course request.");
          return;
        }

        var _this = this;

        this.$axios
          .delete("/api/training/request/" + this.request.id)
          .then(function (response) {
            _this.$noty.success(_this.$t("request_deleted"));
            _this.$router.push("/training-requests");
          })
          .catch(this.onError);
      },


      sendRequest(silent = false, afterFunction = null){
        var _this = this;
        var request = {};
        request = Object.assign(request, this.request);

        console.log(request);

        if(this.editMode && this.trainingRequestId) request.id = this.trainingRequestId;
      
        // Training oder Anderes Training muss vorhanden seinen
        if(request.otherTraining == null && request.trainingId == null){
          this.$noty.error(this.$t("empty_values", {name: this.$t("other_training"), name2: this.$t("training")}));
          return;
        }

        if(request.firstname == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("firstname")}));
          return;
        }
        if(request.lastname == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("lastname")}));
          return;
        }
        if(request.phone == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("phone")}));
          return;
        }
        if(request.email == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("email")}));
          return;
        }
        if(request.customerName == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("company")}));
          return;
        }
        if(request.customerLocation == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("customer_location")}));
          return;
        }
        if(request.street == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("street")}));
          return;
        }
        
        if(request.hnr == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("number")}));
          return;
        }
        if(request.zip == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("postal code")}));
          return;
        }
        if(request.city == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("location")}));
          return;
        }
        
        if(request.country == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("country")}));
          return;
        }
        if(request.contactPerson == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("contactPerson")}));
          return;
        }
        if(request.documentType==null)
        {
          this.$noty.error(this.$t("empty_value", {name: this.$t("documents in")}));
          return;
        }
        if(request.location == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("training_location")}));
          return;
        }
        // if(request.infrastructure == null){
        //   this.$noty.error(this.$t("empty_value", {name: this.$t("available_infrastructure")}));
        //   return;
        // }
        if(request.participantsAmount == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("participantsAmount")}));
          return;
        }
        if(request.participantQualification == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("participantQualification")}));
          return;
        }
        // if(request.customerComments == null){
        //   this.$noty.error(this.$t("empty_value", {name: this.editMode ? $t('customer_message') : $t('your_message')}));
        //   return;
        // }
        // if(request.vehicle == null){
        //   this.$noty.error(this.$t("empty_value", {name: this.$t("vehicle")}));
        //   return;
        // }
        // if(request.productNumber == null){
        //   this.$noty.error(this.$t("empty_value", {name: this.$t("productNumber")}));
        //   return;
        // }
        
        // if(request.productGroup == null){
        //   this.$noty.error(this.$t("empty_value", {name: this.$t("productGroup")}));
        //   return;
        // }
        // if(request.vehicle == null){
        //   this.$noty.error(this.$t("empty_value", {name: this.$t("vehicle")}));
        //   return;
        // }
        // if(request.projectNumber == null){
        //   this.$noty.error(this.$t("empty_value", {name: this.$t("projectNumber")}));
        //   return;
        // }
        if(request.language == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("language")}));
          return;
        }
        if(request.trainingAmountNeeded == null){
          this.$noty.error(this.$t("empty_value", {name: this.$t("trainingAmountNeeded")}));
          return;
        }

       
        if(!this.editMode){
          if(!this.consentprivacy){
            this.$noty.error(this.$t("please_accept_privacy_policy"));
            return;
          }
        }

        delete request.training;

        progressIndicator.hidden = false;
        showLoadingCircle(true);

        this.$axios
          .post("/api/training/request", request)
          .then(function (response) {
            if(!silent){
              if(_this.editMode){
                _this.$noty.success(_this.$t("request_edited"));
                _this.$router.push("/training-requests");
              }else{
                _this.$noty.success(_this.$t("request_sent"));
                _this.$router.push("/");
              }
            }
            if(afterFunction != null) afterFunction();
          })
          .catch(this.onError)
          .finally(this.onFinally);
      },

      createTenant() {
        if(this.trainingRequestId == null) return;
        var _this = this;
        this.sendRequest(true, function(){
          _this.$axios
            .post("/api/training/request/" + _this.trainingRequestId + "/create-tenant")
            .then(function (response) {
              const customerName = _this.request.customerLocation == null ? _this.request.customerName : _this.request.customerName + " " + _this.request.customerLocation;
              _this.$noty.success(_this.$t("tenant_saved", {name: customerName}));
              _this.fetchEditingTrainingRequest();
            })
            .catch(_this.onError);
        }); 
      },

      createTrainingEvent(){
        if(this.trainingRequestId == null) return;
        this.$router.push("/create-training-event?trainingRequestId=" + this.trainingRequestId);
      },
      download()
      {
        if(this.trainingRequestId == null) return;
        var _this = this;
        this.$axios
          .get("/api/training/request/" + _this.trainingRequestId + "/download", { responseType: 'blob' })
          .then(function (response) {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'training_request_'+_this.trainingRequestId+'.pdf')
            document.body.appendChild(link)
            link.click()
          })
          .catch(this.onError)
          .finally(this.onFinally);
      }
    }
}
</script>