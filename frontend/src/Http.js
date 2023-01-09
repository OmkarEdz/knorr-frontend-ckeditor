import axios from 'axios';

class HttpService {

    constructor() {
        this.self = this;
        this.credentials = {
            mail: "",
            password: ""
        };
        this.restoreAuthorization();
    }

    _appendToken(options) {
        if (options == null) {
            return { headers: { "Authorization": HttpService.authorizationHeader } }
        }
        else {
            if (options.headers == null) {
                options.headers = { "Authorization": HttpService.authorizationHeader };
            }
            else {
                options.headers["Authorization"] = HttpService.authorizationHeader;
            }
        }
        return options;
    }

    get(url, options) {
        return axios.get(url, this._appendToken(options));
    }
    post(url, data, options) {
        return axios.post(url, data, this._appendToken(options));
    }
    put(url, data, options) {
        return axios.put(url, data, this._appendToken(options));
    }
    patch(url, data, options) {
        return axios.patch(url, data, this._appendToken(options));
    }
    delete(url, options) {
        return axios.delete(url, this._appendToken(options));
    }

    authorize() {
        return axios.post("/api/authorization/token", this.objectToFormUrlEncodedData(this.credentials)).then(this.authorizationCompleted);
    }
    checkBearer() {
        return axios.get("/api/me/authorization/state");
    }
    restoreAuthorization() {
        const header = localStorage.getItem("bearer-jwt");
        if (header != null) {
            HttpService.authorizationHeader = header;
        }
    }
    authorizationCompleted(response) {
        HttpService.authorizationHeader = response.headers.authorization;
        localStorage.setItem("bearer-jwt", response.headers.authorization);
    }
    objectToFormUrlEncodedData(details){
        var formBody = [];
        var encodedKey;
        var encodedValue;
        for (const property in details) {
            encodedKey = encodeURIComponent(property);
            encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return formBody
    }
    logout() {
        this.credentials = {
            mail: "",
            password: ""
        };
        HttpService.authorizationHeader = "";
        localStorage.setItem("bearer-jwt", "");
    }
}

export default new HttpService();
