<template>
<div>
  <div class="sixteentosix omt-6 omt-md-25 otp-screen-wrap">
    <div class="kachelimage header-image" style="background: url('/static/img/header_homepage.jpg')">
      <div class="otp-white-wrapper download-doc-wrapper">
        <h2 class="otp-head">Download Documents</h2>
        <ul class="pdf-list-wrap">
            <li>
                <div class="file-name">
                    <v-icon>fa-regular fa-file-pdf</v-icon>
                    <a href="javascript:;">eiusmod tempor incididunt ut labore et dolore magna aliqua.pdf</a>
                </div>
                <v-btn outlined depressed tile class="savebutton">{{ $t("Download") }} <v-icon>fa-solid fa-download</v-icon></v-btn>
            </li>
            <li>
                <div class="file-name">
                    <v-icon>fa-regular fa-file-pdf</v-icon>
                    <a href="javascript:;">Incididunt ut labore et dolore magna aliqua.pdf</a>
                </div>
                <v-btn outlined depressed tile class="savebutton">{{ $t("Download") }} <v-icon>fa-solid fa-download</v-icon></v-btn>
            </li>
            <li>
                <div class="file-name">
                    <v-icon>fa-regular fa-file-pdf</v-icon>
                    <a href="javascript:;">Et dolore magna eiusmod tempor incididunt ut aliqua.pdf</a>
                </div>
                <v-btn outlined depressed tile class="savebutton">{{ $t("Download") }} <v-icon>fa-solid fa-download</v-icon></v-btn>
            </li>
            <li>
                <div class="file-name">
                    <v-icon>fa-regular fa-file-pdf</v-icon>
                    <a href="javascript:;">Aliqua eiusmod tempor incididunt ut labore et dolore.pdf</a>
                </div>
                <v-btn outlined depressed tile class="savebutton">{{ $t("Download") }} <v-icon>fa-solid fa-download</v-icon></v-btn>
            </li>
            <li>
                <div class="file-name">
                    <v-icon>fa-regular fa-file-pdf</v-icon>
                    <a href="javascript:;">Your labore et dolore magna aliqua.pdf</a>
                </div>
                <v-btn outlined depressed tile class="savebutton">{{ $t("Download") }} <v-icon>fa-solid fa-download</v-icon></v-btn>
            </li>
            <li>
                <div class="file-name">
                    <v-icon>fa-regular fa-file-pdf</v-icon>
                    <a href="javascript:;">Tempor incididunt ut labore dolore magna aliqua.pdf</a>
                </div>
                <v-btn outlined depressed tile class="savebutton">{{ $t("Download") }} <v-icon>fa-solid fa-download</v-icon></v-btn>
            </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<style>
/* .v-toolbar__content .col-md > .align-self-center > .row.col-7.align-self-center, .v-toolbar__content .col-md ~ .justify-content-between {display:none;}
.v-application .kb-header-logo.mb-4 {margin-bottom: 40px!important;}
.v-main__wrap .sixteentosix.otp-screen-wrap {margin-top: 120px !important;border-bottom: 27px solid #004581;}
.v-application--wrap .v-bottom-navigation {display:none !important;} */
.v-main__wrap .sixteentosix.otp-screen-wrap .kachelimage {top: 0;left: 0;display: flex;align-items: center;justify-content: center;}
.otp-screen-wrap .otp-white-wrapper.download-doc-wrapper {width: 100%;max-width: 900px;padding: 50px;border: 1px solid #B8B8B8;background: rgba(255, 255, 255, 0.9);text-align: left;}
.otp-screen-wrap .otp-white-wrapper .otp-head {margin-bottom:23px;}
.otp-screen-wrap .download-doc-wrapper .pdf-list-wrap {display: flex;flex-direction: column;padding: 0px;margin: 0px;list-style: none;}
.otp-screen-wrap .download-doc-wrapper .pdf-list-wrap li {margin-bottom:8px;display: flex;justify-content: space-between;align-items: center;}
.otp-screen-wrap .download-doc-wrapper .pdf-list-wrap li .file-name {width: 80%;}
.otp-screen-wrap .download-doc-wrapper .pdf-list-wrap li .file-name .v-icon {color:#D60000;margin-right: 10px;font-size: 16px;}
.otp-screen-wrap .download-doc-wrapper .pdf-list-wrap li .file-name a {font-size: 14px;line-height: 19px;text-decoration-line: underline;color: #07477F;}
.otp-screen-wrap .download-doc-wrapper .pdf-list-wrap li .file-name a:hover {color:#000;}
.otp-screen-wrap .download-doc-wrapper .pdf-list-wrap li .savebutton {height: 28px;font-weight: 600;font-size: 10px;line-height: 14px;}
.otp-screen-wrap .download-doc-wrapper .pdf-list-wrap li .savebutton .v-icon {font-size: 12px;margin-left: 10px;}
</style>