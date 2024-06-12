import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/validateForm';
import { Button } from 'src/app/Interfaces/interfaces';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ToastService } from 'src/app/Services/toast.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  loginButton: Button = {
    // Save button configuration
    url: '',
    type: 'submit',
    text: `Login`,
    icon: '',
    class: ['fullWidth'],
    iconClass: [], // Scss class list
    disable: true, // Initially disabled until form is valid
  };

  loginForm!: FormGroup;
  isText: boolean = false;
  isButtonLoading:boolean = false;

  constructor(
    private _router: Router,
    private _auth: AuthenticationService,
    private _toast: ToastService,
    private _userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.formSubscribe();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        ValidateForm.passwordValidator(),
      ]),
    });
  }

  formSubscribe() {
    this.loginForm.statusChanges.subscribe((status)=> {
      this.loginButton.disable = status !== 'VALID';
    })
  }

  adminLogin() {
    this.isButtonLoading = true;
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      this._auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          // console.log(res);
          this._toast.showMessage(res.message, 'success');
          this.loginForm.reset();

          //Store the token after login
          this._auth.storeToken(res.token.accessToken);
          this._auth.storeRefreshToken(res.token.refreshToken);

          const tokenPayload = this._auth.decodedToken();
          this._userStore.setIdForStore(tokenPayload.id);
          this._userStore.setUserNameForStore(tokenPayload.name);
          this._userStore.setRoleForStore(tokenPayload.role);

          this.navigate();
        },
        error: (err: any) => {
          // console.log(err);
          this._toast.showMessage(err.error, 'error');
          this.isButtonLoading = false;
        },
      });
    }
  }

  navigate() {
    this._userStore.getRoleFromStore().subscribe((val) => {
      const role = val || this._auth.getRoleFromToken();

      if (role === 'Admin') this._router.navigate(['admin/home']);
      else {
        // console.log('Error user login!');
        this._auth.logout();
      }
      this.isButtonLoading = false;
    });
  }

  createAdmin() {
    this._auth.adminSignUp().subscribe({
      next: (res: any) => {
        this._toast.showMessage(res.message, 'success');
      },
      error: (err: any) => {
        this._toast.showMessage(err, 'error');
      },
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
  }
}
