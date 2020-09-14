import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Timetable, TimetableRes } from "src/app/DTOs/timetable.dto";
import { AlertService } from "src/app/services/alert.service";
import API from "src/app/services/api.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-timetable",
  templateUrl: "./timetable.component.html",
  styleUrls: ["./timetable.component.scss"],
})
export class TimetableComponent implements OnInit {
  fetchedTimetable: Timetable[] = [];
  timetableMarked: number[] = [];
  role: number = null;
  email: string = null;
  constructor(
    private api: API,
    private router: Router,
    private loader: LoaderService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  ionViewDidEnter(): void {
    this.role = +localStorage.getItem("role");
    this.email = localStorage.getItem("email");
    this.fetchAllTimetable();
  }

  fetchAllTimetable(): void {
    this.loader.showLoader("Fetching all timetable...");
    let apiURI =
      this.role === 3
        ? `get-student-timetable/${this.email}`
        : this.role === 2
        ? `get-faculty-timetable/${this.email}`
        : `get-all-timetable`;

    this.api.getRequest(apiURI).subscribe(
      (res: TimetableRes) => {
        this.role === 3
          ? this.studentSetUp(res)
          : this.role === 2
          ? this.facultySetUp(res)
          : this.adminSetUp(res);
        this.loader.hideLoader();
      },
      (error) => {
        this.loader.hideLoader();
        this.alertService.promptAlert("Oops...", "something went wrong.");
      }
    );
  }

  adminSetUp(res): void {
    let result = res.data.map((item) => {
      return {
        ...item,
        start_time_v: this.api.timeStamp(item.start_time),
        end_time_v: this.api.timeStamp(item.end_time),
      };
    });
    this.fetchedTimetable = result;
  }

  facultySetUp(res): void {
    let result = res.data.map((item) => {
      return {
        ...item,
        ...item.get_course,
        start_time_v: this.api.timeStamp(item.start_time),
        end_time_v: this.api.timeStamp(item.end_time),
      };
    });
    this.fetchedTimetable = result;
  }

  studentSetUp(res): void {
    let result = res.data.map((item) => {
      return {
        ...item,
        ...item.get_timetable,
        ...item.get_timetable.get_course,
        start_time_v: this.api.timeStamp(item.get_timetable.start_time),
        end_time_v: this.api.timeStamp(item.get_timetable.end_time),
      };
    });
    this.fetchedTimetable = result;
  }

  updateCheckedArray(checked: boolean, item: number): void {
    if (checked) {
      this.timetableMarked.push(item);
    } else {
      let index = this.timetableMarked.indexOf(item);
      this.timetableMarked.splice(index, 1);
    }
  }

  takeAttendance(item) {
    console.log("take attandance", item);
  }

  addNewTimetable(): void {
    this.router.navigate(["add-new-timetable"]);
  }

  deleteTimetable(): void {
    this.loader.showLoader("");
    this.api
      .postRequest("delete-timetable", { ids: this.timetableMarked })
      .subscribe(
        (res) => {
          this.loader.hideLoader();
          this.fetchAllTimetable();
        },
        (error) => {
          this.loader.hideLoader();
          this.alertService.promptAlert("Oops...", "somthing went wrong.");
        }
      );
  }

  editTimetable(timetable: Timetable): void {
    let routerState: NavigationExtras = {
      state: {
        timetable,
        edit: true,
      },
    };
    this.router.navigate(["edit-timetable"], routerState);
  }
}
