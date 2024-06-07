import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/validateForm';
import { Button } from 'src/app/Interfaces/interfaces';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ToastService } from 'src/app/Services/toast.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  goBackButton: Button = {
    icon: 'arrow_back',
    text: 'Go back',
    url: '../',
    class: ['btn2'],
    iconClass: [],
    type: 'button',
    disable: false,
  };

  loginButton: Button = {
    // Save button configuration
    url: '',
    type: 'submit',
    text: `Login`,
    icon: '',
    class: ['fullWidth'],
    iconClass: [], // Scss class list
    disable: false, // Initially disabled until form is valid
  };

  loginForm!: FormGroup;
  isText: boolean = false;

  constructor(
    private _router: Router,
    private _auth: AuthenticationService,
    private toast: ToastService,
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
    // this.loginForm.statusChanges.subscribe((status)=> {
    //   this.loginButton.disable = status !== 'VALID';
    // })
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this._auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          //Store the token after login
          this._auth.storeToken(res.token.accessToken);
          this._auth.storeRefreshToken(res.token.refreshToken);

          const tokenPayload = this._auth.decodedToken();
          this._userStore.setIdForStore(tokenPayload.id);
          this._userStore.setUserNameForStore(tokenPayload.name);
          this._userStore.setRoleForStore(tokenPayload.role);

          this.navigate(res.message);
        },
        error: (err: any) => {
          console.log(err);
          this.toast.showMessage(err, 'error');
        },
      });
    }
  }

  navigate(message: string) {
    this._userStore.getRoleFromStore().subscribe((val) => {
      const role = val || this._auth.getRoleFromToken();

      if (role === 'Client') {
        this.loginForm.reset();
        this._router.navigate(['home']);
        this.toast.showMessage(message, 'success');
      } else if (role === 'Vendor') {
        this.loginForm.reset();
        this._router.navigate(['vendor/home']);
        this.toast.showMessage(message, 'success');
      } else if (role === 'Admin') {
        console.log('Error user login!');
        this.toast.showMessage('Error user login!', 'error');
        this._auth.logout();
      } else {
        console.log('Error user role!');
        this._auth.logout();
      }
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
  }
}
