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
        :disabled="!editMode"
      >
        <span>{{ $t("participants") }}</span>
      </v-tab>
      <v-tab
        class="LanguageselectTab"
        :disabled="!editMode || !$rights.includes('CREATE_BOOKING')"
        :hidden="!$rights.includes('CREATE_BOOKING')"
      >
        {{ $t("add_participants") }}
      </v-tab>
    </v-tabs>
    <div class="col-md-12 col-xl-9 innercreatetraining mb-3 mb-lg-0 pt-5 px-md-8 px-4 mx-0 pa-0">
        <!-- Put Content here -->
        <v-tabs-items v-model="trainingEventTab">

          <!-- Tab for Editing Training Event -->
          <v-tab-item>
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
                        :label="$t('eventNumber')"
                        v-model="trainingEvent.eventNumber"
                        ></v-text-field>
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
            <div class="text-right">
              <v-label>
                * {{ $t("mandatory_fields") }}
              </v-label>
            </div>
            </div>
          </v-tab-item>


          <!-- Tab for Preview or Details -->
          <v-tab-item>
            <div class="mx-0 pa-0 text-content row disablerow justify-content-between align-items-start">
                <div class="col-md-6 px-0">
                  <div class="col-md-12 pt-0">
                      <span class="headlinecolor text-h6"> {{$t("general")}}</span>
                  </div>
                  <div class="col-md-12" v-if="trainingEvent.training != null"><b>{{ $t("training") }}:</b> {{ trainingEvent.training.designationsMap[$locale] }}</div>
                  <div class="col-md-12" v-if="trainingEvent.training == null && trainingEvent.trainingId != null"><b>{{ $t("training") }}:</b> {{ getArrayElementById("trainings", trainingEvent.trainingId).designationsMap[$locale] }}</div>
                  <div class="col-md-12" v-if="trainingEvent.eventNumber != null && trainingEvent.eventNumber != ''"><b>{{ $t("eventNumber") }}:</b> {{ trainingEvent.eventNumber }}</div>
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
                    <th @click="participants_sort = 'participant.personnelnumber', participants_order = !participants_order,participants_page = 1, fetchBookings()" class="text-uppercase align-bottom">
                      {{$t("persnumber")}} <v-icon v-show="participants_sort == 'participant.personnelnumber' && participants_order" >fas fa-chevron-down</v-icon><v-icon v-show="participants_sort == 'participant.personnelnumber' && !participants_order" >fas fa-chevron-up</v-icon>
                    </th>
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
                    <td class="pb-1 text-uppercase align-bottom">{{ booking.participant.lastname }}, {{ booking.participant.firstname }}</td>
                    <td class="pb-1 text-uppercase align-bottom">{{ booking.participant.personnelnumber }}</td>
                    <td v-show="$user != null && $user.external" class="pb-1 text-uppercase align-bottom">{{ booking.participant.location }}</td>
                    <td v-show="$user != null && !$user.external" class="pb-1 text-uppercase align-bottom">{{ booking.participant.company }}</td>
                    <td class="pb-1 text-uppercase align-bottom">{{ $formatDate(booking.bookingDate) }}</td>
                    <td class="pb-1">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn @click="showCertificate(booking.id)" color="transparent" class="tablebutton" depressed tile v-bind="attrs" v-on="on"><v-icon color="#444">fas fa-file-pdf</v-icon></v-btn>
                        </template>
                        <span>{{ $t("show_certificate") }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-show="$rights.includes('CREATE_BOOKING') && $user != null && !$user.booker" :disabled="booking.participant.email == null" @click="sendMail(booking)" color="transparent" class="tablebutton" depressed tile v-bind="attrs" v-on="on">
                            <v-badge :value="true" color="primary" overlap>
                              <div slot="badge">
                                <span v-show="booking.invitationSendingLoading"><v-icon color="#fff" class="spinner-badge">fas fa-spinner</v-icon></span>
                                <span v-show="!booking.invitationSendingLoading">{{ booking.invitationsSent }}</span>
                              </div>
                              <v-icon color="#444">fas fa-envelope</v-icon>
                            </v-badge>
                          </v-btn>
                        </template>
                        <span>{{ $t("send_invitation_mail") }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-show="$rights.includes('CREATE_BOOKING')" @click="deleteBooking(booking)" color="transparent"  class="tablebutton" depressed tile v-bind="attrs" v-on="on"><v-icon color="#444">fas fa-trash</v-icon></v-btn>
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
                <div class="col-12 col-sm-6 col-md-6">
                    <v-text-field  
                    hide-details="auto"
                    class="datainput justify-content-end align-self-center pb-1"
                    dense
                    outlined
                    :label="$t('personnelnumber') + '*'"
                    v-model="adduser.personnelnumber"
                    @keypress.enter="addParticipant()"
                    ></v-text-field>
                </div>
                <div class="col-12 col-sm-6 col-md-6" v-show="$rights.includes('CREATE_TRAINING_EVENT')">
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

        </v-tabs-items>
    </div>
    <div class="col-xl-3 px-0 pl-8 pl-md-12 row pt-0">

        <!-- Actions for first and second Tab -->
        <div class="col-xl-12 right-side-block" v-show="trainingEventTab == 0 || trainingEventTab == 1">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn v-show="editMode && $rights.includes('CREATE_TRAINING_EVENT')" @click="openDeleteDialog= true" outlined depressed tile class="mr-2 deletebutton mb-2">{{ $t("delete") }}</v-btn>
          <v-btn @click="$routerBack()" outlined depressed tile class="cancelbutton mr-2 mb-2">{{ $t("cancel") }}</v-btn>
          <v-btn v-show="$rights.includes('CREATE_TRAINING_EVENT')" @click="saveTrainingEvent()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("save") }}</v-btn>
          <v-btn v-show="editMode" outlined depressed tile class="mr-2 savebutton">{{ $t("cancel this event") }}</v-btn>
          <v-btn v-show="editMode" outlined depressed tile class="mr-2 savebutton">{{ $t("active this event") }}</v-btn>
        </div>

        <!-- Actions for third Tab -->
        <div class="col-xl-12 right-side-block" v-show="trainingEventTab == 2">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <!-- <v-btn v-show="editMode && $rights.includes('CREATE_TRAINING_EVENT')" @click="openDeleteDialog= true" outlined depressed tile class="mr-2 deletebutton mb-2">{{ $t("delete") }}</v-btn> -->
          <v-btn @click="$routerBack()" outlined depressed tile class="cancelbutton mr-2 mb-2">{{ $t("cancel") }}</v-btn>
          <v-btn v-show="$user != null && !$user.external" @click="createParticipantsList()" outlined depressed tile class="savebutton mb-2">{{ $t("create_participant_list") }}</v-btn>
          <v-btn outlined depressed tile @click="openSendMailCustomDialog = true" class="mr-2 deletebutton mb-2" >{{ $t("email") }}</v-btn>
        </div>

        <!-- Actions for fourth Tab -->
        <div class="col-xl-12 right-side-block" v-show="trainingEventTab == 3">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn @click="$routerBack()" outlined depressed tile class="cancelbutton mr-2 mb-2">{{ $t("cancel") }}</v-btn>
          <v-btn @click="addParticipant()" outlined depressed tile class="savebutton mb-2">{{ $t("add_participant") }}</v-btn>
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
        <v-btn @click="openSendMailAgainDialog = false" outlined depressed tile class="deletebutton mr-2 mb-2">{{ $t("cancel") }}</v-btn>
        <v-btn @click="sendMailToParticipant(sendMailAgainBooking)" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("send_invitation_mail") }}</v-btn>
      </v-card-actions>
      </v-dialog>

    <div class="text-center">
      <v-dialog v-model="openDeleteDialog" width="500">
        <h4>{{ $t("confirm_delete_event") }}</h4>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="openDeleteDialog = false" outlined depressed tile class="deletebutton mr-2 mb-2">{{ $t("cancel") }}</v-btn>
          <v-btn @click="deleteTrainingEvent()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("delete") }}</v-btn>
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
          <v-btn @click="openSendMailCustomDialog = false" outlined depressed tile class="deletebutton mr-2 mb-2">{{ $t("cancel") }}</v-btn>
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
    trainingRequestId: Number,
  },

  data() {
    return {
      editMode: false,

      trainers: [],
      translators: [],
      rooms: [],
      locations: [],
      trainings: [],
      bookings: [],
      customers: [],
      users: [],
      selectedLocationId: null,


      customEmail: null,

      trainingEventTab: null,
      openSendMailCustomDialog:false,
      openSendMailAgainDialog: false,
      sendMailAgainBooking: null,

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
        comment: null,
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
    };
  },

  mounted() {
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
        .catch(this.onError);
    },

    fetchTrainingRequest() {
        var _this = this;
        this.$axios
          .get("/api/training/request/" + this.trainingRequestId)
          .then(function (response) {
            _this.trainingEvent.trainingId = response.data.training.id;
            _this.trainingEvent.customerId = response.data.customerTenant.id;
            _this.trainingEvent.minParticipants = 1;
            _this.trainingEvent.maxParticipants = response.data.participantsAmount;
            _this.trainingEvent.language = response.data.language;
          })
          .catch(this.onError);
      },

    fetchTrainings() {
      var _this = this;
      this.$axios
        .get("/api/training", {
          params: {
            sort: "designations.description",
            order: "ASC",
            page: 0,
            size: 200,
          }
        })
        .then(function (response) {
          let trainings = response.data.content;
          if(trainings.length > 0){
            for (let p = 0; p < trainings.length; p++) {
              let previousTraining = trainings[0];
              for (let i = 1; i < trainings.length; i++) {
                const training = trainings[i];
                if(previousTraining.designationsMap[_this.$locale] > training.designationsMap[_this.$locale]){
                  trainings[i] = previousTraining;
                  trainings[i-1] = training;
                }
              }
            }
          }
          // trainings.sort((a,b) => a.designationsMap[_this.$locale] - b.designationsMap[_this.$locale]);
          for (let i = 0; i < trainings.length; i++) {
            const training = trainings[i];
            training.text = training.designationsMap[_this.$locale];
          }
          _this.trainings = trainings;
        })
        .catch(this.onError);
    },

    fetchTrainers() {
      var _this = this;
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
        .catch(this.onError);
    },

    fetchSingleTrainerAndPush(trainerId){
      var _this = this;
      this.$axios
        .get("/api/user/" + trainerId)
        .then(function (response) {
          const element = response.data;
          _this.trainers.push(element);
        })
        .catch(this.onError);
    },

    fetchCustomers() {
      var _this = this;
      this.$axios
        .get("/api/tenant/customers")
        .then(function (response) {
          _this.customers = response.data.content;
          if(_this.$external && _this.customers.length == 1){
            _this.trainingEvent.customerId = _this.customers[0].id;
          }
        })
        .catch(this.onError);
    },

    fetchTranslators() {
      var _this = this;
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
        .catch(this.onError);
    },

    fetchBookings() {
      if(!this.$rights.includes("VIEW_BOOKINGS")){
        return;
      }
      var _this = this;
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
        .catch(this.onError);
    },

    fetchLocations() {
      var _this = this;
      this.$axios
        .get("/api/location")
        .then(function (response) {
          _this.locations = response.data.content;
        })
        .catch(this.onError);
    },

    fetchUsers() {
      var _this = this;
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
        .catch(this.onError);
    },

    fetchRooms(clearCurrentRoom = false) {
      var _this = this;
      if(clearCurrentRoom) this.trainingEvent.roomId = null;
      if(this.selectedLocationId == null) return;

      this.$axios
        .get("/api/room/location/id/" + this.selectedLocationId)
        .then(function (response) {
          _this.rooms = response.data.content;
        })
        .catch(this.onError);
    },

    saveTrainingEvent() {
      var _this = this;
      this.trainingEvent.rooms = this.rooms;
      var trainingEvent = {};
      trainingEvent = Object.assign(trainingEvent, this.trainingEvent);

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

      delete trainingEvent.training;

      if (this.editMode) {
        // Edit Training
        this.$axios
          .put("/api/training/event/" + this.trainingEventId, trainingEvent)
          .then(function (response) {
            _this.$noty.success(
              _this.$t("trainingEvent_edited", { name: response.data.designation })
            );
            _this.$router.push("/training-events");
          })
          .catch(this.onError);
      } else {
        // Create new Training

        const url = this.trainingRequestId == null ? "/api/training/event" : "/api/training/event/training-request/" + this.trainingRequestId;

        this.$axios
          .post(url, this.trainingEvent)
          .then(function (response) {
            _this.$noty.success(
              _this.$t("trainingEvent_saved", { name: response.data.designation })
            );
            _this.trainingEventId = response.data.id;
            _this.editMode = true;
            _this.fetchEditingTrainingEvent();
          })
          .catch(this.onError);
      }
    },

    deleteTrainingEvent() {
      if (this.trainingEventId == null) {
        console.error("You are not editing an existing trainingEvent.");
        return;
      }

      var _this = this;

      this.$axios
        .delete("/api/training/event/" + this.trainingEventId)
        .then(function (response) {
          _this.$noty.success(
            _this.$t("trainingEvent_deleted", { name: _this.trainingEvent.designation })
          );
          _this.$router.push("/training-events");
        })
        .catch(this.onError);
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

    sendMailToParticipant(booking) {
      if(booking == null) return;

      var _this = this;
      this.openSendMailAgainDialog = false;
      this.sendMailAgainBooking = null;

      booking.invitationSendingLoading = true;
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
        });
    },

    deleteBooking(booking) {
      var _this = this;
      this.$axios
        .delete("/api/booking/" + booking.id)
        .then(function (response) {
          _this.$noty.success(
            _this.$t("booking_deleted", { name: booking.participant.fullname })
          );
          _this.fetchBookings();
        })
        .catch(this.onError);
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
      this.$axios
        .post("/api/booking/", this.adduser)
        .then(function (response) {
          _this.$noty.success(
            _this.$t("participant_added", { name: username })
          );
          _this.fetchBookings();
          _this.fetchUsers();

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
        .catch(this.onError);
    },

    /**
     * Old Method to add directly one user to Event
     */
    addParticipantWithUser(user){
      var _this = this;
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
        .catch(this.onError);
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
