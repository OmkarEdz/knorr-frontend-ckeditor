<template>
  <div class="col-xl-12 right-side-block">
    <h3>{{ headline }}</h3>
    <div class="right-side divider"></div>
    <div class="mt-6"></div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="copyAndShare('https://www.linkedin.com/feed/')" tile class="ma-2" min-width="36" width="36" height="36" color="grey" v-bind="attrs" v-on="on"><v-icon color="#ffffff">fab fa-linkedin</v-icon></v-btn>
      </template>
      <span>{{ $t("share_tooltip", {name: "LinkedIn"}) }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="copyAndShare('https://www.xing.com/home')" tile class="ma-2" min-width="36" width="36" height="36" color="grey" v-bind="attrs" v-on="on"><v-icon color="#ffffff">fab fa-xing</v-icon></v-btn>
      </template>
      <span>{{ $t("share_tooltip", {name: "XING"}) }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="copyAndShare('https://www.twitter.com')" tile class="ma-2" min-width="36" width="36" height="36" color="grey" v-bind="attrs" v-on="on"><v-icon color="#ffffff">fab fa-twitter</v-icon></v-btn>
      </template>
      <span>{{ $t("share_tooltip", {name: "Twitter"}) }}</span>
    </v-tooltip>
    <v-btn v-show="mailSubject != null && mailText != null && mailSubject != '' && mailText != ''" :href="getShareLinkMail()" tile class="ma-2" min-width="36" width="36" height="36" color="grey"><v-icon color="#ffffff">fas fa-envelope</v-icon></v-btn>
  </div>
</template>

<script>
export default {

  props: {
    mailSubject: String,
    mailText: String,
    headline: {
      type: String,
      default: function(){
        return this.$t("share");
      }
    },
  },

  mounted(){
    if(this.headline == null || this.headline == undefined || this.headline == ""){
      this.headline = this.$t("share");
    }
  },

  methods: {
    copyAndShare(link){
      this.copyToClipboard(window.location.href);
      window.open(link, '_blank').focus();
    },

    copyToClipboard(text){
      if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);
      }
      else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
          var textarea = document.createElement("textarea");
          textarea.textContent = text;
          textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
          document.body.appendChild(textarea);
          textarea.select();
          try {
              return document.execCommand("copy");  // Security exception may be thrown by some browsers.
          }
          catch (ex) {
              console.warn("Copy to clipboard failed.", ex);
              return prompt("Copy to clipboard: Ctrl+C, Enter", text);
          }
          finally {
              document.body.removeChild(textarea);
          }
      }
    },

    getShareLinkMail(){
      return "mailto:?subject=" + this.mailSubject + " &body=" + this.mailText;
    },

    getShareLinkXing(){
      return "https://www.xing.com/social_plugins/share/new?sc_p=xing-share&url=" + window.location.href;
    },

    getShareLinkTwitter(){
      return "http://twitter.com/home/?status=" + window.location.href;
    },  
  }
}
</script>
