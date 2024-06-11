import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { Button } from 'src/app/Interfaces/interfaces';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ToastService } from 'src/app/Services/toast.service';
import { UserProfileService } from 'src/app/Services/user-profile.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  deleteButton: Button = {
    // Reset button configuration
    url: '',
    type: 'button',
    text: 'Delete avatar',
    icon: '',
    class: ['btn3', 'btn'],
    iconClass: [],
    disable: false,
  };

  updateImageButton: Button = {
    // Save button configuration
    url: '',
    type: 'button',
    text: `Update avatar`,
    icon: '',
    class: [''],
    iconClass: [], // Scss class list
    disable: false, // Initially disabled until form is valid
  };

  saveButton: Button = {
    // Save button configuration
    url: '',
    type: 'submit',
    text: `Save details`,
    icon: '',
    class: [''],
    iconClass: [], // Scss class list
    disable: true, // Initially disabled until form is valid
  };

  deleteAccount: Button = {
    // Reset button configuration
    url: '',
    type: 'button',
    text: 'Delete account',
    icon: '',
    class: ['btn3', 'btn'],
    iconClass: [],
    disable: false,
  };

  editButton: Button = {
    url: '',
    type: 'button',
    text: 'Edit profile',
    icon: 'edit',
    class: [],
    iconClass: [],
    disable: false,
  };

  navbar: { Tag: string; Url: string | null }[] = [];
  role: string = '';
  editProfileForm!: FormGroup;
  userImage!: string;
  isReadOnly: boolean = true;
  isProfile: boolean = true;
  routerSubscription: Subscription | undefined;

  constructor(
    private _fb: FormBuilder,
    private _userProfile: UserProfileService,
    private _fireStorage: AngularFireStorage,
    private _toast: ToastService,
    private _auth: AuthenticationService,
    private _userStore: UserStoreService,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setNavBar();

    this._activateRoute.url.subscribe((UrlSegment) => {
      this.isProfile = UrlSegment[0].path === 'profile';
    });

    if (this.isProfile) {
      this.findUserRole();
      this.getUserImage();
    }
  }

  ngAfterContentInit(): void {
    if (this.isProfile) {
      this.getUserDetails();
    }
    this.initializeForm();
  }

  ngOnDestroy(): void {}

  findUserRole() {
    this._userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this._auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  setNavBar() {
    this.navbar = [
      {
        Tag: 'Profile',
        Url: '../profile',
      },
      {
        Tag: 'Password',
        Url: '../password',
      },
    ];
  }

  editProfile() {
    if (this.editProfileForm.valid) {
      console.log(this.editProfileForm.value);
      this._userProfile
        .updateUserDetails(this.editProfileForm.value)
        .subscribe({
          next: (res: any) => {
            this._toast.showMessage(res.message, 'success');
            this.isReadOnly = !this.isReadOnly;
          },
          error: (err: any) => {
            console.log(err);
            this._toast.showMessage(err.message, 'error');
          },
        });
    }
  }

  deleteUser() {
    this._userProfile.deleteUser().subscribe({
      next: (res: any) => {
        this._toast.showMessage(res.message, 'success');
        this._auth.logout();
      },
      error: (err: any) => {
        console.log(err);
        this._toast.showMessage(err.message, 'error');
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
      // Handle the file upload logic here, e.g., upload to the server

      this.updateImageInDatabase(file);
    }
  }

  async updateImageInDatabase(file: File) {
    let fileUrls: string[] = [];

    await this.getFirebaseLink([file], fileUrls, 'Avatar');
    console.log(fileUrls[0]);
    let imageUrl = fileUrls[0];
    this._userProfile.updateAvatar(imageUrl).subscribe({
      next: (res: any) => {
        console.log(res);
        this._toast.showMessage(res.message, 'success');
        this.userImage = imageUrl;
        this._userProfile.setUserImage(imageUrl);
      },
      error: (err: any) => {
        console.log(err);
        this._toast.showMessage(err.message, 'error');
      },
    });
  }

  async getFirebaseLink(
    files: File[],
    fileUrls: string[],
    fileContent: string
  ) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file);
        const path = `User-${fileContent}/${file.name}`;
        const uploadTask = await this._fireStorage.upload(path, file);
        const url = await uploadTask.ref.getDownloadURL();
        fileUrls.push(url); // Push URL to array
      }
    }
  }

  // Delete file from firebase
  async deleteFiles(filePaths: string[]) {
    try {
      // Loop through each file path in the array
      for (const filePath of filePaths) {
        // Delete the file
        await this._fireStorage.storage.refFromURL(filePath).delete();
        console.log('file deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting files:', error);
    }
  }

  initializeForm() {
    this.editProfileForm = this._fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      contactPersonName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      houseNo: new FormControl(''),
      city: new FormControl(''),
      road: new FormControl(''),
      street: new FormControl(''),
    });

    this.editProfileForm.statusChanges.subscribe((status) => {
      this.saveButton.disable = status !== 'VALID';
      // console.log(status)
    });
  }

  getUserImage() {
    this._userProfile.getUserAvatar().subscribe({
      next: (res: any) => {
        console.log(res);
        this.userImage = res.userImage;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteProfilePicture() {
    this._userProfile.deleteAvatar().subscribe({
      next: (res: any) => {
        console.log(res);
        this.deleteFiles([this.userImage]);
        this.getUserImage();
        this._toast.showMessage(res.message, 'success');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getUserDetails() {
    this._userProfile.getUserDetails().subscribe({
      next: (res: any) => {
        console.log(res);
        this.editProfileForm.patchValue({
          firstName: res.userDetails.firstName,
          lastName: res.userDetails.lastName,
          companyName: res.userDetails.companyName,
          contactPersonName: res.userDetails.contactPersonName,
          email: res.userDetails.email,
          phoneNumber: res.userDetails.phoneNumber,
          houseNo: res.userDetails.houseNo,
          city: res.userDetails.city,
          road: res.userDetails.road,
          street: res.userDetails.street,
        });

        if (this.role === 'Client') {
          this.editProfileForm.removeControl('companyName');
          this.editProfileForm.removeControl('contactPersonName');
        } else if (this.role === 'Vendor') {
          this.editProfileForm.removeControl('firstName');
          this.editProfileForm.removeControl('lastName');
        } else {
          this.editProfileForm.removeControl('firstName');
          this.editProfileForm.removeControl('lastName');
          this.editProfileForm.removeControl('companyName');
          this.editProfileForm.removeControl('contactPersonName');
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  toggleReadOnly() {
    this.isReadOnly = !this.isReadOnly;
  }
}
