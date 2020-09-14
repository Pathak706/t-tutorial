import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AlertService } from 'src/app/services/alert.service';
import API from "src/app/services/api.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  registrationForm: FormGroup;
  registrationFormSubmit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private api: API,
    private authService: AuthenticationService,
    private router: Router,
    private loader: LoaderService,
    private alertService: AlertService,
  ) {
    this.registrationForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/\S+@\S+\.\S+/),
        ])
      ),
      password: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  onSubmit(): void {
    this.registrationFormSubmit = true;
    if (this.registrationForm.valid) {
      this.loader.showLoader("");
      var body = {
        password: this.registrationForm.get("password").value,
        email: this.registrationForm.get("email").value,
      };
      this.api.postRequest("auth/login", body).subscribe(
        (result) => {
          this.registrationFormSubmit = false;
          localStorage.setItem(
            "email",
            this.registrationForm.get("email").value
          ); //store user name
          localStorage.setItem("access_token", result["access_token"]);
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("role", result["user"]["role"]);
          localStorage.setItem("id", result["user"]["id"]);
          localStorage.setItem(
            "name",
            result["user"]["first_name"] + " " + result["user"]["last_name"]
          );
          this.authService.login();
          this.loader.hideLoader();
          this.router.navigate(["notes"]);
        },
        (error) => {
          console.log(error);
          this.loader.hideLoader();
          this.alertService.promptAlert("Oops...", "Check your email or password.")
        }
      );
    }
  }
}
