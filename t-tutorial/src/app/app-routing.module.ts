import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NotesComponent } from "./pages/notes/notes.component";
import { TimetableComponent } from "./pages/timetable/timetable.component";
import { ExamsComponent } from "./pages/exams/exams.component";
import { ResultsComponent } from "./pages/results/results.component";
import { AttendanceComponent } from "./pages/attendance/attendance.component";
import { FacultyComponent } from "./pages/faculty/faculty.component";
import { StudentsComponent } from "./pages/students/students.component";
import { CourseComponent } from "./pages/course/course.component";
import { EnrollStudentToCourseComponent } from "./pages/enroll-student-to-course/enroll-student-to-course.component";
import { TransactionsComponent } from "./pages/transactions/transactions.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { AuthGuard } from "./guard/auth.guard";
import { AddNewFacultyComponent } from "./pages/add-new-faculty/add-new-faculty.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { AddNewCourseComponent } from "./pages/add-new-course/add-new-course.component";
import { AddNewExamComponent } from "./pages/add-new-exam/add-new-exam.component";
import { AddNewStudentComponent } from "./pages/add-new-student/add-new-student.component";
import { AddNewTimetableComponent } from "./pages/add-new-timetable/add-new-timetable.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "time-table",
    pathMatch: "full",
  },
  {
    path: "folder/:ops",
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },
  {
    path: "login",
    component: LoginComponent,
  },
  /* List Operation
  ========================*/
  {
    path: "notes",
    component: NotesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "time-table",
    component: TimetableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "exams",
    component: ExamsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "results",
    component: ResultsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "attendance",
    component: AttendanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "faculty",
    component: FacultyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "students",
    component: StudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "course",
    component: CourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "enroll-students-to-course",
    component: EnrollStudentToCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "transactions",
    component: TransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  /* Add Operation
  ========================*/
  {
    path: "add-new-faculty",
    component: AddNewFacultyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add-new-course",
    component: AddNewCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add-new-exam",
    component: AddNewExamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add-new-student",
    component: AddNewStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add-new-timetable",
    component: AddNewTimetableComponent,
    canActivate: [AuthGuard],
  },
  /* Edit Operation
  ========================*/
  {
    path: "edit-faculty",
    component: AddNewFacultyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit-course",
    component: AddNewCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit-exam",
    component: AddNewExamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit-student",
    component: AddNewStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit-timetable",
    component: AddNewTimetableComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
