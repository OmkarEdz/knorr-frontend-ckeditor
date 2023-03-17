import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import HttpService from './Http.js'
import VueI18n from 'vue-i18n'
import messages from './assets/messages.json'
import VueNoty from 'vuejs-noty'
import 'vuetify/dist/vuetify.min.css'
import 'vue-cal/dist/vuecal.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// QYSIWYG Editor
import { VueEditor } from "vue2-editor";

// Vue Components
import ResetPassword from './components/ResetPassword.vue'
import ForgotPassword from './components/ForgotPassword.vue'
import Users from './components/Users.vue'
import Tenants from './components/Tenants.vue'
import Schedule from './components/Schedule.vue'
import Roles from './components/Roles.vue'
import Login from './components/Login.vue'
import Category from './components/Category.vue'
import Venues from './components/Venues.vue'
import TrainingTable from './components/TrainingTable.vue'
import TrainingDetails from './components/TrainingDetails.vue'
import TrainingEvents from './components/TrainingEvents.vue'
import CreateTrainingEvent from './components/CreateTrainingEvent.vue'
import CreateTraining from './components/CreateTraining.vue'
import CreateCategory from './components/CreateCategory.vue'
import CreateVenue from './components/CreateVenue.vue'
import CreateTenant from './components/CreateTenant.vue'
import CreateUser from './components/CreateUser.vue'
import Imprint from './components/Imprint.vue'
import Cookies from './components/Cookies.vue'
import TrainingRequest from './components/TrainingRequest.vue'
import TrainingRequestOverview from './components/TrainingRequestOverview.vue'
import ContactForm from './components/Contact.vue'
import FullCalendarUpdated from './components/FullCalendarUpdated.vue'

import ContactPersons from './components/ContactPersons.vue'
import ToolDetails from './components/ToolDetails.vue'
import OurVenues from './components/OurVenues.vue'
import AboutUs from './components/AboutUs.vue'
import VenueDetails from './components/VenueDetails.vue'
import UploadApplication from './components/UploadApplication.vue'

// Widgets
import Contact from "./components/widget/Contact.vue"
import Share from "./components/widget/Share.vue"
import Upload from "./components/widget/Upload.vue"
import DatePicker from "./components/widget/DatePicker.vue"


// Main Page
import App from './views/App.vue'

Vue.config.productionTip = false;

// Global Access Variables
Vue.prototype.$axios = HttpService;     // axios
Vue.prototype.$rights = [];             // User rights
Vue.prototype.$external = true;             // User rights
Vue.prototype.$languages = [];         // Function for finding flag by language String, e.g. GERMAN

window.Vue = Vue;

// Use base Components
Vue.use(BootstrapVue)
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(VueEditor, /* { default global options} */)
Vue.component("vue-editor", VueEditor);

// Components
Vue.use(ResetPassword)
Vue.use(Users)
Vue.use(Tenants)
Vue.use(Category)
Vue.use(TrainingTable)
Vue.use(TrainingDetails)
Vue.use(Login)
Vue.use(ResetPassword)
Vue.use(Venues)
Vue.use(TrainingEvents)
Vue.use(CreateTrainingEvent)

// Widgets
Vue.use(Contact)
Vue.component("Contact", Contact);
Vue.use(Share)
Vue.component("Share", Share);
Vue.use(Upload)
Vue.component("Upload", Upload);
Vue.use(DatePicker)
Vue.component("DatePicker", DatePicker);

// Language
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'de',
    messages,
});


// Vuetify
const vuetifyOpts = {
    theme: {
        themes: {
            light: {
                primary: "#0069AE",
                secondary: "#003A61",
                accent: "#82B1FF",
                error: "#FF5252",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#FB8C00",
                grey: "#2f2f2f",
            }
        }
    }
};
const vuetify = new Vuetify(vuetifyOpts);


// Vue Router
const router = new VueRouter({
    routes: [
        {
            path: "/", component: Category
        },
        { path: "/login", component: Login, props: route => ({ routingTarget: route.query.routingTarget }) },
        { path: "/users", component: Users },
        { path: "/tenants", component: Tenants },
        { path: "/calendar", component: Schedule },
        { path: "/venues", component: Venues },
        { path: "/roles", component: Roles },
        { path: "/categories", component: Category },
        { path: "/category/:pathMatch(.*)*", component: TrainingTable },
        { path: "/create-training", component: CreateTraining, props: route => ({ categoryName: route.query.category }) },
        { path: "/edit-training", component: CreateTraining, props: route => ({ trainingId: route.query.trainingId }) },
        { path: "/create-category", component: CreateCategory },
        { path: "/edit-category", component: CreateCategory, props: route => ({ categoryId: route.query.categoryId }) },
        { path: "/training/:pathMatch(.*)*", component: TrainingDetails },
        { path: "/training-events", component: TrainingEvents },
        { path: "/create-training-event", component: CreateTrainingEvent, props: route => ({ trainingRequestId: route.query.trainingRequestId }) },
        { path: "/edit-training-event", component: CreateTrainingEvent, props: route => ({ trainingEventId: route.query.trainingEventId }) },
        { path: "/create-venue", component: CreateVenue },
        { path: "/edit-venue", component: CreateVenue, props: route => ({ venueId: route.query.venueId }) },
        { path: "/create-tenant", component: CreateTenant },
        { path: "/edit-tenant", component: CreateTenant, props: route => ({ tenantId: route.query.tenantId }) },
        { path: "/create-user", component: CreateUser },
        { path: "/edit-user", component: CreateUser, props: route => ({ userId: route.query.userId }) },
        { path: "/forgot-password", component: ForgotPassword },
        { path: "/reset-password", component: ResetPassword, props: route => ({ token: route.query.token, newUser: route.query.newUser }) },
        { path: "/full-calendar-updated", component: FullCalendarUpdated },

        { path: "/contactpersons", component: ContactPersons },
        { path: "/request", component: TrainingRequest, props: route => ({ trainingId: route.query.trainingId, trainingRequestId: route.query.trainingRequestId }) },
        { path: "/training-requests", component: TrainingRequestOverview },
        { path: "/imprint", component: Imprint },
        { path: "/cookies", component: Cookies },
        { path: "/ourvenues", component: OurVenues },
        { path: "/aboutus", component: AboutUs },
        { path: "/venue", component: VenueDetails, props: route => ({ venueId: route.query.venueId }) },
        { path: "/tools/:pathMatch(.*)*", component: ToolDetails },
        { path: "/offers/:pathMatch(.*)*", component: ToolDetails },
        { path: "/contact", component: ContactForm },
        { path: "/upload-application", component: UploadApplication },
    ],
    mode: "history"
});

Object.defineProperty(Vue.prototype, '$locale', {
    get: function () {
        return i18n.locale
    },
    set: function (locale) {
        i18n.locale = locale
    }
});


// Notifications
Vue.use(VueNoty, {
    timeout: 6000,
    progressBar: true,
    killer: true,
    layout: 'topRight'
});

function getQueryParam(searchWord, query) {
    const searchWordPosition = query.indexOf(searchWord);

    if (searchWordPosition >= 0) {
        const start = searchWordPosition + searchWord.length;

        const separatorPosition = query.indexOf("&", start);
        const end = separatorPosition === -1 ? query.length : separatorPosition;

        return query.substr(start, end - start);
    }
    return "";
}

// Global Methods
Vue.prototype.$formatDate = function(dateStr){
    return new Date(dateStr).toLocaleDateString(navigator.languages, { year: 'numeric', month: '2-digit', day: '2-digit' });
}
Vue.prototype.$formatDateTime = function(dateStr){
    return new Date(dateStr).toLocaleDateString(navigator.languages, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

Vue.prototype.$routerPush = function(path, right, elsePath = null){
    if(this.$rights.includes(right)){
        this.$router.push(path);
    }else if(elsePath != null){
        this.$router.push(elsePath);
    }
}

Vue.prototype.$routerBack = function(){
    this.$router.go(-1);
    if(this.$router.currentRoute.path.includes("login")){
        this.$router.go(-1);
    }
}

/**
 * Converts the given HTMLText to a sendable format (when convertBack is false, default) or converts the given Text from its sendable format back to HTML Format
 * @param {*} htmlText 
 * @param {*} convertBack 
 */
Vue.prototype.$convertHtml = function(htmlText, convertBack = false){
    // Important: Changes here need to be synchronized with Method in MiscUtil.java in Backend
    const prefix = "KB_HTML_CONVERT_CG_";
    const params = {
        "<p class=\"ql-indent-1\">": prefix + "P_INDENT_1",
        "<p class=\"ql-indent-2\">": prefix + "P_INDENT_2",
        "<p class=\"ql-indent-3\">": prefix + "P_INDENT_3",
        "<p class=\"ql-indent-4\">": prefix + "P_INDENT_4",
        "<p class=\"ql-indent-5\">": prefix + "P_INDENT_5",
        "<p class=\"ql-indent-6\">": prefix + "P_INDENT_6",
        "<p class=\"ql-indent-7\">": prefix + "P_INDENT_7",
        "<p class=\"ql-indent-8\">": prefix + "P_INDENT_8",
        "</p>": prefix + "P_CLOSE",
        "<p>": prefix + "P_OPEN",
        "<br>": prefix + "BR",
        "<br />": prefix + "BR",
        "</b>": prefix + "B_CLOSE",
        "<b>": prefix + "B_OPEN",
        "</u>": prefix + "U_CLOSE",
        "<u>": prefix + "U_OPEN",
        "</i>": prefix + "I_CLOSE",
        "<i>": prefix + "I_OPEN",
        "</ol>": prefix + "OL_CLOSE",
        "<ol>": prefix + "OL_OPEN",
        "</ul>": prefix + "UL_CLOSE",
        "<ul>": prefix + "UL_OPEN",
        "</li>": prefix + "LI_CLOSE",
        "<li>": prefix + "LI_OPEN",
        "</strong>": prefix + "STRONG_CLOSE",
        "<strong>": prefix + "STRONG_OPEN",
        "<em>": prefix + "EM_OPEN",
        "</em>": prefix + "EM_CLOSE",
        "<html>": prefix + "HTML_OPEN",
        "</html>": prefix + "HTML_CLOSE",
        "<body>": prefix + "BODY_OPEN",
        "</body>": prefix + "BODY_CLOSE",
    };
    for (const [ key, value ] of Object.entries(params)) {
        if(!convertBack){
            htmlText = htmlText.replaceAll(key, value);
        }else{
            htmlText = htmlText.replaceAll(value, key);
        }
    }
    return htmlText;
}

/**
 * Uses the convertHtml Function to convert all values in the given DescriptionText Set
 * @param {*} descriptionText 
 * @param {*} convertBack 
 * @returns 
 */
Vue.prototype.$convertHtmlDescriptionText = function(descriptionText, convertBack = false){
    for (const [ key, value ] of Object.entries(descriptionText)) {
        descriptionText[key] = this.$convertHtml(value, convertBack);
    }
    return descriptionText;
}

new Vue({
    render: h => h(App),
    components: { App, Contact, Share },
    i18n,
    router,
    vuetify,
    watch:{
        $route (to, from){
            window.scrollTo(0, 0);
        }
    },
    beforeCreate: function(){
        if(window.location.href.includes("?lang")){
            window.location.href = window.location.href.substring(0, window.location.href.indexOf("?"));
        }
        if(window.location.href.includes("%3Flang")){
            window.location.href = window.location.href.substring(0, window.location.href.indexOf("%3Flang"));
        }
    },
    beforeMount: function () {
        var _this = this; 
        this.$axios.get("/api/user/me").then(function(response){
            const user = response.data;
            Vue.prototype.$user = user;
            Vue.prototype.$rights = user.allRights;
            Vue.prototype.$external = user.external;
        })
        .catch(function(error){
            // Check current window Location and check if Authorized
            console.error(error);

            _this.checkWindowLocationAndRouteToLogin();
        });

        this.$axios.get("/api/language/me").then(function(response){ 
            const selectedlanguage = response.data.shortForm;
            Vue.prototype.$language = response.data;
            _this.$locale = selectedlanguage.toLowerCase();
        }).catch(function(error){
            console.error(error);
        });

        var languageTabs = [];

        this.$axios.get("/api/language/all").then(function(response){ 
            Vue.prototype.$languages = response.data;
            const languages = response.data;
            const lnlist = [];
            for (var i in languages){
                var language = {
                    key: languages[i].language,
                    name: _this.$t(languages[i].language),
                    flag: languages[i].flag,
                    shortForm: languages[i].shortForm,
                    onlySelectable: languages[i].onlySelectable
                };
                if(!languages[i].onlySelectable){
                    languageTabs.push(languages[i]);
                }
                lnlist.push(language);
            }
            Vue.prototype.$selectableLanguages = lnlist;
            Vue.prototype.$languageTabs = languageTabs;
        }).catch(function(error){
            console.error(error);
        });
    },
    methods: {
        setUser(user) {
            this.user = user;
        },

        checkWindowLocationAndRouteToLogin(){
            var location = window.location.href;
            if(location.startsWith("http://") || location.startsWith("https://")) location = location.substring(location.indexOf("//") + 2);
            console.log(location);
            const allowedRoutes = ["/login", "/forgot-password", "/reset-password", "/categories", "/category/", "/tools", "/offers", "contactpersons", "/ourvenues", "/aboutus", "/venue?venueId", "/request", "/contact", "/imprint", "/training/", "/cookies"];
            const unallowedRoutes = ["/request?trainingRequestId"];
            var routeAllowed = false;

            // Check allowedRoutes
            for (let i = 0; i < allowedRoutes.length; i++) {
                const allowedRoute = allowedRoutes[i];
                if(location.includes(allowedRoute)){
                    routeAllowed = true;
                    break;
                }
            }
            // Check unallowedRoutes
            for (let i = 0; i < unallowedRoutes.length; i++) {
                const unallowedRoute = unallowedRoutes[i];
                if(location.includes(unallowedRoute)){
                    routeAllowed = false;
                    break;
                }
            }
            if(!location.includes("/")) return; // Start Page always allowed
            if(routeAllowed) return;

            const unallowedRoute = location.substring(location.indexOf("/"));
            if(unallowedRoute == "/") return; // Start Page always allowed

            console.log(unallowedRoute);
            this.$router.push("/login?routingTarget=" + unallowedRoute);
        },
    }
}).$mount("#app");
