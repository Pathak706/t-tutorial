import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Course, CourseRes } from "src/app/DTOs/course.dto";
import { AlertService } from "src/app/services/alert.service";
import API from "src/app/services/api.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit {
  courseFetched: Course[] = [];
  coursesMarked: number[] = [];
  role: number = null;
  userId: number = null;
  constructor(
    private api: API,
    private loader: LoaderService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.fetchAllCourse();
  }

  fetchAllCourse(): void {
    this.loader.showLoader("fetching all courses...");
    this.role = +localStorage.getItem("role");
    this.userId = +localStorage.getItem("id");
    let apiURI =
      this.role === 1 ? `get-all-courses` : `get-all-courses/${this.userId}`;
    this.api.getRequest(apiURI).subscribe(
      (res: CourseRes) => {
        this.courseFetched = res.data;
        this.loader.hideLoader();
      },
      (error) => {
        this.loader.hideLoader();
        this.alertService.promptAlert("Oops...", "something went wrong.");
      }
    );
  }

  updateCheckedCourse(checked: boolean, item: number): void {
    if (checked) {
      this.coursesMarked.push(item);
    } else {
      let index = this.coursesMarked.indexOf(item);
      this.coursesMarked.splice(index, 1);
    }
  }

  addNewCourse(): void {
    this.router.navigate(["add-new-course"]);
  }

  deleteCourses(): void {
    this.loader.showLoader("");
    this.api
      .postRequest("delete-courses", { ids: this.coursesMarked })
      .subscribe(
        (res) => {
          this.loader.hideLoader();
          this.fetchAllCourse();
        },
        (error) => {
          this.loader.hideLoader();
          this.alertService.promptAlert("Oops...", "somthing went wrong.");
        }
      );
  }

  editCourse(course: Course): void {
    let routerState: NavigationExtras = {
      state: {
        course,
        edit: true,
      },
    };
    this.router.navigate(["edit-course"], routerState);
  }
  takeAttendance(item): void {
    console.log("take attendance");
  }
}
