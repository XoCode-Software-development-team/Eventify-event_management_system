import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Button, Category, FeatureAndFacility, PriceModel } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-vendor-add-new-service',
  templateUrl: './vendor-add-new-service.component.html',
  styleUrls: ['./vendor-add-new-service.component.scss'],
})
export class VendorAddNewServiceComponent implements OnInit {

  constructor(private announcer: LiveAnnouncer, private _service: ServiceService) { }

  categories: Category[] = [];
  pricingModels: PriceModel[] = [];

  imageFiles: File[] = [];
  maxImageSize = 10485760;
  maxVideoSize = this.maxImageSize * 50;
  videoFiles: File[] = [];

  onSelect(event: any, files: File[]) {
    if (files.length < 5){
      files.push(...event.addedFiles);
    }
    console.log(event);
  }

  onRemove(event: any, files: File[]) {
    console.log(event);
    files.splice(files.indexOf(event), 1);
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  featuresAndFacilities: FeatureAndFacility[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our feature
    if (value) {
      this.featuresAndFacilities.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(feature: FeatureAndFacility): void {
    const index = this.featuresAndFacilities.indexOf(feature);

    if (index >= 0) {
      this.featuresAndFacilities.splice(index, 1);

      this.announcer.announce(`Removed ${feature.name}`);
    }
  }

  edit(feature: FeatureAndFacility, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove feature if it no longer has a name
    if (!value) {
      this.remove(feature);
      return;
    }

    // Edit existing feature
    const index = this.featuresAndFacilities.indexOf(feature);
    if (index >= 0) {
      this.featuresAndFacilities[index].name = value;
    }
  }

  serviceForm! : FormGroup

  ngOnInit(): void {
    this.formHandle();
    this.getCategories();
    this.getPriceModels();
  }

  saveButton: Button = {
    url: '',
    type: 'submit',
    text: 'Save Service',
    icon: '',
    class: ['hideIcon'],
    disable: true
  };

  resetButton: Button = {
    url: '',
    type: 'reset',
    text: 'Reset',
    icon: '',
    class: ['hideIcon','btn3','btn'],
    disable: false
  };

  formHandle() {
    this.serviceForm = new FormGroup({
      serviceName: new FormControl(null,Validators.required),
      serviceCategory: new FormControl(null,Validators.required),
      serviceDescription: new FormControl(null,Validators.required),
      serviceMaxCapacity: new FormControl(null, Validators.pattern('^-?(0|[1-9][0-9]*)$'
        )),
      serviceFeatures: new FormControl([]),
      serviceLocations: new FormArray([
        new FormGroup({
          country: new FormControl(null),
          stateProvinceRegion: new FormControl(null),
          cityTownArea: new FormControl(null),
          district: new FormControl(null),
          houseNoStreetRoad: new FormControl(null)
        })
      ]),
      servicePricePackages: new FormArray([
        new FormGroup({
          packageName: new FormControl(null),
          priceModel: new FormControl(null),
          basePrice: new FormControl(null)
        })
      ]),
      images: new FormControl([]),
      videos: new FormControl([])
    })

    this.serviceForm.valueChanges.subscribe(() => {
      if (this.serviceForm.valid)
        this.saveButton.disable = false;
    });
    
  }

  //add locations
  addLocation() {
    const control = this.serviceForm.get('serviceLocations') as FormArray;
    control.push(
      new FormGroup({
        country: new FormControl(null),
          stateProvinceRegion: new FormControl(null),
          cityTownArea: new FormControl(null),
          district: new FormControl(null),
          houseNoStreetRoad: new FormControl(null)
      })
    );
  }

  removeLocation(index:any) {
    const control = this.serviceForm.get('serviceLocations') as FormArray;
    control.removeAt(index);
  }

    //add Prices & packages
    addPackage() {
      const control = this.serviceForm.get('servicePricePackages') as FormArray;
      control.push(
        new FormGroup({
          packageName: new FormControl(null),
          priceModel: new FormControl(null),
          basePrice: new FormControl(null)
        })
      );
    }
  
    removePackage(index:any) {
      const control = this.serviceForm.get('servicePricePackages') as FormArray;
      control.removeAt(index);
    }
  

  getControls(arrayName:string) {
    return (this.serviceForm.get(arrayName) as FormArray).controls;
  }

    // Method to get a specific form control within the sub-array
    getArrayControls(index: number,arrayName:string, controlName: string) {
      const control = (this.serviceForm.get(arrayName) as FormArray).at(index).get(controlName);
      return control;
    }

  saveForm() {
    //when submit the form add featuresAndFacilities array to serviceForm
    this.serviceForm.get('serviceFeatures')?.setValue(this.featuresAndFacilities);
    this.serviceForm.get('images')?.setValue(this.imageFiles);
    this.serviceForm.get('videos')?.setValue(this.videoFiles);
    console.log(this.serviceForm)
    this.formHandle();
  }

  resetForm() {
    this.featuresAndFacilities = [];
    this.imageFiles = [];
    this.videoFiles = [];
  }

  getCategories() {
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

  getPriceModels() {
    this._service.getPriceModelsList().subscribe({
      next: (res: any) => {
        this.pricingModels = res.map((item:any) => ({
          id: item.modelId,
          priceModelName:item.modelName
        }))
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

}
