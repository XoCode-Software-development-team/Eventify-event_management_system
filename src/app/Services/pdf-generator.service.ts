import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(private _toast:ToastService) { }

  async generatePdfFromHtml(elementId: string, fileName: string) {
    const element = document.querySelector(`#${elementId}`) as HTMLElement;

    if (!element) {
      // console.error(`Element with ID ${elementId} not found!`);
      this._toast.showMessage("Pdf generated failed!",'error');
      return;
    }

    try {
      const canvas = await html2canvas(element, { scale: 2 });

      // Convert canvas to PDF
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Save the document
      doc.save(`${fileName}.pdf`);
      this._toast.showMessage("Pdf generated successful!",'success');
    } catch (error) {
      // console.error('Error generating PDF', error);
      this._toast.showMessage("Error generating Pdf",'error');
    }
  }
}
