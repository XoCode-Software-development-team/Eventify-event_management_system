import { Component } from '@angular/core';
import { PdfGeneratorService } from 'src/app/Services/pdf-generator.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent {
  formData: any = null;
  popupVisible: boolean = false;
 
  constructor(private pdfGeneratorService: PdfGeneratorService) { }
  createToDoForm(event: any) {
    this.formData = event;
    this.popupVisible = true;
  }
  
  closePopup() {
    this.popupVisible = false;
  }
  
  formatTime(time: string): string {
    if (!time) return time;
  
    // Split the time string into hours and minutes
    const [hours, minutes] = time.split(':').map(Number);
  
    // Determine AM or PM suffix
    const suffix = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours from 24-hour time to 12-hour time
    const formattedHours = hours % 12 || 12; // convert 0 to 12
  
    // Return the formatted time string
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${suffix}`;
  }
  
  generatePdf() {
    if (this.formData) {
      const fileName = `${this.formData.title}_agenda.pdf`
      this.pdfGeneratorService.generatePdf(this.formData, fileName);
    }
  }
}
