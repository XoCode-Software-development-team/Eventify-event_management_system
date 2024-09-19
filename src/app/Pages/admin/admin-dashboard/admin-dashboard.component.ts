import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from 'src/app/Services/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  isClientsLoading: boolean = false;
  isVendorsLoading: boolean = false;
  clients: any[] = [];
  vendors: any[] = [];
  displayedClientColumns: string[] = ['No', 'FirstName', 'LastName', 'Email'];
  displayedVendorColumns: string[] = ['No', 'CompanyName', 'VendorRate', 'Email'];

  constructor(private _adminDashboard: AdminDashboardService) {}

  ngOnInit(): void {
    this.getAllClients();
    this.getAllVendors();
  }

  getAllClients() {
    this.isClientsLoading = true;
    this._adminDashboard.getAllClients().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.clients = res;
        this.isClientsLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.isClientsLoading = false;
      },
    });
  }

  getAllVendors() {
    this.isVendorsLoading = true;
    this._adminDashboard.getAllVendors().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.vendors = res;
        this.isVendorsLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.isVendorsLoading = false;
      },
    });
  }
}
