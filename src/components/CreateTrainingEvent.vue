<template>
<div>
  <div>
    <div class="sixteentosix omt-6 omt-md-25"> 
      <div class="kachelimage header-image" v-if="!editMode || trainingEvent == null || trainingEvent.training == null" style="background: url('/static/img/graph_pen.jpg')">
        <div class="headline">
          <div class="text-subtitle-2 text-md-h5">{{ $t("create_trainingEvent") }}</div>
        </div>
      </div>
      <div class="kachelimage header-image" v-else :style="{'background': 'url(\'/files/images/' + trainingEvent.training.category.image + '\')'}">
        <div class="headline">
          <div class="text-subtitle-2 text-md-h5">{{ $user != null && $user.booker ? $t("book_to_event") : $t("edit_trainingEvent") }} <img class="ml-2" src="../assets/img/arrow_right.svg" height="18px"><img class="mr-2" src="../assets/img/arrow_right.svg" height="18px"> {{ trainingEvent.training.designationsMap[$locale] }}</div>
        </div>
      </div>
      </div>
  </div>

  <div>
    <div class="pt-8">
      <!-- <div class="row justify-content-between ml-0 mr-n7">
      	<span v-if="selectedCategory != null" class="text-uppercase text-h6 text-sm-h5 text-md-h5 mb-0 pt-1">{{ selectedCategory.designationMap[$locale] }} >> {{$t("create_trainingEvent")}} </span>
        <span v-else-if="editMode" class="text-uppercase text-h6 text-sm-h5 text-md-h5 mb-0 pt-1">{{$t("edit_trainingEvent")}} </span>
        <span v-else class="text-uppercase text-h6 text-sm-h5 text-md-h5 mb-0 pt-1">{{$t("create_trainingEvent")}} </span>
      </div>
    <v-divider class="col-sm-12 mt-0 mb-0"></v-divider> -->
    <div class="row disablerow justify-content-between align-items-start">

    <!-- Tabs -->
    <v-tabs
      v-model="trainingEventTab"
      align-with-title
      class="LanguageselectTabgroup pt-md-4 pt-lg-0 pl-md-8 pl-4"
    >
      <v-tabs-slider color="indigo"></v-tabs-slider>

      <v-tab
        class="LanguageselectTab"
        :disabled="!$rights.includes('CREATE_TRAINING_EVENT')"
        :hidden="!$rights.includes('CREATE_TRAINING_EVENT')"
      >
        {{ $t("edit_trainingEvent") }}
      </v-tab>
      <v-tab
        class="LanguageselectTab"
      >
        {{ $rights.includes('CREATE_TRAINING_EVENT') ? $t("preview") : $t("details") }}
      </v-tab>
      <v-tab
        class="LanguageselectTab"
        :disabled="!editMode || eventStatus==='drafted'"
      >
        <span>{{ $t("participants") }}</span>
      </v-tab>
      <v-tab
        class="LanguageselectTab"
        :disabled="!editMode || !$rights.includes('CREATE_BOOKING') || eventStatus==='drafted'"
        :hidden="!$rights.includes('CREATE_BOOKING') || $user == null || $user.translator"
      >
        {{ $t("add_participants") }}
      </v-tab>
        <v-tab
        class="LanguageselectTab"
        :disabled="!editMode || !$rights.includes('CREATE_TRAINING_EVENT') || eventStatus==='drafted'"
        :hidden="!$rights.includes('CREATE_TRAINING_EVENT') || $user == null || $user.translator"
      >
        {{ $t("onlineFeedbackForms") }}
      </v-tab>
        <v-tab
        class="LanguageselectTab"
        :disabled="!editMode || !$rights.includes('CREATE_TRAINING_EVENT') || eventStatus==='drafted'"
        :hidden="!$rights.includes('CREATE_TRAINING_EVENT') || $user == null || $user.translator"
      >
        {{ $t("manualFeedbackForms") }}
      </v-tab>
       <v-tab
        class="LanguageselectTab"
        :disabled="!editMode || !$rights.includes('CREATE_TRAINING_EVENT') || eventStatus==='drafted'"
        :hidden="!$rights.includes('CREATE_TRAINING_EVENT') || $user == null || $user.translator "
      >
        {{ $t("seatShare") }}
      </v-tab>
    </v-tabs>
    <div class="col-md-12 col-xl-9 innercreatetraining mb-3 mb-lg-0 pt-5 px-md-8 px-4 mx-0 pa-5">
        <!-- Put Content here -->
        <v-tabs-items v-model="trainingEventTab">

          <!-- Tab for Editing Training Event -->
          <v-tab-item>
             <div class="col-sm-6 col-md-6 mt-2">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1 "
                        dense
                        outlined
                        :label="$t('eventNumber')"
                        v-model="trainingEvent.eventNumber"
                        ></v-text-field>
              </div>
            <div class="row disablerow justify-content-between">

                <div class="col-md-6 row disablerow">
                  
                    <div class="col-md-12 pt-0">
                        <span class="headlinecolor text-h6"> {{$t("general")}}</span>
                    </div>
                    <div class="col-sm-6 col-md-6 ">
                        <DatePicker v-model="trainingEvent.startDate" clearable :label="$t('begin_date') + '*'" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 pl-sm-0 ">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('begin_time_format') + '*'"
                        v-model="trainingEvent.startTime"
                        clearable
                        ></v-text-field>
                    </div>
                    <div class="col-sm-6 col-md-6 ">
                        <DatePicker v-model="trainingEvent.endDate" clearable :label="$t('end_date') + '*'" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 pl-sm-0 ">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('end_time_format') + '*'"
                        v-model="trainingEvent.endTime"
                        clearable
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
                        v-model="trainingEvent.language"
                        ></v-select>
                    </div>
                    <div class="col-sm-12 col-md-12 ">
                        <v-select  
                        hide-details="auto"
                        :items="selectableStatus"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('status') + '*'"
                        v-model="trainingEvent.status"
                        ></v-select>
                    </div>
                    <div class="col-sm-12 col-md-12 ">
                        <v-select  
                        hide-details="auto"
                        :items="selectableExamTypes"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('examType') + '*'"
                        v-model="trainingEvent.examType"
                        ></v-select>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('minParticipants') + '*'"
                        type="number"
                        v-model="trainingEvent.minParticipants"
                        ></v-text-field>
                    </div>
                    <div class="col-sm-6 col-md-6 ">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('maxParticipants') + '*'"
                        type="number"
                        v-model="trainingEvent.maxParticipants"
                        ></v-text-field>
                    </div>
                    <div class="col-sm-12 col-md-12">
                        <v-autocomplete  
                          v-model="trainingEvent.trainerId"
                          hide-details="auto"
                          class="datainput justify-content-end searchbar align-self-center pb-1"
                          :items="trainers"
                          item-text='fullname'
                          item-value='id'
                          style="padding-right:2px"
                          dense
                          outlined
                          :label="$t('first_trainer') + '*'">
                        </v-autocomplete>
                    </div>
                    <div class="col-sm-12 col-md-12">
                        <v-autocomplete  
                          v-model="trainingEvent.trainer2Id"
                          hide-details="auto"
                          class="datainput justify-content-end searchbar align-self-center pb-1"
                          :items="trainers"
                          item-text='fullname'
                          item-value='id'
                          style="padding-right:2px"
                          dense
                          outlined
                          clearable
                          :label="$t('second_trainer')">
                        </v-autocomplete>
                    </div>
                    <div class="col-sm-12 col-md-12">
                        <v-autocomplete  
                          v-model="trainingEvent.translatorId"
                          hide-details="auto"
                          class="datainput justify-content-end searchbar align-self-center pb-1"
                          :items="translators"
                          item-text='fullname'
                          item-value='id'
                          style="padding-right:2px"
                          dense
                          outlined
                          clearable
                          :label="$t('translator')">
                          <template v-slot:item="data">
                            <span v-if="data != null && data.item != null">{{ data.item.fullname }}</span>
                            <img v-for="language in data.item.languages" :key="language" class="ml-2" style="width:26px;height:17px;vertical-align: unset" :src="'/files/flags/' + language.flag">
                          </template>
                          <template v-slot:selection="data">
                            <span v-if="data != null && data.item != null" style="color: black;">{{ data.item.fullname }}</span>
                            <img v-for="language in data.item.languages" :key="language" class="ml-2" style="width:26px;height:17px;vertical-align: unset;" :src="'/files/flags/' + language.flag">
                          </template>
                        </v-autocomplete>
                    </div>
                    <div class="col-sm-12 col-md-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('serviceOrderNumber')"
                        v-model="trainingEvent.serviceOrderNumber"
                        ></v-text-field>
                    </div>
                </div>
                <div class="col-md-6 disablerow">
                    <div class="col-md-12 pt-0">
                        <span class="headlinecolor text-h6"> {{$t("trainingEvent_details")}}</span>
                    </div>
                    <div class="col-md-12">
                        <v-autocomplete  
                          v-model="trainingEvent.trainingId"
                          hide-details="auto"
                          class="datainput justify-content-end searchbar align-self-center pb-1"
                          :items="trainings"
                          item-text='text'
                          item-value='id'
                          style="padding-right:2px"
                          dense
                          outlined
                          :label="$t('training') + '*'">
                        </v-autocomplete>
                    </div>
                    <div class="col-md-12">
                        <v-autocomplete  
                          v-model="selectedLocationId"
                          hide-details="auto"
                          class="datainput justify-content-end searchbar align-self-center pb-1"
                          :items="locations"
                          item-text='designation'
                          item-value='id'
                          style="padding-right:2px"
                          @change="fetchRooms(true)"
                          :disabled="locationAndRoomDisabled"
                          dense
                          outlined
                          clearable
                          :label="$t('location')">
                        </v-autocomplete>
                    </div>
                    <div class="col-md-12">
                        <v-autocomplete  
                          v-model="trainingEvent.roomId"
                          hide-details="auto"
                          class="datainput justify-content-end searchbar align-self-center pb-1"
                          :items="rooms"
                          item-text='designation'
                          item-value='id'
                          style="padding-right:2px"
                          :disabled="locationAndRoomDisabled"
                          dense
                          outlined
                          clearable
                          :label="$t('room')">
                        </v-autocomplete>
                    </div>
                    <div class="col-md-12">
                        <v-autocomplete  
                          v-model="trainingEvent.customerId"
                          hide-details="auto"
                          class="datainput justify-content-end searchbar align-self-center pb-1"
                          :items="customers"
                          item-text='name'
                          item-value='id'
                          style="padding-right:2px"
                          dense
                          outlined
                          clearable
                          :label="$t('customer')">
                        </v-autocomplete>
                    </div>
                    <div class="col-md-12">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('onlineLink')"
                        v-model="trainingEvent.onlineLink"
                        ></v-text-field>
                    </div>
                    <div class="col-md-12 ">
                        <v-checkbox
                        v-model="trainingEvent.withPSA"
                        class="no-margin-top"
                        :label="$t('employment_protection_needed')"
                      ></v-checkbox>
                    </div>
                    <div class="col-md-12 ">
                        <Upload v-model="trainingEvent.documents" multiple allowOtherFileTypes /><br>
                        <Upload v-model="trainingEvent.internalDocuments" multiple allowOtherFileTypes internalFiles />
                        <v-label v-if="trainingEvent.training != null && trainingEvent.training.documents != null && trainingEvent.training.documents.length > 0">
                          {{ trainingEvent.training.documents.length }}&nbsp;
                            <span v-show="trainingEvent.training.documents.length == 1">{{ $t("document_from_training") }}</span>
                            <span v-show="trainingEvent.training.documents.length > 1">{{ $t("documents_from_training") }}</span>
                        </v-label><br>
                    </div>
                      <div class="col-md-12">
                        <v-textarea  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('comment')"
                        v-model="trainingEvent.comment"
                        ></v-textarea>
                      </div>
                </div>
            </div>
            <div class="text-right">
              <v-label>
                * {{ $t("mandatory_fields") }}
              </v-label>
            </div>
          </v-tab-item>


          <!-- Tab for Preview or Details -->
          <v-tab-item>
            <div class="headlinecolor text-h6 col-md-6 border border-primary" ><b>{{ $t("eventNumber") }}:</b> <span class="text-dark pl-2">{{ trainingEvent.eventNumber }}</span></div>
            <div class="mx-0 pa-0 text-content row disablerow justify-content-between align-items-start">
                <div class="col-md-6 px-0">
                  <div class="col-md-12 pt-0">
                      <span class="headlinecolor text-h6"> {{$t("general")}}</span>
                  </div>
                  <div class="col-md-12" v-if="trainingEvent.training != null"><b>{{ $t("training") }}:</b> {{ trainingEvent.training.designationsMap[$locale] }}</div>
                  <div class="col-md-12" v-if="trainingEvent.training == null && trainingEvent.trainingId != null"><b>{{ $t("training") }}:</b> {{ getArrayElementById("trainings", trainingEvent.trainingId).designationsMap[$locale] }}</div>
                
                  <div class="col-md-12" v-if="trainingEvent.serviceOrderNumber != null && trainingEvent.serviceOrderNumber != ''"><b>{{ $t("serviceOrderNumber") }}:</b> {{ trainingEvent.serviceOrderNumber }}</div>
                  <div class="col-md-12"><b>{{ $t("date") }}:</b> {{ trainingEvent.startDateFormatted }}</div>
                  <div class="col-md-12"><b>{{ $t("time") }}:</b> {{ trainingEvent.timesFormatted }}</div>
                  <div class="col-md-12" v-if="trainingEvent.training != null"><b>{{ $t("training_type") }}:</b> {{ $t(trainingEvent.training.type) }}</div>
                  <div class="col-md-12" v-if="trainingEvent.training == null && trainingEvent.trainingId != null"><b>{{ $t("training_type") }}:</b> {{ $t(getArrayElementById("trainings", trainingEvent.trainingId).type) }}</div>
                  <div class="col-md-12"><b>{{ $t("language") }}:</b> {{ $t(trainingEvent.language) }}</div>
                  <div class="col-md-12" v-if="selectedUsers.trainer != null"><b>{{ $t("trainer") }}:</b> {{ selectedUsers.trainer.fullname }}</div>
                  <div class="col-md-12" v-if="selectedUsers.trainer2 != null"><b>{{ $t("second_trainer") }}:</b> {{ selectedUsers.trainer2.fullname }}</div>
                  <div class="col-md-12"><b>{{ $t("translator") }}:</b> {{ trainingEvent.hasTranslator ? $t("yes") : $t("no") }}</div>
                  <div class="col-md-12" v-if="selectedUsers.translator != null"><b>{{ $t("translator") }}:</b> {{ selectedUsers.translator.fullname }}</div>
                  <div class="col-md-12"><b>{{ $t("examType") }}:</b> {{ $t(trainingEvent.examType.toLowerCase() + "_exam") }}</div>
                  <div class="col-md-12"><b>{{ $t("employment_protection_needed") }}:</b> {{ trainingEvent.withPSA ? $t("yes") : $t("no") }}</div>
                  <div class="col-md-12" v-if="trainingEvent.status != null"><b>{{ $t("status") }}:</b> {{ $t(trainingEvent.status) }}</div>

                </div>
                <div class="col-md-6 px-0">
                  <div class="col-md-12 pt-0">
                      <span class="headlinecolor text-h6"> {{$t("location")}}</span>
                  </div>
                  <div class="col-md-12"><b>{{ $t("address") }}:</b><br>{{ trainingEvent.locationFormatted }}</div>
                  <div class="col-md-12"><b>{{ $t("room") }}:</b> {{ trainingEvent.roomFormatted }}</div>

                  <div class="col-md-12 pt-0" v-show="trainingEvent.onlineLink != null || (trainingEvent.documents != null && trainingEvent.documents.length > 0) || (trainingEvent.internalDocuments != null && trainingEvent.internalDocuments.length > 0)">
                      <span class="headlinecolor text-h6"> {{$t("further_information")}}</span>
                  </div>
                  <div class="col-md-12" v-if="trainingEvent.customerId != null"><b>{{ $t("customer") }}:</b> {{ getArrayElementById("customers", trainingEvent.customerId).name }}</div>
                   <div class="col-md-12" ><b>{{ $t("sharedSeatsWithBelowCompanies") }}:</b>  
                   <div class="list-component">
                   <v-list class="v-list-flex v-list_custom">
                   <v-list-item v-for="(item, index) in seatShare" :key="index">
                     <v-list-item-content>
                       {{ displaySeatShare(item) }}
                     </v-list-item-content>
                    </v-list-item>
                </v-list>
               </div>
               </div>
                 <div class="col-md-12"> <b> {{ $t("availableSeats") }}</b>{{trainingEvent.freeSpaces - seatOccupied}}</div>
                  <div class="col-md-12" v-show="trainingEvent.onlineLink != null"><b>{{ $t("onlineLink") }}:</b>&nbsp;<a :href="clickableOnlineLink" target="_blank">{{ trainingEvent.onlineLink }}</a></div>
                  <div class="col-md-12" v-if="trainingEvent.documents != null && trainingEvent.documents.length > 0">
                    <b>{{ $t("documents_for_download") }}:</b><br><br>
                    <Upload v-model="trainingEvent.documents" multiple allowOtherFileTypes onlyDisplay />
                  </div>
                  <div class="col-md-12" v-if="trainingEvent.internalDocuments != null && trainingEvent.internalDocuments.length > 0">
                    <b>{{ $t("internal_documents_for_download") }}:</b><br><br>
                    <Upload v-model="trainingEvent.internalDocuments" multiple allowOtherFileTypes onlyDisplay internalFiles/>
                  </div>
                </div>
              <!-- <div class="row align-items-start">
              </div> -->
            </div>
          </v-tab-item>


          <!-- Tab for Participants -->
          <v-tab-item>
            <div class="px-md-4 pl-4 mx-0 pa-0 text-content row disablerow justify-content-between">

              <v-simple-table class="trainingstable" style="width:100%" hide-default-footer>
                <thead>
                  <tr>
                    <th @click="participants_sort = 'participant.lastname', participants_order = !participants_order,participants_page = 1, fetchBookings()" class="text-uppercase align-bottom">
                      {{$t("name")}} <v-icon v-show="participants_sort == 'participant.lastname' && participants_order" >fas fa-chevron-down</v-icon><v-icon v-show="participants_sort == 'participant.lastname' && !participants_order" >fas fa-chevron-up</v-icon>
                    </th>
                    <!-- <th @click="participants_sort = 'participant.personnelnumber', participants_order = !participants_order,participants_page = 1, fetchBookings()" class="text-uppercase align-bottom">
                      {{$t("persnumber")}} <v-icon v-show="participants_sort == 'participant.personnelnumber' && participants_order" >fas fa-chevron-down</v-icon><v-icon v-show="participants_sort == 'participant.personnelnumber' && !participants_order" >fas fa-chevron-up</v-icon>
                    </th> -->
                    <th v-show="$user != null && $user.external" @click="participants_sort = 'participant.location', participants_order = !participants_order,participants_page = 1, fetchBookings()" class="text-uppercase align-bottom">
                      {{$t("location")}} <v-icon v-show="participants_sort == 'participant.location' && participants_order" >fas fa-chevron-down</v-icon><v-icon v-show="participants_sort == 'participant.location' && !participants_order" >fas fa-chevron-up</v-icon>
                    </th>
                    <th v-show="$user != null && !$user.external" @click="participants_sort = 'participant.company', participants_order = !participants_order,participants_page = 1, fetchBookings()" class="text-uppercase align-bottom">
                      {{$t("company")}} <v-icon v-show="participants_sort == 'participant.company' && participants_order" >fas fa-chevron-down</v-icon><v-icon v-show="participants_sort == 'participant.company' && !participants_order" >fas fa-chevron-up</v-icon>
                    </th>
                    <th @click="participants_sort = 'bookingDate', participants_order = !participants_order,participants_page = 1, fetchBookings()" class="text-uppercase align-bottom">
                      {{$t("booking_date")}} <v-icon v-show="participants_sort == 'bookingDate' && participants_order" >fas fa-chevron-down</v-icon><v-icon v-show="participants_sort == 'bookingDate' && !participants_order" >fas fa-chevron-up</v-icon>
                    </th>
                    <th class="text-uppercase align-bottom">{{$t("actions")}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="booking in bookings" :key="booking.id">
                    <td class="pb-0 text-uppercase align-center">{{ booking.participant.lastname }}, {{ booking.participant.firstname }}</td>
                    <!-- <td class="pb-0 text-uppercase align-center">{{ booking.participant.personnelnumber }}</td> -->
                    <td v-show="$user != null && $user.external" class="pb-0 text-uppercase align-center">{{ booking.participant.location }}</td>
                    <td v-show="$user != null && !$user.external" class="pb-0 text-uppercase align-center">{{ booking.participant.company }}</td>
                    <td class="pb-0 text-uppercase align-center">{{ $formatDate(booking.bookingDate) }}</td>
                    <td class="pb-0">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn @click="showCertificate(booking.id)" color="transparent" class="tablebutton" depressed tile v-bind="attrs" v-on="on"><img class="mr-2" src="../assets/img/show_certiicate.svg" height="25px"></v-btn>
                        </template>
                        <span>{{ $t("show_certificate") }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-show="$rights.includes('CREATE_BOOKING') && $user != null && !$user.booker && !$user.translator" :disabled="booking.participant.email == null" @click="sendMail(booking)" color="transparent" class="tablebutton" depressed tile v-bind="attrs" v-on="on">
                            <v-badge :value="true" color="primary" overlap>
                              <div slot="badge">
                                <span v-show="booking.invitationSendingLoading"><v-icon color="#fff" class="spinner-badge">fas fa-spinner</v-icon></span>
                                <span v-show="!booking.invitationSendingLoading">{{ booking.invitationsSent }}</span>
                              </div>
                              <img class="mr-2" src="../assets/img/send_invitation.svg" height="25px">
                            </v-badge>
                          </v-btn>
                        </template>
                        <span>{{ $t("send_invitation_mail") }}</span>
                      </v-tooltip>
                     
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn  v-show="$rights.includes('CREATE_BOOKING') && $user != null && !$user.external && !$user.translator && !$user.trainer" @click="sendOnlineFeedBack(booking)" color="transparent"  class="tablebutton" depressed tile v-bind="attrs" v-on="on">
                            <v-badge :value="true" color="primary" overlap>
                              <div slot="badge">
                                <span v-show="booking.feedBackSendingLoading"><v-icon color="#fff" class="spinner-badge">fas fa-spinner</v-icon></span>
                                <span v-show="!booking.feedBackSendingLoading">{{ booking.feedbackSent }}</span>
                              </div>
                             <img class="mr-2" src="../assets/img/send_feedback.svg" height="25px">
                            </v-badge>
                            </v-btn>
                        </template>
                        <span>{{ $t("feedback_form") }}</span>
                      </v-tooltip>
                       <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn  v-show="$rights.includes('CREATE_BOOKING') && $user != null && !$user.external && !$user.translator" @click="beforeOpenModal(booking)" color="transparent"  class="tablebutton" depressed tile v-bind="attrs" v-on="on"><img class="mr-2" src="../assets/img/edit_participant.svg" height="25px"></v-btn>
                        </template>
                        <span>{{ $t("edit_booking") }}</span>
                      </v-tooltip>
                       <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-show="$rights.includes('CREATE_BOOKING') && $user != null && !$user.translator" @click="deleteBooking(booking)" color="transparent"  class="tablebutton" depressed tile v-bind="attrs" v-on="on"><img class="mr-2" src="../assets/img/delete_booking.svg" height="25px"></v-btn>
                        </template>
                        <span>{{ $t("delete_booking") }}</span>
                      </v-tooltip>
                      
                    </td>
                  </tr>
                  <tr v-show="bookings.length == 0">
                    <td class="pb-1 text-uppercase align-bottom" colspan="6">{{$t("no_participants")}}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <pagination
                  v-show="$rights.includes('VIEW_BOOKINGS')"
                  class="my-2"
                  :current-page="participants_page"
                  :total-pages="participants_totalPages"
                  :show-previous-page="participants_previousPage"
                  :show-next-page="participants_nextPage"
              ></pagination>
            </div>
          </v-tab-item>

          <!-- Tab for Adding New Participants -->
          <v-tab-item>
            <div class="mx-0 pa-0 text-content">
              <div class="row disablerow">
                <div class="col-12 col-sm-6 col-md-6">
                    <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    id="add_participant_firstname"
                    :label="$t('firstname') + '*'"
                    v-model="adduser.firstname"
                    @keypress.enter="addParticipant()"
                    ></v-text-field>
                </div>
                <div class="col-sm-6 col-md-6 ">
                    <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    :label="$t('lastname') + '*'"
                    v-model="adduser.lastname"
                    @keypress.enter="addParticipant()"
                    ></v-text-field>
                </div>
                <!-- <div class="col-12 col-sm-6 col-md-6">
                    <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    :label="$t('personnelnumber') + '*'"
                    v-model="adduser.personnelnumber"
                    @keypress.enter="addParticipant()"
                    ></v-text-field>
                </div> -->
                <div class="col-12 col-sm-6 col-md-6" v-show="$user != null && !$user.external">
                    <v-autocomplete  
                        v-model="adduser.tenantId"
                        hide-details="auto"
                        class="datainput justify-content-end searchbar align-self-center pb-1"
                        :items="customers"
                        item-text='name'
                        item-value='id'
                        style="padding-right:2px"
                        dense
                        outlined
                        clearable
                        :label="$t('customer') + '*'">
                    </v-autocomplete>
                </div>
                <div class="col-sm-6 col-md-6 ">
                    <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    :label="$t('email')"
                    v-model="adduser.email"
                    @keypress.enter="addParticipant()"
                    ></v-text-field>
                </div>
                <div class="col-sm-6 col-md-6" v-show="$user != null && !$user.external">
                    <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    :label="$t('company')"
                    v-model="adduser.company"
                    @keypress.enter="addParticipant()"
                    ></v-text-field>
                </div>
                <div class="col-sm-6 col-md-6 ">
                    <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    :label="$t('location')"
                    v-model="adduser.location"
                    @keypress.enter="addParticipant()"
                    ></v-text-field>
                </div>
                <div class="col-sm-6 col-md-6 ">
                    <v-autocomplete  
                        hide-details="auto"
                        :items="$selectableLanguages"
                        item-text="name"
                        item-value="key"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('language')"
                        v-model="adduser.language"
                    ></v-autocomplete>
                </div>
              </div>
              <div class="text-right">
                <v-label>
                  * {{ $t("mandatory_fields") }}
                </v-label>
              </div>
            </div>
          </v-tab-item>

          <!-- OLD Tab for Adding New Participants -->
          <!-- <v-tab-item>
            <div class="px-md-4 mx-0 pa-0 text-content">

              <v-simple-table class="userstable" style="width:100%" hide-default-footer>
                <thead>
                  <tr>
                    <th @click="users_sort = 'lastname', users_order = !users_order,users_page = 1, fetchUsers()" class="text-uppercase align-bottom">
                      {{$t("name")}} <v-icon v-show="users_sort == 'lastname' && users_order" >fas fa-chevron-down</v-icon><v-icon v-show="users_sort == 'lastname' && !users_order" >fas fa-chevron-up</v-icon>
                    </th>
                    <th @click="users_sort = 'email', users_order = !users_order,users_page = 1, fetchUsers()" class="text-uppercase align-bottom">
                      {{$t("email")}} <v-icon v-show="users_sort == 'email' && users_order" >fas fa-chevron-down</v-icon><v-icon v-show="users_sort == 'email' && !users_order" >fas fa-chevron-up</v-icon>
                    </th>
                    <th @click="users_sort = 'company', users_order = !users_order,users_page = 1, fetchUsers()" class="text-uppercase align-bottom">
                      {{$t("company")}} <v-icon v-show="users_sort == 'company' && users_order" >fas fa-chevron-down</v-icon><v-icon v-show="users_sort == 'company' && !users_order" >fas fa-chevron-up</v-icon>
                    </th>
                    <th class="text-uppercase align-bottom">
                      
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td class="pb-1 text-uppercase align-bottom">{{user.lastname}}, {{ user.firstname }}</td>
                    <td class="pb-1 text-uppercase align-bottom">{{user.email}}</td>
                    <td class="pb-1 text-uppercase align-bottom">{{user.company}}</td>
                    <td class="pb-1">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn @click="addParticipantWithUser(user)" :disabled="isUserAlreadyParticipant(user.id)" color="transparent" depressed tile v-bind="attrs" v-on="on"><v-icon color="#444">fas fa-user-plus</v-icon></v-btn>
                        </template>
                        <span>{{ $t("add_participant") }}</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
              <pagination
                  class="my-2"
                  :current-page="users_page"
                  :total-pages="users_totalPages"
                  :show-previous-page="users_previousPage"
                  :show-next-page="users_nextPage"
              ></pagination>
            </div>
          </v-tab-item> -->

           <!-- Tab for Online FeedBack Forms -->
          <v-tab-item>
             <div class="col-xl-12 right-side-block" v-show="trainingEventTab == 4">
             <div v-if="feedBacks.length > 0">
                <div v-for="(feedback,i) in feedBacks" :key="feedback.id">
                      <a style="border-color: #333;" class="col-0 border-right-0" @click="$router.push('/feedback-form?feedbackId=' + feedback.id+'&trainingEventId=' + trainingEvent.id)">FeedBack {{i+1}}</a> 
                </div>
              </div>
             <div v-else>
                 {{$t("noFeedBack")}}
             </div>
             </div>
          </v-tab-item>


           <!-- Tab for Manual FeedBack Forms -->
          <v-tab-item>
             <div class="col-xl-12 right-side-block" v-show="trainingEventTab == 5">
             <div v-if="manualfeedBacks.length > 0">
                <div v-for="(feedback,i) in manualfeedBacks" :key="feedback.id">
                      <a style="border-color: #333;" class="col-0 border-right-0" @click="$router.push('/feedback-form?feedbackId=' + feedback.id+'&trainingEventId=' + trainingEvent.id +'&addmanual=true')">FeedBack {{i+1}}</a> 
                </div>
              </div>
             <div v-else>
                 {{$t("noFeedBack")}}
             </div>
             </div>
          </v-tab-item>


             <!-- Tab for Seat Share -->
          <v-tab-item v-show="$rights.includes('CREATE_TRAINING_EVENT')">
            
             <div class="headlinecolor text-h6 col-md-6 "><b>{{$t("customerName")}}</b> <span class="text-dark pl-2 " v-if="trainingEvent.tenant && trainingEvent.tenant.name">{{trainingEvent.tenant.name}}</span></div>

            <div class="headlinecolor col-md-6 ">{{$t("availableSeats")}}{{trainingEvent.freeSpaces - seatOccupied}}</div>
             <div class="right-side-block d-flex" v-show="trainingEventTab == 6">
                <div  class="col-sm-6 col-md-6">


                        <v-autocomplete  
                        v-model="seatTenant"
                        hide-details="auto"
                        class="datainput justify-content-end searchbar align-self-center pb-1 "
                        :items="seatShareCustomers"
                        item-text='name'
                        item-value='id'
                        style="padding-right:2px"
                        dense
                        outlined
                        :label="$t('shareSeatsWith') + '*'"/>
                </div>
                        
                <div class="col-sm-4 col-md-4">
                        <v-text-field  
                        hide-details="auto"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('enterSeats') + '*'"
                        type="number"
                        v-model="seatNumber"
                        :value="0"
                        ></v-text-field>
                </div>
               
                <div class="col-sm-4 col-md-4" > <v-btn :disabled="seatNumber===null || seatTenant===null" @click="addSeatShare()" outlined depressed tile class="savebutton colorWhite"> {{ $t("add") }}  <v-icon>mdi-plus</v-icon></v-btn></div>
                    
                   
           
             </div>

              <div class="col-sm-12 col-md-12" v-if="seatShare.length > 0">
               <template>
                <p class="mb-2"> {{$t("sharedSeatsWithBelowCompanies")}}</p>
               <div class="list-component">
                <v-list class="v-list-flex v-list_custom">
                   <v-list-item v-for="(item, index) in seatShare" :key="index">
                     <v-list-item-content>
                       {{ displaySeatShare(item) }}
                     </v-list-item-content>
                     <v-list-item-action>
                       <v-icon @click="remove(index)">mdi-close</v-icon>
                     </v-list-item-action>
                    </v-list-item>
                </v-list>
               </div>
               </template>
              </div>
          </v-tab-item>


          <div class="col-md-12 lastBtnSubmit mr-2 ml-2 widAuto" v-show="trainingEventTab == 0 || trainingEventTab == 1">
            <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
            <v-btn v-show="$rights.includes('CREATE_TRAINING_EVENT')" @click="saveTrainingEvent()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("save") }}</v-btn>
            <v-btn v-show="$rights.includes('CREATE_TRAINING_EVENT')" v-if="eventStatus==='normal'" @click="activeOrInactiveTrainingEvent('2')" outlined depressed tile class="savebutton mr-2 mb-2">   <v-icon>mdi-pencil-outline</v-icon>{{ $t("draft") }}</v-btn>
            <v-btn v-show="$rights.includes('CREATE_TRAINING_EVENT')" v-if="eventStatus==='cancelled'" @click="activeOrInactiveTrainingEvent('0')" outlined depressed tile class="savebutton mr-2 mb-2"> {{ $t("activate") }}</v-btn>
            <v-btn v-show="$rights.includes('CREATE_TRAINING_EVENT')" v-if="eventStatus==='drafted'" @click="activeOrInactiveTrainingEvent('0')" outlined depressed tile class="savebutton mr-2 mb-2"> {{ $t("undraft") }}</v-btn>
            <v-btn v-show="$rights.includes('CREATE_TRAINING_EVENT')" v-if="eventStatus==='normal'" @click="activeOrInactiveTrainingEvent('1')" outlined depressed tile class="cancelBtn mr-2 mb-2">{{ $t("cancelEvent") }}</v-btn>
            <v-btn v-show="editMode && $rights.includes('CREATE_TRAINING_EVENT')" @click="openDeleteDialog= true" outlined depressed tile class="mr-2 deletebutton cancelBtn mb-2"> <v-icon>mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
          </div>

          <div class="col-md-12 lastBtnSubmit mr-4 ml-4 widAuto" v-if="$user != null && !$user.translator" v-show="trainingEventTab == 3">
            <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
            <v-btn @click="addParticipant()" outlined depressed tile class="savebutton mb-2">{{ $t("add_participant") }}</v-btn>
            <v-btn @click="$routerBack()" outlined depressed tile class="cancelBtn mr-2 mb-2">{{ $t("cancelEvent") }}</v-btn>
          </div>

          <div class="col-md-12 lastBtnSubmit mr-2 ml-4 widAuto" v-if="$user != null && !$user.translator" v-show="trainingEventTab == 6">
            <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2">  <v-icon>mdi-chevron-left</v-icon>{{ $t("back") }}</v-btn>
            <v-btn @click="seatShareSave()" outlined depressed tile class="savebutton mb-2">{{ $t("save") }}</v-btn>
            <v-btn @click="$routerBack()" outlined depressed tile class="cancelBtn mr-2 mb-2">{{ $t("cancelEvent") }}</v-btn>
          </div>
       
        </v-tabs-items>
    </div>
    <div>
    <b-modal v-model="showModal" centered  class="innercreatetraining">
      <template v-slot:modal-header>
      <h5 class="text-dark">{{ $t("editParticipants") }}</h5>
      </template>
      <b-form>
          <b-row class="mb-0 mt-0">
          <b-col>
                <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    id="edit_participant_firstname"
                    :label="$t('firstname') + '*'"
                    v-model="edituser.firstname"
                    @keypress.enter="editParticipant()"
                    ></v-text-field>    
          </b-col>
          <b-col>
                <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                     :label="$t('lastname') + '*'"
                    v-model="edituser.lastname"
                    @keypress.enter="editParticipant()"
                    ></v-text-field>
          </b-col>
          </b-row>
          <b-row class="mb-0 mt-0">
          <b-col>
              <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                     :label="$t('email')"
                     v-model="edituser.email"
                    @keypress.enter="editParticipant()"
                     :disabled="!$rights.includes('CREATE_TRAINING_EVENT')"
                    ></v-text-field>
          </b-col>
          <b-col>
               <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    :label="$t('company')"
                    v-model="edituser.company"
                    @keypress.enter="editParticipant()"
                     :disabled="!$rights.includes('CREATE_TRAINING_EVENT')"
                    ></v-text-field>
          </b-col>
          </b-row>
          <b-row class="mb-0 mt-0">
          <b-col>
                <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                     :label="$t('location')"
                     v-model="edituser.location"
                     @keypress.enter="editParticipant()"
                    ></v-text-field>
          </b-col>
          <b-col>
               <v-autocomplete  
                        hide-details="auto"
                       :items="$selectableLanguages"
                        item-text="name"
                        item-value="key"
                        class="datainput justify-content-end align-self-center pb-1"
                        dense
                        outlined
                        :label="$t('language')"
                        v-model="edituser.language"
                        :disabled="!$rights.includes('CREATE_TRAINING_EVENT')"
                    ></v-autocomplete>
          </b-col>
          </b-row>
          <b-row class="mb-0 mt-0">
            <b-col>
              <v-autocomplete  
                        v-model="edituser.tenantId"
                        hide-details="auto"
                        class="datainput justify-content-end searchbar align-self-center pb-1"
                        :items="customers"
                        item-text='name'
                        item-value='id'
                        style="padding-right:2px"
                        dense
                        outlined
                        clearable
                        :label="$t('customer') + '*'"
                        :disabled="!$rights.includes('CREATE_TRAINING_EVENT')"
                        >
                    </v-autocomplete>
            </b-col>
            <b-col>
              <v-autocomplete dense outlined class="datainput justify-content-end align-self-center pb-1"  v-model="edituser.selectedStatus" :items="statusOptions" label="Status"></v-autocomplete>
            </b-col>
           <div class="d-block w-100 text-right mr-3">
                <v-label>
                  * {{ $t("mandatory_fields") }}
                </v-label>
           </div>
          </b-row>
          <b-row  class="mb-0 mt-0">
             <div class="d-block w-100 ml-3">
                <v-label>
                 <h5 class="text-dark">{{ $t("editCertificate") }}</h5>
                 <span  class="text-dark" v-if="(edituser.display===false || edituser.display===null)" >{{ edituser.eventStatus === '0' ? $t('activeEvent'): edituser.eventStatus === '1' ? $t('cancelledEvent')  : edituser.eventStatus === '2' ? $t('draftedEvent') : '' }}</span>
                </v-label>
           </div>
           <br/>
          </b-row>
         
          <b-row v-if="(edituser.display===false || edituser.display===null)">
          <b-col>
              <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    :label="$t('trainingName')"
                    v-model="edituser.certificateTrainingName"
                    @keypress.enter="editParticipant()"
                    :disabled="true"
                    ></v-text-field>
          </b-col>
          </b-row>
          <b-row >
          <div class="col-md-12 pb-4">
              <div class="html-editor">
                <label class="html-editor-headline">
                {{ $t("descriptionOfTraining") }}
                </label>
                <vue-editor
                  v-model="edituser.certificateTrainingDescription"
                  :editor-toolbar="customToolbar"
                />
              </div>
            </div>
          </b-row>        
          <b-row class="mb-0 mt-0" v-if="(edituser.display===false || edituser.display===null)">
          <b-col>
              <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                     :label="$t('startDate') + ' (yyyy-mm-dd)'"
                     v-model="edituser.certificateStartDate"
                    @keypress.enter="editParticipant()"
                    ></v-text-field>
          </b-col>
           <b-col>
              <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                     :label="$t('endDate')  + ' (yyyy-mm-dd)'"
                     v-model="edituser.certificateEndDate"
                    @keypress.enter="editParticipant()"
                    ></v-text-field>
          </b-col>
          </b-row>
          <b-row class="mb-0 mt-0" v-if=" (edituser.display===false || edituser.display===null)">
          <b-col>
              <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                     :label="$t('certificateLocation')"
                    v-model="edituser.certificateEventLocation"
                    @keypress.enter="editParticipant()"
                    ></v-text-field>
          </b-col>
           <b-col>
              <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                     :label="$t('certificateEventNumber')"
                    v-model="edituser.certificateEventNumber"
                    @keypress.enter="editParticipant()"
                     :disabled="true"
                    ></v-text-field>
          </b-col>
          </b-row>
          <b-row class="mb-0 mt-0" v-if="(edituser.display===false || edituser.display===null)">
          <b-col>
              <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                     :label="$t('trainer1')"
                   v-model="edituser.certificateTrainer"
                    @keypress.enter="editParticipant()"
                    ></v-text-field>
          </b-col>
           <b-col>
              <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                     :label="$t('trainer2')"
                    v-model="edituser.certificateTrainer2"
                    @keypress.enter="editParticipant()"
                    ></v-text-field>
          </b-col>
          </b-row>  
         <b-row class="mb-0 mt-0" v-if="edituser.display===true">
          <b-col>
              <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                     :label="$t('certificateEventNumber')"
                    v-model="edituser.certificateEventNumber"
                    @keypress.enter="editParticipant()"
                     :disabled="true"
                    ></v-text-field>
          </b-col>
          </b-row>
          <div class="row" v-if="edituser.display===true">
              <div class="col-md-6">
                     <div class="border rounded border-dark p-3">
                       <h5>{{$t("theory")}} {{ edituser.eventStatus === '0' ? $t('activeEvent'): edituser.eventStatus === '1' ? $t('cancelledEvent')  : edituser.eventStatus === '2' ? $t('draftedEvent') : '' }}</h5>
                       
                            <!-- First section content here -->
                              <b-row class="mb-0 mt-0" >
                               <b-col>
                                <v-text-field  
                                 hide-details="auto"
                                 class="datainput justify-content-end align-self-center pb-1"
                                 dense
                                 outlined
                                 :label="$t('trainingName')"
                                 v-model="edituser.certificateTrainingName"
                                 @keypress.enter="editParticipant()"
                                 :disabled="true"
                               ></v-text-field>     
                               </b-col>
                               </b-row> 
                               <b-row class="mb-0 mt-0" >
                               <b-col>
                                <v-text-field  
                                 hide-details="auto"
                                 class="datainput justify-content-end align-self-center pb-1"
                                 dense
                                 outlined
                                 :label="$t('certificateLocation')"
                                 v-model="edituser.certificateEventLocation"
                                 @keypress.enter="editParticipant()"
                               ></v-text-field>     
                               </b-col>
                               </b-row> 
                               <b-row class="mb-0 mt-0" >
                               <b-col>
                               <v-text-field  
                                hide-details="auto"
                                class="datainput justify-content-end align-self-center pb-1"
                                dense
                                outlined
                                :label="$t('startDate')+ ' (yyyy-mm-dd)'"
                                v-model="edituser.certificateStartDate"
                                @keypress.enter="editParticipant()"
                                ></v-text-field>
                                </b-col>
                               </b-row>  
                               <b-row class="mb-0 mt-0" >
                               <b-col>
                               <v-text-field  
                              hide-details="auto"
                              class="datainput justify-content-end align-self-center pb-1"
                              dense
                              outlined
                              :label="$t('endDate')+ ' (yyyy-mm-dd)'"
                              v-model="edituser.certificateEndDate"
                              @keypress.enter="editParticipant()"
                              ></v-text-field>
                              </b-col>
                               </b-row>  
                               <b-row class="mb-0 mt-0" >
                                <b-col>
                                <v-text-field  
                                hide-details="auto"
                                class="datainput justify-content-end align-self-center pb-1"
                                 dense
                                 outlined
                                :label="$t('trainer1')"
                                 v-model="edituser.certificateTrainer"
                                @keypress.enter="editParticipant()"
                                ></v-text-field>
                               </b-col>
                               </b-row>  
                               <b-row class="mb-0 mt-0" >
                               <b-col>
                                <v-text-field  
                                hide-details="auto"
                                class="datainput justify-content-end align-self-center pb-1"
                                dense
                                outlined
                               :label="$t('trainer2')"
                               v-model="edituser.certificateTrainer2"
                                @keypress.enter="editParticipant()"
                               ></v-text-field>
                               </b-col>
                               </b-row>  
                      </div>
                     </div>
                   <div class="col-md-6">
                     <div class="border rounded border-dark p-3">
                       <h5>{{$t("practical")}} {{ edituser.eventStatusOther === '0' ? $t('activeEvent'): edituser.eventStatusOther === '1' ? $t('cancelledEvent')  : edituser.eventStatusOther === '2' ? $t('draftedEvent') : '' }} </h5>
                         <!-- Second section content here -->
                         <b-row class="mb-0 mt-0" >
                               <b-col>
                                <v-text-field  
                                 hide-details="auto"
                                 class="datainput justify-content-end align-self-center pb-1"
                                 dense
                                 outlined
                                 :label="$t('trainingName')"
                                 v-model="edituser.certificateTrainingNameOther"
                                 @keypress.enter="editParticipant()"
                                 :disabled="true"
                               ></v-text-field>     
                               </b-col>
                               </b-row> 
                         <b-row class="mb-0 mt-0" >
                          <b-col>
                           <v-text-field  
                            hide-details="auto"
                            class="datainput justify-content-end align-self-center pb-1"
                            dense
                            outlined
                           :label="$t('certificateLocation')"
                           v-model="edituser.certificateEventLocationOther"
                           @keypress.enter="editParticipant()"
                          ></v-text-field>
                         </b-col>
                        </b-row> 
                          <b-row class="mb-0 mt-0">
                           <b-col>
                           <v-text-field  
                            hide-details="auto"
                            class="datainput justify-content-end align-self-center pb-1"
                            dense
                            outlined
                           :label="$t('startDate')+ ' (yyyy-mm-dd)'"
                           v-model="edituser.certificateStartDateOther"
                           @keypress.enter="editParticipant()"
                         ></v-text-field>
                        </b-col>
                        </b-row>  
                        <b-row class="mb-0 mt-0">
                        <b-col>
                        <v-text-field  
                         hide-details="auto"
                         class="datainput justify-content-end align-self-center pb-1"
                         dense
                         outlined
                        :label="$t('endDate')+ ' (yyyy-mm-dd)'"
                        v-model="edituser.certificateEndDateOther"
                        @keypress.enter="editParticipant()"
                        ></v-text-field>
                      </b-col>
                      </b-row>  
                       <b-row class="mb-0 mt-0" >
                       <b-col>
                      <v-text-field  
                       hide-details="auto"
                       class="datainput justify-content-end align-self-center pb-1"
                       dense
                       outlined
                       :label="$t('trainer1')"
                       v-model="edituser.certificateTrainerOther"
                       @keypress.enter="editParticipant()"
                       ></v-text-field>
                      </b-col>
                      </b-row>  
                      <b-row class="mb-0 mt-0" >
                     <b-col>
                   <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                     :label="$t('trainer2')"
                    v-model="edituser.certificateTrainer2Other"
                    @keypress.enter="editParticipant()"
                    ></v-text-field>
                   </b-col>
                  </b-row>                        
                      </div>
                  </div>
          </div>

         
      </b-form> 
      <template v-slot:modal-footer>
        <v-btn @click="afterCloseModal()" outlined depressed tile class="cancelbutton mr-2 mb-2"> {{ $t("cancel") }}</v-btn>
        <v-btn @click="editParticipant(booking)" outlined depressed tile class="save mb-2">{{ $t("save") }}</v-btn>
      </template>
    </b-modal>
    </div>
    <div class="col-xl-3 px-0 pl-8 pl-md-12 row pt-0 onlyContact">

        <!-- Actions for first and second Tab -->
        <div class="col-xl-12 right-side-block hide" v-show="trainingEventTab == 0 || trainingEventTab == 1">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn v-show="editMode && $rights.includes('CREATE_TRAINING_EVENT')" @click="openDeleteDialog= true" outlined depressed tile class="mr-2 deletebutton mb-2"> <v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
          <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn v-show="$rights.includes('CREATE_TRAINING_EVENT')" @click="saveTrainingEvent()" outlined depressed tile class="save mr-2 mb-2">{{ $t("save") }}</v-btn>
          <v-btn v-show="$rights.includes('CREATE_TRAINING_EVENT')" v-if="eventStatus==='normal'" @click="activeOrInactiveTrainingEvent('1')" outlined depressed tile class="savebutton mr-2 mb-2"> <v-icon dark left>mdi-minus-circle</v-icon>{{ $t("cancelEvent") }}</v-btn>
          <v-btn v-show="$rights.includes('CREATE_TRAINING_EVENT')" v-if="eventStatus==='normal'" @click="activeOrInactiveTrainingEvent('2')" outlined depressed tile class="savebutton mr-2 mb-2">   <v-icon>mdi-pencil-outline</v-icon>{{ $t("draft") }}</v-btn>
          <v-btn v-show="$rights.includes('CREATE_TRAINING_EVENT')" v-if="eventStatus==='cancelled'" @click="activeOrInactiveTrainingEvent('0')" outlined depressed tile class="savebutton mr-2 mb-2"> {{ $t("activate") }}</v-btn>
          <v-btn v-show="$rights.includes('CREATE_TRAINING_EVENT')" v-if="eventStatus==='drafted'" @click="activeOrInactiveTrainingEvent('0')" outlined depressed tile class="savebutton mr-2 mb-2"> {{ $t("undraft") }}</v-btn>
        </div>

        <!-- Actions for third Tab -->
        <div class="col-xl-12 right-side-block" v-show="trainingEventTab == 2">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <!-- <v-btn v-show="editMode && $rights.includes('CREATE_TRAINING_EVENT')" @click="openDeleteDialog= true" outlined depressed tile class="mr-2 deletebutton mb-2">{{ $t("delete") }}</v-btn> -->
          <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn v-show="$user != null && !$user.external" @click="createParticipantsList()" outlined depressed tile class="savebutton mb-2 mr-2">{{ $t("create_participant_list") }}</v-btn>
          <v-btn outlined depressed tile @click="openSendMailCustomDialog = true" class="mr-2 deletebutton mb-2" >{{ $t("email") }}</v-btn>
        </div>

        <!-- Actions for fourth Tab -->
        <div class="col-xl-12 right-side-block hide" v-if="$user != null && !$user.translator" v-show="trainingEventTab == 3">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn @click="addParticipant()" outlined depressed tile class="savebutton mb-2">{{ $t("add_participant") }}</v-btn>
        </div>
 <!-- Actions for fourth Tab -->
 <div class="col-xl-12 right-side-block" v-if="$user != null && !$user.translator" v-show="trainingEventTab == 4">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
           <v-btn @click="$routerBack()" outlined depressed tile class="cancelBtn mr-2 mb-2">{{ $t("cancelEvent") }}</v-btn>
        </div>

 <!-- Actions for Fifth Tab -->
  <div class="col-xl-12 right-side-block" v-if="$user != null && !$user.translator" v-show="trainingEventTab == 5">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
           <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2">  <v-icon>mdi-chevron-left</v-icon>{{ $t("back") }}</v-btn>
        <v-btn  @click="$router.push('/feedback-form?trainingEventId='+trainingEventId+'&addmanual=true')" outlined depressed tile class="save mb-2">{{ $t("add") }}</v-btn>
           <v-btn @click="$routerBack()" outlined depressed tile class="cancelBtn mr-2 mb-2">{{ $t("cancelEvent") }}</v-btn>
        </div>



  <!-- Actions for Sixth Tab -->
  <div class="col-xl-12 right-side-block hide" v-if="$user != null && !$user.translator" v-show="trainingEventTab == 6">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
           <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2">  <v-icon>mdi-chevron-left</v-icon>{{ $t("back") }}</v-btn>
        <v-btn @click="seatShareSave()" outlined depressed tile class="save mb-2">{{ $t("save") }}</v-btn>
        </div>
       

        <!-- Search for Participants (Third Tab) -->
        <div class="col-xl-12 right-side-block" v-show="trainingEventTab == 2">
          <h3 class="text-uppercase">{{ $t("search") }}</h3>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-text-field  
            hide-details="auto"
            class="justify-content-end searchbar align-self-center pb-1"
            style="padding-right:2px"
            dense
            outlined
            v-model="participants_search"
            @keypress.enter="fetchBookings()"
            :label="$t('search_participant')"><template v-slot:append>
                  <v-icon color="#003A60">fas fa-search</v-icon>
                </template></v-text-field>
        </div>

        <Contact />
        <Share :headline="$t('share_training')" :mailSubject="$t('share_mail_subject', {name: trainingEvent.training == null ? '' : trainingEvent.training.designationsMap[$locale]})" :mailText="getShareMailText()" />
    </div>


      <!-- Dialogs -->
      <v-dialog v-model="openSendMailAgainDialog">
      <h3 >{{ $t("send_invitation_mail_again_question") }}</h3>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="openSendMailAgainDialog = false" outlined depressed tile class="cancelbutton mr-2 mb-2">{{ $t("cancel") }}</v-btn>
        <v-btn @click="sendMailToParticipant(sendMailAgainBooking)" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("send_invitation_mail") }}</v-btn>
      </v-card-actions>
      </v-dialog>

    <div class="text-center">
      <v-dialog v-model="openDeleteDialog" width="500">
        <h4>{{ $t("confirm_delete_event") }}</h4>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="openDeleteDialog = false" outlined depressed tile class="cancelbutton mr-2 mb-2"> {{ $t("cancel") }}</v-btn>
          <v-btn @click="deleteTrainingEvent()" outlined depressed tile class="deletebutton mr-2 mb-2"> <v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
        </v-card-actions>
      </v-dialog>
    </div>

    <div class="text-center">
      <v-dialog v-model="openSendMailCustomDialog" width="500">
        <h4>{{ $t("send_invitation_mail") }}</h4>
        <br>
        <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    :label="$t('email')"
                    v-model="customEmail"
                    ></v-text-field>
        <v-card-actions class="px-0">
          <v-spacer></v-spacer>
          <v-btn @click="openSendMailCustomDialog = false" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn @click="sendBlankMail()" outlined depressed tile class="savebutton mb-2">{{ $t("send") }}</v-btn> 
        </v-card-actions>
      </v-dialog>
    </div>





      <!-- Dialogs -->
      <v-dialog v-model="openSendMailAgainFeedBackDialog">
      <h3 >{{ $t("send_feedback_mail_again_question") }}</h3>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="openSendMailAgainFeedBackDialog = false" outlined depressed tile class="cancelbutton mr-2 mb-2">{{ $t("cancel") }}</v-btn>
        <v-btn @click="sendMailToParticipantForOnlineFeedBack(sendMailAgainFeedBackBooking)" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("send_feedback_mail") }}</v-btn>
      </v-card-actions>
      </v-dialog>

    <div class="text-center">
      <v-dialog v-model="openSendMailCustomDialogFeedBack" width="500">
        <h4>{{ $t("send_feedback_mail") }}</h4>
        <br>
        <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    :label="$t('email')"
                    v-model="customEmail"
                    ></v-text-field>
        <v-card-actions class="px-0">
          <v-spacer></v-spacer>
          <v-btn @click="openSendMailCustomDialogFeedBack = false" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon> {{ $t("back") }}</v-btn>
          <v-btn @click="sendBlankMail()" outlined depressed tile class="savebutton mb-2">{{ $t("send") }}</v-btn> 
        </v-card-actions>
      </v-dialog>
    </div>



    
</div>
</div>
    </div>
  </div>
</template>

<script>
import Card from "./custom/Card.vue";
import pagination from './custom/pagination.vue'
export default {
  components: {
    Card,
    pagination
  },

  props: {
    //   categoryName: String,
    trainingEventId: Number,
    trainingRequestId: Number
  },

  data() {
    return {
        seatOccupied:0,
        seatTenant:null,
        seatNumber:null,
        seatShare:[],
       eventStatus:"normal",
        customToolbar: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["clean"]
        ],
      currentBookingID:"",
      showModal: false,
      scrollPositionX: 0,
      scrollPositionY: 0,
      edituser: {
        firstname: null,
        lastname: null,
        personnelnumber: null,
        location: null,
        company: null,
        email: null,
        language: null,
        tenantId: null,
        selectedStatus:null,
        certificateStartDate:null,
        certificateEndDate:null,
        certificateEventLocation:null,
        certificateEventNumber:null,
        certificateTrainer:null,
        certificateTrainer2:null,
        certificateStartDateOther:null,
        certificateEndDateOther:null,
        display:null,
        certificateEventLocationOther:null,
        certificateEventNumberOther:null,
        certificateTrainerOther:null,
        certificateTrainer2Other:null,
        certificateTrainingNameEnglish:null,
        certificateTrainingNameGerman:null,
        certificateTrainingNamePolish:null,
        certificateTrainingNameFrench:null,
        certificateTrainingNameHungarian:null,
        certificateTrainingNameOtherEnglish:null,
        certificateTrainingNameOtherGerman:null,
        certificateTrainingNameOtherPolish:null,
        certificateTrainingNameOtherFrench:null,
        certificateTrainingNameOtherHungarian:null,
        certificateTrainingName:null,
        certificateTrainingNameOther:null,
        certificateTrainingDescription:null,
        certificateTrainingDescriptionEnglish:null,
        certificateTrainingDescriptionGerman:null,
        certificateTrainingDescriptionPolish:null,
        certificateTrainingDescriptionFrench:null,
        certificateTrainingDescriptionHungarian:null
      },
      editMode: false,

      trainers: [],
      translators: [],
      rooms: [],
      locations: [],
      trainings: [],
      bookings: [],
      customers: [],
      seatShareCustomers:[],
      users: [],
      feedBacks:[],
      manualfeedBacks:[],
      selectedLocationId: null,


      customEmail: null,

      trainingEventTab: null,
      openSendMailCustomDialog:false,
      openSendMailAgainDialog: false,
      sendMailAgainBooking: null,
       openSendMailCustomDialogFeedBack:false,
      openSendMailAgainFeedBackDialog: false,
      sendMailAgainFeedBackBooking: null,
      openSendMailAgainFeedBackDialog: false,
      sendMailAgainFeedBackBooking: null,

      openDeleteDialog:false,

      editHeadline: this.$t("edit_trainingEvent"),

      startDateMenu: false,

      trainingEvent: {
        designations: {},
        descriptions: {},
        onlineDescriptions: {},
        streets: {},
        hnr: null,
        zip: null,
        cities: {},
        region: null,
        country: null,
        descriptionsMap: {},
        onlineDescriptionsMap: {},
        image: null,
        status: "BOOKABLE",
        examType: "ORAL",
        trainingId: null,
        customerId: null,
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        comment: null
      },

      adduser: {
        firstname: null,
        lastname: null,
        personnelnumber: null,
        location: null,
        company: null,
        email: null,
        language: null,
        tenantId: null,
      },

      selectableStatus: [
        {value: "BOOKABLE", text: this.$t("bookable_event")},
        {value: "CLOSED", text: this.$t("closed_event")},
      ],

      selectableExamTypes: [
        {value: "ORAL", text: this.$t("practical_exam")},
        {value: "THEORETICAL", text: this.$t("theoretical_exam")},
        {value: "ORAL_AND_THEORETICAL", text: this.$t("practical_and_theoretical_exam")},
      ],

      activator: null,
      attach: null,
      search: "",
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      editingIndex: -1,
     
      participants_page: 1,
      participants_totalPages: 1,
      participants_ElementPerPage: 50,
      participants_sort: null,
      participants_order: true,

      users_page: 1,
      users_totalPages: 1,
      users_ElementPerPage: 50,
      users_sort: null,
      users_order: true,
      statusOptions: ["Participated", "Successfully Passed the Exam","Failed"]
    };
  },

  mounted() {
    if(this.$route.query.eventStatus==='cancelled')
    {
      this.eventStatus='cancelled';
    }
    else if(this.$route.query.eventStatus==='drafted')
    {
       this.eventStatus='drafted'; 
    }
    else
    {
      this.eventStatus='normal';
    }
    this.fetchTrainers();
    this.fetchTranslators();
    this.fetchLocations();
    this.fetchTrainings();
    this.fetchCustomers();
   

    if (this.trainingEventId != null) {
      this.editMode = true;
      this.fetchEditingTrainingEvent();
    }

    if(this.trainingRequestId != null){
      this.fetchTrainingRequest();
    }

    if(!this.$rights.includes("VIEW_BOOKINGS")){
      this.trainingEventTab = 1;
    }
     this.fetchOnlineFeedBacks();
     this.fetchManualFeedBacks();
  },

  watch: {
    $user(){
      if(this.$user == null || !this.$user.external) return;
      this.adduser.company = this.$user.company;
    },
    trainingEventTab(){
      this.adduser.language = this.$language != null ? this.$language.language : null;
    }
  },

  computed: {
  
    clickableOnlineLink: {
      get(){
        if(this.trainingEvent == null || this.trainingEvent.onlineLink == null) return null;
        if(this.trainingEvent.onlineLink.startsWith("http://") || this.trainingEvent.onlineLink.startsWith("https://")) return this.trainingEvent.onlineLink;
        return "https://" + this.trainingEvent.onlineLink;
      }
    },
    selectedUsers: {
      get(){
        return {
          trainer: this.getArrayElementById("trainers", this.trainingEvent.trainerId),
          trainer2: this.getArrayElementById("trainers", this.trainingEvent.trainer2Id),
          translator: this.getArrayElementById("translators", this.trainingEvent.translatorId),
        }
      }
    },
    locationAndRoomDisabled: {
      get(){
        if(this.trainingEvent.trainingId == null) return false;
        const training = this.getArrayElementById("trainings", this.trainingEvent.trainingId);
        if(training == null) return false;
        return training.type == "VIRTUAL";
      }
    }
  },

  methods: {
   displaySeatShare(share) {
     return `${share.company} : ${share.seatAlloted} Seats `;
  },



   seatShareSave(){
    let _this=this;
      _this.trainingEvent.seatShare=_this.seatShare;

      if (this.editMode) {
        // Edit Training
        progressIndicator.hidden = false;
        showLoadingCircle(true);
        this.$axios
          .put("/api/training/event/seatShare/" + _this.trainingEventId, _this.seatShare)
          .then(function (response) {
            _this.$noty.success(
              _this.$t("seatShared", { name: response.data.designation })
            );
           // _this.$router.push("/training-events");
          })
          .catch(this.onError).finally(this.onFinally);
      } 
  },

  remove(index) {
    let _this=this;
    for (let i = 0; i < _this.bookings.length; i++) {
        const booking = this.bookings[i];
        if(booking.participant.tenantId === _this.seatShare[index].tenant.id) 
        {
        _this.$noty.error(this.$t("removeParticipantsFromTenant", { name: this.$t("language") }));
        return;
        }
      }
    let removedTenantId=this.seatShare[index].tenant.id;
    _this.customers.forEach((customer) => {
                   if (customer.id === removedTenantId ) {
                          _this.seatShareCustomers.push(customer);
                }
      });
             
    this.seatOccupied -=  parseInt(this.seatShare[index].seatAlloted);
    this.seatShare.splice(index, 1);
   },

    addSeatShare(){
    
      let _this=this;
      if( _this.trainingEvent.freeSpaces - _this.seatOccupied - _this.seatNumber < 0){
        this.$noty.error(this.$t("seatAllocationError", { name: this.$t("language") }));
        return;

      }
      let customer;
      customer=_this.customers.find(function(customer) {
               if(customer.id === _this.seatTenant) {
                 return customer;
              }
          });

      let existingItemIndex = this.seatShare.findIndex(function(item) {
        return item.tenant.id === _this.seatTenant;
      });


      if (existingItemIndex === -1) {
      this.seatShare.push({
        tenant:customer,
        seatAlloted:parseInt(_this.seatNumber),
        company:customer.name
      });

     _this.seatShareCustomers = _this.seatShareCustomers.filter(custome => custome.id !== customer.id);

      this.seatOccupied+=parseInt(_this.seatNumber);
      }
    },
    fetchOnlineFeedBacks(){
        var _this = this;
         if (_this.editMode) {
        progressIndicator.hidden = false;
        showLoadingCircle(true);
        this.$axios
          .get("/api/training/event/" + this.trainingEventId+"/feedbacks")
          .then(function (response) {
            for(let i=0;i<response.data.length;i++){
               _this.feedBacks.push(response.data[i]);
            }
          })
          .catch(this.onError).finally(this.onFinally);
         }
    },


     fetchManualFeedBacks(){
        var _this = this;
         if (_this.editMode) {
        progressIndicator.hidden = false;
        showLoadingCircle(true);
        this.$axios
          .get("/api/training/event/"+_this.trainingEventId+"/retrieveManualFeedbacks")
          .then(function (response) {
            for(let i=0;i<response.data.length;i++){
               _this.manualfeedBacks.push(response.data[i]);
            }
          })
          .catch(this.onError).finally(this.onFinally);
         }
    },
    sendOnlineFeedBack(booking)
    {
      this.sendMailForOnlineFeedBack(booking);
        //this.$router.push({path: '/feedback-form',query: { trainingEventId:this.trainingEventId , bookingId: booking.id }});
    },
    beforeOpenModal(booking) {
      this.currentBookingID=booking.id;
      this.scrollPositionX = window.scrollX;
      this.scrollPositionY = window.scrollY;
      var _this = this;
      _this.edituser = {
            firstname: null,
            lastname: null,
            personnelnumber: null,
            location: null,
            company: null,
            email: null,
            tenantId: null,
            certificateStartDate:null,
            certificateEndDate:null,
            certificateEventLocation:null,
            certificateEventNumber:null,
            certificateTrainer:null,
            certificateTrainer2:null,
            eventStatus:null,
            eventStatusOther:null,
            certificateStartDateOther:null,
            certificateEndDateOther:null,
            display:null,
            certificateEventLocationOther:null,
            certificateTrainerOther:null,
            certificateTrainer2Other:null,
            certificateTrainingNameEnglish:null,
            certificateTrainingNameGerman:null,
            certificateTrainingNamePolish:null,
            certificateTrainingNameFrench:null,
            certificateTrainingNameHungarian:null,
            certificateTrainingNameOtherEnglish:null,
            certificateTrainingNameOtherGerman:null,
            certificateTrainingNameOtherPolish:null,
            certificateTrainingNameOtherFrench:null,
            certificateTrainingNameOtherHungarian:null,
            certificateTrainingName:null,
             certificateTrainingNameOther:null,
            certificateTrainingDescription:null,
            certificateTrainingDescriptionEnglish:null,
            certificateTrainingDescriptionGerman:null,
            certificateTrainingDescriptionPolish:null,
            certificateTrainingDescriptionFrench:null,
            certificateTrainingDescriptionHungarian:null
          };
           progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/booking/"+ booking.id)
        .then(function (response) {
           _this.edituser.firstname=response.data.participant.firstname;
           _this.edituser.lastname=response.data.participant.lastname;
           _this.edituser.personnelnumber=response.data.participant.personnelnumber;
           _this.edituser.location=response.data.participant.location;
           _this.edituser.company=response.data.participant.originalCompany;
           _this.edituser.email=response.data.participant.email;
           _this.edituser.language=response.data.participant.language;
           _this.edituser.tenantId=_this.customers.find(function(customer) {
               if(customer.id === response.data.participant.tenantId) {
                 return customer;
              }
            });
           _this.edituser.userId=response.data.participant.id;
           _this.edituser.selectedStatus=response.data.selectedStatus;
           _this.edituser.certificateStartDate=response.data.certificateStartDate;
           _this.edituser.certificateEndDate=response.data.certificateEndDate;
           _this.edituser.certificateEventLocation=response.data.certificateEventLocation;
           _this.edituser.certificateEventNumber=response.data.certificateEventNumber;
           _this.edituser.certificateTrainer=response.data.certificateTrainer;
           _this.edituser.certificateTrainer2=response.data.certificateTrainer2;
           _this.edituser.certificateStartDateOther=response.data.certificateStartDateOther;
           _this.edituser.certificateEndDateOther=response.data.certificateEndDateOther;
           _this.edituser.display=response.data.display;
           _this.edituser.eventStatus=response.data.eventStatus;
           _this.edituser.eventStatusOther=response.data.eventStatusOther;
           _this.edituser.certificateEventLocationOther=response.data.certificateEventLocationOther;
           _this.edituser.certificateTrainerOther=response.data.certificateTrainerOther;
           _this.edituser.certificateTrainer2Other=response.data.certificateTrainer2Other;
           _this.edituser.certificateTrainingNameEnglish=response.data.certificateTrainingNameEnglish;
           _this.edituser.certificateTrainingNameGerman=response.data.certificateTrainingNameGerman;
           _this.edituser.certificateTrainingNamePolish=response.data.certificateTrainingNamePolish;
           _this.edituser.certificateTrainingNameFrench=response.data.certificateTrainingNameFrench;
           _this.edituser.certificateTrainingNameHungarian=response.data.certificateTrainingNameHungarian;
           _this.edituser.certificateTrainingNameOtherEnglish=response.data.certificateTrainingNameOtherEnglish;
           _this.edituser.certificateTrainingNameOtherGerman=response.data.certificateTrainingNameOtherGerman;
           _this.edituser.certificateTrainingNameOtherPolish=response.data.certificateTrainingNameOtherPolish;
           _this.edituser.certificateTrainingNameOtherFrench=response.data.certificateTrainingNameOtherFrench;
           _this.edituser.certificateTrainingNameOtherHungarian=response.data.certificateTrainingNameOtherHungarian;
           _this.edituser.certificateTrainingDescriptionEnglish=response.data.certificateTrainingDescriptionEnglish;
           _this.edituser.certificateTrainingDescriptionGerman=response.data.certificateTrainingDescriptionGerman;
           _this.edituser.certificateTrainingDescriptionPolish=response.data.certificateTrainingDescriptionPolish;
           _this.edituser.certificateTrainingDescriptionFrench=response.data.certificateTrainingDescriptionFrench;
           _this.edituser.certificateTrainingDescriptionHungarian=response.data.certificateTrainingDescriptionHungarian;

          let language = _this.$locale;
          if(language==='en')
          {
              _this.edituser.certificateTrainingName=_this.edituser.certificateTrainingNameEnglish;
              _this.edituser.certificateTrainingNameOther=_this.edituser.certificateTrainingNameOtherEnglish;
              _this.edituser.certificateTrainingDescription=_this.edituser.certificateTrainingDescriptionEnglish;
          }
          else if(language==='de')
          {
              _this.edituser.certificateTrainingName=_this.edituser.certificateTrainingNameGerman;
              _this.edituser.certificateTrainingNameOther=_this.edituser.certificateTrainingNameOtherGerman;
              _this.edituser.certificateTrainingDescription=_this.edituser.certificateTrainingDescriptionGerman;
          }
          else if(language==='pl')
          {
               _this.edituser.certificateTrainingName=_this.edituser.certificateTrainingNamePolish;
               _this.edituser.certificateTrainingNameOther=_this.edituser.certificateTrainingNameOtherPolish;
               _this.edituser.certificateTrainingDescription=_this.edituser.certificateTrainingDescriptionPolish;
          }
          else if(language==='fr')
          {
               _this.edituser.certificateTrainingName=_this.edituser.certificateTrainingNameFrench;
               _this.edituser.certificateTrainingNameOther=_this.edituser.certificateTrainingNameOtherFrench;
               _this.edituser.certificateTrainingDescription=_this.edituser.certificateTrainingDescriptionFrench;
          }
          else if(language==='hu')
          {
               _this.edituser.certificateTrainingName=_this.edituser.certificateTrainingNameHungarian;
               _this.edituser.certificateTrainingNameOther=_this.edituser.certificateTrainingNameOtherHungarian;
               _this.edituser.certificateTrainingDescription=_this.edituser.certificateTrainingDescriptionHungarian;
          }
           _this.fetchBookings();
        })
        .catch(this.onError).finally(this.onFinally);

        this.showModal=true;     
      },

     afterCloseModal() {
       setTimeout(() => {
        window.scrollTo(this.scrollPositionX, this.scrollPositionY)
        }, 1000);   
       this.showModal=false;
       this.edituser = {
            firstname: null,
            lastname: null,
            personnelnumber: null,
            location: null,
            company: null,
            email: null,
            tenantId: null,
            selectedStatus:null,
            certificateStartDate:null,
            certificateEndDate:null,
            certificateEventLocation:null,
            certificateEventNumber:null,
            certificateTrainer:null,
            certificateTrainer2:null,
            certificateStartDateOther:null,
            certificateEndDateOther:null,
            eventStatus:null,
            eventStatusOther:null,
            display:false,
            certificateEventLocationOther:null,
            certificateTrainerOther:null,
            certificateTrainer2Other:null,
            certificateTrainingNameEnglish:null,
            certificateTrainingNameGerman:null,
            certificateTrainingNamePolish:null,
            certificateTrainingNameFrench:null,
            certificateTrainingNameHungarian:null,
            certificateTrainingNameOtherEnglish:null,
            certificateTrainingNameOtherGerman:null,
            certificateTrainingNameOtherPolish:null,
            certificateTrainingNameOtherFrench:null,
            certificateTrainingNameOtherHungarian:null,
             certificateTrainingName:null,
             certificateTrainingNameOther:null,
            certificateTrainingDescription:null,
            certificateTrainingDescriptionEnglish:null,
            certificateTrainingDescriptionGerman:null,
            certificateTrainingDescriptionPolish:null,
            certificateTrainingDescriptionFrench:null,
            certificateTrainingDescriptionHungarian:null
          };
    },
    participants_previousPage() {
      this.participants_page = this.participants_page - 1;
      this.fetchTrainingEvents();
    },
    participants_nextPage() {
      this.participants_page = this.participants_page + 1;
      this.fetchTrainingEvents();
    },
    users_previousPage() {
      this.users_page = this.users_page - 1;
      this.fetchTrainingEvents();
    },
    users_nextPage() {
      this.users_page = this.users_page + 1;
      this.fetchTrainingEvents();
    },

    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.editingIndex = index;
      } else {
        this.editing = null;
        this.editingIndex = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },

    onError(err) {
      if (err.response != null && err.response.data != null) {
        this.$noty.error(err.response.data);
      } else {
        console.error(err);
      }
    },

    lowerCaseMapKeys(map) {
      for (var key in map) {
        if (map.hasOwnProperty(key)) {
          if (key == key.toUpperCase()) continue;
          map[key.toUpperCase()] = map[key];
          delete map[key];
        }
      }
    },

    fetchEditingTrainingEvent() {
       
      var _this = this;
      _this.seatOccupied=0;
      _this.seatTenant=null;
      _this.seatNumber=null;
      _this.seatShare=[];
      _this.seatShareCustomers=[];
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/training/event/" + this.trainingEventId)
        .then(function (response) {
          _this.trainingEvent = response.data;

          _this.trainingEvent.trainingId = _this.trainingEvent.training != null ? _this.trainingEvent.training.id : null;
          _this.trainingEvent.trainerId = _this.trainingEvent.trainer != null ? typeof _this.trainingEvent.trainer == "number" ? _this.trainingEvent.trainer : _this.trainingEvent.trainer.id : null;
          delete _this.trainingEvent.trainer;
          _this.trainingEvent.trainer2Id = _this.trainingEvent.trainer2 != null ? typeof _this.trainingEvent.trainer2 == "number" ? _this.trainingEvent.trainer2 : _this.trainingEvent.trainer2.id : null;
          delete _this.trainingEvent.trainer2;
          _this.trainingEvent.translatorId = _this.trainingEvent.translator != null ? _this.trainingEvent.translator.id : null;
          delete _this.trainingEvent.translator;
          _this.trainingEvent.roomId = _this.trainingEvent.room != null ? _this.trainingEvent.room.id : null;
          _this.selectedLocationId = _this.trainingEvent.room != null && _this.trainingEvent.room.location != null ? _this.trainingEvent.room.location.id : null;
          delete _this.trainingEvent.room;
          _this.trainingEvent.customerId = _this.trainingEvent.customerBooking != null ? _this.trainingEvent.customerBooking.id : null;
          let tenantsShared = [];
            if(_this.trainingEvent.seatShare!=null && _this.trainingEvent.seatShare.length > 0)
          {
           for(let i=0;i< _this.trainingEvent.seatShare.length;i++)
           {
          _this.seatShare.push({
                tenant:_this.trainingEvent.seatShare[i].tenant,
                seatAlloted:parseInt(_this.trainingEvent.seatShare[i].seatAlloted),
                company:_this.trainingEvent.seatShare[i].company
            });
            tenantsShared.push(_this.trainingEvent.seatShare[i].tenant.id);
           }
          }
          if(_this.trainingEvent.customerId !==null)
          {
            _this.customers.forEach((customer) => {
                   if (customer.id !== _this.trainingEvent.customerId && !tenantsShared.includes(customer.id)  ) {
                          _this.seatShareCustomers.push(customer);
                }
              });
          }
          else
          {
            _this.seatShareCustomers=_this.customers
          }
        
          delete _this.trainingEvent.customerBooking;

          // Issue #95: Don't show Seconds in Start and End Time of Training Event Editing
          if(_this.trainingEvent.startTime && _this.trainingEvent.startTime.length > 5){
            _this.trainingEvent.startTime = _this.trainingEvent.startTime.substring(0, 5);
          }
          if(_this.trainingEvent.endTime && _this.trainingEvent.endTime.length > 5){
            _this.trainingEvent.endTime = _this.trainingEvent.endTime.substring(0, 5);
          }

          _this.fetchRooms();
          _this.fetchBookings();
          _this.fetchUsers();
        })
        .catch(this.onError).finally(this.onFinally);
    },

    fetchTrainingRequest() {
        var _this = this;
         progressIndicator.hidden = false;
        showLoadingCircle(true);
        this.$axios
          .get("/api/training/request/" + this.trainingRequestId)
          .then(function (response) {
            _this.trainingEvent.trainingId = response.data.training.id;
            _this.trainingEvent.customerId = response.data.customerTenant.id;
            _this.trainingEvent.minParticipants = 1;
            _this.trainingEvent.maxParticipants = response.data.participantsAmount;
            _this.trainingEvent.language = response.data.language;
          })
          .catch(this.onError).finally(this.onFinally);
      },

    fetchTrainings() {
  var _this = this;
  progressIndicator.hidden = false;
  showLoadingCircle(true);
  this.$axios
    .get("/api/training/trainings")
    .then(function(response) {
      let trainings = response.data;

      if (trainings.length > 0) {
        trainings.sort((a, b) => {
          const designationA = a.designationsMap[_this.$locale] || "";
          const designationB = b.designationsMap[_this.$locale] || "";

          return designationA.localeCompare(designationB, undefined, {
            sensitivity: "base",
          });
        });
      }

      for (let i = 0; i < trainings.length; i++) {
        const training = trainings[i];
        training.text = training.designationsMap[_this.$locale] || "";
      }

      _this.trainings = trainings;
    })
    .catch(this.onError)
    .finally(this.onFinally);
},
    fetchTrainers() {
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/user/trainer")
        .then(function (response) {
          for (let i = 0; i < response.data.content.length; i++) {
            const element = response.data.content[i];
            if(Number.isInteger(element)){
              _this.fetchSingleTrainerAndPush(element);
            }else{
              _this.trainers.push(element);
            }
          }
        })
        .catch(this.onError).finally(this.onFinally);
    },

    fetchSingleTrainerAndPush(trainerId){
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/user/" + trainerId)
        .then(function (response) {
          const element = response.data;
          _this.trainers.push(element);
        })
        .catch(this.onError).finally(this.onFinally);
    },

    fetchCustomers() {
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/tenant/customers")
        .then(function (response) {
          _this.customers = response.data.content;
          if(_this.$external && _this.customers.length == 1){
            _this.trainingEvent.customerId = _this.customers[0].id;
          }
        })
        .catch(this.onError).finally(this.onFinally);
    },

    fetchTranslators() {
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/user/translator")
        .then(function (response) {
          _this.translators = response.data.content;
          for (let i = 0; i < _this.translators.length; i++) {
            const translator = _this.translators[i];
            for (let p = 0; p < translator.languages.length; p++) {
              const language = translator.languages[p];
              translator.languages[p] = _this.$languages[language];
            }
          }
        })
        .catch(this.onError).finally(this.onFinally);
    },

    fetchBookings() {
      if(!this.$rights.includes("VIEW_BOOKINGS")){
        return;
      }
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/booking/event/" + this.trainingEvent.id, {
          params: {
            search: _this.participants_search,
            sort: _this.participants_sort,
            order: _this.participants_order ? "ASC":"DESC",
            page: _this.participants_page - 1,
            size: _this.participants_ElementPerPage
          }
        })
        .then(function (response) {
          _this.bookings = response.data.content;
          _this.totalPages = response.data.totalPages;
          _this.$forceUpdate();
        })
        .catch(this.onError).finally(this.onFinally);
    },

    fetchLocations() {
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/location")
        .then(function (response) {
          _this.locations = response.data.content;
        })
        .catch(this.onError).finally(this.onFinally);
    },

    fetchUsers() {
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/user/external", {
          params: {
            search: _this.users_search,
            sort: _this.users_sort,
            order: _this.users_order ? "ASC":"DESC",
            page: _this.users_page - 1,
            size: _this.users_ElementPerPage
          }
        })
        .then(function (response) {
          _this.users = response.data.content;
        })
        .catch(this.onError).finally(this.onFinally);
    },

    fetchRooms(clearCurrentRoom = false) {
      var _this = this;
      if(clearCurrentRoom) this.trainingEvent.roomId = null;
      if(this.selectedLocationId == null) return;
        progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/room/location/id/" + this.selectedLocationId)
        .then(function (response) {
          _this.rooms = response.data.content;
        })
        .catch(this.onError).finally(this.onFinally);
    },

    saveTrainingEvent() {
    
      var _this = this;
      this.trainingEvent.rooms = this.rooms;
      var trainingEvent = {};
      //trainingEvent = Object.assign(trainingEvent, this.trainingEvent);
     let eventFlagCode = _this.eventStatus === 'cancelled' ? '1' :
                      _this.eventStatus === 'drafted' ? '2' :
                      '0';
     let updatedTrainingEvent = Object.assign({}, _this.trainingEvent, { eventflag: eventFlagCode });
     trainingEvent = Object.assign(trainingEvent, updatedTrainingEvent);
 if(eventFlagCode==='0' || eventFlagCode==='1')
     {
      // Validation for empty fields
      if (trainingEvent.language == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("language") }));
        return;
      }
      if (trainingEvent.status == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("status") }));
        return;
      }
      if (trainingEvent.examType == null) {
        this.$noty.error(
          this.$t("empty_value", { name: this.$t("examType") })
        );
        return;
      }
      if (trainingEvent.trainerId == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("first_trainer") }));
        return;
      }
      if (trainingEvent.trainerId == trainingEvent.trainer2Id) {
        this.$noty.error(this.$t("invalid_value", { name: this.$t("second_trainer") }));
        return;
      }
      if (trainingEvent.trainingId == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("training") }));
        return;
      }

      // Validation for Min and Max Participants
      if(trainingEvent.minParticipants === undefined || trainingEvent.minParticipants === ""){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("minParticipants")}));
        return;
      }
      if(trainingEvent.maxParticipants === undefined || trainingEvent.maxParticipants === ""){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("maxParticipants")}));
        return;
      }

      // Try Parse Values
      try {
        if(isNaN(trainingEvent.minParticipants)){
          trainingEvent.minParticipants = parseInt(trainingEvent.minParticipants);
        }
      } catch (error) {
        console.error(error);
        this.$noty.error(this.$t("invalid_value", {name: this.$t("minParticipants")}));
        return;
      }
      try {
        if(isNaN(trainingEvent.maxParticipants)){
          trainingEvent.maxParticipants = parseInt(trainingEvent.maxParticipants);
        }
      } catch (error) {
        console.error(error);
        this.$noty.error(this.$t("invalid_value", {name: this.$t("minParticipants")}));
        return;
      }


      if(trainingEvent.minParticipants < 0){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("minParticipants")}));
        return;
      }
      if(trainingEvent.maxParticipants < 0){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("maxParticipants")}));
        return;
      }
      if(trainingEvent.minParticipants > trainingEvent.maxParticipants){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("maxParticipants")}));
        return;
      }
      if(trainingEvent.startTime == null || !trainingEvent.startTime.includes(":") || isNaN(trainingEvent.startTime.replace(":", ""))){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("begin_time")}));
        return;
      }
      if(trainingEvent.endTime == null ||!trainingEvent.endTime.includes(":") || isNaN(trainingEvent.endTime.replace(":", ""))){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("end_time")}));
        return;
      }

      if(this.selectedLocationId != null && (trainingEvent.roomId == null || trainingEvent.roomId == "")){
        this.$noty.error(this.$t("empty_room_but_location"));
        return;
      }

      const training = this.getArrayElementById("trainings", trainingEvent.trainingId);
      if(training.type == "VIRTUAL"){
        if(trainingEvent.onlineLink == null || trainingEvent.onlineLink == ""){
          this.$noty.error(this.$t("empty_value_for_virtual", {name: this.$t("onlineLink")}));
          return;
        }
        if(trainingEvent.roomId != null && trainingEvent.roomId != ""){
          this.$noty.error(this.$t("unallowed_value_for_virtual", {name: this.$t("room")}));
          this.selectedLocationId = null;
          this.trainingEvent.roomId = null;
          return;
        }
      }else if(training.type == "PRESENCE"){
        // Issue#160 Räume können unbekannt sein, daher ist leer erlaubt, Validierung soll aber greifen, wenn nur Ort ausgewählt
        if(this.selectedLocationId != null && (trainingEvent.roomId == null || trainingEvent.roomId == "")){
          this.$noty.error(this.$t("empty_value_for_presence", {name: this.$t("room")}));
          return;
        }
        if(trainingEvent.onlineLink != null && trainingEvent.onlineLink != ""){
          this.$noty.error(this.$t("unallowed_value_for_presence", {name: this.$t("onlineLink")}));
          return;
        }
      }

      // Validation for Start and End Dates
      if(trainingEvent.startDate != null && trainingEvent.startDate != "" && trainingEvent.endDate != null && trainingEvent.endDate != ""){
        const startDt = new Date(trainingEvent.startDate);
        const endDt = new Date(trainingEvent.endDate);
        if(startDt > endDt){
          this.$noty.error(this.$t("invalid_value", {name: this.$t("begin_date")}));
          return;
        }
        const startTm = new Date(trainingEvent.startDate + "T" + trainingEvent.startTime);
        const endTm = new Date(trainingEvent.endDate + "T" + trainingEvent.endTime);
        if(startTm > endTm){
          this.$noty.error(this.$t("invalid_value", {name: this.$t("start_time")}));
          return;
        }
      }
     }

      delete trainingEvent.training;

      if (this.editMode) {
        // Edit Training
         progressIndicator.hidden = false;
        showLoadingCircle(true);
        this.$axios
          .put("/api/training/event/" + this.trainingEventId, trainingEvent)
          .then(function (response) {
            _this.$noty.success(
              _this.$t("trainingEvent_edited", { name: response.data.designation })
            );
            //_this.$router.push("/training-events");
          })
           .finally(() => {
    this.trainingEvent = {};
    this.fetchEditingTrainingEvent();
    this.onFinally();
  });
          
          
         
          
      } else {
        // Create new Training

        const url = this.trainingRequestId == null ? "/api/training/event" : "/api/training/event/training-request/" + this.trainingRequestId;
         progressIndicator.hidden = false;
        showLoadingCircle(true);
        this.$axios
          .post(url, trainingEvent)
          .then(function (response) {
            _this.$noty.success(
              _this.$t("trainingEvent_saved", { name: response.data.designation })
            );
            _this.trainingEventId = response.data.id;
            _this.editMode = true;
            _this.fetchEditingTrainingEvent();
          })
          .catch(this.onError).finally(this.onFinally);
      }
    },

    activeOrInactiveTrainingEvent(eventFlagCode)
    {
      var _this = this;
      this.trainingEvent.rooms = this.rooms;
      var trainingEvent = {};
      trainingEvent = Object.assign(trainingEvent, this.trainingEvent);
      const updatedTrainingEvent = Object.assign({}, this.trainingEvent, { eventflag: eventFlagCode });
      trainingEvent = Object.assign(trainingEvent, updatedTrainingEvent);
     if(eventFlagCode==='0' || eventFlagCode==='1')
     {
      // Validation for empty fields
      if (trainingEvent.language == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("language") }));
        return;
      }
      if (trainingEvent.status == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("status") }));
        return;
      }
      if (trainingEvent.examType == null) {
        this.$noty.error(
          this.$t("empty_value", { name: this.$t("examType") })
        );
        return;
      }
      if (trainingEvent.trainerId == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("first_trainer") }));
        return;
      }
      if (trainingEvent.trainerId == trainingEvent.trainer2Id) {
        this.$noty.error(this.$t("invalid_value", { name: this.$t("second_trainer") }));
        return;
      }
      if (trainingEvent.trainingId == null) {
        this.$noty.error(this.$t("empty_value", { name: this.$t("training") }));
        return;
      }

      // Validation for Min and Max Participants
      if(trainingEvent.minParticipants === undefined || trainingEvent.minParticipants === ""){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("minParticipants")}));
        return;
      }
      if(trainingEvent.maxParticipants === undefined || trainingEvent.maxParticipants === ""){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("maxParticipants")}));
        return;
      }

      // Try Parse Values
      try {
        if(isNaN(trainingEvent.minParticipants)){
          trainingEvent.minParticipants = parseInt(trainingEvent.minParticipants);
        }
      } catch (error) {
        console.error(error);
        this.$noty.error(this.$t("invalid_value", {name: this.$t("minParticipants")}));
        return;
      }
      try {
        if(isNaN(trainingEvent.maxParticipants)){
          trainingEvent.maxParticipants = parseInt(trainingEvent.maxParticipants);
        }
      } catch (error) {
        console.error(error);
        this.$noty.error(this.$t("invalid_value", {name: this.$t("minParticipants")}));
        return;
      }


      if(trainingEvent.minParticipants < 0){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("minParticipants")}));
        return;
      }
      if(trainingEvent.maxParticipants < 0){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("maxParticipants")}));
        return;
      }
      if(trainingEvent.minParticipants > trainingEvent.maxParticipants){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("maxParticipants")}));
        return;
      }
      if(trainingEvent.startTime == null || !trainingEvent.startTime.includes(":") || isNaN(trainingEvent.startTime.replace(":", ""))){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("begin_time")}));
        return;
      }
      if(trainingEvent.endTime == null ||!trainingEvent.endTime.includes(":") || isNaN(trainingEvent.endTime.replace(":", ""))){
        this.$noty.error(this.$t("invalid_value", {name: this.$t("end_time")}));
        return;
      }

      if(this.selectedLocationId != null && (trainingEvent.roomId == null || trainingEvent.roomId == "")){
        this.$noty.error(this.$t("empty_room_but_location"));
        return;
      }

      const training = this.getArrayElementById("trainings", trainingEvent.trainingId);
      if(training.type == "VIRTUAL"){
        if(trainingEvent.onlineLink == null || trainingEvent.onlineLink == ""){
          this.$noty.error(this.$t("empty_value_for_virtual", {name: this.$t("onlineLink")}));
          return;
        }
        if(trainingEvent.roomId != null && trainingEvent.roomId != ""){
          this.$noty.error(this.$t("unallowed_value_for_virtual", {name: this.$t("room")}));
          this.selectedLocationId = null;
          this.trainingEvent.roomId = null;
          return;
        }
      }else if(training.type == "PRESENCE"){
        // Issue#160 Räume können unbekannt sein, daher ist leer erlaubt, Validierung soll aber greifen, wenn nur Ort ausgewählt
        if(this.selectedLocationId != null && (trainingEvent.roomId == null || trainingEvent.roomId == "")){
          this.$noty.error(this.$t("empty_value_for_presence", {name: this.$t("room")}));
          return;
        }
        if(trainingEvent.onlineLink != null && trainingEvent.onlineLink != ""){
          this.$noty.error(this.$t("unallowed_value_for_presence", {name: this.$t("onlineLink")}));
          return;
        }
      }

      // Validation for Start and End Dates
      if(trainingEvent.startDate != null && trainingEvent.startDate != "" && trainingEvent.endDate != null && trainingEvent.endDate != ""){
        const startDt = new Date(trainingEvent.startDate);
        const endDt = new Date(trainingEvent.endDate);
        if(startDt > endDt){
          this.$noty.error(this.$t("invalid_value", {name: this.$t("begin_date")}));
          return;
        }
        const startTm = new Date(trainingEvent.startDate + "T" + trainingEvent.startTime);
        const endTm = new Date(trainingEvent.endDate + "T" + trainingEvent.endTime);
        if(startTm > endTm){
          this.$noty.error(this.$t("invalid_value", {name: this.$t("start_time")}));
          return;
        }
      }
}

      delete trainingEvent.training;

      if (this.editMode) {
        // Edit Training
         progressIndicator.hidden = false;
        showLoadingCircle(true);
        this.$axios
          .put("/api/training/event/" + this.trainingEventId, trainingEvent)
          .then(function (response) {
            if(eventFlagCode==='0')
            {
            _this.$noty.success(
              _this.$t("trainingEvent_activated", { name: response.data.designation })
            );
            _this.$router.push("/training-events");
            }
            else if(eventFlagCode==='1')
            {
              _this.$noty.success(
              _this.$t("trainingEvent_cancelled", { name: response.data.designation })
            ); 
             _this.$router.push({path: '/inactive-events',query: { eventStatus: 'cancelled' }});
            }
            else if(eventFlagCode==='2')
            {
              _this.$noty.success(
              _this.$t("trainingEvent_drafted", { name: response.data.designation })
              );
              _this.$router.push({path: '/inactive-events',query: { eventStatus: 'drafted' }});
            }
            
           
          })
          .catch(this.onError).finally(this.onFinally);
      } else {
        // Create new Training

        const url = this.trainingRequestId == null ? "/api/training/event" : "/api/training/event/training-request/" + this.trainingRequestId;
 progressIndicator.hidden = false;
        showLoadingCircle(true);
        this.$axios
          .post(url, trainingEvent)
          .then(function (response) {
          if(eventFlagCode==='0')
            {
            _this.$noty.success(
              _this.$t("trainingEvent_activated", { name: response.data.designation })
            );
            _this.$router.push("/training-events");
            }
            else if(eventFlagCode==='1')
            {
              _this.$noty.success(
              _this.$t("trainingEvent_cancelled", { name: response.data.designation })
            ); 
             _this.$router.push({path: '/inactive-events',query: { eventStatus: 'cancelled' }});
            }
            else if(eventFlagCode==='2')
            {
              _this.$noty.success(
              _this.$t("trainingEvent_drafted", { name: response.data.designation })
              );
              _this.$router.push({path: '/inactive-events',query: { eventStatus: 'drafted' }});
            }
            _this.trainingEventId = response.data.id;
            _this.editMode = true;
            _this.fetchEditingTrainingEvent();
          })
          .catch(this.onError).finally(this.onFinally);
      }
    },
   
    deleteTrainingEvent() {
      if (this.trainingEventId == null) {
        console.error("You are not editing an existing trainingEvent.");
        return;
      }

      var _this = this;
 progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .delete("/api/training/event/" + this.trainingEventId)
        .then(function (response) {
          _this.$noty.success(
            _this.$t("trainingEvent_deleted", { name: _this.trainingEvent.designation })
          );
          _this.$router.push("/training-events");
        })
        .catch(this.onError).finally(this.onFinally);
    },

    onFinally() {
      showLoadingCircle(false);
    },

    showCertificate(bookingId){
      if(this.$user != null && this.$user.external){
        this.$noty.error(this.$t("certificate_download_not_allowed"));
        return;
      }
      var win = window.open("/api/booking/" + bookingId + "/certificate", "_blank");
      win.focus();
    },

    createParticipantsList(){
      if(this.$user != null && this.$user.external){
        this.$noty.error(this.$t("participant_list_download_not_allowed"));
        return;
      }
      var win = window.open("/api/training/event/" + this.trainingEventId + "/participantslist", "_blank");
      win.focus();
    },

    sendMail(booking){
      if(booking.invitationsSent == 0){
        this.sendMailToParticipant(booking);
        return;
      }
      this.sendMailAgainBooking = booking;
      this.openSendMailAgainDialog = true;
    },

    sendMailForOnlineFeedBack(booking){
      if(booking.feedbackSent == 0){
        this.sendMailToParticipantForOnlineFeedBack(booking);
        return;
      }
      this.sendMailAgainFeedBackBooking = booking;
      this.openSendMailAgainFeedBackDialog = true;
    },

     sendMailToParticipantForOnlineFeedBack(booking) {
      if(booking == null) return;

      var _this = this;
      this.openSendMailAgainFeedBackDialog = false;
      this.sendMailAgainFeedBackBooking = null;

      booking.feedBackSendingLoading = true;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/booking/" + booking.id + "/feedback/mail")
        .then(function (response) {
          _this.$noty.success(
            _this.$t("invitation_sent", { name: booking.participant.fullname })
          );
          booking.feedBackSendingLoading = false;
          booking.feedbackSent++;
        })
        .catch(this.onError)
        .finally(() => {
          showLoadingCircle(false);
          booking.feedBackSendingLoading = false;
        });
    },

    sendMailToParticipant(booking) {
      if(booking == null) return;

      var _this = this;
      this.openSendMailAgainDialog = false;
      this.sendMailAgainBooking = null;

      booking.invitationSendingLoading = true;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .get("/api/booking/" + booking.id + "/mail")
        .then(function (response) {
          _this.$noty.success(
            _this.$t("invitation_sent", { name: booking.participant.fullname })
          );
          booking.invitationSendingLoading = false;
          booking.invitationsSent++;
        })
        .catch(this.onError)
        .finally(() => {
          showLoadingCircle(false);
          booking.invitationSendingLoading = false;
        });
    },

    sendBlankMail() {
      var _this = this;
      const dto = {
        trainingEventId: this.trainingEventId,
        email: this.customEmail
      }
      const email = this.customEmail;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .post("/api/booking/mail/blank", dto)
        .then(function (response) {
          _this.$noty.success(
            _this.$t("invitation_sent", { name: email })
          );
          _this.openSendMailCustomDialog = false;
        })
        .catch(this.onError)
        .finally(() => {
          showLoadingCircle(false);
        });
    },

    deleteBooking(booking) {
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .delete("/api/booking/" + booking.id)
        .then(function (response) {
          _this.$noty.success(
            _this.$t("booking_deleted", { name: booking.participant.fullname })
          );
          _this.fetchBookings();
        })
        .catch(this.onError).finally(this.onFinally);
    },


    // Stuff for Adding new Participants
    isUserAlreadyParticipant(userId){
      for (let i = 0; i < this.bookings.length; i++) {
        const booking = this.bookings[i];
        if(booking.participant.id == userId) return true;
      }
      return false;
    },

    addParticipant(){
      var _this = this;
      this.adduser.trainingEventId = this.trainingEvent.id;
      const username = this.adduser.firstname + " " + this.adduser.lastname;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .post("/api/booking/", this.adduser)
        .then(function (response) {
          _this.$noty.success(
            _this.$t("participant_added", { name: username })
          );
          _this.fetchBookings();
          _this.fetchUsers();
          _this.fetchEditingTrainingEvent();

          _this.adduser = {
            firstname: null,
            lastname: null,
            personnelnumber: null,
            location: null,
            company: null,
            email: null,
            tenantId: null,
          };

          document.getElementById("add_participant_firstname").focus();
        })
        .catch(this.onError).finally(this.onFinally);
    },
    editParticipant()
    {
      var _this = this;
      this.edituser.trainingEventId = this.trainingEvent.id;
      this.edituser.id=this.currentBookingID;
      const username = this.edituser.firstname + " " + this.edituser.lastname;
      let language = _this.$locale;
          if(language==='en')
          {
              _this.edituser.certificateTrainingNameEnglish=_this.edituser.certificateTrainingName;
              _this.edituser.certificateTrainingNameOtherEnglish=_this.edituser.certificateTrainingNameOther;
              _this.edituser.certificateTrainingDescriptionEnglish=_this.edituser.certificateTrainingDescription;
          }
          else if(language==='de')
          {
              _this.edituser.certificateTrainingNameGerman=_this.edituser.certificateTrainingName;
              _this.edituser.certificateTrainingNameOtherGerman=_this.edituser.certificateTrainingNameOther;
              _this.edituser.certificateTrainingDescriptionGerman=_this.edituser.certificateTrainingDescription;
          }
          else if(language==='pl')
          {
               _this.edituser.certificateTrainingNamePolish=_this.edituser.certificateTrainingName;
                _this.edituser.certificateTrainingNameOtherPolish=_this.edituser.certificateTrainingNameOther;
               _this.edituser.certificateTrainingDescriptionPolish=_this.edituser.certificateTrainingDescription;
          }
          else if(language==='fr')
          {
               _this.edituser.certificateTrainingNameFrench=_this.edituser.certificateTrainingName;
                _this.edituser.certificateTrainingNameOtherFrench=_this.edituser.certificateTrainingNameOther;
               _this.edituser.certificateTrainingDescriptionFrench=_this.edituser.certificateTrainingDescription;
          }
          else if(language==='hu')
          {
               _this.edituser.certificateTrainingNameHungarian=_this.edituser.certificateTrainingName;
                _this.edituser.certificateTrainingNameOtherHungarian=_this.edituser.certificateTrainingNameOther;
               _this.edituser.certificateTrainingDescriptionHungarian=_this.edituser.certificateTrainingDescription;
          }
        if (typeof this.edituser.tenantId === 'object' && this.edituser.tenantId !== null) {  
          this.edituser.tenantId=this.edituser.tenantId.id;
        }
      let request={
            firstname: this.edituser.firstname,
            lastname: this.edituser.lastname,
            personnelnumber: this.edituser.personnelnumber,
            location: this.edituser.location,
            company: this.edituser.company,
            email: this.edituser.email,
            tenantId: this.edituser.tenantId,
            selectedStatus:this.edituser.selectedStatus,
            trainingEventId:this.edituser.trainingEventId,
            id:this.edituser.id,
            userId:this.edituser.userId,
            language:this.edituser.language,
            certificateStartDate:this.edituser.certificateStartDate,
            certificateEndDate:this.edituser.certificateEndDate,
            certificateEventLocation:this.edituser.certificateEventLocation,
            certificateEventNumber:this.edituser.certificateEventNumber,
            certificateTrainer:this.edituser.certificateTrainer,
            certificateTrainer2:this.edituser.certificateTrainer2,
            certificateStartDateOther:this.edituser.certificateStartDateOther,
            certificateEndDateOther:this.edituser.certificateEndDateOther,
            eventStatus:this.edituser.eventStatus,
            eventStatusOther:this.edituser.eventStatusOther,
            display:this.edituser.display,
            certificateEventLocationOther:this.edituser.certificateEventLocationOther,
            certificateEventNumberOther:this.edituser.certificateEventNumberOther,
            certificateTrainerOther:this.edituser.certificateTrainerOther,
            certificateTrainer2Other:this.edituser.certificateTrainer2Other,
            certificateTrainingNameEnglish:this.edituser.certificateTrainingNameEnglish,
            certificateTrainingNameGerman:this.edituser.certificateTrainingNameGerman,
            certificateTrainingNamePolish:this.edituser.certificateTrainingNamePolish,
            certificateTrainingNameFrench:this.edituser.certificateTrainingNameFrench,
            certificateTrainingNameHungarian:this.edituser.certificateTrainingNameHungarian,
             certificateTrainingNameOtherEnglish:this.edituser.certificateTrainingNameOtherEnglish,
            certificateTrainingNameOtherGerman:this.edituser.certificateTrainingNameOtherGerman,
            certificateTrainingNameOtherPolish:this.edituser.certificateTrainingNameOtherPolish,
            certificateTrainingNameOtherFrench:this.edituser.certificateTrainingNameOtherFrench,
            certificateTrainingNameOtherHungarian:this.edituser.certificateTrainingNameOtherHungarian,
            certificateTrainingDescriptionEnglish:this.edituser.certificateTrainingDescriptionEnglish!==null ? this.$convertHtml(this.edituser.certificateTrainingDescriptionEnglish,false):null,
            certificateTrainingDescriptionGerman:this.edituser.certificateTrainingDescriptionGerman!==null ? this.$convertHtml(this.edituser.certificateTrainingDescriptionGerman,false):null,
            certificateTrainingDescriptionPolish:this.edituser.certificateTrainingDescriptionPolish!==null ?this.$convertHtml(this.edituser.certificateTrainingDescriptionPolish,false):null,
            certificateTrainingDescriptionFrench:this.edituser.certificateTrainingDescriptionFrench!==null ?this.$convertHtml(this.edituser.certificateTrainingDescriptionFrench,false):null,
            certificateTrainingDescriptionHungarian:this.edituser.certificateTrainingDescriptionHungarian!==null ?this.$convertHtml(this.edituser.certificateTrainingDescriptionHungarian,false):null
      }
       progressIndicator.hidden = false;
        showLoadingCircle(true);
       let currentBookingId= parseInt(this.currentBookingID, 10);
      this.$axios
        .put("/api/booking/updateBooking/"+ currentBookingId, request)
        .then(function (response) {
          _this.$noty.success(
            _this.$t("participant_edited", { name: username })
          );
          _this.edituser = {
            firstname: null,
            lastname: null,
            personnelnumber: null,
            location: null,
            company: null,
            email: null,
            tenantId: null,
            selectedStatus:null,
            certificateStartDate:null,
            certificateEndDate:null,
            certificateEventLocation:null,
            certificateEventNumber:null,
            certificateTrainer:null,
            certificateTrainer2:null,
             certificateStartDateOther:null,
            certificateEndDateOther:null,
            display:null,
            eventStatus:null,
            eventStatusOther:null,
            certificateEventLocationOther:null,
            certificateEventNumberOther:null,
            certificateTrainerOther:null,
            certificateTrainer2Other:null,
            certificateTrainingNameEnglish:null,
            certificateTrainingNameGerman:null,
            certificateTrainingNamePolish:null,
            certificateTrainingNameFrench:null,
            certificateTrainingNameHungarian:null,
             certificateTrainingNameOtherEnglish:null,
            certificateTrainingNameOtherGerman:null,
            certificateTrainingNameOtherPolish:null,
            certificateTrainingNameOtherFrench:null,
            certificateTrainingNameOtherHungarian:null,
            certificateTrainingName:null,
            certificateTrainingNameOther:null,
            certificateTrainingDescription:null,
            certificateTrainingDescriptionEnglish:null,
            certificateTrainingDescriptionGerman:null,
            certificateTrainingDescriptionPolish:null,
            certificateTrainingDescriptionFrench:null,
            certificateTrainingDescriptionHungarian:null

          };
        
        })
        .catch(this.onError).finally(this.onFinally);
        
         this.showModal=false;
       
         setTimeout(() => {
          window.scrollTo(this.scrollPositionX, this.scrollPositionY)
          _this.fetchBookings();
          _this.fetchUsers();
          }, 1000);   
          document.getElementById("edit_participant_firstname").focus();
    },
    /**
     * Old Method to add directly one user to Event
     */
    addParticipantWithUser(user){
      var _this = this;
       progressIndicator.hidden = false;
        showLoadingCircle(true);
      this.$axios
        .post("/api/booking/user", {
          userId: user.id,
          trainingEventId: this.trainingEvent.id,
          invitationsSent: 0,
        })
        .then(function (response) {
          _this.$noty.success(
            _this.$t("participant_added", { name: user.fullname })
          );
          _this.fetchBookings();
          _this.fetchUsers();
        })
        .catch(this.onError).finally(this.onFinally);
    },

    /**
     * Searchs for a user by the given ID and type (allowed types are trainers, translators)
     */
    getArrayElementById(arrayName, id){
      if(id == null) return null;
      for (let i = 0; i < this[arrayName].length; i++) {
        const user = this[arrayName][i];
        if(user.id == id) return user;
      }
      return {};
    },

    getShareMailText(){
      return this.$t('share_mail_content', {link: window.location.href});
    }
  },
};
</script>
