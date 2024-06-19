import { Component } from '@angular/core';
import { ChecklistAgendaService } from 'src/app/Services/checklist-agenda.service';
import { PdfGeneratorService } from 'src/app/Services/pdf-generator.service';

export interface CheckList {
  id: number | undefined;
  date: string; // or Date, depending on your usage
  title: string;
  descriptions: Description[];
}

export interface Description {
  id: number | undefined;
  descriptionText: string;
  checkListTasks: CheckListTask[];
  checkListId: number;
}

export interface CheckListTask {
  id: number | undefined;
  taskName: string;
  isCompleted: boolean;
  descriptionId: number;
}

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent {
  formData: CheckList = {
    id: undefined,
    date: new Date().toISOString(),
    title: '',
    descriptions: []
  };
  popupVisible: boolean = false;

  constructor(
    private pdfGeneratorService: PdfGeneratorService, 
    private toDoFormDataService: ChecklistAgendaService
  ) { }


  createToDoForm(event: any) {
    this.formData = event;
    this.popupVisible = true;
  }

  closePopup() {
    this.popupVisible = false;
  }

  // generatePdf() {
//   if (this.formData) {
//     const fileName = `${this.formData.eventTitle}_agenda.pdf`
//     this.pdfGeneratorService.generatePdf(this.formData, fileName);
//   }
// }
  generatePdf() {
    if (this.formData) {
      const fileName = `${this.formData.title}_checklist.pdf`;
      this.pdfGeneratorService.generatePdf(this.formData, fileName);
    }
  }

  createCheckList() {
    if (this.formData) {
      this.toDoFormDataService.createCheckList(this.formData).subscribe(
        response => {
          console.log('Checklist saved:', response);
          this.formData.descriptions?.forEach(description => {
            this.createDescription(response.id!, description);
          });
        },
        error => {
          console.error('Error saving checklist:', error);
        }
      );
    }
  }

  createDescription(checkListId: number, description: Description) {
    if (description) {
      this.toDoFormDataService.createDescription(checkListId, description).subscribe(
        response => {
          console.log('Description saved:', response);
          description.checkListTasks?.forEach(task => {
            this.createCheckListTask(response.id!, task);
          });
        },
        error => {
          console.error('Error saving description:', error);
        }
      );
    }
  }

  createCheckListTask(descriptionId: number, task: CheckListTask) {
    if (task) {
      task.descriptionId = descriptionId;
      this.toDoFormDataService.createCheckListTask(descriptionId, task).subscribe(
        response => {
          console.log('Task saved:', response);
        },
        error => {
          console.error('Error saving task:', error);
        }
      );
    }
  }
}
