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
    <div class="weekviewcontainerWrap">
      <div id="grouphead">
        <div class="left-group">
          <button class="today_btn" @click="todayClick()">Today</button>
          <button class="btn btn-info btn-arrow wpreviousBtn" @click="prevWeek()">
            <v-icon>fa-solid fa-chevron-left</v-icon>
          </button>
          <button class="btn btn-info btn-arrow wnextBtn" @click="nextWeek()">
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
              :label="$t('View all location')">
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
              :label="$t('View all trainers')">
                <template v-slot:append></template>
            </v-autocomplete>
          </div>
        </div>
      </div>
      <table>
        <thead>
            <tr class="weekhead">
              <th>Date</th>
              <th class="title" data-name="Mon" v-bind:data-value="mondayDate">{{ monday }}</th>
              <th class="title" data-name="Tue" v-bind:data-value="tuesdayDate">{{ tuesday }}</th>
              <th class="title" data-name="Wed" v-bind:data-value="wednesdayDate">{{ wednesday }}</th>
              <th class="title" data-name="Thu" v-bind:data-value="thursdayDate">{{ thursday }}</th>
              <th class="title" data-name="Fri" v-bind:data-value="fridayDate">{{ friday }}</th>
              <th class="title redColor" data-name="Sat" v-bind:data-value="saturdayDate">{{ saturday }}</th>
              <th class="title redColor" data-name="Sun" v-bind:data-value="sundayDate">{{ sunday }}</th>
          </tr>
          <tr>
              <th></th>
              <th class="one" data-week='0' data-name="Mon">Monday</th>
              <th class="one" data-week='0' data-name="Tue">Tuesday</th>
              <th class="one" data-week='0' data-name="Wed">Wednesday</th>
              <th class="one" data-week='0' data-name="Thu">Thursday</th>
              <th class="one" data-week='0' data-name="Fri">Friday</th>
              <th class="one redColor" data-week='0' data-name="Sat">Saturday</th>
              <th class="one redColor"  data-week='0' data-name="Sun">Sunday</th>
            </tr>
            <tr>
              <th>KW</th>
              <th id="weekNumber" v-bind:title="weekNumber">{{ weekNumber }}</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
          </tr>
        </thead>
        <tbody v-bind:class="locationFilter">
          <tr class="calendar-content-row" v-for="trainerAppointment in allObjectsMonth.trainerAppointments" >
            <td>
              <div class="bg-beige">
                <p class="trainerName">{{ getTrainerById(trainerAppointment.trainer).fullname }}</p>
                <p class="trainerType">Full-time</p>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, 'TRAINER', trainerAppointment.daysWithAppointments.appointment)">
              <div v-for="day in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
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
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                      <div class="traningData lightblue_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                      <div class="traningData purple_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'SERVICE'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                      <div class="traningData white_traning">
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
                  </div>
                </div>
                <span v-else>&nbsp;</span>      
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, 'TRAINER', trainerAppointment.daysWithAppointments.appointment)">
              <div v-for="day in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
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
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                      <div class="traningData lightblue_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                      <div class="traningData purple_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'SERVICE'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                      <div class="traningData white_traning">
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
                  </div>
                </div>
                <span v-else>&nbsp;</span>      
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, 'TRAINER', trainerAppointment.daysWithAppointments.appointment)">
              <div v-for="day in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
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
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                      <div class="traningData lightblue_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                      <div class="traningData purple_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'SERVICE'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                      <div class="traningData white_traning">
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
                  </div>
                </div>
                <span v-else>&nbsp;</span>      
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, 'TRAINER', trainerAppointment.daysWithAppointments.appointment)">
              <div v-for="day in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
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
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                      <div class="traningData lightblue_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                      <div class="traningData purple_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'SERVICE'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                      <div class="traningData white_traning">
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
                  </div>
                </div>
                <span v-else>&nbsp;</span>      
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, 'TRAINER', trainerAppointment.daysWithAppointments.appointment)">
              <div v-for="day in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
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
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                      <div class="traningData lightblue_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                      <div class="traningData purple_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'SERVICE'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                      <div class="traningData white_traning">
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
                  </div>
                </div>
                <span v-else>&nbsp;</span>      
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, 'TRAINER', trainerAppointment.daysWithAppointments.appointment)">
              <div v-for="day in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
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
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                      <div class="traningData lightblue_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                      <div class="traningData purple_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'SERVICE'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                      <div class="traningData white_traning">
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
                  </div>
                </div>
                <span v-else>&nbsp;</span>      
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, 'TRAINER', trainerAppointment.daysWithAppointments.appointment)">
              <div v-for="day in trainerAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
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
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                      <div class="traningData lightblue_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                      <div class="traningData purple_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'SERVICE'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                    <div v-show="appointmentOnDay.type == 'HOLIDAY'">
                      <div class="traningData white_traning">
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
                  </div>
                </div>
                <span v-else>&nbsp;</span>      
              </div>
            </td>
          </tr>
          <tr class="calendar-content-row location" v-for="roomAppointment in allObjectsMonth.roomAppointments" v-bind:class="roomAppointment.room.location.country">
            <td>
              <div class="bg-beige">
                <p class="trainerName">{{ roomAppointment.room.designation }}</p>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, 'ROOM', roomAppointment.daysWithAppointments.appointment)">
              <div v-for="day in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
                  <div class="checkItem" v-if="mondayDate == appointmentDate">
                    <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span v-else>&nbsp;</span>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, 'ROOM', roomAppointment.daysWithAppointments.appointment)">
              <div v-for="day in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
                  <div class="checkItem" v-if="tuesdayDate == appointmentDate">
                    <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                      <div class="traningData white_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span v-else>&nbsp;</span>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, 'ROOM', roomAppointment.daysWithAppointments.appointment)">
              <div v-for="day in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
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
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, 'ROOM', roomAppointment.daysWithAppointments.appointment)">
              <div v-for="day in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
                  <div class="checkItem" v-if="thursdayDate == appointmentDate">
                    <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                      <div class="traningData purple_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span v-else>&nbsp;</span>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, 'ROOM', roomAppointment.daysWithAppointments.appointment)">
              <div v-for="day in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
                  <div class="checkItem" v-if="fridayDate == appointmentDate">
                    <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span v-else>&nbsp;</span>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, 'ROOM', roomAppointment.daysWithAppointments.appointment)">
              <div v-for="day in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
                  <div class="checkItem" v-if="saturdayDate == appointmentDate">
                    <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                      <div class="traningData purple_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span v-else>&nbsp;</span>
              </div>
            </td>
            <td class="bg-beige calendar-day" @click.stop="calendarDayClicked(roomAppointment.room.id, 'ROOM', roomAppointment.daysWithAppointments.appointment)">
              <div v-for="day in roomAppointment.daysWithAppointments" :set="appointmentOnDay = day.appointment">
                <div v-if="appointmentOnDay != null" v-bind:data-date="appointmentOnDay.start.slice(0, 10)" :set="appointmentDate = appointmentOnDay.start.slice(0, 10)">
                  <div class="checkItem" v-if="sundayDate == appointmentDate">
                    <div v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                      <div class="traningData pink_traning">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <div v-html="appointmentOnDay.description"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span v-else>&nbsp;</span>
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
          <v-btn @click="deleteAppointment()" v-show="!appointment.clickable && appointment.id != null" outlined depressed tile class="savebutton mr-2 mb-2 bg-white color-blue">{{ $t("delete") }}</v-btn>
          <v-btn @click="openAddDialog = false" outlined depressed tile class="savebutton mr-2 mb-2 bg-white color-blue">{{ $t("cancel") }}</v-btn>
          <v-btn @click="saveAppointment()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("save") }}</v-btn>
        </v-card-actions>
      </v-dialog>
    </div>    
  </div>
</div>
</template>

<script>
    var nd = new Date();
    Date.prototype.GetFirstDayOfWeek = function() {
      return (new Date(this.setDate(this.getDate() - this.getDay()+ (this.getDay() == 0 ? -7:1) )));
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
    const headwdateFull = new Intl.DateTimeFormat("en-CA" , {year: 'numeric', month: '2-digit', day: '2-digit' });
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
    var numofweeks = Math.ceil( used / 7);

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
        locationsList: ["View all locations", "Germany", "Austria", "Poland"],
        trainersFilter: [],
        trainersList: ["View all Trainers", "Full Time", "Part Time"],

        allObjects: [],
        
        appointmentTypes: [],

        debug: false, // TODO Delete me

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
        allObjectsMonth: [],
        nd: new Date(),
        fdweek : null,
        getweekdt : null,
      }
    },
    
    mounted(){
      this.fdweek = this.nd.GetFirstDayOfWeek();
      this.getweekdt = this.nd.GetFirstDayOfWeek();
      for (let i = 0; i <= 12; i++) {
        this.allObjects.push({
            month: i,
            trainerAppointments: [],
            roomAppointments: [],
        });
      }
      this.allObjectsMonth = this.allObjects[dt.getMonth()];
      console.log(this.allObjects);
      console.log(this.allObjectsMonth);
      
      this.currentDay = new Date().getDate();
      this.currentMonth = new Date().getMonth();
      this.selectedYear = new Date().getFullYear();
      
      this.fetchAppointments();
      this.fetchTrainers();
      this.fetchAppointmentTypes();

      // var monthCounter = 0;
      // var i = 0;
      // while (i <= 12) {
      //   this.months.push(monthCounter);
      //   i++;
      //   monthCounter++;
      //   if(monthCounter > 12) monthCounter = 0;
      // }

      this.weekNumber = Math.ceil(days / 7);
      this.monday = formatDate.format(fdweek.setDate(fdweek.getDate()));
      this.tuesday = formatDate.format(fdweek.setDate(fdweek.getDate() + 1 ));
      this.wednesday = formatDate.format(fdweek.setDate(fdweek.getDate() + 1 ));
      this.thursday = formatDate.format(fdweek.setDate(fdweek.getDate() + 1 ));
      this.friday = formatDate.format(fdweek.setDate(fdweek.getDate() + 1 ));
      this.saturday = formatDate.format(fdweek.setDate(fdweek.getDate() + 1 ));
      this.sunday = formatDate.format(fdweek.setDate(fdweek.getDate() + 1 ));

      this.mondayDate = headwdateFull.format(fdweek.setDate(fdweek.getDate() - 6 ));
      this.tuesdayDate = headwdateFull.format(fdweek.setDate(fdweek.getDate() + 1 ));
      this.wednesdayDate = headwdateFull.format(fdweek.setDate(fdweek.getDate() + 1 ));
      this.thursdayDate = headwdateFull.format(fdweek.setDate(fdweek.getDate() + 1 ));
      this.fridayDate = headwdateFull.format(fdweek.setDate(fdweek.getDate() + 1 ));
      this.saturdayDate = headwdateFull.format(fdweek.setDate(fdweek.getDate() + 1 ));
      this.sundayDate = headwdateFull.format(fdweek.setDate(fdweek.getDate() + 1 ));

      if(fyeardt == lyeardt && fmondt == lmondt){
        this.weekDisplay = (fmondt+" "+fdaydt+" - "+ldaydt+fyeardt);
      }
          if(fyeardt == lyeardt && fmondt != lmondt){
        this.weekDisplay = (fmondt+" "+fdaydt+" - "+lmondt+" "+ldaydt+fyeardt);
      }
          if(fyeardt != lyeardt && fmondt != lmondt){
        this.weekDisplay = (fweekdt+" - "+lweekdt);
      }
    },
    
    methods: {

      //new functions start
      todayClick() {
        this.nd = new Date();
        var currentDay = nd.getMonth();
        this.allObjectsMonth = this.allObjects[currentDay];
        Date.prototype.GetFirstDayOfWeek = function() {
          return (new Date(this.setDate(this.getDate() - this.getDay()+ (this.getDay() == 0 ? -7:1) )));
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
        var startDate = new Date(this.nd.getFullYear(), 0, 1);
        var days = Math.floor((nd - startDate) / (24 * 60 * 60 * 1000));
        const formatDate = new Intl.DateTimeFormat("en" , {day: "2-digit",month: "2-digit"});
        const headwdate = new Intl.DateTimeFormat("en" , {year: 'numeric', month: 'short', day: 'numeric' });
        const headwdateFull = new Intl.DateTimeFormat("en-CA" , {year: 'numeric', month: '2-digit', day: '2-digit' });
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
        var numofweeks = Math.ceil( used / 7);

        const fweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()));
        const lweekdt = headwdate.format(this.getweekdt.setDate(this.getweekdt.getDate()+6));
        var fmondt = fweekdt.split(' ')[0];
        var lmondt = lweekdt.split(' ')[0];
        var fdaydt = fweekdt.split(' ')[1];
        fdaydt  = fdaydt.split(',')[0];
        var ldaydt = lweekdt.split(' ')[1];
        var fyeardt = fweekdt.split(',')[1];
        var lyeardt = lweekdt.split(',')[1];
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
      },
      prevWeek() {
        if(this.weekNumber > 1 ){
          var weekNumberNew = this.weekNumber - 1;
          this.weekNumber--;
          this.nav++;
	        if(nav == -1){
	          // nav = 4; 
            this.fdweek.setDate(this.fdweek.getDate() - 5);
	          this.getweekdt.setDate(this.getweekdt.getDate() - 5);
	          this.inc = 0;
	          this.dec = 1;
	          this.cnav--;
	        }else{
            this.fdweek.setDate(this.fdweek.getDate() - 7)
	          this.getweekdt.setDate(this.getweekdt.getDate() - 7)
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
        }else{}
      },

      nextWeek() {
        if(this.weekNumber >= 1 ){
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
      },

      changeYear(){
        this.yearCount = this.yearsList.indexOf(this.yearFilter) - 1;
        if(this.yearCount == -1 ){
          this.todayClick();
        }else{
        var newYr = this.yearFilter;
        this.selectedYear = newYr;
        this.fdweek.getDate();
        // fetchAppointments();
        this.nd.setYear(newYr,0,0);
        Date.prototype.GetFirstDayOfWeek = function() {
          return (new Date(this.setDate(this.getDate() - this.getDay()+ (this.getDay() == 0 ? -7:1) )));
        }
        Date.prototype.getWeek = function() {
          var onejan = new Date(this.getFullYear(), 0, 1);
          return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        }
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
        }
      },  

      changeMonth() {
        this.monthCount = this.monthsList.indexOf(this.monthFilter) - 1;
        // alert(this.monthCount);
        if(this.monthCount == -1 ){
          this.todayClick();
        }else if(this.monthCount == 4 ){
          this.nd.setMonth(4,2);
          Date.prototype.GetFirstDayOfWeek = function() {
          return (new Date(this.setDate(this.getDate() - this.getDay()+ (this.getDay() == 0 ? -7:1) )));
        }
        Date.prototype.getWeek = function() {
          var onejan = new Date(this.getFullYear(), 0, 1);
          return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        }
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
        this.nd.setMonth(this.monthCount,0);
        Date.prototype.GetFirstDayOfWeek = function() {
          return (new Date(this.setDate(this.getDate() - this.getDay()+ (this.getDay() == 0 ? -7:1) )));
        }
        Date.prototype.getWeek = function() {
          var onejan = new Date(this.getFullYear(), 0, 1);
          return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        }
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
        this.$axios
          .get("/api/calendar/trainer/" + this.selectedYear)
          .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
              const monat = response.data[i];
              _this.allObjects[i].trainerAppointments = monat.trainerAppointments;
            }
          })
          .catch(this.onError);
      },

      fetchAppointmentsByRooms(){
        var _this = this;
        this.$axios
          .get("/api/calendar/room/" + this.selectedYear)
          .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
              const monat = response.data[i];
              _this.allObjects[i].roomAppointments = monat.roomAppointments;
            }
          })
          .catch(this.onError);
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

      calendarDayClicked(reference, mode = "TRAINER", appointmentOnDay){
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
          this.$axios
            .post("/api/calendar/create", appointment)
            .then(function (response) {
              _this.openAddDialog = false;
              _this.$noty.success(_this.$t("appointment_saved"));
              _this.fetchAppointments();
            })
            .catch(this.onError);
        }else{
          this.$axios
            .put("/api/calendar/" + appointment.id, appointment)
            .then(function (response) {
              _this.openAddDialog = false;
              _this.$noty.success(_this.$t("appointment_edited"));
              _this.fetchAppointments();
            })
            .catch(this.onError);
        }
      },

      deleteAppointment(){
        var _this = this;

        var appointment = Object.assign({}, this.appointment);

        console.log(this.appointment);

        this.$axios
          .delete("/api/calendar/" + appointment.id)
          .then(function (response) {
            _this.openAddDialog = false;
            _this.$noty.success(_this.$t("appointment_deleted"));
            _this.fetchAppointments();
          })
          .catch(this.onError);
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
