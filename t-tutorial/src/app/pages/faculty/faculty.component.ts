import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import API from "../../services/api.service";
import { Faculty, FacultyRes } from "../../DTOs/faculty.dto";
import { AlertService } from "src/app/services/alert.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-faculty",
  templateUrl: "./faculty.component.html",
  styleUrls: ["./faculty.component.scss"],
})
export class FacultyComponent implements OnInit {
  facultyMarked: number[] = [];
  facultyFetched: Faculty[] = [];
  constructor(
    private api: API,
    private router: Router,
    private alertService: AlertService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.fetchAllFaculty();
  }

  fetchAllFaculty(): void {
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
  }

  updateCheckedArray(checked: boolean, item: number): void {
    if (checked) {
      this.facultyMarked.push(item);
    } else {
      let index = this.facultyMarked.indexOf(item);
      this.facultyMarked.splice(index, 1);
    }
  }

  addNewFaculty(): void {
    this.router.navigate(["add-new-faculty"]);
  }

  deleteFaculty(): void {
    this.loader.showLoader("");
    this.api
      .postRequest("delete-user", { ids: this.facultyMarked })
      .subscribe(
        (res) => {
          this.loader.hideLoader();
          this.fetchAllFaculty();
        },
        (error) => {
          this.loader.hideLoader();
          this.alertService.promptAlert("Oops...", "somthing went wrong.");
        }
      );
  }

  editFaculty(faculty: Faculty): void {
    let routerState: NavigationExtras = {
      state: {
        faculty,
        edit: true,
      },
    };
    this.router.navigate(["edit-faculty"], routerState);
  }
  
  seeTransactions(item): void {
    console.log('see tranaction');
  }
}
