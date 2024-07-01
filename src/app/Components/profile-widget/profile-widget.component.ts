import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { EventService } from 'src/app/Services/event.service';
import { UserProfileService } from 'src/app/Services/user-profile.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.scss']
})
export class ProfileWidgetComponent {
  allEvents: any[] = [];
  isLoading: boolean = false;
  numberOfEvents: number = 0;
  userImage: string = '';
  userName: string = '';
  firstName: string = '';
  defaultImage: string = '../../../assets/default/user.png'; 

  constructor(
    private _auth: AuthenticationService,
    private _userStore: UserStoreService,
    private _userProfile: UserProfileService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this._userStore.getUserNameFromStore().subscribe((val) => {
      const userNameFromToken = this._auth.getUserNameFromToken();
      this.userName = val || userNameFromToken;
      this.firstName = this.userName.split(' ')[0];
      this.fetchEventDetails();
    });

    // Get the user avatar
    this.getAvatar();
  }

  getAvatar() {
    this._userProfile.getUserImage().subscribe(
      (val) => {
        this.userImage = val || this.defaultImage; 
      },
      (error) => {
        this.userImage = this.defaultImage; // Use default image in case of error
        console.error('Error fetching user image:', error);
      }
    );
  }

  fetchEventDetails(): void {
    this.isLoading = true;
    this.eventService.getAllEvents().subscribe(
      allEvents => {
        console.log(allEvents)
        this.allEvents = allEvents;
        this.numberOfEvents = this.allEvents.length; // Set the number of events
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching events:', error);
        this.isLoading = false;
      }
    );
  }
}
