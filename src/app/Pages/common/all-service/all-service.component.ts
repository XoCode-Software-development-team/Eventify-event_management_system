import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';
import { Category, servicesCard } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.scss']
})
export class AllServiceComponent implements OnInit {

  constructor(private dialog:MatDialog, private _service: ServiceService) {}

  ngOnInit(): void {
      this.getAllCategories();
      this.getMaxPrice();
      this.getServices();
  }

  navbar = [
    {
      Tag: 'All Services',
      Url: 'allServices',
    },
    {
      Tag: 'Delete Requests',
      Url: 'deleteRequests',
    },
  ];

  icons = [
    {
      Name: 'compare',
      Url: '',
    },
    {
      Name: 'chat_bubble_outline',
      Url: '',
    },
    {
      Name: 'notifications_none',
      Url: 'notification',
    },
  ];


  maxPrice:number = 0;
  categories: Category[] = [];

  services: servicesCard[] = [];

  // Function to truncate text and add "..." if it exceeds the maximum length
  truncateText(text: string | null | undefined, maxLength: number): string {
    if (text && text.length <= maxLength) {
      return text;
    } else if (text) {
      return text.substring(0, maxLength) + '...';
    } else {
      return '';
    }
  }
  

  getServices() {
    this._service.getServicesForClients().subscribe({
      next: (res:any) => {
        console.log(res);
        this.services = res.map((item:any) => ({
          soRId: item.soRId,
          name: item.name,
          rating: {
            rate: item.rating.rate,
            count: item.rating.count
          },
          vendor: item.vendor,
          description: this.truncateText(item.description,150),
          image: item.images.length > 0 ? item.images[0] : '../../../assets/defaultService.jpg'
        }));
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  getMaxPrice() {
    this._service.getMaxPriceOfService().subscribe({
      next: (res:any) => {
        this.maxPrice = res;
        console.log(res);
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  getAllCategories() {
    this._service.getCategoriesList().subscribe({
      next: (res: any) => {
        this.categories = res.map((item:any) => ({
          id: item.categoryId,
          categoryName:item.serviceCategoryName
        }))
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  

  popUpNotification() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {
        top: '170px',
        left: '950px'
    };

    this.dialog.open(NotificationBoxComponent, dialogConfig);
  }
}
