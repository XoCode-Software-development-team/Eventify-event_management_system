import { Component } from '@angular/core';

interface SubSection {
  subtitle: string;
  content: string;
}

interface GuideSection {
  title: string;
  content: string | SubSection[];
}

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.scss']
})
export class UserGuideComponent {
  selectedSectionIndex: number = 0;

  guideSections: GuideSection[] = [
    {
      title: 'Introduction',
      content: 'Welcome to Eventify, the ultimate tool for managing your events with ease. Whether you\'re organizing a small gathering or a large conference, Eventify has the features you need to ensure everything runs smoothly. Our platform integrates various functionalities to help you coordinate tasks, communicate with vendors, and keep track of every detail. With Eventify, you can focus on making your event a success while we handle the complexities of event management.',

    },
    {
      title: 'Getting Started',
      content: [
        {
          subtitle: '1. Registration and Login',
          content: `
          Register: Visit our registration page and fill in your details to create an account.
          Login: Use your username and password to log into the system.`
        },
        {
          subtitle: '2. Navigating the Dashboard',
          content: `
          Client Dashboard: View upcoming events, checklists, vendor comparisons, and more.
          Vendor Dashboard: Manage your service listings, update availability, and communicate with clients.`
        },
        {
          subtitle: '3. Creating an Event',
          content: `
          New Event: Click on 'Create Event' and fill in the event details such as date, time, and location.
          Select Vendors: Browse through vendors, compare their services, and select the ones that fit your event needs.
          Checklist and Agenda: Use our AI chat support to generate a customized checklist and agenda for your event.`
        },
        {
          subtitle: '3. Feedback and Reviews',
          content: `
          Leaving Feedback: Instructions on how to leave feedback for vendors and event organizers.
          Reviewing Vendors: Steps to review vendors based on your experience with their services.`
        }
      ],
    },
    {
      title: 'Advanced Features',
      content: [
        {
          subtitle: '1. AI Chat Support',
          content: `
           Planning Assistance: Get AI-driven recommendations for your event checklist and agenda.
          Vendor Suggestions: Receive suggestions based on your event requirements and preferences.`
        },
        {
          subtitle: '2. Live Chat',
          content: `
          Client-Vendor Communication: Use the live chat feature to communicate directly with vendors, ask questions, and clarify details in real-time`
        },
        {
          subtitle: '3. Vendor Management',
          content: `
          Service Listings: Vendors can upload and update details of their services, making it easy for clients to find and select the best options.`
        }
      ],
    },
    {
      title: 'Technical Details',
      content: [
        {
          subtitle: '1. Technologies Used',
          content: `
          Frontend:  Angular 16 and Material UI for a modern and responsive user interface.
          Backend:  .NET 8 Preview Version for robust server-side operations.
          Database:  MySQL for efficient data management and retrieval.`
        }
 
      ],
    }
  ];

  selectedSection: GuideSection = this.guideSections[0];
  isContentString: boolean = true;

  selectSection(section: GuideSection, index: number): void {
    this.selectedSection = section;
    this.selectedSectionIndex = index
    this.isContentString = typeof section.content === 'string';
  }


  getSubSections(content: string | SubSection[]): SubSection[] {
    if (typeof content === 'string') {
      return [];
    }
    return content;
  }

  
}
