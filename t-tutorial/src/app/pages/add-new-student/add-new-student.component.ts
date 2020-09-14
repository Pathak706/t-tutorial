import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student, StudentRes } from 'src/app/DTOs/student.dto';
import { AlertService } from 'src/app/services/alert.service';
import API from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.scss'],
})
export class AddNewStudentComponent implements OnInit {
  registrationForm: FormGroup;
  registrationFormSubmit: boolean = false;
  editForm: boolean = false;
  editStudent: Student = null;
  constructor(
    private alertService: AlertService,
    private loader: LoaderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: API
  ) {
    this.defineFormValidationRule();
    this.getLocationState();
  }

  ngOnInit() {}

  ionViewWillEnter(): void {}

  getLocationState(): void {
    this.editStudent = this.router.getCurrentNavigation().extras.state
      ? this.router.getCurrentNavigation().extras.state.student
      : null;
    this.editForm = this.router.getCurrentNavigation().extras.state
      ? this.router.getCurrentNavigation().extras.state.edit
      : false;
    if (this.editForm && this.editStudent) {
      this.setEditDataValue();
    }
  }

  defineFormValidationRule(): void {
    this.registrationForm = this.formBuilder.group({
      first_name: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      last_name: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/\S+@\S+\.\S+/),
        ])
      ),
      password: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  setEditDataValue(): void {
    this.registrationForm.get("password").clearValidators();
    this.registrationForm.patchValue({
      first_name: this.editStudent.first_name,
      last_name: this.editStudent.last_name,
      email: this.editStudent.email,
    });
  }

  onSubmit(): void {
    this.registrationFormSubmit = true;
    if (this.registrationForm.valid) {
      this.editForm ? this.updateStudent() : this.addNewStudent();
    }
  }

  addNewStudent(): void {
    this.loader.showLoader("Adding new student...");
    var body: Student = {
      first_name: this.registrationForm.get("first_name").value,
      last_name: this.registrationForm.get("last_name").value,
      email: this.registrationForm.get("email").value,
      password: this.registrationForm.get("password").value,
    };
    this.api.postRequest("add-student", body).subscribe(
      (res: StudentRes) => {
        this.loader.hideLoader();
        this.router.navigate(["students"]);
      },
      (error) => {
        console.log(error);
        this.loader.hideLoader();
        this.alertService.promptAlert("Oops...", "Something went wrong.");
      }
    );
  }

  updateStudent(): void {
    this.loader.showLoader("Updating student...");
    var body: Student = {
      first_name: this.registrationForm.get("first_name").value,
      last_name: this.registrationForm.get("last_name").value,
      email: this.registrationForm.get("email").value,
    };
    this.api.putRequest(`edit-student/${this.editStudent.id}`, body).subscribe(
      (res: StudentRes) => {
        this.loader.hideLoader();
        this.router.navigate(["students"]);
      },
      (error) => {
        console.log(error);
        this.loader.hideLoader();
        this.alertService.promptAlert("Oops...", "Something went wrong.");
      }
    );
  }
}
