import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { NotesComponent } from "./pages/notes/notes.component";
import { TimetableComponent } from "./pages/timetable/timetable.component";
import { ExamsComponent } from "./pages/exams/exams.component";
import { ResultsComponent } from "./pages/results/results.component";
import { TransactionsComponent } from "./pages/transactions/transactions.component";
import { EnrollStudentToCourseComponent } from "./pages/enroll-student-to-course/enroll-student-to-course.component";
import { CourseComponent } from "./pages/course/course.component";
import { AttendanceComponent } from "./pages/attendance/attendance.component";
import { FacultyComponent } from "./pages/faculty/faculty.component";
import { StudentsComponent } from "./pages/students/students.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthenticationService } from "./services/authentication.service";
import { LoginComponent } from "./pages/auth/login/login.component";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddNewFacultyComponent } from "./pages/add-new-faculty/add-new-faculty.component";
import { AddNewCourseComponent } from "./pages/add-new-course/add-new-course.component";
import { AddNewExamComponent } from "./pages/add-new-exam/add-new-exam.component";
import { AddNewStudentComponent } from "./pages/add-new-student/add-new-student.component";
import { AddNewTimetableComponent } from "./pages/add-new-timetable/add-new-timetable.component";
import { NgxQRCodeModule } from "ngx-qrcode2";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    TimetableComponent,
    ExamsComponent,
    ResultsComponent,
    AttendanceComponent,
    FacultyComponent,
    StudentsComponent,
    CourseComponent,
    EnrollStudentToCourseComponent,
    TransactionsComponent,
    LoginComponent,
    AddNewFacultyComponent,
    AddNewCourseComponent,
    AddNewExamComponent,
    AddNewStudentComponent,
    AddNewTimetableComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticationService,
    BarcodeScanner,
    InAppBrowser
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
