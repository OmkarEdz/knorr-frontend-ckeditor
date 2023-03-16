<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/calendar.jpg')">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("schedule overview") }}</div>
      </div>
    </div>
  </div>
  <div class="pl-md-12 pa-8">
    <div class="row disablerow align-items-start justify-content-end">
      <!-- Left Area -->
      <v-btn :href="`/api/calendar/export/` +  selectedYear" v-show="!$external && $rights.includes('TENANT_INDEPENDENCE')" outlined depressed tile class="savebutton mb-2 mr-sm-16">{{ $t("export_csv") }}</v-btn>
      <div class="col-xl-12 px-0 pr-sm-16">
        <div class="mx-0 pa-0 text-content">

          <div class="pt-0">

              
              <div class="calendar-year">
                <div><img class="ml-2 arrow-img-left clickable" @click="previousYearClicked()" src="../assets/img/arrow_right.svg" height="18px"></div>
                <div>{{ selectedYear }}</div>
                <div><img class="ml-2 clickable" @click="nextYearClicked()" src="../assets/img/arrow_right.svg" height="18px"></div>
              </div>
              <br>
              <div class="calendar-month" v-for="(month,index) in allObjects" :key="index" v-show="monthNames[index] != null && monthNames[index] != ''">
                <div class="calendar-first-row">
                  <div>&nbsp;</div>
                  <div class="bg-blue">{{ $t(monthNames[index]) }} {{ selectedYear }}</div>
                </div>
                <div class="calendar-content-row">
                  <div class="bg-beige-dark">Datum</div>
                  <div class="bg-beige-dark weekday" v-bind:class="[{'bg-blue': day == currentDay && index == currentMonth}, getWeekdayName(index, day).toLowerCase()]" v-for="day in 31" :key="day">{{ isNextMonth(index, day) ? "" : day }}</div>
                </div>
                <div class="calendar-content-row">
                  <div class="bg-beige-dark">&nbsp;</div>
                  <div class="bg-beige-dark weekday" v-for="day in 31" :key="day" v-bind:class="getWeekdayName(index, day).toLowerCase()">{{ isNextMonth(index, day) ? "" : getWeekdayName(index, day) }}</div>
                </div>
                <div class="calendar-content-row">
                  <div class="bg-beige-dark">KW</div>
                  <div class="bg-beige-dark weekday week-of-year" v-for="day in 31" :key="day">{{ getWeekdayNumber(index, day) == 1 ? getWeekOfYear(index, day) : "" }}</div>
                </div>
                <div class="calendar-content-row">
                  <div class="bg-beige"></div>
                  <div class="bg-beige" v-for="val in 31" :key="val">&nbsp;</div>
                </div>

                <!-- Appointments for Trainers -->
                <div class="calendar-content-row" v-for="trainerAppointment in month.trainerAppointments" :key="trainerAppointment.trainer">
                  <div class="bg-beige">{{ getTrainerById(trainerAppointment.trainer).fullname }}</div>
                  <div class="bg-beige calendar-day" v-for="day in trainerAppointment.daysWithAppointments" :key="day" @click.stop="calendarDayClicked(getTrainerById(trainerAppointment.trainer).id, day.day, month.month, 'TRAINER', day.appointment)" :set="appointmentOnDay = day.appointment" v-bind:class="getAppointment(trainerAppointment, day.day, month.month) == null ? null : getAppointment(trainerAppointment, day.day, month.month).type.toLowerCase()">
                    <span v-if="appointmentOnDay != null">
                      <span v-show="appointmentOnDay.type == 'VACATION'">
                        U
                      </span>
                      <span v-show="appointmentOnDay.type == 'ABSENCE'">
                        A
                      </span>
                      <span v-show="appointmentOnDay.type == 'TRAINING_AS_TRAINER'">
                        T
                      </span>
                      <span v-show="appointmentOnDay.type == 'TRAINING_INITIATIVE'">
                        O
                      </span>
                      <span v-show="appointmentOnDay.type == 'TRAINING_DEVELOPMENT'">
                        E
                      </span>
                      <span v-show="appointmentOnDay.type == 'PREPARATION_TIME'">
                        V
                      </span>
                      <span v-show="appointmentOnDay.type == 'TRAVEL_TIME'">
                        R
                      </span>
                      <span v-show="appointmentOnDay.type == 'FURTHER_EDUCATION'">
                        W
                      </span>
                      <span v-show="appointmentOnDay.type == 'POSTPROCESSION_TIME'">
                        N
                      </span>
                      <span v-show="appointmentOnDay.type == 'SERVICE'">
                        FS
                      </span>
                      <span v-show="appointmentOnDay.type == 'HOLIDAY'">
                        F
                      </span>
                      <span v-show="appointmentOnDay.type == 'MISCELLANEOUS'">
                        S
                      </span>
                      <div class="hover-element text-left">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(trainerAppointment, day.day, month.month))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <v-divider></v-divider>
                        <span class="font-grey" v-html="appointmentOnDay.description"></span>
                      </div>
                    </span>
                    <span v-else>&nbsp;</span>
                  </div>
                </div>

                <!-- Appointments for Rooms -->
                <div class="calendar-content-row" v-for="roomAppointment in month.roomAppointments" :key="roomAppointment.room.id">
                  <div class="bg-beige">{{ roomAppointment.room.designation }}</div>
                  <div class="bg-beige calendar-day" v-for="day in roomAppointment.daysWithAppointments" :key="day" @click.stop="calendarDayClicked(roomAppointment.room.id, day.day, month.month, 'ROOM', day.appointment)" :set="appointmentOnDay = day.appointment" v-bind:class="day.appointment == null ? null : day.appointment.type.toLowerCase()">
                    <span v-if="appointmentOnDay != null">
                      <span v-show="appointmentOnDay.type == 'ROOM_BLOCKED'">
                        RB
                      </span>
                      <div class="hover-element text-left">
                        <span v-bind:class="{'clickable-link': appointmentOnDay.clickable}" @click.stop="appointmentClicked(getAppointment(roomAppointment, day.day, month.month))">{{ appointmentOnDay.designationsMap[$locale] != null ? appointmentOnDay.designationsMap[$locale] : $t("appointment_type_" + appointmentOnDay.type.toLowerCase()) }}</span>
                        <v-divider></v-divider>
                        <span class="font-grey" v-html="appointmentOnDay.description"></span>
                      </div>
                    </span>
                    <span v-else>&nbsp;</span>
                  </div>
                </div>

              </div>
          </div>
          
        </div>
      </div>

      <!-- Right Area -->
      <!-- <div class="col-xl-4 pl-8 row pt-0">
        <div class="col-xl-12 right-side-block">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn :to="`/tenants`" outlined depressed tile class="cancelbutton mr-2 mb-2">{{ $t("cancel") }}</v-btn>
          <v-btn @click="saveTenant()" outlined depressed tile class="savebutton mr-2 mb-2">{{ $t("save") }}</v-btn>
          <v-btn v-show="editMode" @click="deleteTenant()" outlined depressed tile class="mr-2 mb-2">{{ $t("delete") }}</v-btn>
        </div>
        <Contact />
      </div> -->
    </div>

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
        <v-btn @click="deleteAppointment()" v-show="!appointment.clickable && appointment.id != null" outlined depressed tile class="deletebutton mr-2 mb-2 bg-white color-blue"> <v-icon color= "#444">mdi-delete</v-icon> {{ $t("delete") }}</v-btn>
        <v-btn @click="openAddDialog = false" outlined depressed tile class="cancelbutton mr-2 mb-2 bg-white color-blue"> {{ $t("cancel") }}</v-btn>
        <v-btn @click="saveAppointment()" outlined depressed tile class="save mr-2 mb-2">{{ $t("save") }}</v-btn>
      </v-card-actions>
    </v-dialog>
  </div>
</div>
</template>

<script>
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
        }
      }
    },

    mounted(){
      for (let i = 0; i <= 12; i++) {
        this.allObjects.push({
          month: i,
          trainerAppointments: [],
          roomAppointments: [],
        });
      }

      this.currentDay = new Date().getDate();
      this.currentMonth = new Date().getMonth();
      this.selectedYear = new Date().getFullYear();
      
      this.fetchAppointments();
      this.fetchTrainers();
      this.fetchAppointmentTypes();

      var monthCounter = 0;
      var i = 0;
      while (i <= 12) {
        this.months.push(monthCounter);
        i++;
        monthCounter++;
        if(monthCounter > 12) monthCounter = 0;
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