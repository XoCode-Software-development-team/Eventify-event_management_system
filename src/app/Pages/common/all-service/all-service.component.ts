import { Component } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';
import { Category } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.scss']
})
export class AllServiceComponent {

  constructor(private dialog:MatDialog) {}

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

  Categories: Category[] = [
    {
      id: '1',
      categoryName: 'Catering'
    },
    {
      id: '2',
      categoryName: 'Entertainment'
    },
    {
      id: '3',
      categoryName: 'Decoration'
    },
    {
      id: '4',
      categoryName: 'Photography'
    }
  ];

  services:any = [
    {
      soRId:'1',
      name:'Swan Boat Ride',
      rating:{rate:4.6,count:51},
      vendor:'AquaVista Cruises',
      description:'Immerse yourself in the charm of our Two Swan Board Ride service, where each glide on the water is a poetry of grace and leisure...',
      image:'../../../assets/boat.png'
    },
    {
      soRId:'2',
      name:'Sunset Cruise',
      rating:{rate:4.8,count:78},
      vendor:'Horizon Tours',
      description:'Experience the breathtaking beauty of a sunset over the water on our luxurious Sunset Cruise. Unwind as the colors of the sky paint a mesmerizing panorama...',
      image:'../../../assets/sunset_cruise.png'
    },
    {
      soRId:'3',
      name:'Dolphin Watching Tour',
      rating:{rate:4.5,count:64},
      vendor:'Marine Magic Expeditions',
      description:'Embark on an adventure to spot playful dolphins in their natural habitat with our Dolphin Watching Tour. Witness their graceful dives and flips as they frolic in the waves...',
      image:'../../../assets/dolphin_tour.png'
    },
    {
      soRId:'4',
      name:'Fishing Charter',
      rating:{rate:4.7,count:92},
      vendor:'CatchMaster Charters',
      description:'Cast your line and reel in unforgettable memories on our Fishing Charter. Our experienced crew will guide you to the best spots where the big catches await...',
      image:'../../../assets/fishing_charter.png'
    },
    {
      soRId:'5',
      name:'Snorkeling Expedition',
      rating:{rate:4.9,count:105},
      vendor:'AquaVenture Excursions',
      description:'Explore the vibrant underwater world teeming with life on our Snorkeling Expedition. Dive into crystal-clear waters and encounter colorful coral reefs and exotic marine species...',
      image:'../../../assets/snorkeling.png'
    },
    {
      soRId:'6',
      name:'Island Hopping Tour',
      rating:{rate:4.6,count:67},
      vendor:'Tropical Treks',
      description:'Discover hidden gems and pristine beaches on our Island Hopping Tour. Hop from one paradise island to another, soaking in the sun, sand, and serenity...',
      image:'../../../assets/island_hopping.png'
    },
    {
      soRId:'7',
      name:'Water Skiing Adventure',
      rating:{rate:4.8,count:82},
      vendor:'Extreme Watersports',
      description:'Feel the rush of adrenaline as you glide over the water on our thrilling Water Skiing Adventure. Perfect for thrill-seekers looking for an exhilarating experience...',
      image:'../../../assets/water_skiing.png'
    },
    {
      soRId:'8',
      name:'Luxury Yacht Charter',
      rating:{rate:4.9,count:113},
      vendor:'Elite Yacht Rentals',
      description:'Indulge in the ultimate luxury experience aboard our exquisite Luxury Yacht Charter. Sail in style and sophistication, pampered by our world-class service and amenities...',
      image:'../../../assets/yacht_charter.png'
    },
    {
      soRId:'9',
      name:'Kayaking Excursion',
      rating:{rate:4.7,count:76},
      vendor:'PaddlePro Adventures',
      description:'Paddle through serene waters and picturesque landscapes on our Kayaking Excursion. Experience nature up close and personal while enjoying a peaceful and invigorating journey...',
      image:'../../../assets/kayaking.png'
    },
    {
      soRId:'10',
      name:'River Rafting Expedition',
      rating:{rate:4.8,count:88},
      vendor:'Wild Rapids Tours',
      description:'Conquer raging rapids and navigate thrilling twists and turns on our River Rafting Expedition. An adrenaline-pumping adventure awaits as you brave the untamed waters...',
      image:'../../../assets/rafting.png'
    }
  ];
  

  popUpNotification() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {
        top: '170px',
        left: '950px'
    };

    this.dialog.open(NotificationBoxComponent, dialogConfig);
  }
}
