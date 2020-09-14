import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export default class API {
  // apiKey = "http://192.168.0.103:8000/api/";
  apiKey = "http://18.218.213.253/api/";
  // http://18.218.213.253/api/file-uplaod
  // http://192.168.0.103:8000/api/file-uplaod

  monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "October",
    "Nov",
    "Dec",
  ];
  constructor(public httpClint: HttpClient) {}

  postRequest(url, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH",
      }),
    };

    return this.httpClint.post(this.apiKey + url, body, httpOptions);
  }

  getRequest(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH",
      }),
    };

    return this.httpClint.get(this.apiKey + url, httpOptions);
  }

  putRequest(url, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH",
      }),
    };

    return this.httpClint.put(this.apiKey + url, body, httpOptions);
  }

  deleteRequest(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH",
      }),
    };

    return this.httpClint.delete(this.apiKey + url, httpOptions);
  }

  getEpoch(dateString) {
    return new Date(dateString).getTime();
  }

  timeStamp(dateString) {
    let date = new Date(dateString);
    var hours = date.getHours();
    var minutes =
      date.getMinutes().toString().length == 1
        ? "0" + date.getMinutes().toString()
        : date.getMinutes().toString();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12
    var strTime =
      hours +
      ":" +
      minutes +
      " " +
      ampm;
    return strTime;
  }
}
