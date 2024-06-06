import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/validateForm';
import { Button } from 'src/app/Interfaces/interfaces';
import { ResetPassword } from 'src/app/Models/reset-password.model';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  
  restPasswordButton: Button = {
    // Save button configuration
    url: '',
    type: 'submit',
    text: `Reset`,
    icon: '',
    class: ['fullWidth'],
    iconClass: [], // Scss class list
    disable: true, // Initially disabled until form is valid
  };

  resetPasswordForm!: FormGroup;
  resetPasswordObj = new ResetPassword();
  emailToReset!:string;
  emailToken!:string;
  isText: boolean = false;

  constructor(
    private _router: Router,
    private _toast: ToastService,
    private _resetPassword: ResetPasswordService,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.formSubscribe();
    this.initializeResetPasswordObj();
  }

  initializeForm() {
    this.resetPasswordForm = new FormGroup(
      {
        password: new FormControl(null, [
          Validators.required,
          ValidateForm.passwordValidator(),
        ]),
        confirmPassword: new FormControl(null, Validators.required),
      },
      {
        validators: ValidateForm.confirmPasswordValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  initializeResetPasswordObj() {
    this._activateRoute.queryParams.subscribe(val => {
      let uriToken = val['code'];
      this.emailToReset = val['email'];
      this.emailToken = uriToken.replace(/ /g,'+');
    })
  }

  formSubscribe() {
    // Disable confirmPassword field initially
    this.resetPasswordForm.get('confirmPassword')?.disable();

    // Watch for changes in the password field's validity
    this.resetPasswordForm
      .get('password')
      ?.statusChanges.subscribe((status) => {
        if (status === 'VALID') {
          this.resetPasswordForm.get('confirmPassword')?.enable();
        } else {
          this.resetPasswordForm.get('confirmPassword')?.disable();
        }
      });

    this.resetPasswordForm.statusChanges.subscribe((status)=> {
      this.restPasswordButton.disable = status !== 'VALID';
    })
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordObj.email=this.emailToReset;
      this.resetPasswordObj.emailToken=this.emailToken;
      this.resetPasswordObj.newPassword=this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword=this.resetPasswordForm.value.confirmPassword;
      console.log(this.resetPasswordObj);
      this._resetPassword.resetPassword(this.resetPasswordObj).subscribe({
        next: (res: any) => {
          console.log(res);
          this._toast.showMessage(res.message, 'success');
          this.resetPasswordForm.reset();
          this._router.navigate(['login']);
        },
        error: (err: any) => {
          console.error(err);
          this._toast.showMessage(err.message, 'error');
        },
      });
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
  }
}
