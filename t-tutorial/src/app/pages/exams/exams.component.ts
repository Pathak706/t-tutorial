import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Exams, ExamsRes } from "src/app/DTOs/exams.dto";
import { AlertService } from "src/app/services/alert.service";
import API from "src/app/services/api.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-exams",
  templateUrl: "./exams.component.html",
  styleUrls: ["./exams.component.scss"],
})
export class ExamsComponent implements OnInit {
  exmasFetched: Exams[] = [];
  role: number = null;
  userId: number = null;
  constructor(
    private api: API,
    private router: Router,
    private loader: LoaderService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  ionViewDidEnter(): void {
    this.role = +localStorage.getItem("role");
    this.userId = +localStorage.getItem("id");
    this.fetchAllExams();
  }

  fetchAllExams(): void {
    this.loader.showLoader("fetching all exams...");
    let apiURI =
      this.role === 1 ? `get-all-exams` : `get-all-exams/${this.userId}`;
    this.api.getRequest(apiURI).subscribe(
      (res: ExamsRes) => {
        this.loader.hideLoader();
        this.exmasFetched = Object.keys(res.data).map((item) => {
          return {
            ...res.data[item][0],
          };
        });
        console.log(this.exmasFetched);
      },
      (error) => {
        this.loader.hideLoader();
        this.alertService.promptAlert("Oops...", "something went wrong.");
      }
    );
  }

  addNewExams(): void {
    this.router.navigate(["add-new-exam"]);
  }
  takeAttendance(item): void {
    console.log("take attendance");
  }
}
