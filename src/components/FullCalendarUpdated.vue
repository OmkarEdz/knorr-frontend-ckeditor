<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/calendar.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("schedule overview") }}</div>
      </div>
    </div>
  </div>
  <div id="weekviewcontainer">

    <div class="d-flex justify-end">
      <div class="toggleWrap">
        <router-link to="/sales-calendar" tag="button" class="savebutton v-btn v-size--default switchBtn">
          <img src="../assets/img/arrow_right.png" alt="Icon">
          Sales Calendar
        </router-link>
        <router-link to="/calendar" tag="button" class="savebutton v-btn v-size--default switchBtn activeBtn">
          <img src="../assets/img/arrow_right.png" alt="Icon">
          Default View
        </router-link>
      </div>
      <v-btn :href="`/api/calendar/export/` +  selectedYear" v-show="!$external && $rights.includes('TENANT_INDEPENDENCE')" outlined depressed tile class="savebutton mb-2 ml-sm-10 relativeBtn">{{ $t("export_csv") }}</v-btn>
    </div>
    <div class="weekviewcontainerWrap">
      <div id="grouphead">
        <div class="left-group">
          <button class="today_btn" @click="todayClick()">Today</button>
          <button class="btn btn-info btn-arrow wpreviousBtn" @click="prevWeek()" id="prevClick" title="Previous Year">
            <v-icon>fa-solid fa-chevron-left</v-icon>
          </button>
          <button class="btn btn-info btn-arrow wnextBtn" @click="nextWeek()" id="nextClick" title="Next Year">
            <v-icon>fa-solid fa-chevron-right</v-icon>
          </button>
          <div id="weekDisplay" v-bind:title="weekDisplay">{{ weekDisplay }}</div>
        </div>
        <div class="right-group">
          <div class="custom-select-dropdown custom-years-dropdown">
            <v-autocomplete  
              v-model="yearFilter"
              hide-details="auto"
              class="justify-content-end searchbar align-self-center"
              :items="yearsList"
              item-text='name'
              item-value='id'
              dense
              outlined
              :label="$t('Select year')" @change="changeYear()">
                <template v-slot:append></template>
            </v-autocomplete>
          </div>
          <div class="custom-select-dropdown custom-month-dropdown">
            <v-autocomplete  
              v-model="monthFilter"
              hide-details="auto"
              class="justify-content-end searchbar align-self-center"
              :items="monthsList"
              item-text='name'
              item-value='id'
              dense
              outlined
              :label="$t('Select month')"
              @change="changeMonth()">
                <template v-slot:append></template>
            </v-autocomplete>
          </div>
          <div class="custom-select-dropdown custom-location-dropdown">
            <v-autocomplete  
              v-model="locationFilter"
              hide-details="auto"
              class="justify-content-end searchbar align-self-center"
              :items="locationsList"
              item-text='name'
              item-value='id'
              dense
              outlined
              :label="$t('viewAllTrainerLocation')">
                <template v-slot:append></template>
            </v-autocomplete>
          </div>
          <div class="custom-select-dropdown custom-location-dropdown">
            <v-autocomplete  
              v-model="roomlocationFilter"
              hide-details="auto"
              class="justify-content-end searchbar align-self-center"
              :items="roomslocationsList"
              item-text='name'
              item-value='id'
              dense
              outlined
              :label="$t('viewAllRoomLocation')">
                <template v-slot:append></template>
            </v-autocomplete>
          </div>
          <div class="custom-select-dropdown custom-trainers-dropdown">
            <v-autocomplete  
              v-model="trainersFilter"
              hide-details="auto"
              class="justify-content-end searchbar align-self-center"
              :items="trainersList"
              item-text='name'
              item-value='id'
              dense
              outlined
              :label="$t('View all trainers')"
              @change="changeTrainerType()">
                <template v-slot:append></template>
            </v-autocomplete>
          </div>
        </div>
      </div>
      <table>
        <thead>
            <tr class="weekhead">
              <th>Date</th>
              <th class="title" data-name="Mon" v-bind:data-value="mondayDate" v-bind:class="{'bg-blue': monday.slice(3) == this.currentDay}">{{ monday }}</th>
              <th class="title" data-name="Tue" v-bind:data-value="tuesdayDate" v-bind:class="{'bg-blue': tuesday.slice(3) == this.currentDay}">{{ tuesday }}</th>
              <th class="title" data-name="Wed" v-bind:data-value="wednesdayDate" v-bind:class="{'bg-blue': wednesday.slice(3) == this.currentDay}">{{ wednesday }}</th>
              <th class="title" data-name="Thu" v-bind:data-value="thursdayDate" v-bind:class="{'bg-blue': thursday.slice(3) == this.currentDay}">{{ thursday }}</th>
              <th class="title" data-name="Fri" v-bind:data-value="fridayDate" v-bind:class="{'bg-blue': friday.slice(3) == this.currentDay}">{{ friday }}</th>
              <th class="title redColor" data-name="Sat" v-bind:data-value="saturdayDate" v-bind:class="{'bg-blue': saturday.slice(3) == this.currentDay}">{{ saturday }}</th>
              <th class="title redColor" data-name="Sun" v-bind:data-value="sundayDate" v-bind:class="{'bg-blue': sunday.slice(3) == this.currentDay}">{{ sunday }}</th>
          </tr>
          <tr>
              <th></th>
              <th class="one" data-week='0' data-name="Mon" v-bind:class="{'bg-blue': monday.slice(3) == this.currentDay}">Monday</th>
              <th class="one" data-week='0' data-name="Tue" v-bind:class="{'bg-blue': tuesday.slice(3) == this.currentDay}">Tuesday</th>
              <th class="one" data-week='0' data-name="Wed" v-bind:class="{'bg-blue': wednesday.slice(3) == this.currentDay}">Wednesday</th>
              <th class="one" data-week='0' data-name="Thu" v-bind:class="{'bg-blue': thursday.slice(3) == this.currentDay}">Thursday</th>
              <th class="one" data-week='0' data-name="Fri" v-bind:class="{'bg-blue': friday.slice(3) == this.currentDay}">Friday</th>
              <th class="one redColor" data-week='0' data-name="Sat" v-bind:class="{'bg-blue': saturday.slice(3) == this.currentDay}">Saturday</th>
              <th class="one redColor"  data-week='0' data-name="Sun" v-bind:class="{'bg-blue': sunday.slice(3) == this.currentDay}">Sunday</th>
            </tr>
            <tr>
              <th>KW</th>
              <th id="weekNumber" v-bind:title="weekNumber" v-bind:class="{'bg-blue': monday.slice(3) == this.currentDay}">{{ weekNumber }}</th>
              <th v-bind:class="{'bg-blue': tuesday.slice(3) == this.currentDay}"></th>
              <th v-bind:class="{'bg-blue': wednesday.slice(3) == this.currentDay}"></th>
              <th v-bind:class="{'bg-blue': thursday.slice(3) == this.currentDay}"></th>
              <th v-bind:class="{'bg-blue': friday.slice(3) == this.currentDay}"></th>
              <th v-bind:class="{'bg-blue': saturday.slice(3) == this.currentDay}"></th>
              <th v-bind:class="{'bg-blue': sunday.slice(3) == this.currentDay}"></th>
          </tr>
        </thead>
        <tbody v-bind:class="locationFilter" v-bind:id="trainersFilterEdited">
          <tr class="calendar-content-row location trainerType" v-for="(trainerAppointment, itemIndex) in allObjectsMonth.trainerAppointments" v-bind:class="trainerAppointment.trainerType" v-if="locationFilter === 'View all Trainer locations' || ( locationFilter === trainerAppointment.trainerLocation && locationFilter !== 'View all Trainer locations' )">
            <td>
              <div class="bg-beige">
                <p class="trainerName">
                  <img class="trainerTypeImg" src="../assets/img/trainer-icon.svg"/>
                  {{ getTrainerById(trainerAppointment.trainer).fullname }}
                </p>
                <p class="trainerTypeName" v-if="getTrainerById(trainerAppointment.trainerType) === 'fullTime'">
                  <span>
                    <img class="trainerTypeImg" src="/static/img/fulltime@2x.png"/>
                  </span>
                  Full Time
                </p>
                <p class="trainerTypeName trainerPartTypeName" v-if="getTrainerById(trainerAppointment.trainerType) === 'partTime'">
                  <span>
                    <img class="trainerTypeImg" src="/static/img/parttime@2x.png"/>
                  </span>
                  Part Time
                </p>
                <p class="trainerLoc"><v-icon>fas fa-map-marker-alt</v-icon> {{ getTrainerById(trainerAppointment.trainer).location.toLowerCase() }}</p>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, MondayDate, MondayMonthCount, 'TRAINER')">
              <div v-for="(trainerAppointment, index) in allObjectsMonthPrev.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, MondayDate, MondayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="mondayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, MondayDate, MondayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="mondayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                         </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div v-for="(trainerAppointment, index) in allObjectsMonthNext.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, MondayDate, MondayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="mondayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, TuesdayDate, TuesdayMonthCount, 'TRAINER', TuesdayDate.appointment)">
              <div v-for="(trainerAppointment, index) in allObjectsMonthPrev.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, TuesdayDate, TuesdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="tuesdayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, TuesdayDate, TuesdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="tuesdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'VACATION'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'ABSENCE'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                        <div class="traningData purple_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                        <div class="traningData yellow_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                        <div class="traningData green_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'SERVICE'">
                        <div class="traningData grey_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div v-for="(trainerAppointment, index) in allObjectsMonthNext.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, TuesdayDate, TuesdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="tuesdayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, WednesdayDate, WednesdayMonthCount, 'TRAINER', WednesdayDate.appointment)">
              <div v-for="(trainerAppointment, index) in allObjectsMonthPrev.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, WednesdayDate, WednesdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="wednesdayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, WednesdayDate, WednesdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="wednesdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'VACATION'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'ABSENCE'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                        <div class="traningData purple_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                        <div class="traningData yellow_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                        <div class="traningData green_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'SERVICE'">
                        <div class="traningData grey_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div v-for="(trainerAppointment, index) in allObjectsMonthNext.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, WednesdayDate, WednesdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="wednesdayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, ThursdayDate, ThursdayMonthCount, 'TRAINER', ThursdayDate.appointment)">
              <div v-for="(trainerAppointment, index) in allObjectsMonthPrev.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, ThursdayDate, ThursdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="thursdayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, ThursdayDate, ThursdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="thursdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'VACATION'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'ABSENCE'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                        <div class="traningData purple_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                        <div class="traningData yellow_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                        <div class="traningData green_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'SERVICE'">
                        <div class="traningData grey_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div v-for="(trainerAppointment, index) in allObjectsMonthNext.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, ThursdayDate, ThursdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="thursdayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, FridayDate, FridayMonthCount, 'TRAINER', FridayDate.appointment)">
              <div v-for="(trainerAppointment, index) in allObjectsMonthPrev.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, FridayDate, FridayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="fridayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, FridayDate, FridayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="fridayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'VACATION'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'ABSENCE'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                        <div class="traningData purple_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                        <div class="traningData yellow_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                        <div class="traningData green_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'SERVICE'">
                        <div class="traningData grey_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div v-for="(trainerAppointment, index) in allObjectsMonthNext.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, FridayDate, FridayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="fridayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, SatdayDate, SaturdayMonthCount, 'TRAINER', SatdayDate.appointment)">
              <div v-for="(trainerAppointment, index) in allObjectsMonthPrev.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1"  @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, SatdayDate, SaturdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="saturdayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, SatdayDate, SaturdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="saturdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'VACATION'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'ABSENCE'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                        <div class="traningData purple_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                        <div class="traningData yellow_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                        <div class="traningData green_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'SERVICE'">
                        <div class="traningData grey_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div v-for="(trainerAppointment, index) in allObjectsMonthNext.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, SatdayDate, SaturdayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="saturdayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, SundayDate, SundayMonthCount, 'TRAINER', SundayDate.appointment)">
              <div v-for="(trainerAppointment, index) in allObjectsMonthPrev.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, SundayDate, SundayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="sundayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, SundayDate, SundayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="sundayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'VACATION'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'ABSENCE'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                        <div class="traningData purple_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                        <div class="traningData yellow_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                        <div class="traningData green_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                        <div class="traningData nocolor_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'SERVICE'">
                        <div class="traningData grey_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                        <div class="traningData pink_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                      <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                        <div class="traningData white_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
              <div v-for="(trainerAppointment, index) in allObjectsMonthNext.trainerAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" v-bind:data-id="index + 1" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, SundayDate, SundayMonthCount, 'TRAINER', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="sundayDate == appointmentDate">
                        <div v-show="appointmentOnDay.type == 'VACATION'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ABSENCE'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                          <div class="traningData purple_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                          <div class="traningData yellow_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                          <div class="traningData green_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                          <div class="traningData nocolor_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'SERVICE'">
                          <div class="traningData grey_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                          <div class="traningData pink_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                          <div class="traningData white_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                        <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                          <div class="traningData lightBlue_traning">
                            <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                            <div v-html="appointmentOnDay.description"></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>      
                </div>
              </div>
            </td>
          </tr>
          <tr class="calendar-content-row location" v-for="(roomAppointment, itemIndex) in allObjectsMonth.roomAppointments" v-if="roomlocationFilter === 'View all Room locations' || ( roomlocationFilter === roomAppointment.roomLocation && roomlocationFilter !== 'View all Room locations' )">
            <td>
              <div class="bg-beige">
                <p class="trainerName">
                  <img class="trainerTypeImg" src="../assets/img/room-icon.svg"/>
                  {{ roomAppointment.room.designation }}
                </p>
                <p class="roomLoc"><v-icon>fas fa-map-marker-alt</v-icon> {{ roomAppointment.roomLocation.toLowerCase() }}</p>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, MondayDate, MondayMonthCount, 'ROOM')">
              <div v-for="(roomAppointment, index) in allObjectsMonthPrev.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, MondayDate, MondayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="mondayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, MondayDate, MondayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="mondayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div v-for="(roomAppointment, index) in allObjectsMonthNext.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, MondayDate, MondayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="mondayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, TuesdayDate, TuesdayMonthCount, 'ROOM')">
              <div v-for="(roomAppointment, index) in allObjectsMonthPrev.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, TuesdayDate, TuesdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="tuesdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, TuesdayDate, TuesdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="tuesdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div v-for="(roomAppointment, index) in allObjectsMonthNext.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, TuesdayDate, TuesdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="tuesdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, WednesdayDate, WednesdayMonthCount, 'ROOM')">
              <div v-for="(roomAppointment, index) in allObjectsMonthPrev.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, WednesdayDate, WednesdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="wednesdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, WednesdayDate, WednesdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="wednesdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div v-for="(roomAppointment, index) in allObjectsMonthNext.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, WednesdayDate, WednesdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="wednesdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, ThursdayDate, ThursdayMonthCount, 'ROOM')">
              <div v-for="(roomAppointment, index) in allObjectsMonthPrev.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, ThursdayDate, ThursdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="thursdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, ThursdayDate, ThursdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="thursdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div v-for="(roomAppointment, index) in allObjectsMonthNext.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, ThursdayDate, ThursdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="thursdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, FridayDate, FridayMonthCount, 'ROOM')">
              <div v-for="(roomAppointment, index) in allObjectsMonthPrev.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, FridayDate, FridayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="fridayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, FridayDate, FridayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="fridayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div v-for="(roomAppointment, index) in allObjectsMonthNext.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, FridayDate, FridayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="fridayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, SatdayDate, SaturdayMonthCount, 'ROOM')">
              <div v-for="(roomAppointment, index) in allObjectsMonthPrev.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, SatdayDate, SaturdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="saturdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, SatdayDate, SaturdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="saturdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div v-for="(roomAppointment, index) in allObjectsMonthNext.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, SatdayDate, SaturdayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="saturdayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, SundayDate, SundayMonthCount, 'ROOM')">
              <div v-for="(roomAppointment, index) in allObjectsMonthPrev.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, SundayDate, SundayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.start.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="sundayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div class="currentMonthItem">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, SundayDate, SundayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="day.date.slice(0, 8) + (index + 1)" :set="appointmentDate = day.date.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="sundayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
              <div v-for="(roomAppointment, index) in allObjectsMonthNext.roomAppointments" v-if="itemIndex == index">
                <div v-for="(day, index) in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment" @click.stop="calendarDayClicked(roomAppointment.room.id, SundayDate, SundayMonthCount, 'ROOM', day.appointment)">
                  <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.end.slice(0, 8) + (index + 1)" :set="appointmentDate = appointmentOnDay.end.slice(0, 8) + (index + 1)">
                    <div class="checkItem" v-if="sundayDate == appointmentDate">
                      <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        <div class="traningData lightBlue_traning">
                          <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                          <div v-html="appointmentOnDay.description"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else>&nbsp;</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <v-dialog v-model="openAddDialog">
        <h3 v-show="appointment.id == null">{{ $t("add_appointment") }}</h3>
        <h3 v-show="appointment.id != null" >{{ $t("edit_appointment") }}</h3><br>
        <div class="row">
          <div class="col-sm-6 col-md-6 ">
              <DatePicker v-model="appointment.start" clearable :label="$t('begin_date')" />
          </div>
          <div class="col-sm-6 col-md-6 ">
              <DatePicker v-model="appointment.end" clearable :label="$t('end_date')" />
          </div>
          <div class="col-sm-12 col-md-12">
            <v-select
              dense
              outlined
              class="datainput"
              hide-details="auto"
              :items="appointmentTypes"
              item-text="text"
              item-value="value"
              :label="$t('type')"
              v-model="appointment.type"
              :disabled="dialog.type == 'ROOM'"
            ></v-select>
          </div>
          <div class="col-sm-12 col-md-12" v-show="dialog.type == 'TRAINER'">
              <v-autocomplete  
                v-model="appointment.userReference"
                hide-details="auto"
                class="datainput justify-content-end searchbar align-self-center pb-1"
                :items="trainers"
                item-text='fullname'
                item-value='id'
                style="padding-right:2px"
                dense
                outlined
                :label="$t('user')">
              </v-autocomplete>
          </div>
          <div class="col-sm-12 col-md-12">
              <v-text-field  
                hide-details="auto"
                class="datainput justify-content-end align-self-center pb-1"
                dense
                outlined
                :label="$t('description')"
                v-model="appointment.description"
                clearable
              ></v-text-field>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteAppointment()" v-show="!appointment.clickable && appointment.id != null" outlined depressed tile class="deletebutton savebutton mr-2 mb-2 bg-white color-blue"><v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
          <v-btn @click="openAddDialog = false" outlined depressed tile class="savebutton mr-2 mb-2 bg-white color-blue">{{ $t("cancel") }}</v-btn>
          <v-btn @click="saveAppointment()" outlined depressed tile class="save savebutton mr-2 mb-2">{{ $t("save") }}</v-btn>
        </v-card-actions>
      </v-dialog>
    </div>    
  </div>
</div>
</template>

<script>
      var nd = new Date();
      Date.prototype.GetFirstDayOfWeek = function() {
        return (new Date(this.setDate(this.getDate() - this.getDay()+ (this.getDay() == 0 ? -6:1) )));
      }
      Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
      }
      let nav=0;var cnav=0;var inc=1;var dec=1;var wnav=0;var wlnav =0;
      var ndate = nd.getDate();
      var nday = nd.getDay();
      var weekOfMonth = Math.ceil((ndate - 1 - nday) / 7);
      nav = weekOfMonth;
      var fdweek = nd.GetFirstDayOfWeek();
      var getweekdt = nd.GetFirstDayOfWeek();
      var startDate = new Date(nd.getFullYear(), 0, 1);
      var days = Math.floor((nd - startDate) / (24 * 60 * 60 * 1000));
      // this.weekNumber = Math.ceil(days / 7);

      const formatDate = new Intl.DateTimeFormat("en" , {day: "2-digit",month: "2-digit"});
      const headwdate = new Intl.DateTimeFormat("en" , {year: 'numeric', month: 'short', day: 'numeric' });
      const headwdateFull = new Intl.DateTimeFormat("en-CA" , {year: 'numeric', month: '2-digit', day: 'numeric' });
      var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
      const dt = new Date();
      const year = dt.getFullYear();
      const month = dt.getMonth();
      const day = dt.getDate();
      const week =dt.getWeek();
      const firstDayOfMonth = new Date(year,month,1).toLocaleDateString('en-US',options); 
      const lastDayOfMonth = new Date(year,month+1,0).toLocaleDateString('en-US',options);
      var firstday = firstDayOfMonth.split(',')[0];
      var lastday = lastDayOfMonth.split(',')[0];
      var daytype = new Array('Mon','Tue','Wed','Thu','Fri','Sat','Sun');
      var i = daytype.indexOf(firstday);
      var j = daytype.indexOf(lastday)+1;
      var removefirst = daytype.slice(0, i);
      var removelast = daytype.slice(j, daytype.length);
      const firstweek = new Date(year,month,1).getWeek();
      const lastweek = new Date(year,month+1,0).getWeek();
      var used = new Date(year,month,1).getDay() + new Date(year,month+1,0).getDate();

      const fweekdt = headwdate.format(getweekdt.setDate(getweekdt.getDate()));
      const lweekdt = headwdate.format(getweekdt.setDate(getweekdt.getDate()+6));
      var fmondt = fweekdt.split(' ')[0];
      var lmondt = lweekdt.split(' ')[0];
      var fdaydt = fweekdt.split(' ')[1];
      fdaydt  = fdaydt.split(',')[0];
      var ldaydt = lweekdt.split(' ')[1];
      var fyeardt = fweekdt.split(',')[1];
      var lyeardt = lweekdt.split(',')[1];
export default {

    data() {
      return {
        days: [],
        trainerAppointments: [],
        roomAppointments: [],
        monthNames: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
        weekdays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        months: [],
        currentDay: null,
        currentMonth: null,
        selectedYear: null,
        dialog: {
          type: "TRAINER",
        },
        openAddDialog: false,
        trainers: [],
        yearFilter: [],
        yearsList: ["Select Year", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2026", "2027", "2028", "2029", "2030"],
        monthFilter: [],
        monthsList: ["Select Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        locationFilter: [],
        locationsList: ["View all Trainer locations"],
        roomlocationFilter: [],
        roomslocationsList: ["View all Room locations"],
        trainersFilter: [],
        trainersList: ["View all Trainers", "Full Time", "Part Time"],
        trainersFilterEdited: [],

        allObjects: [],
        
        appointmentTypes: [],

        appointment: {
          id: null,
          start: null,
          end: null,
          reference: null,
          userReference: null,
          description: null,
        },

        weekNumber: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null,

        mondayDate: null,
        tuesdayDate: null,
        wednesdayDate: null,
        thursdayDate: null,
        fridayDate: null,
        saturdayDate: null,
        sundayDate: null,
        weekDisplay: null,
        monthCount: null,
        yearCount: null,
        trainerIndex: null,
        allObjectsMonthPrev: [],
        allObjectsMonth: [],
        allObjectsMonthNext: [],
        nd: new Date(),
        fdweek : null,
        getweekdt : null,
        MondayDate: null,
        TuesdayDate: null,
        WednesdayDate: null,
        ThursdayDate: null,
        FridayDate: null,
        SatdayDate: null,
        SundayDate: null,

        MondayMonthCount: null,
        TuesdayMonthCount: null,
        WednesdayMonthCount: null,
        ThursdayMonthCount: null,
        FridayMonthCount: null,
        SaturdayMonthCount: null,
        SundayMonthCount: null,
        getMonthCount: null,
        spinner: null,

        startDate: null,
        weekNumDays: null,
        prevYear: null,
        nextYear: null,
        firstDayOfPrevYear: null,
        lastDayOfPrevYear: null, 
        startOfWeekPrevYear:null,
        endOfWeekPrevYear:null,
        totalDays: null,
        totalWeeks :null,
        firstDayOfNextYear: null,
        lastDayOfNextYear: null, 
        startOfWeekNextYear:null,
        endOfWeekNextYear:null,
        firstWeek: null,
      }
    },
    
    mounted(){
      this.locationFilter = "View all Trainer locations";
      this.roomlocationFilter = "View all Room locations";
      this.fdweek = this.nd.GetFirstDayOfWeek();
      this.getweekdt = this.nd.GetFirstDayOfWeek();
      for (let i = 0; i <= 12; i++) {
        this.allObjects.push({
            month: i,
            trainerAppointments: [],
            roomAppointments: [],
        });
      }
      
      this.allObjectsMonthPrev = this.allObjects[dt.getMonth() - 1];
      this.allObjectsMonth = this.allObjects[dt.getMonth()];
      this.allObjectsMonthNext = this.allObjects[dt.getMonth() + 1];
      console.log(this.allObjects);
      console.log(this.allObjectsMonthNext);
      
      this.currentDay = new Date().getDate();
      this.currentMonth = new Date().getMonth();
      this.selectedYear = new Date().getFullYear();
      
      this.fetchAppointments();
      this.fetchTrainers();
      this.fetchAppointmentTypes();

      this.prevYear = this.selectedYear - 1;
      this.nextYear = this.selectedYear + 1;
      this.startDate = new Date(this.nd.getFullYear(), 0, 1);
      this.weekdays = Math.floor((this.nd - this.startDate) / (24 * 60 * 60 * 1000));
      this.weekNumber = Math.ceil(this.weekdays / 7);
      this.monday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate()));
      this.tuesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
      this.wednesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
      this.thursday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
      this.friday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
      this.saturday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
      this.sunday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

      this.mondayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() - 6 ));
      this.tuesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
      this.wednesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
      this.thursdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
      this.fridayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
      this.saturdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
      this.sundayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

      if(fyeardt == lyeardt && fmondt == lmondt){
        this.weekDisplay = (fmondt+" "+fdaydt+" - "+ldaydt+fyeardt);
      }
          if(fyeardt == lyeardt && fmondt != lmondt){
        this.weekDisplay = (fmondt+" "+fdaydt+" - "+lmondt+" "+ldaydt+fyeardt);
      }
          if(fyeardt != lyeardt && fmondt != lmondt){
        this.weekDisplay = (fweekdt+" - "+lweekdt);
      }
      this.fdweek.setDate(this.fdweek.getDate()-6);
      this.getweekdt.setDate(this.getweekdt.getDate());
      
      this.MondayDate = this.mondayDate.slice(8,10);
      this.TuesdayDate = this.tuesdayDate.slice(8,10);
      this.WednesdayDate = this.wednesdayDate.slice(8,10);
      this.ThursdayDate = this.thursdayDate.slice(8,10);
      this.FridayDate = this.fridayDate.slice(8,10);
      this.SatdayDate = this.saturdayDate.slice(8,10);
      this.SundayDate = this.sundayDate.slice(8,10);

      this.MondayMonthCount = this.mondayDate.slice(5,7) - 1;
      this.TuesdayMonthCount = this.tuesdayDate.slice(5,7) - 1;
      this.WednesdayMonthCount = this.wednesdayDate.slice(5,7) - 1;
      this.ThursdayMonthCount = this.thursdayDate.slice(5,7) - 1;
      this.FridayMonthCount = this.fridayDate.slice(5,7) - 1;
      this.SaturdayMonthCount = this.saturdayDate.slice(5,7) - 1;
      this.SundayMonthCount = this.sundayDate.slice(5,7) - 1;

      this.monthCount = this.fdweek.getMonth();
      this.newYr = this.fdweek.getFullYear();
    },
    
    methods: {
      //today's date funtion
      todayClick() {
        this.yearFilter = null;
        this.monthFilter = null;
        // this.locationFilter = null;
        // this.roomlocationFilter = null;
        this.nd = new Date();
        var currentDay = this.nd.getMonth();
        this.selectedYear = this.nd.getFullYear();
        this.newYr = this.nd.getFullYear();
        this.monthCount = this.nd.getMonth();
        Date.prototype.GetFirstDayOfWeek = function() {
          return (new Date(this.setDate(this.getDate() - this.getDay()+ (this.getDay() == 0 ? -6:1) )));
        }
        Date.prototype.getWeek = function() {
          var onejan = new Date(this.getFullYear(), 0, 1);
          return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        }
        let nav=0;var cnav=0;var inc=1;var dec=1;var wnav=0;var wlnav =0;
        var ndate = this.nd.getDate();
        var nday = this.nd.getDay();
        var weekOfMonth = Math.ceil((ndate - 1 - nday) / 7);
        nav = weekOfMonth;
        this.fdweek = this.nd.GetFirstDayOfWeek();
        this.getweekdt = this.nd.GetFirstDayOfWeek();
        this.startDate = new Date(this.nd.getFullYear(), 0, 1);
        this.weekdays = Math.floor((this.nd - this.startDate) / (24 * 60 * 60 * 1000));
        this.weekNumber = Math.ceil(this.weekdays / 7);
        const formatDate = new Intl.DateTimeFormat("en" , {day: "2-digit",month: "2-digit"});
        const headwdate = new Intl.DateTimeFormat("en" , {year: 'numeric', month: 'short', day: 'numeric' });
        const headwdateFull = new Intl.DateTimeFormat("en-CA" , {year: 'numeric', month: '2-digit', day: 'numeric' });
        var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        const dt = new Date();
        const year = dt.getFullYear();
        const month = dt.getMonth();
        const day = dt.getDate();
        const week =dt.getWeek();
        const firstDayOfMonth = new Date(year,month,1).toLocaleDateString('en-US',options); 
        const lastDayOfMonth = new Date(year,month+1,0).toLocaleDateString('en-US',options);
        var firstday = firstDayOfMonth.split(',')[0];
        var lastday = lastDayOfMonth.split(',')[0];
        var daytype = new Array('Mon','Tue','Wed','Thu','Fri','Sat','Sun');
        var i = daytype.indexOf(firstday);
        var j = daytype.indexOf(lastday)+1;
        var removefirst = daytype.slice(0, i);
        var removelast = daytype.slice(j, daytype.length);
        const firstweek = new Date(year,month,1).getWeek();
        const lastweek = new Date(year,month+1,0).getWeek();
        var used = new Date(year,month,1).getDay() + new Date(year,month+1,0).getDate();

        const fweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()));
        const lweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()+6));
        var fmondt = fweekdt.split(' ')[0];
        var lmondt = lweekdt.split(' ')[0];
        var fdaydt = fweekdt.split(' ')[1];
        fdaydt  = fdaydt.split(',')[0];
        var ldaydt = lweekdt.split(' ')[1];
        var fyeardt = fweekdt.split(',')[1];
        var lyeardt = lweekdt.split(',')[1];
        this.monday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate()));
        this.tuesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
        this.wednesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
        this.thursday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
        this.friday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
        this.saturday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
        this.sunday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

        this.mondayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() - 6 ));
        this.tuesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
        this.wednesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
        this.thursdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
        this.fridayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
        this.saturdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
        this.sundayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

        if(fyeardt == lyeardt && fmondt == lmondt){
          this.weekDisplay = (fmondt+" "+fdaydt+" - "+ldaydt+fyeardt);
        }
            if(fyeardt == lyeardt && fmondt != lmondt){
          this.weekDisplay = (fmondt+" "+fdaydt+" - "+lmondt+" "+ldaydt+fyeardt);
        }
            if(fyeardt != lyeardt && fmondt != lmondt){
          this.weekDisplay = (fweekdt+" - "+lweekdt);
        }
        this.fdweek.setDate(this.fdweek.getDate()-6);
        this.getweekdt.setDate(this.getweekdt.getDate()-6);
        this.fetchAppointmentsByTrainers();
        this.fetchAppointmentsByRooms();
        this.allObjectsMonth = this.allObjects[dt.getMonth()];
        this.allObjectsMonthPrev = this.allObjects[dt.getMonth() - 1];
        this.allObjectsMonthNext = this.allObjects[dt.getMonth() + 1];
        
        this.MondayDate = this.mondayDate.slice(8,10);
        this.TuesdayDate = this.tuesdayDate.slice(8,10);
        this.WednesdayDate = this.wednesdayDate.slice(8,10);
        this.ThursdayDate = this.thursdayDate.slice(8,10);
        this.FridayDate = this.fridayDate.slice(8,10);
        this.SatdayDate = this.saturdayDate.slice(8,10);
        this.SundayDate = this.sundayDate.slice(8,10);

        this.MondayMonthCount = this.mondayDate.slice(5,7) - 1;
        this.TuesdayMonthCount = this.tuesdayDate.slice(5,7) - 1;
        this.WednesdayMonthCount = this.wednesdayDate.slice(5,7) - 1;
        this.ThursdayMonthCount = this.thursdayDate.slice(5,7) - 1;
        this.FridayMonthCount = this.fridayDate.slice(5,7) - 1;
        this.SaturdayMonthCount = this.saturdayDate.slice(5,7) - 1;
        this.SundayMonthCount = this.sundayDate.slice(5,7) - 1;
      },

      //previous week funtion
      prevWeek() {
        if(this.weekNumber >= 1 ){
          var weekNumberNew = this.weekNumber - 1;
          this.nav++;
          this.weekNumber--;
	        if(nav == -1){
	          // nav = 4; 
            this.fdweek.setDate(this.fdweek.getDate() - 5);
	          this.getweekdt.setDate(this.getweekdt.getDate() - 5);
	          this.inc = 0;
	          this.dec = 1;
	          this.cnav--;
	        }else{
            this.fdweek.setDate(this.fdweek.getDate() - 7);
	          this.getweekdt.setDate(this.getweekdt.getDate() - 7);
            nav = 4;
	        }

          this.monday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate()));
          this.tuesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.friday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sunday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          this.mondayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() - 6 ));
          this.tuesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.fridayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sundayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          wnav =0;
          const fweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()));
          const lweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()+6));
          var fmondt = fweekdt.split(' ')[0];
          var lmondt = lweekdt.split(' ')[0];
          var fdaydt = fweekdt.split(' ')[1];
          fdaydt  = fdaydt.split(',')[0];
          var ldaydt = lweekdt.split(' ')[1];
          var fyeardt = fweekdt.split(',')[1];
          var lyeardt = lweekdt.split(',')[1];
          if(fyeardt == lyeardt && fmondt == lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+ldaydt+fyeardt);
          }
          if(fyeardt == lyeardt && fmondt != lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+lmondt+" "+ldaydt+fyeardt);
          }
          if(fyeardt != lyeardt && fmondt != lmondt){
            this.weekDisplay = (fweekdt+" - "+lweekdt);
          }
          if(fmondt == 'Jan'){
            fmondt = 0;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Feb'){
            fmondt = 1;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Mar'){
            fmondt = 2;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Apr'){
            fmondt = 3;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'May'){
            fmondt = 4;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Jun'){
            fmondt = 5;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Jul'){
            fmondt = 6;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Aug'){
            fmondt = 7;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Sep'){
            fmondt = 8;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Oct'){
            fmondt = 9;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Nov'){
            fmondt = 10;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Dec'){
            fmondt = 11;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else{}
          this.fdweek.setDate(this.fdweek.getDate()-6);
          this.getweekdt.setDate(this.getweekdt.getDate()-6);
          this.firstWeek = lyeardt;
          if (fyeardt == this.prevYear){
            this.firstDayOfPrevYear = new Date(this.prevYear, 0, 1);
            this.lastDayOfPrevYear = new Date(this.prevYear, 11, 31);
            this.startOfWeekPrevYear = this.firstDayOfPrevYear.getDay();
            this.endOfWeekPrevYear = this.lastDayOfPrevYear.getDay();
            this.totalDays = Math.round((this.lastDayOfPrevYear - this.firstDayOfPrevYear) / (1000 * 60 * 60 * 24)) + 1;
            this.weekNumber = Math.floor(this.totalDays / 7);
            const prevElement = document.getElementById("prevClick");
            prevElement.classList.add("stopClick");
          }else {
            const prevElement = document.getElementById("prevClick");
            prevElement.classList.remove("stopClick");
          }
          if(this.weekNumber < 1 ){
              this.weekNumber = 52;
              const prevElement = document.getElementById("prevClick");
              prevElement.classList.add("stopClick");
          }
        }else{}
        this.allObjectsMonth = this.allObjects[this.fdweek.getMonth()];
        this.allObjectsMonthPrev = this.allObjects[this.fdweek.getMonth() - 1];
        this.allObjectsMonthNext = this.allObjects[this.fdweek.getMonth() + 1];
        if(this.fdweek.getMonth() == 0){
          this.allObjectsMonthPrev = 0;
        }
        this.MondayDate = this.mondayDate.slice(8,10);
        this.TuesdayDate = this.tuesdayDate.slice(8,10);
        this.WednesdayDate = this.wednesdayDate.slice(8,10);
        this.ThursdayDate = this.thursdayDate.slice(8,10);
        this.FridayDate = this.fridayDate.slice(8,10);
        this.SatdayDate = this.saturdayDate.slice(8,10);
        this.SundayDate = this.sundayDate.slice(8,10);     
        
        this.MondayMonthCount = this.mondayDate.slice(5,7) - 1;
        this.TuesdayMonthCount = this.tuesdayDate.slice(5,7) - 1;
        this.WednesdayMonthCount = this.wednesdayDate.slice(5,7) - 1;
        this.ThursdayMonthCount = this.thursdayDate.slice(5,7) - 1;
        this.FridayMonthCount = this.fridayDate.slice(5,7) - 1;
        this.SaturdayMonthCount = this.saturdayDate.slice(5,7) - 1;
        this.SundayMonthCount = this.sundayDate.slice(5,7) - 1;

        this.monthCount = this.fdweek.getMonth();
        const nextElement = document.getElementById("nextClick");
        nextElement.classList.remove("stopClick");
      },

      //next week funtion
      nextWeek() {
        if(this.weekNumber >= 0 ){
          if(this.weekNumber >= 52 ){
            this.weekNumber = 0;
          }
          var weekNumberNew = this.weekNumber + 1;
          this.weekNumber++;
          nav++;
	        if(nav == wlnav){
	          nav = 0; 
	          this.fdweek.setDate(this.fdweek.getDate() - 5);
	          this.getweekdt.setDate(this.getweekdt.getDate() - 5);
	          dec = 0;inc = 1;
	          cnav++;
	        }else{
            this.fdweek.setDate(this.fdweek.getDate()+7);
	          this.getweekdt.setDate(this.getweekdt.getDate()+7);
	        }
          this.monday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate()));
          this.tuesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.friday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sunday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          this.mondayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() - 6 ));
          this.tuesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.fridayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sundayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          wnav =0;
          const fweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()));
          const lweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()+6));
          var fmondt = fweekdt.split(' ')[0];
          var lmondt = lweekdt.split(' ')[0];
          var fdaydt = fweekdt.split(' ')[1];
          fdaydt  = fdaydt.split(',')[0];
          var ldaydt = lweekdt.split(' ')[1];
          var fyeardt = fweekdt.split(',')[1];
          var lyeardt = lweekdt.split(',')[1];
          if(fyeardt == lyeardt && fmondt == lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+ldaydt+fyeardt);
          }
          if(fyeardt == lyeardt && fmondt != lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+lmondt+" "+ldaydt+fyeardt);
          }
          if(fyeardt != lyeardt && fmondt != lmondt){
            this.weekDisplay = (fweekdt+" - "+lweekdt);
          }
          
            this.firstWeek = fyeardt;
            this.firstDayOfNextYear = new Date(this.nextYear, 0, 1);
            this.lastDayOfNextYear = new Date(this.nextYear, 11, 31);
            this.startOfWeekNextYear = this.firstDayOfNextYear.getDay();
            this.endOfWeekNextYear = this.lastDayOfNextYear.getDay();
            this.totalDays = Math.round((this.lastDayOfNextYear - this.firstDayOfNextYear) / (1000 * 60 * 60 * 24)) + 1;
            this.totalWeeks = Math.floor(this.totalDays / 7);

            if (this.totalWeeks == this.weekNumber){
              const nextElement = document.getElementById("nextClick");
              nextElement.classList.add("stopClick");
            }else {
              const nextElement = document.getElementById("nextClick");
              nextElement.classList.remove("stopClick");
            }

          if(fmondt == 'Jan'){
            fmondt = 0;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Feb'){
            fmondt = 1;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Mar'){
            fmondt = 2;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Apr'){
            fmondt = 3;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'May'){
            fmondt = 4;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Jun'){
            fmondt = 5;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Jul'){
            fmondt = 6;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Aug'){
            fmondt = 7;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Sep'){
            fmondt = 8;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Oct'){
            fmondt = 9;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Nov'){
            fmondt = 10;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else if (fmondt == 'Dec'){
            fmondt = 11;
            this.allObjectsMonth = this.allObjects[fmondt];
          }else{}
          this.fdweek.setDate(this.fdweek.getDate()-6);
          this.getweekdt.setDate(this.getweekdt.getDate()-6);
        }else{}
        const prevElement = document.getElementById("prevClick");
        prevElement.classList.remove("stopClick");
        this.allObjectsMonth = this.allObjects[this.fdweek.getMonth()];
        this.allObjectsMonthPrev = this.allObjects[this.fdweek.getMonth() - 1];
        this.allObjectsMonthNext = this.allObjects[this.fdweek.getMonth() + 1];
        if(this.fdweek.getMonth() == 0){
          this.allObjectsMonthPrev = 0;
        }
        
        this.MondayDate = this.mondayDate.slice(8,10);
        this.TuesdayDate = this.tuesdayDate.slice(8,10);
        this.WednesdayDate = this.wednesdayDate.slice(8,10);
        this.ThursdayDate = this.thursdayDate.slice(8,10);
        this.FridayDate = this.fridayDate.slice(8,10);
        this.SatdayDate = this.saturdayDate.slice(8,10);
        this.SundayDate = this.sundayDate.slice(8,10);        

        this.MondayMonthCount = this.mondayDate.slice(5,7) - 1;
        this.TuesdayMonthCount = this.tuesdayDate.slice(5,7) - 1;
        this.WednesdayMonthCount = this.wednesdayDate.slice(5,7) - 1;
        this.ThursdayMonthCount = this.thursdayDate.slice(5,7) - 1;
        this.FridayMonthCount = this.fridayDate.slice(5,7) - 1;
        this.SaturdayMonthCount = this.saturdayDate.slice(5,7) - 1;
        this.SundayMonthCount = this.sundayDate.slice(5,7) - 1;
      },

      //change year filter funtion
      changeYear(){
        this.yearCount = this.yearsList.indexOf(this.yearFilter) - 1;
        if(this.yearCount == -1 ){
          this.monthCount = this.fdweek.getMonth();
          this.newYr = this.fdweek.getFullYear();
          this.todayClick();
        }
        else{
          this.newYr = this.yearFilter;
          this.selectedYear = this.newYr;
          this.nd = new Date(this.newYr,this.monthCount,1);
          let nav=0;var cnav=0;var inc=1;var dec=1;var wnav=0;var wlnav =0;
          var year = this.nd.getFullYear();
          var ndate = this.nd.getDate();
          var nday = this.nd.getDay();
          var weekOfMonth = Math.ceil((ndate - 1 - nday) / 7);
          nav = weekOfMonth;
          this.fdweek = this.nd.GetFirstDayOfWeek();
          this.getweekdt = this.nd.GetFirstDayOfWeek();
          var startDate = new Date(this.nd.getFullYear(), 0, 1);
          var days = Math.floor((this.nd - startDate) / (24 * 60 * 60 * 1000));
          this.weekNumber = Math.ceil(days / 7);

          this.monday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate()));
          this.tuesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.friday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sunday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          this.mondayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() - 6));
          this.tuesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.fridayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sundayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          const fweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()));
          const lweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()+6));
          var fmondt = fweekdt.split(' ')[0];
          var lmondt = lweekdt.split(' ')[0];
          var fdaydt = fweekdt.split(' ')[1];
          fdaydt  = fdaydt.split(',')[0];
          var ldaydt = lweekdt.split(' ')[1];
          var fyeardt = fweekdt.split(',')[1];
          var lyeardt = lweekdt.split(',')[1];
          this.fdweek.setDate(this.fdweek.getDate()-6);
          this.getweekdt.setDate(this.getweekdt.getDate()-6);
          if(fyeardt == lyeardt && fmondt == lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+ldaydt+fyeardt);
          }
          if(fyeardt == lyeardt && fmondt != lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+lmondt+" "+ldaydt+fyeardt);
          }
          if(fyeardt != lyeardt && fmondt != lmondt){
            this.weekDisplay = (fweekdt+" - "+lweekdt);
          }

          this.fetchAppointmentsByTrainers();
          this.fetchAppointmentsByRooms();
          this.allObjectsMonth = this.allObjects[this.fdweek.getMonth()];
          if(this.fdweek.getMonth() == 0){
            this.allObjectsMonthPrev = 0;
          } else{
            this.allObjectsMonthPrev = this.allObjects[this.fdweek.getMonth() - 1];
          }
          this.allObjectsMonthNext = this.allObjects[this.fdweek.getMonth() + 1];
        }
        
        this.MondayDate = this.mondayDate.slice(8,10);
        this.TuesdayDate = this.tuesdayDate.slice(8,10);
        this.WednesdayDate = this.wednesdayDate.slice(8,10);
        this.ThursdayDate = this.thursdayDate.slice(8,10);
        this.FridayDate = this.fridayDate.slice(8,10);
        this.SatdayDate = this.saturdayDate.slice(8,10);
        this.SundayDate = this.sundayDate.slice(8,10);        

        this.MondayMonthCount = this.mondayDate.slice(5,7) - 1;
        this.TuesdayMonthCount = this.tuesdayDate.slice(5,7) - 1;
        this.WednesdayMonthCount = this.wednesdayDate.slice(5,7) - 1;
        this.ThursdayMonthCount = this.thursdayDate.slice(5,7) - 1;
        this.FridayMonthCount = this.fridayDate.slice(5,7) - 1;
        this.SaturdayMonthCount = this.saturdayDate.slice(5,7) - 1;
        this.SundayMonthCount = this.sundayDate.slice(5,7) - 1;

        if(this.weekNumber == 52 || this.weekNumber == 53){
            const prevElement = document.getElementById("prevClick");
            prevElement.classList.add("stopClick");
        }else{
          const prevElement = document.getElementById("prevClick");
          prevElement.classList.remove("stopClick");
          const nextElement = document.getElementById("nextClick");
          nextElement.classList.remove("stopClick");
        }
        if(this.weekNumber == 0){
          this.weekNumber = 1;
        }
      },  

      //change month filter funtion
      changeMonth() {
        this.monthCount = this.monthsList.indexOf(this.monthFilter) - 1;
        if(this.monthCount == -1 ){
          this.monthCount = this.fdweek.getMonth();
          this.newYr = this.fdweek.getFullYear();
          this.todayClick();
        }else if(this.monthCount == 4 ){
          this.nd = new Date(this.newYr,4,5);
          let nav=0;var cnav=0;var inc=1;var dec=1;var wnav=0;var wlnav =0;
          var year = this.nd.getFullYear();
          var ndate = this.nd.getDate();
          var nday = this.nd.getDay();
          var weekOfMonth = Math.ceil((ndate - 1 - nday) / 7);
          nav = weekOfMonth;
          this.fdweek = this.nd.GetFirstDayOfWeek();
          this.getweekdt = this.nd.GetFirstDayOfWeek();
          var startDate = new Date(this.nd.getFullYear(), 0, 1);
          var days = Math.floor((this.nd - startDate) / (24 * 60 * 60 * 1000));
          this.weekNumber = Math.ceil(days / 7);

          this.monday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate()));
          this.tuesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.friday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sunday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          this.mondayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() - 6 ));
          this.tuesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.fridayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sundayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          const fweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()));
          const lweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()+6));
          var fmondt = fweekdt.split(' ')[0];
          var lmondt = lweekdt.split(' ')[0];
          var fdaydt = fweekdt.split(' ')[1];
          fdaydt  = fdaydt.split(',')[0];
          var ldaydt = lweekdt.split(' ')[1];
          var fyeardt = fweekdt.split(',')[1];
          var lyeardt = lweekdt.split(',')[1];
          this.fdweek.setDate(this.fdweek.getDate()-6);
          this.getweekdt.setDate(this.getweekdt.getDate()-6);
          if(fyeardt == lyeardt && fmondt == lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+ldaydt+fyeardt);
          }
          if(fyeardt == lyeardt && fmondt != lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+lmondt+" "+ldaydt+fyeardt);
          }
          if(fyeardt != lyeardt && fmondt != lmondt){
            this.weekDisplay = (fweekdt+" - "+lweekdt);
          }
        }else if(this.monthCount == 9 ){
          this.nd = new Date(this.newYr,9,0);
          let nav=0;var cnav=0;var inc=1;var dec=1;var wnav=0;var wlnav =0;
          var year = this.nd.getFullYear();
          var ndate = this.nd.getDate();
          var nday = this.nd.getDay();
          var weekOfMonth = Math.ceil((ndate - 1 - nday) / 7);
          nav = weekOfMonth;
          this.fdweek = this.nd.GetFirstDayOfWeek();
          this.getweekdt = this.nd.GetFirstDayOfWeek();
          var startDate = new Date(this.nd.getFullYear(), 0, 1);
          var days = Math.floor((this.nd - startDate) / (24 * 60 * 60 * 1000));
          this.weekNumber = Math.ceil(days / 7);

          this.monday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate()));
          this.tuesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.friday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sunday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          this.mondayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() - 6 ));
          this.tuesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.fridayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sundayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          const fweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()));
          const lweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()+6));
          var fmondt = fweekdt.split(' ')[0];
          var lmondt = lweekdt.split(' ')[0];
          var fdaydt = fweekdt.split(' ')[1];
          fdaydt  = fdaydt.split(',')[0];
          var ldaydt = lweekdt.split(' ')[1];
          var fyeardt = fweekdt.split(',')[1];
          var lyeardt = lweekdt.split(',')[1];
          this.fdweek.setDate(this.fdweek.getDate()-6);
          this.getweekdt.setDate(this.getweekdt.getDate()-6);
          if(fyeardt == lyeardt && fmondt == lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+ldaydt+fyeardt);
          }
          if(fyeardt == lyeardt && fmondt != lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+lmondt+" "+ldaydt+fyeardt);
          }
          if(fyeardt != lyeardt && fmondt != lmondt){
            this.weekDisplay = (fweekdt+" - "+lweekdt);
          }
        }else{
          
          this.nd = new Date(this.newYr,this.monthCount,1);
          let nav=0;var cnav=0;var inc=1;var dec=1;var wnav=0;var wlnav =0;
          var year = this.nd.getFullYear();
          var ndate = this.nd.getDate();
          var nday = this.nd.getDay();
          var weekOfMonth = Math.ceil((ndate - 1 - nday) / 7);
          nav = weekOfMonth;
          this.fdweek = this.nd.GetFirstDayOfWeek();
          this.getweekdt = this.nd.GetFirstDayOfWeek();
          var startDate = new Date(this.nd.getFullYear(), 0, 1);
          var days = Math.floor((this.nd - startDate) / (24 * 60 * 60 * 1000));
          this.weekNumber = Math.ceil(days / 7);

          this.monday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate()));
          this.tuesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.friday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sunday = formatDate.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          this.mondayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() - 6 ));
          this.tuesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.wednesdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.thursdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.fridayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.saturdayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));
          this.sundayDate = headwdateFull.format(this.fdweek.setDate(this.fdweek.getDate() + 1 ));

          const fweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()));
          const lweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()+6));
          var fmondt = fweekdt.split(' ')[0];
          var lmondt = lweekdt.split(' ')[0];
          var fdaydt = fweekdt.split(' ')[1];
          fdaydt  = fdaydt.split(',')[0];
          var ldaydt = lweekdt.split(' ')[1];
          var fyeardt = fweekdt.split(',')[1];
          var lyeardt = lweekdt.split(',')[1];
          this.fdweek.setDate(this.fdweek.getDate()-6);
          this.getweekdt.setDate(this.getweekdt.getDate()-6);
          if(fyeardt == lyeardt && fmondt == lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+ldaydt+fyeardt);
          }
          if(fyeardt == lyeardt && fmondt != lmondt){
            this.weekDisplay = (fmondt+" "+fdaydt+" - "+lmondt+" "+ldaydt+fyeardt);
          }
          if(fyeardt != lyeardt && fmondt != lmondt){
            this.weekDisplay = (fweekdt+" - "+lweekdt);
          }

          this.fetchAppointmentsByTrainers();
          this.fetchAppointmentsByRooms();
          this.allObjectsMonth = this.allObjects[this.fdweek.getMonth()];
          this.allObjectsMonthPrev = this.allObjects[this.fdweek.getMonth() - 1];
          this.allObjectsMonthNext = this.allObjects[this.fdweek.getMonth() + 1];
          if(this.fdweek.getMonth() == 0){
            this.allObjectsMonthPrev = 0;
          }
        
          this.MondayDate = this.mondayDate.slice(8,10);
          this.TuesdayDate = this.tuesdayDate.slice(8,10);
          this.WednesdayDate = this.wednesdayDate.slice(8,10);
          this.ThursdayDate = this.thursdayDate.slice(8,10);
          this.FridayDate = this.fridayDate.slice(8,10);
          this.SatdayDate = this.saturdayDate.slice(8,10);
          this.SundayDate = this.sundayDate.slice(8,10);

          this.MondayMonthCount = this.mondayDate.slice(5,7) - 1;
          this.TuesdayMonthCount = this.tuesdayDate.slice(5,7) - 1;
          this.WednesdayMonthCount = this.wednesdayDate.slice(5,7) - 1;
          this.ThursdayMonthCount = this.thursdayDate.slice(5,7) - 1;
          this.FridayMonthCount = this.fridayDate.slice(5,7) - 1;
          this.SaturdayMonthCount = this.saturdayDate.slice(5,7) - 1;
          this.SundayMonthCount = this.sundayDate.slice(5,7) - 1;

          if(this.weekNumber == 52 || this.weekNumber == 53){
            const prevElement = document.getElementById("prevClick");
            prevElement.classList.add("stopClick");
          }else {
            const prevElement = document.getElementById("prevClick");
            prevElement.classList.remove("stopClick");
            const nextElement = document.getElementById("nextClick");
            nextElement.classList.remove("stopClick");
          }
        }
        
        if(this.weekNumber == 0){
          this.weekNumber = 1;
        }
      },

      //change trainerType filter funtion
      changeTrainerType(){
        this.trainersFilterEdited = this.trainersFilter.replaceAll(' ','');
      },

      onChangeSwitchCalendar(){
        this.value = true;
        if(this.value == true){
          this.$router.push('/sales-calendar');
        }
      },
      //new functions end

      onError(err) {
        if (err.response != null && err.response.data != null) {
          this.$noty.error(err.response.data);
        } else {
          console.error(err);
        }
      },

      lowerCaseMapKeys(map){
        for (var key in map) {
          if (map.hasOwnProperty(key)) {
            if(key == key.toUpperCase()) continue;
            map[key.toUpperCase()] = map[key];
            delete map[key];
          }
        }
      },

      fetchAppointments(){
        this.fetchAppointmentsByTrainers();
        this.fetchAppointmentsByRooms();
      },

      fetchAppointmentsByTrainers(){
        var _this = this;
        progressIndicator.hidden = false;
        this.$axios
          .get("/api/calendar/trainer/" + this.selectedYear)
          .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
              const monat = response.data[i];
              _this.allObjects[i].trainerAppointments = monat.trainerAppointments;
              for (let j = 0; j < monat.trainerAppointments.length && i == 0; j++) {
                _this.locationsList.push(monat.trainerAppointments[j].trainerLocation);
              }
            }
          })
          .catch(this.onError)
          .finally (function(){
            setTimeout(function(){
              progressIndicator.hidden = true;
            }, 7000);
          });
      },

      fetchAppointmentsByRooms(){
        var _this = this;
        progressIndicator.hidden = false;
        this.$axios
          .get("/api/calendar/room/" + this.selectedYear)
          .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
              const monat = response.data[i];
              _this.allObjects[i].roomAppointments = monat.roomAppointments;
              for (let j = 0; j < monat.roomAppointments.length && i == 0; j++) {
                _this.roomslocationsList.push(monat.roomAppointments[j].roomLocation);
                console.log(_this.roomslocationsList);
              }
            }
          })
          .catch(this.onError)
          .finally (function(){
            setTimeout(function(){
              progressIndicator.hidden = true;
            }, 7000);
          });
      },

      fetchAppointmentTypes() {
        var _this = this;
        this.$axios
          .get("/api/calendar/types")
          .then(function (response) {
            const types = response.data;
            for (let i = 0; i < types.length; i++) {
              const type = types[i];
              if(type == "TRAINING_AS_PARTICIPANT") continue;
              if(type == "TRAINING_AS_TRAINER") continue;
              _this.appointmentTypes.push({
                text: _this.$t("appointment_type_" + type.toLowerCase()),
                value: type
              })
            }
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
              console.log(element.fullname);
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

      onFinally(){
        showLoadingCircle(false);
      },

      // Date Functions
      getWeekdayName(month, day){
        const year = this.selectedYear;
        var dt = new Date(year, month, day);
        return this.$t(this.weekdays[dt.getDay()]);
      },
      getWeekdayNumber(month, day){
        const year = this.selectedYear;
        var dt = new Date(year, month, day);
        return dt.getDay();
      },
      getWeekOfYear(month, day){
        const year = this.selectedYear;
        const dt = new Date(year, month, day);
        const oneJan = new Date(year, 0, 0);
        const numberofDays = Math.floor((dt - oneJan) / (24*60*60*1000))
        const week = Math.floor(((dt - oneJan) / 86400000));
        const result = Math.ceil(week / 7);
        // if(week -1 == 0){
        //   return week;
        // }
        return result;
      },
      isNextMonth(monthToCheck, day){
        var dt = new Date(this.selectedYear, monthToCheck, day);
        if(dt.getMonth() != monthToCheck) return true;
        return false;
      },
      getDaysInMonth (month) {
        return new Date(this.selectedYear, month, 0).getDate();
      },
      getDay(date){
        return new Date(date).getDate();
      },
      getMonth(date){
        return new Date(date).getMonth();
      },
      getYear(date){
        return new Date(date).getYear();
      },
      dateEquals(date, day, month){
        return this.getDay(date) == day && this.getMonth(date) == month;
      },
      getAppointment(trainerAppointment, day, month){
        return trainerAppointment.daysWithAppointments[day - 1].appointment;
        //console.log(trainerAppointment.daysWithAppointments[day - 1].appointment);
      },

      previousYearClicked(){
        this.selectedYear--;
        this.fetchAppointments();
      },
      nextYearClicked(){
        this.selectedYear++;
        this.fetchAppointments();
      },

      appointmentClicked(appointmentOnDay){
        if(!appointmentOnDay.clickable) return;
        if(appointmentOnDay.type == "TRAINING_AS_TRAINER" || appointmentOnDay.type == "ROOM_BLOCKED"){
          this.$router.push("/edit-training-event?trainingEventId=" + appointmentOnDay.reference);
        }
      },

      calendarDayClicked(reference, day, month, mode = "TRAINER", appointmentOnDay){
        if(!this.$rights.includes("CREATE_APPOINTMENT")) return;
        if(this.isNextMonth(month, day)) return;
        this.clearAppointment();
        
        // Open Dialog and Set Type
        this.openAddDialog = true;
        this.dialog.type = mode;

        if(mode == "ROOM"){
          this.appointment.type = "ROOM_BLOCKED";
          this.appointment.reference = reference;
        }
        
        const selectedMonthReadable = month + 1;
        const dayString = day < 10 ? "0" + day : day;
        const monthString = selectedMonthReadable < 10 ? "0" + selectedMonthReadable : selectedMonthReadable;
        const fullDateString = this.selectedYear + "-" + monthString + "-" + dayString;
        this.appointment.start = fullDateString + "T00:00:00";
        this.appointment.end = fullDateString + "T23:59:59";
        this.appointment.userReference = mode == "TRAINER" ? reference : null;
        
        // Show edit Dialog
        if(appointmentOnDay != null){
          this.appointment.id = appointmentOnDay.id;
          this.appointment.start = appointmentOnDay.start;
          this.appointment.end = appointmentOnDay.end;
          this.appointment.userReference = appointmentOnDay.userReference;
          this.appointment.type = appointmentOnDay.type;
          this.appointment.description = appointmentOnDay.description;
          this.appointment.clickable = appointmentOnDay.clickable;

          // Check if Edit Dialog shall be shown
          if(this.appointment.type == "TRAINING_AS_TRAINER" || (this.appointment.type == "ROOM_BLOCKED" && this.appointment.userReference == null)){
            this.openAddDialog = false;
          }
        }
        this.$forceUpdate();
      },

      clearAppointment(){
        this.appointment = {
          id: null,
          start: null,
          end: null,
          userReference: null,
          description: null,
        };
      },

      saveAppointment(){
        var _this = this;
        var appointment = Object.assign({}, this.appointment);

        if(typeof appointment.start == "string" && appointment.start.length < 11){
          appointment.start = appointment.start + "T00:00:00";
        }
        if(typeof appointment.end == "string" && appointment.end.length < 11){
          appointment.end = appointment.end + "T23:59:59";
        }

        console.log(this.appointment);
        if(appointment.id == null){
          progressIndicator.hidden = false;  
          document.getElementById('loadingCircle').classList.add('zIndex');
          this.$axios
            .post("/api/calendar/create", appointment)
            .then(function (response) {
              _this.openAddDialog = false;
              _this.$noty.success(_this.$t("appointment_saved"));
              // _this.fetchAppointments();
              _this.fetchAppointmentsByTrainers();
              _this.fetchAppointmentsByRooms();
              document.getElementById('loadingCircle').classList.remove('zIndex');
            })
            .catch(this.onError)
            .finally (function(){
              progressIndicator.hidden = true;
            });
        }else{
          progressIndicator.hidden = false;  
          document.getElementById('loadingCircle').classList.add('zIndex');
          this.$axios
            .put("/api/calendar/" + appointment.id, appointment)
            .then(function (response) {
              _this.openAddDialog = false;
              _this.$noty.success(_this.$t("appointment_edited"));
              // _this.fetchAppointments();
              _this.fetchAppointmentsByTrainers();
              _this.fetchAppointmentsByRooms();
              document.getElementById('loadingCircle').classList.remove('zIndex');
            })
            .catch(this.onError)
            .finally (function(){
              progressIndicator.hidden = true;
            });
        }
      },

      deleteAppointment(){
        var _this = this;
        progressIndicator.hidden = false;
        document.getElementById('loadingCircle').classList.add('zIndex');

        var appointment = Object.assign({}, this.appointment);

        console.log(this.appointment);

        this.$axios
          .delete("/api/calendar/" + appointment.id)
          .then(function (response) {
            _this.openAddDialog = false;
            _this.$noty.success(_this.$t("appointment_deleted"));
            _this.fetchAppointments();
            document.getElementById('loadingCircle').classList.remove('zIndex');
          })
          .catch(this.onError)
          .finally (function(){
            progressIndicator.hidden = true;
          });
      },

      getTrainerById(trainerId){
        if(trainerId == null) return {};
        if(isNaN(trainerId)) return trainerId;
        for (let i = 0; i < this.trainers.length; i++) {
          const trainer = this.trainers[i];
          if(trainer.id == trainerId) return trainer;
        }
        console.warn("Trainer with Id " + trainerId + " not found.");
        return {};
      }

    }
}
</script>