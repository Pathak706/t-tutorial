import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Course, CourseRes } from "src/app/DTOs/course.dto";
import { AlertService } from "src/app/services/alert.service";
import API from "src/app/services/api.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-add-new-course",
  templateUrl: "./add-new-course.component.html",
  styleUrls: ["./add-new-course.component.scss"],
})
export class AddNewCourseComponent implements OnInit {
  registrationForm: FormGroup;
  registrationFormSubmit: boolean = false;
  editCourse: Course = null;
  editForm: boolean = false;
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

  ngOnInit(): void {}

  getLocationState(): void {
    this.editCourse = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.course : null;
    this.editForm = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.edit : false;
    if (this.editForm && this.editCourse) {
      this.setEditDataValue();
    }
  }

  defineFormValidationRule(): void {
    this.registrationForm = this.formBuilder.group({
      course_name: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      course_subject: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      course_batch: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(1)])
      ),
    });
  }

  setEditDataValue(): void {
    this.registrationForm.patchValue({
      course_name: this.editCourse.course_name,
      course_subject: this.editCourse.course_subject,
      course_batch: this.editCourse.course_batch,
    });
  }

  onSubmit(): void {
    this.registrationFormSubmit = true;
    if (this.registrationForm.valid) {
      this.editForm ? this.updateCourse() : this.addNewCourse();
    }
  }

  addNewCourse(): void {
    this.loader.showLoader("creating new course...");
    var body: Course = {
      course_name: this.registrationForm.get("course_name").value,
      course_subject: this.registrationForm.get("course_subject").value,
      course_batch: this.registrationForm.get("course_batch").value,
    };
    this.api.postRequest("add-course", body).subscribe(
      (res: CourseRes) => {
        this.registrationFormSubmit = false;
        this.loader.hideLoader();
        this.router.navigate(["course"]);
      },
      (error) => {
        this.loader.hideLoader();
        this.alertService.promptAlert("Oops...", "something went worng.");
      }
    );
  }

  updateCourse(): void {
    this.loader.showLoader("updating your course...");
    var body: Course = {
      course_name: this.registrationForm.get("course_name").value,
      course_subject: this.registrationForm.get("course_subject").value,
      course_batch: this.registrationForm.get("course_batch").value,
      id: this.editCourse.id,
    };
    this.api.putRequest(`edit-course/${this.editCourse.id}`, body).subscribe(
      (res: CourseRes) => {
        this.registrationFormSubmit = false;
        this.loader.hideLoader();
        this.router.navigate(["course"]);
      },
      (error) => {
        this.loader.hideLoader();
        this.alertService.promptAlert("Oops...", "something went worng.");
      }
    );
  }
}
