import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { Student, StudentRes } from "src/app/DTOs/student.dto";
import { AlertService } from "src/app/services/alert.service";
import API from "src/app/services/api.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentsComponent implements OnInit {
  studentMarked: number[] = [];
  studentFetched: Student[] = [];
  constructor(
    private api: API,
    private router: Router,
    private alertService: AlertService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.fetchAllStudent();
  }

  fetchAllStudent(): void {
    this.loader.showLoader("fetching all students...");
    this.api.getRequest("get-all-students").subscribe(
      (res: StudentRes) => {
        this.studentFetched = res.data;
        this.loader.hideLoader();
      },
      (error) => {
        this.loader.hideLoader();
        this.alertService.promptAlert("Oops...", "something went wrong.");
      }
    );
  }

  updateCheckedArray(checked: boolean, item: number): void {
    if (checked) {
      this.studentMarked.push(item);
    } else {
      let index = this.studentMarked.indexOf(item);
      this.studentMarked.splice(index, 1);
    }
  }

  addNewStudent(): void {
    this.router.navigate(["add-new-student"]);
  }

  deleteStudent(): void {
    this.loader.showLoader("");
    this.api
      .postRequest("delete-student", { ids: this.studentMarked })
      .subscribe(
        (res) => {
          this.loader.hideLoader();
          this.fetchAllStudent();
        },
        (error) => {
          this.loader.hideLoader();
          this.alertService.promptAlert("Oops...", "somthing went wrong.");
        }
      );
  }

  editStudent(student: Student): void {
    let routerState: NavigationExtras = {
      state: {
        student,
        edit: true,
      },
    };
    this.router.navigate(["edit-student"], routerState);
  }
  seeTransactions(item): void {
    console.log('see transactions');
  }
}
