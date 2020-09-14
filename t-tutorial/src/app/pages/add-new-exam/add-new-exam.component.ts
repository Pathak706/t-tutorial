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
import { AlertService } from "src/app/services/alert.service";
import API from "src/app/services/api.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-add-new-exam",
  templateUrl: "./add-new-exam.component.html",
  styleUrls: ["./add-new-exam.component.scss"],
})
export class AddNewExamComponent implements OnInit {
  questionsCount: any;
  isQuestionCountSet: boolean = false;
  exam_questions: any = [
    { question: null, answer: null, A: null, B: null, C: null, D: null },
    { question: null, answer: null, A: null, B: null, C: null, D: null },
    { question: null, answer: null, A: null, B: null, C: null, D: null },
    { question: null, answer: null, A: null, B: null, C: null, D: null },
    { question: null, answer: null, A: null, B: null, C: null, D: null },
    { question: null, answer: null, A: null, B: null, C: null, D: null },
    { question: null, answer: null, A: null, B: null, C: null, D: null },
    { question: null, answer: null, A: null, B: null, C: null, D: null },
    { question: null, answer: null, A: null, B: null, C: null, D: null },
    { question: null, answer: null, A: null, B: null, C: null, D: null },
  ];
  registrationForm: FormGroup;
  coursesFetched: any = null;
  facultyFetched: Faculty[] = [];
  registrationFormSubmit: boolean = false;
  role: number = null;
  facultyId: number = null;
  constructor(
    private formBuilder: FormBuilder,
    private api: API,
    private loader: LoaderService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.defineFormValidationRule();
  }

  ngOnInit() {
    this.role = +localStorage.getItem("role");
    this.facultyId = +localStorage.getItem("id");
    this.fetchAllCourses$Faculty();
  }

  fetchAllCourses$Faculty(): void {
    this.loader.showLoader("fetching course details...");
    let apiURI =
      this.role === 2
        ? `get-all-course-name/${this.facultyId}`
        : `get-all-course-name`;
    this.api.getRequest(apiURI).subscribe(
      (res: CourseRes) => {
        this.coursesFetched = res.data;
        this.loader.hideLoader();
        if (this.role === 1) {
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
        } else {
          this.registrationForm.patchValue({
            exam_faculty: this.facultyId,
          });
        }
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
          this.registrationForm.get("exam_course_batch").value
        ]
      : [];
  }

  onSubmit(): void {
    this.registrationFormSubmit = true;
    this.createExam();
  }

  defineFormValidationRule(): void {
    this.registrationForm = this.formBuilder.group({
      exam_question_count: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),

      exam_course_batch: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      exam_course_subject: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      exam_faculty: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),

      exam_question_0: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      question_0_option_1: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      question_0_option_2: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      question_0_option_3: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      question_0_option_4: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),

      exam_question_1: new FormControl(""),
      question_1_option_1: new FormControl(""),
      question_1_option_2: new FormControl(""),
      question_1_option_3: new FormControl(""),
      question_1_option_4: new FormControl(""),

      exam_question_2: new FormControl(""),
      question_2_option_1: new FormControl(""),
      question_2_option_2: new FormControl(""),
      question_2_option_3: new FormControl(""),
      question_2_option_4: new FormControl(""),

      exam_question_3: new FormControl(""),
      question_3_option_1: new FormControl(""),
      question_3_option_2: new FormControl(""),
      question_3_option_3: new FormControl(""),
      question_3_option_4: new FormControl(""),

      exam_question_4: new FormControl(""),
      question_4_option_1: new FormControl(""),
      question_4_option_2: new FormControl(""),
      question_4_option_3: new FormControl(""),
      question_4_option_4: new FormControl(""),

      exam_question_5: new FormControl(""),
      question_5_option_1: new FormControl(""),
      question_5_option_2: new FormControl(""),
      question_5_option_3: new FormControl(""),
      question_5_option_4: new FormControl(""),
    });
  }

  createExam() {
    // VALIDATE THE FORM
    let index = 0;
    let isValid = true;
    let body = this.exam_questions.slice(0, parseInt(this.questionsCount));
    while (index < parseInt(this.questionsCount)) {
      console.log(index, this.exam_questions);
      if (
        this.exam_questions[index]["question"] == null ||
        this.exam_questions[index]["answer"] == null ||
        this.exam_questions[index]["A"] == null ||
        this.exam_questions[index]["B"] == null ||
        this.exam_questions[index]["C"] == null ||
        this.exam_questions[index]["D"] == null
      ) {
        this.alertService.promptAlert("Oops...", "Please check form.");
        isValid = false;
        break;
      }
      index++;
    }
    if (isValid) {
      let obj = {
        exam_set: body,
        faculty_id: this.registrationForm.get("exam_faculty").value,
        course_batch: this.registrationForm.get("exam_course_batch").value,
        course_subject: this.registrationForm.get("exam_course_subject").value,
      };
      this.loader.showLoader("creating new exam...");
      this.api.postRequest("add-exam", obj).subscribe(
        (data) => {
          this.registrationFormSubmit = false;
          this.loader.hideLoader();
          this.router.navigate(["exams"]);
        },
        (error) => {
          this.loader.hideLoader();
          this.alertService.promptAlert("Oops...", "Something went wrong");
        }
      );
    }
  }

  examQuestionCounts($event) {
    this.questionsCount = $event.detail.value;
    this.isQuestionCountSet = true;
  }

  getQuestionsArray() {
    let array = new Array(parseInt(this.questionsCount));
    return array;
  }

  questionNumber(index) {
    index++;
    return "Question " + index;
  }

  questionChanged($event, index) {
    this.exam_questions[index]["question"] = $event.detail.value;
  }

  optionChanged($event, index, offset) {
    this.exam_questions[index][offset] = $event.detail.value;
  }

  radioButtonChecked($event, index, offset) {
    this.exam_questions[index]["answer"] = $event.target.value;
  }

  getQuestionControlName(index) {
    return "exam_question_" + index;
  }

  getIsQuestionValid(index) {
    return true;
  }

  getIsOptionValid(index, offset) {
    return true;
  }

  getOptionName(index, offset) {
    return "question_" + index + "_option_" + offset;
  }

  getRadioValue(index, offset) {
    return this.registrationForm.get("question_" + index + "_option_" + offset)
      .value;
  }
}
