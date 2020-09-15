import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthenticationService } from "./services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  public isAuth:boolean  = false;
  public selectedIndex = 0;
  public adminPages = [
    {
      title: "Notes",
      url: "notes",
      icon: "book",
    },
    {
      title: "Time-Table",
      url: "time-table",
      icon: "time",
    },
    {
      title: "Exams",
      url: "exams",
      icon: "copy",
    },
    {
      title: "Results",
      url: "results",
      icon: "document",
    },
    {
      title: "Attendance",
      url: "attendance",
      icon: "barcode",
    },
    {
      title: "Faculty",
      url: "faculty",
      icon: "man",
    },
    {
      title: "Students",
      url: "students",
      icon: "people",
    },
    {
      title: "Course",
      url: "course",
      icon: "medal",
    },
    {
      title: "Enroll Students To Course",
      url: "enroll-students-to-course",
      icon: "school",
    },
  ];
  public facultyPages = [
    {
      title: "Notes",
      url: "notes",
      icon: "book",
    },
    {
      title: "Time-Table",
      url: "time-table",
      icon: "time",
    },
    {
      title: "Exams",
      url: "exams",
      icon: "copy",
    },
    {
      title: "Results",
      url: "results",
      icon: "document",
    },
    {
      title: "Attendance",
      url: "attendance",
      icon: "barcode",
    },
    {
      title: "Students",
      url: "students",
      icon: "people",
    },
    {
      title: "Course",
      url: "course",
      icon: "medal",
    },
    {
      title: "Enroll Students To Course",
      url: "enroll-students-to-course",
      icon: "school",
    },
  ];
  public studentPages = [
    {
      title: "Notes",
      url: "notes",
      icon: "book",
    },
    {
      title: "Time-Table",
      url: "time-table",
      icon: "time",
    },
    {
      title: "Exams",
      url: "exams",
      icon: "copy",
    },
    {
      title: "Results",
      url: "results",
      icon: "document",
    },
    {
      title: "Attendance",
      url: "attendance",
      icon: "barcode",
    },
    {
      title: "Course",
      url: "course",
      icon: "medal",
    },
    {
      title: "Transactions",
      url: "transactions",
      icon: "cash",
    },
  ];

  appPages: any = [];
  role: number = null;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.authState.subscribe((state) => {
        if (state) {
          this.isAuth = state;
          this.router.navigate(["notes"]);
        } else {
          this.router.navigate(["login"], { skipLocationChange: true });
        }
      });
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  getMenuArray() {
    this.role = +localStorage.getItem("role");
    return this.role === 1
      ? this.adminPages
      : this.role === 2
      ? this.facultyPages
      : this.studentPages;
  }
}
