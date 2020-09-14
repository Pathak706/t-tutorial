import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Platform } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  constructor(
    private router: Router,
    private http: HttpClient,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.loggedIn();
    });
  }

  loggedIn() {
    if (localStorage.getItem("isLogin") == "true") {
      this.authState.next(true);
    }
  }

  login() {
    this.authState.next(true);
  }

  logout() {
    this.router.navigate(["welcome"]);
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
