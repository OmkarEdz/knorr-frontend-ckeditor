<template>
<fragment>
<div>
<div>
  <div class="sixteentosix omt-6 omt-md-25">
    <div class="kachelimage header-image" style="background: url('/static/img/meeting_old.jpg'); background-position: top !important;">
      <div class="headline">
        <div class="text-subtitle-2 text-md-h5">{{ $t("openTraining") }}</div>
      </div>
      </div>
    </div>
</div>
<div class="row align-items-start">
      <!-- Left Area -->
      <div class="col-xl-8 pl-md-16 pl-12 px-8 pr-sm-16" > 
        <div class="mx-0 pa-0 text-content">
          <h4>{{ $t("openTraining") }}</h4>
        </div>
       <table class="table table-bordered table-md opentrainings opentrainingsWrap" >
       <tbody>
          <tr v-for="(training, index) in uniqueTrainings" :key="training.value" class="border-top border-bottom" >
          <td style="border-color: #333;" class="col-0 border-right-0">{{ index + 1 }}.</td>
          <td style="border-color: #333; text-decoration: underline;"  class="col-9 border-left-0 border-right-0"><a :href="'/request?trainingId=' + training.value">{{ training.text }}</a></td>
          <td style="border-color: #333;" class="border-left-0 col-3"><span class="mr-5" v-if="training.isPopular"><v-icon>mdi-star</v-icon>   {{$t('popularTraining')}} </span></td>
         </tr>
      </tbody>
      </table>
      </div>
      <!-- Right Area -->
      <div class="col-xl-4 px-0 pl-8 pl-8 pl-md-12 pl-lg-8  row">
        <div class="col-xl-12 right-side-block hide">
          <h4 class="text-uppercase">{{ $t("actions") }}</h4>
          <div class="right-side divider"></div>
          <div class="mt-6"></div>
          <v-btn @click="$routerBack()" outlined depressed tile class="backbutton mr-2 mb-2"> <v-icon>mdi-chevron-left</v-icon>  {{ $t("back") }}</v-btn>
        </div>
        <Contact />
      </div>
</div>
</div>
</fragment>
</template>
<script>
export default {
 data() {
      return {
         trainings: []
      }
 },
 computed: {
    uniqueTrainings() {
      return Array.from(new Set(this.trainings.map(training => training.value)))
        .map(value => {
          return this.trainings.find(training => training.value === value)
        })
    }
},
mounted(){
   this.fetchTrainings();
  },
   methods: {
   fetchTrainings() {
        var _this = this;
        this.$axios
          .get("/api/training/opentrainings")
          .then(function (response) {
            const trainings = response.data;
            for (let i = 0; i < trainings.length; i++) {
              const training = trainings[i];
              _this.trainings.push({
                text: training.designationsMap[_this.$locale],
                value: training.id,
                isPopular:training.isPopular
              });
            }
            _this.$forceUpdate();
          })
          .catch(this.onError);
      }
   }
}
</script>