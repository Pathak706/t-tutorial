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
import { Timetable, TimetableRes } from "src/app/DTOs/timetable.dto";
import { AlertService } from "src/app/services/alert.service";
import API from "src/app/services/api.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-add-new-timetable",
  templateUrl: "./add-new-timetable.component.html",
  styleUrls: ["./add-new-timetable.component.scss"],
})
export class AddNewTimetableComponent implements OnInit {
  registrationForm: FormGroup;
  coursesFetched: any = null;
  facultyFetched: Faculty[] = [];
  registrationFormSubmit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private api: API,
    private loader: LoaderService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.defineFormValidationRule();
  }

  ngOnInit() {}

  ionViewWillEnter(): void {
    this.fetchAllCourses$Faculty();
  }

  defineFormValidationRule(): void {
    this.registrationForm = this.formBuilder.group({
      timetable_course_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      timetable_course_subject: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      timetable_faculty: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      timetable_start_time: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      timetable_end_time: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
  }

  fetchAllCourses$Faculty(): void {
    this.loader.showLoader("fetching course details...");
    this.api.getRequest("get-all-course-name").subscribe(
      (res: CourseRes) => {
        this.coursesFetched = res.data;
        this.loader.hideLoader();
        this.loader.showLoader("fetching all faculty...");
        this.api.getRequest("get-all-faculty").subscribe(
          (res: FacultyRes) => {
            this.facultyFetched = res.data;
            this.loader.hideLoader();
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
          this.registrationForm.get("timetable_course_name").value
        ]
      : [];
  }

  onSubmit(): void {
    this.registrationFormSubmit = true;
    if (this.registrationForm.valid) {
      this.loader.showLoader("creating new lecture...");
      let body: Timetable = {
        start_time: this.registrationForm.get("timetable_start_time").value,
        end_time: this.registrationForm.get("timetable_end_time").value,
        course_id: this.registrationForm.get("timetable_course_subject").value,
        faculty_id: this.registrationForm.get("timetable_faculty").value,
      };
      this.api.postRequest("add-timetable", body).subscribe(
        (res: TimetableRes) => {
          this.registrationFormSubmit = false;
          this.loader.hideLoader();
          this.router.navigate(["time-table"]);
        },
        (error) => {
          this.loader.hideLoader();
          this.alertService.promptAlert("Oops...", "something went wrong.");
        }
      );
    }
  }
}
