import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/validateForm';
import { Button } from 'src/app/Interfaces/interfaces';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  goBackButton: Button = {
    icon: 'arrow_back',
    text: 'Go back',
    url: '../',
    class: ['btn2'],
    iconClass: [],
    type: 'button',
    disable: false,
  };

  signUpButton: Button = {
    // Save button configuration
    url: '',
    type: 'submit',
    text: `Sign up`,
    icon: '',
    class: ['fullWidth'],
    iconClass: [], // Scss class list
    disable: false, // Initially disabled until form is valid
  };

  signUpForm!: FormGroup;
  isClient: boolean = true;
  isText: boolean = false;

  constructor(
    private _router: Router,
    private _auth: AuthenticationService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.formSubscribe();
  }

  initializeForm() {
    if (this.isClient) {
      this.signUpForm = new FormGroup(
        {
          firstName: new FormControl(null, Validators.required),
          lastName: new FormControl(null, Validators.required),
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, [
            Validators.required,
            ValidateForm.passwordValidator(),
          ]),
          confirmPassword: new FormControl(null, Validators.required),
          role: new FormControl('Client', Validators.required),
        },
        {
          validators: ValidateForm.confirmPasswordValidator(
            'password',
            'confirmPassword'
          ),
        }
      );
    } else {
      this.signUpForm = new FormGroup(
        {
          companyName: new FormControl(null, Validators.required),
          contactPersonName: new FormControl(null, Validators.required),
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, [
            Validators.required,
            ValidateForm.passwordValidator(),
          ]),
          confirmPassword: new FormControl(null, Validators.required),
          role: new FormControl('Vendor', Validators.required),
        },
        {
          validators: ValidateForm.confirmPasswordValidator(
            'password',
            'confirmPassword'
          ),
        }
      );
    }
  }

  formSubscribe() {
    // Disable confirmPassword field initially
    this.signUpForm.get('confirmPassword')?.disable();

    // Watch for changes in the password field's validity
    this.signUpForm.get('password')?.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.signUpForm.get('confirmPassword')?.enable();
      } else {
        this.signUpForm.get('confirmPassword')?.disable();
      }
    });

    // this.signUpForm.statusChanges.subscribe((status)=> {
    //   this.signUpButton.disable = status !== 'VALID';
    // })
  }

  becomeVendor() {
    this.isClient = false;
    this.initializeForm();
    this.formSubscribe();
  }

  signUpUser() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      if (this.isClient) {
        this._auth.clientSignUp(this.signUpForm.value).subscribe({
          next: (res: any) => {
            console.log(res);
            this.toast.showMessage(res.message, 'success');
            this.signUpForm.reset();
            this._router.navigate(['login']);
          },
          error: (err: any) => {
            console.error(err);
            this.toast.showMessage(err.error, 'error');
          },
        });
      } else {
        this._auth.vendorSignUp(this.signUpForm.value).subscribe({
          next: (res: any) => {
            console.log(res);
            this.toast.showMessage(res.message, 'success');
            this.signUpForm.reset();
            this._router.navigate(['login']);
          },
          error: (err: any) => {
            console.error(err);
            this.toast.showMessage(err.error, 'error');
          },
        });
      }
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
  }
}
