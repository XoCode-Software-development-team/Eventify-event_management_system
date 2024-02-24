import { Component } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-vendor-add-new-service',
  templateUrl: './vendor-add-new-service.component.html',
  styleUrls: ['./vendor-add-new-service.component.scss']
})
export class VendorAddNewServiceComponent {

  button = {
    url: '',
    type: 'submit',
    text: 'Save Service',
    icon: 'add',
    display: 'none'
  };

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  imageFiles: File[] = [];
  videoFiles: File[] = [];


	onSelect(event:any,files: File[]) {
		console.log(event);
		files.push(...event.addedFiles);
	}

	onRemove(event:any,files: File[]) {
		console.log(event);
		files.splice(files.indexOf(event), 1);
	}
}
