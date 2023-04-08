<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25 otp-screen-wrap">
    <div class="kachelimage header-image" style="background: url('/static/img/header_homepage.jpg')">
      <div class="otp-white-wrapper download-doc-wrapper">
        <h2 class="otp-head">{{ $t("downloadDocuments") }}</h2>
        <p v-if="documents.length===0">{{ $t("noDocuments") }}</p>
        <ul class="pdf-list-wrap" v-for="document in documents" :key="document">
            <li>
                <div class="file-name">
                    <v-icon>fa-regular fa-file-pdf</v-icon>
                    <a @click="showFile(document)">{{document}}</a>
                </div>
                <v-btn outlined depressed tile class="savebutton" @click="showFile(document)">{{ $t("download") }} <v-icon>fa-solid fa-download</v-icon></v-btn>
            </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
 data() {
    return {
       trainingId:null,
       bookingId:null,
       otp:null,
       documents:[]
    }
 },
mounted() {
      var _this = this;
      this.trainingId=this.$route.query.trainingId;
      this.bookingId=this.$route.query.bookingId;
      this.otp=this.$route.query.otp;
      let bookingId=parseInt(_this.bookingId);
      let trainingId= parseInt(_this.trainingId);
      let otp= parseInt(_this.otp);
       this.$axios
        .get("/api/booking/downloadDocument/"+trainingId+"/"+bookingId+"/"+otp)
        .then(function (response) {
         _this.documents=response.data;
        })
        .catch(this.onError);
      
},
methods: {
     onError(err) {
        if (err.response != null && err.response.data != null) {
          this.$noty.error(err.response.data);
        } else {
          console.error(err);
        }
      },
     showFile(fileName){
      const nameString = fileName.toLowerCase();
      const internalFolder = "" ;
      var _this = this;   
      if (nameString.endsWith('.png') || nameString.endsWith('.jpeg') || nameString.endsWith('.jpg') || nameString.endsWith('.pdf') || nameString.endsWith('.gif') || nameString.endsWith('.txt')  ) {
        var win = window.open("/files/images/" + internalFolder + fileName, "_blank");
        win.focus();
      } else {
        window.open("/files/images/" + internalFolder + fileName);
      }
    } 
}
}
</script>
