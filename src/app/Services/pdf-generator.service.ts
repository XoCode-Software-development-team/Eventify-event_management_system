import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  public generatePdf(content: any, pdfFileName: string): void {
    const documentDefinition = this.createDocumentDefinition(content);
    pdfMake.createPdf(documentDefinition).download(pdfFileName);
  }

  formatTimeTo12Hour(time: string): string {
    if (!time) return '';
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;  // Convert '0' to '12'
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  }

  private createDocumentDefinition(content: any) {
    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10] as [number, number, number, number]
      },
      subheader: {
        fontSize: 14,
        margin: [0, 10, 0, 5] as [number, number, number, number]
      },
      description: {
        fontSize: 12,
        margin: [0, 5, 0, 5] as [number, number, number, number]
      }
    };

    const documentDefinition = {
    content: [
      {
        table: {
          widths: ['*', 'auto'],
          body: [
            [
              { text: content.title, style: 'header' },
              { text: `Date: ${content.date}`, style: 'subheader', alignment: 'right' }
            ]
          ]
        },
        layout: 'noBorders'  // Remove table borders
      },
      ...content.descriptions.map((description: any) => {
        return [
          { text: `${description.descriptionText}`, style: 'description' },
          {
            ul: description.checkListTasks.map((task: any) => 
              `${task.taskTime ? `${this.formatTimeTo12Hour(task.taskTime)} - ` : ''}${task.taskName}`
            )
          }
        ];
      })
    ],
    styles: styles
  };

  return documentDefinition;
}
}
