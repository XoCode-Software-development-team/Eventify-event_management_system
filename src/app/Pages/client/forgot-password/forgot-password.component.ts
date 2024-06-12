import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'src/app/Interfaces/interfaces';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  goBackButton: Button = {
    icon: 'arrow_back',
    text: 'Go back',
    url: '/login',
    class: ['btn2'],
    iconClass: [],
    type: 'button',
    disable: false,
  };

  resetButton: Button = {
    // Save button configuration
    url: '',
    type: 'submit',
    text: `Request reset link`,
    icon: '',
    class: ['fullWidth'],
    iconClass: [], // Scss class list
    disable: true, // Initially disabled until form is valid
  };

  emailForm!:FormGroup;
  isButtonLoading:boolean = false;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _resetPwd: ResetPasswordService,
    private _toast:ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.formSubscribe();
  }

  initializeForm() {
    this.emailForm = this._fb.group({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  formSubscribe() {
    this.emailForm.statusChanges.subscribe((status)=> {
      this.resetButton.disable = status !== 'VALID';
    })
  }

  reset() {
    this.isButtonLoading = true;
    if (this.emailForm.valid) {
      // console.log(this.emailForm.value)
      this._resetPwd.sendResetPasswordLink(this.emailForm.value.email).subscribe({
        next:(res:any) => {
          // console.log(res);
          this._toast.showMessage(res.message,'success');
          this.emailForm.reset();
          this._router.navigate(['/login']);
          this.isButtonLoading = false;
        },
        error:(err:any) => {
          // console.log(err);
          this._toast.showMessage("Email doesn't exist!",'error');
          this.isButtonLoading = false;
        }
      })
    }
  }
}
