import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('slider', { static: true }) slider!: ElementRef;
  cards = [
    { image: 'assets/Images/Security.png', title: 'Secure Login', description: ' Clients and vendors can securely log in using unique credentials, ensuring data privacy and access control' },
    { image: 'assets/Images/User.png', title: 'Good Customer Experience', description: 'Efficiently manage vendors with Create, Read, Update, and Delete operations, ensuring accurate and up-to-date information' },
    { image: 'assets/Images/Location 2.png', title: 'Maps with location', description: 'Provide a visual representation of vendor locations through interactive maps, helping clients make informed decisions' },
    { image: 'assets/Images/calendar_month.png', title: 'Calendar Integration', description: ' Integrate a customizable calendar feature to manage appointments, meetings, and events.' },
  ];
  currentIndex = 0;

  moveSlider(direction: number) {
    const sliderWidth = this.slider.nativeElement.offsetWidth;
    const currentTranslateX = this.slider.nativeElement.style.transform
      ? parseInt(this.slider.nativeElement.style.transform.split('(')[1])
      : 0;
    const cardWidth = this.slider.nativeElement.querySelector('.card').offsetWidth;

    const maxTranslateX = -((cardWidth + 20) * (this.cards.length - 1));

    let newTranslateX = currentTranslateX + direction * (cardWidth + 20);

    if (newTranslateX > 0) {
      newTranslateX = 0;
    } else if (newTranslateX < maxTranslateX) {
      newTranslateX = maxTranslateX;
    }

    this.slider.nativeElement.style.transform = `translateX(${newTranslateX}px)`;
    this.currentIndex = -newTranslateX / (cardWidth + 20);
  }

  goToCard(index: number) {
    const cardWidth = this.slider.nativeElement.querySelector('.card').offsetWidth;
    this.slider.nativeElement.style.transform = `translateX(-${index * (cardWidth + 20)}px)`;
    this.currentIndex = index;
  }
}
