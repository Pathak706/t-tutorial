import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Course, CourseRes } from "src/app/DTOs/course.dto";
import { Faculty, FacultyRes } from "src/app/DTOs/faculty.dto";
import { AlertService } from "src/app/services/alert.service";
import API from "src/app/services/api.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-add-new-faculty",
  templateUrl: "./add-new-faculty.component.html",
  styleUrls: ["./add-new-faculty.component.scss"],
})
export class AddNewFacultyComponent implements OnInit {
  registrationForm: FormGroup;
  registrationFormSubmit: boolean = false;
  editForm: boolean = false;
  editFaculty: Faculty = null;
  constructor(
    private alertService: AlertService,
    private loader: LoaderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: API
  ) {
    this.defineFormValidationRule();
    this.getLocationState();
  }

  ngOnInit() {}

  ionViewWillEnter(): void {}

  getLocationState(): void {
    this.editFaculty = this.router.getCurrentNavigation().extras.state
      ? this.router.getCurrentNavigation().extras.state.faculty
      : null;
    this.editForm = this.router.getCurrentNavigation().extras.state
      ? this.router.getCurrentNavigation().extras.state.edit
      : false;
    if (this.editForm && this.editFaculty) {
      this.setEditDataValue();
    }
  }

  defineFormValidationRule(): void {
    this.registrationForm = this.formBuilder.group({
      first_name: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      last_name: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
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

  setEditDataValue(): void {
    this.registrationForm.get("password").clearValidators();
    this.registrationForm.patchValue({
      first_name: this.editFaculty.first_name,
      last_name: this.editFaculty.last_name,
      email: this.editFaculty.email,
    });
  }

  onSubmit(): void {
    this.registrationFormSubmit = true;
    if (this.registrationForm.valid) {
      this.editForm ? this.updateFaculty() : this.addNewFaculty();
    }
  }

  addNewFaculty(): void {
    this.loader.showLoader("Adding new faculty...");
    var body: Faculty = {
      first_name: this.registrationForm.get("first_name").value,
      last_name: this.registrationForm.get("last_name").value,
      email: this.registrationForm.get("email").value,
      password: this.registrationForm.get("password").value,
    };
    this.api.postRequest("add-faculty", body).subscribe(
      (res: FacultyRes) => {
        this.loader.hideLoader();
        this.router.navigate(["faculty"]);
      },
      (error) => {
        console.log(error);
        this.loader.hideLoader();
        this.alertService.promptAlert("Oops...", "Something went wrong.");
      }
    );
  }

  updateFaculty(): void {
    this.loader.showLoader("Updating faculty...");
    var body: Faculty = {
      first_name: this.registrationForm.get("first_name").value,
      last_name: this.registrationForm.get("last_name").value,
      email: this.registrationForm.get("email").value,
    };
    this.api.putRequest(`edit-faculty/${this.editFaculty.id}`, body).subscribe(
      (res: FacultyRes) => {
        this.loader.hideLoader();
        this.router.navigate(["faculty"]);
      },
      (error) => {
        console.log(error);
        this.loader.hideLoader();
        this.alertService.promptAlert("Oops...", "Something went wrong.");
      }
    );
  }
}
