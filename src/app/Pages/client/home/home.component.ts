import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userName : string = '';
  public role : string = '';
  public id : string = '';

  public service:any;



constructor(private _auth:AuthenticationService,private _userStore:UserStoreService,private _service:ServiceAndResourceService) {}

ngOnInit(): void {
    this._userStore.getUserNameFromStore().subscribe(
      (val)=> {
        const userNameFromToken = this._auth.getUserNameFromToken();
        this.userName = val || userNameFromToken;
      }
    )
    this._userStore.getRoleFromStore().subscribe(
      (val)=> {
        const roleFromToken = this._auth.getRoleFromToken();
        this.role = val || roleFromToken;
      }
    )    
    this._userStore.getIdFromStore().subscribe(
      (val)=> {
        const idFromToken = this._auth.getIdFromToken();
        this.id = val || idFromToken;
      }
    )
    // this.temp();
}

  signOut(){
    this._auth.logout();
  }


  temp() {
    this._service.getPriceModelsList().subscribe({
      next:(res:any) => {
        this.service = res;
      },
      error: err => console.log(err)
    })
  }


}
