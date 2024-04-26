import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Button,
  Category,
  FeatureAndFacility,
  PriceModel,
} from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-add-new-service',
  templateUrl: './vendor-add-new-service.component.html',
  styleUrls: ['./vendor-add-new-service.component.scss'],
})
export class VendorAddNewServiceComponent implements OnInit {
  constructor(
    private _announcer: LiveAnnouncer, // Service for announcing messages for accessibility
    private _service: ServiceService,
    private _fireStorage: AngularFireStorage, // Service for interacting with Firebase Storage
    private _router: Router
  ) {}

  addOnBlur = true; // MatChipInputAddOnBlur
  isLoading: boolean = false; // Indicates whether data is loading
  categories: Category[] = []; // Holds the list of categories
  pricingModels: PriceModel[] = []; // Holds the list of pricing models
  featuresAndFacilities: FeatureAndFacility[] = []; // Holds the list of service features
  serviceForm!: FormGroup; // Form group for service input fields

  imageFiles: File[] = []; // Holds the list of images
  videoFiles: File[] = []; // Holds the list of videos
  imageUrls: string[] = []; // Holds the URLs of uploaded images
  videoUrls: string[] = []; // Holds the URLs of uploaded videos

  // Maximum size allowed for images and videos
  maxImageSize = 10485760; // 10 megabytes (10 * 1024 * 1024 bytes)
  maxVideoSize = this.maxImageSize * 50;

  saveButton: Button = {
    // Save button configuration
    url: '',
    type: 'submit',
    text: 'Save Service',
    icon: '',
    class: ['hideIcon'], // Scss class list
    disable: true, // Initially disabled until form is valid
  };

  resetButton: Button = {
    // Reset button configuration
    url: '',
    type: 'reset',
    text: 'Reset',
    icon: '',
    class: ['hideIcon', 'btn3', 'btn'],
    disable: false,
  };

  vendorId: string = '2a5e7b73-df8e-4b43-b2b1-32a1e82e03ee'; // Id of the vendor (temporary)
  // vendorId: string = "b0ae24d4-03a5-4a3e-83b3-2e9c7f3245db";

  ngOnInit(): void {
    // Scroll to top on initialization
    window.onload = function () {
      window.scrollTo(0, 0);
    };

    // Initialize form and fetch categories and price models
    this.formHandle();
    this.getCategories();
    this.getPriceModels();
  }

  // Image and Video file upload handlers
  onSelect(event: any, files: File[]) {
    if (files.length < 5) {
      files.push(...event.addedFiles); // Add selected files
    }
    console.log(event);
  }

  onRemove(event: any, files: File[]) {
    console.log(event);
    files.splice(files.indexOf(event), 1); // Remove file
  }

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // Feature chips add
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our feature
    if (value) {
      this.featuresAndFacilities.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  // Feature chips remove
  remove(feature: FeatureAndFacility): void {
    const index = this.featuresAndFacilities.indexOf(feature);

    if (index >= 0) {
      this.featuresAndFacilities.splice(index, 1); // Remove feature

      // Announce feature removal for accessibility
      this._announcer.announce(`Removed ${feature.name}`);
    }
  }

  // Feature chips edit
  edit(feature: FeatureAndFacility, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove feature if it no longer has a name
    if (!value) {
      this.remove(feature);
      return;
    }

    // Update feature name
    const index = this.featuresAndFacilities.indexOf(feature);
    if (index >= 0) {
      this.featuresAndFacilities[index].name = value;
    }
  }

  //Initialize form
  formHandle() {
    this.serviceForm = new FormGroup({
      serviceName: new FormControl(null),
      serviceCategory: new FormControl(null),
      serviceDescription: new FormControl(null),
      serviceMaxCapacity: new FormControl(
        0,
        Validators.pattern('^-?(0|[1-9][0-9]*)$')
      ),
      serviceFeatures: new FormControl([]),
      serviceLocations: new FormArray([
        new FormGroup({
          country: new FormControl(null),
          stateProvinceRegion: new FormControl(null),
          district: new FormControl(null),
          cityTownArea: new FormControl(null),
          houseNoStreetRoad: new FormControl(null),
        }),
      ]),
      servicePricePackages: new FormArray([
        new FormGroup({
          packageName: new FormControl(null),
          priceModel: new FormControl(null),
          basePrice: new FormControl(null),
        }),
      ]),
      images: new FormControl([]),
      videos: new FormControl([]),
    });

    // Enable save button when form is valid
    this.serviceForm.valueChanges.subscribe(() => {
      if (this.serviceForm.valid) this.saveButton.disable = false;
    });
  }

  // Location management
  addLocation() {
    const control = this.serviceForm.get('serviceLocations') as FormArray;
    control.push(
      new FormGroup({
        country: new FormControl(null),
        stateProvinceRegion: new FormControl(null),
        cityTownArea: new FormControl(null),
        district: new FormControl(null),
        houseNoStreetRoad: new FormControl(null),
      })
    );
  }

  removeLocation(index: any) {
    const control = this.serviceForm.get('serviceLocations') as FormArray;
    control.removeAt(index);
  }

  // Package management
  addPackage() {
    const control = this.serviceForm.get('servicePricePackages') as FormArray;
    control.push(
      new FormGroup({
        packageName: new FormControl(null),
        priceModel: new FormControl(null),
        basePrice: new FormControl(null),
      })
    );
  }

  removePackage(index: any) {
    const control = this.serviceForm.get('servicePricePackages') as FormArray;
    control.removeAt(index);
  }

  // Helper functions for accessing form controls
  getControls(arrayName: string) {
    return (this.serviceForm.get(arrayName) as FormArray).controls;
  }

  // Method to get a specific form control within the sub-array
  getArrayControls(index: number, arrayName: string, controlName: string) {
    const control = (this.serviceForm.get(arrayName) as FormArray)
      .at(index)
      .get(controlName);
    return control;
  }

  // Submit form
  async saveForm(mouseEvent: MouseEvent) {
    // if (this.imageFiles.length < 5) {
    //   alert("Minimum five images are needed.");
    //   return
    // }
    console.log(mouseEvent);
    this.isLoading = true;

    //when submit the form add featuresAndFacilities array to serviceForm
    this.serviceForm
      .get('serviceFeatures')
      ?.setValue(this.featuresAndFacilities);

    // Upload images and videos to Firebase Storage and set URLs in form
    await this.getFirebaseLink(this.imageFiles, this.imageUrls, 'images');
    this.serviceForm.get('images')?.setValue(this.imageUrls);

    await this.getFirebaseLink(this.videoFiles, this.videoUrls, 'videos');
    this.serviceForm.get('videos')?.setValue(this.videoUrls);

    console.log(this.serviceForm.value);
    // Add new service using service
    await this.addNewService(this.serviceForm.value);

    this._router.navigate(['/vendor/services/all']); //navigate to the services page

    this.isLoading = false;
  }

  // Reset form to initial state
  resetForm() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.formHandle(); // Reset form
    this.serviceForm.reset();
    this.serviceForm.markAsUntouched();
    this.serviceForm.markAsPristine();
    this.featuresAndFacilities = []; // Clear features
    this.imageFiles = []; // Clear images
    this.videoFiles = []; // Clear videos
  }

  // Fetch categories from service
  getCategories() {
    this._service.getCategoriesList().subscribe({
      next: (res: any) => {
        // Map response to category array
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName: item.serviceCategoryName,
        }));
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Fetch price models from service
  getPriceModels() {
    this._service.getPriceModelsList().subscribe({
      next: (res: any) => {
        // Map response to pricing model array
        this.pricingModels = res.map((item: any) => ({
          id: item.modelId,
          priceModelName: item.modelName,
        }));
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Upload files to Firebase Storage and get download URLs
  async getFirebaseLink(
    files: File[],
    fileUrls: string[],
    fileContent: string
  ) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file);
        const path = `service-${fileContent}/${file.name}`;
        const uploadTask = await this._fireStorage.upload(path, file);
        const url = await uploadTask.ref.getDownloadURL();
        fileUrls.push(url); // Push URL to array
      }
    }
  }

  // Add new service using service
  async addNewService(formData: any) {
    this._service.addNewService(this.vendorId, formData).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Service Added Successfully');
      },
      error: (err: any) => {
        console.log(err);
        alert('Failed to add service')
      },
    });
  }
}
