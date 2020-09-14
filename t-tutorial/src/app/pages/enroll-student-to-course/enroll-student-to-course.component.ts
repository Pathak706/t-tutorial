import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Course, CourseRes } from "src/app/DTOs/course.dto";
import { Student, StudentRes } from "src/app/DTOs/student.dto";
import { AlertService } from "src/app/services/alert.service";
import API from "src/app/services/api.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-enroll-student-to-course",
  templateUrl: "./enroll-student-to-course.component.html",
  styleUrls: ["./enroll-student-to-course.component.scss"],
})
export class EnrollStudentToCourseComponent implements OnInit {
  registrationForm: FormGroup;
  coursesFetched: any = null;
  studentsFetched: Student[] = [];
  registrationFormSubmit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private api: API,
    private router: Router,
    private alertService: AlertService,
    private loader: LoaderService
  ) {
    this.defineFormValidationRule();
  }

  ngOnInit() {}

  ionViewWillEnter(): void {
    this.fetchCourses$Faculty();
  }

  defineFormValidationRule(): void {
    this.registrationForm = this.formBuilder.group({
      course_batch_select: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_select: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      course_subject: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
  }

  fetchCourses$Faculty(): void {
    this.loader.showLoader("fetching courses...");
    this.api.getRequest("get-all-course-name").subscribe(
      (res: CourseRes) => {
        this.loader.hideLoader();
        this.coursesFetched = res.data;
        this.loader.showLoader("fetching all facutly...");
        this.api.getRequest("get-all-students").subscribe(
          (res: StudentRes) => {
            this.loader.hideLoader();
            this.studentsFetched = res.data;
          },
          (error) => {
            this.loader.hideLoader();
            this.alertService.promptAlert("Oops...", "something went wrong.");
          }
        );
      },
      (error) => {
        this.loader.hideLoader();
        this.alertService.promptAlert("Oops...", "something went wrong.");
      }
    );
  }

  getCourseName(): string[] {
    return this.coursesFetched ? Object.keys(this.coursesFetched) : [];
  }

  getCourseSubject(): Course[] {
    return this.coursesFetched
      ? this.coursesFetched[
          this.registrationForm.get("course_batch_select").value
        ]
      : [];
  }

  onSubmit(): void {
    this.registrationFormSubmit = true;
    if (this.registrationForm.valid) {
      this.loader.showLoader("enrolling new stdent to course...");
      let body = {
        student_id: this.registrationForm.get("student_select").value,
        course_id: this.registrationForm.get("course_subject").value,
      };
      this.api.postRequest("enroll-student", body).subscribe(
        (res) => {
          this.registrationFormSubmit = false;
          this.loader.hideLoader();
          this.registrationForm.reset();
        },
        (error) => {
          this.loader.hideLoader();
          this.alertService.promptAlert("Oops...", "something went wrong.");
        }
      );
    }
  }
}
