import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Button,
  Category,
  FeatureAndFacility,
  PriceModel,
} from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast/toast.service';

@Component({
  selector: 'app-vendor-update-service',
  templateUrl: './vendor-update-serviceAndResource.component.html',
  styleUrls: ['./vendor-update-serviceAndResource.component.scss'],
})
export class VendorUpdateServiceAndResourceComponent
  implements OnInit, AfterContentInit
{
  constructor(
    private _announcer: LiveAnnouncer, // Service/Resource for announcing messages for accessibility
    private _serviceAndResource: ServiceAndResourceService,
    private _fireStorage: AngularFireStorage, // Service/Resource for interacting with Firebase Storage
    private _router: Router,
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _toastService: ToastService
  ) {}

  addOnBlur = true; // MatChipInputAddOnBlur
  isLoading: boolean = false; // Indicates whether data is loading
  imageLoading: boolean = false;
  videoLoading: boolean = false;
  pdfLoading: boolean = false;
  updateImages: boolean = false;
  updateVideos: boolean = false;
  updatePdfs: boolean = false;
  categories: Category[] = []; // Holds the list of categories
  pricingModels: PriceModel[] = []; // Holds the list of pricing models
  featuresAndFacilities: FeatureAndFacility[] = []; // Holds the list of service/resource features
  serviceResourceForm!: FormGroup; // Form group for service/resource input fields

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  imageFiles: File[] = []; // Holds the list of images
  videoFiles: File[] = []; // Holds the list of videos
  pdfFiles: File[] = []; // Holds the list of Pdfs
  imageUrls: string[] = []; // Holds the URLs of uploaded images
  videoUrls: string[] = []; // Holds the URLs of uploaded videos
  pdfUrls: string[] = []; // Holds the URLs of uploaded Pdfs

  // Maximum size allowed for images and videos
  maxImageSize = 10485760; // 10 megabytes (10 * 1024 * 1024 bytes)
  maxVideoSize = this.maxImageSize * 50;
  maxPdfSize = this.maxImageSize;
  soRId: number = 0;

  updateButton: Button = {
    // Update button configuration
    url: '',
    type: 'submit',
    text: 'Update',
    icon: '',
    class: ['hideIcon'], // Scss class list
    disable: true, // Initially disabled until form is valid
  };

  vendorId: string = '2a5e7b73-df8e-4b43-b2b1-32a1e82e03ee'; // Id of the vendor (temporary)
  // vendorId: string = "b0ae24d4-03a5-4a3e-83b3-2e9c7f3245db";

  ngOnInit(): void {
    // Scroll to top on initialization
    window.onload = function () {
      window.scrollTo(0, 0);
    };

    // Get soRId from route parameters
    this._route.params.subscribe((params) => {
      this.soRId = params['soRId'];
    });

    // Get the service/resource data
    this.getServiceResourceDetails();
  }

  ngAfterContentInit(): void {
    // Initialize form and fetch categories and price models
    this.formHandle();
    this.getCategories();
    this.getPriceModels();
  }

  // Image,Video,Pdf file upload handlers
  onSelect(event: any, files: File[]) {
    if (files == this.imageFiles) {
      this.updateImages = true; // Set flag true when image file add
    } else if (files == this.videoFiles) {
      this.updateVideos = true; // Set flag true when video file add
    } else if (files == this.pdfFiles) {
      this.updatePdfs = true; // Set flag true when pdf file add
    }
    if (files.length < 5) {
      // Check if the file already exists in the  array
      const duplicate = files.some(
        (file) => file.name === event.addedFiles[0].name
      );
      console.log(duplicate);

      if (!duplicate) {
        files.push(...event.addedFiles); // Add selected files to array
      } else {
        console.warn(`File ${event.addedFiles[0].name} is already added.`);
        // Optionally, you can show a toast message or alert to the user
        this._toastService.showMessage(
          `File ${event.addedFiles[0].name} is already added.`,
          'warning'
        );
      }
    }
    console.log(event);
  }

  onRemove(event: any, files: File[]) {
    if (files == this.imageFiles) {
      this.updateImages = true; // Set flag true when image file remove
    } else if (files == this.videoFiles) {
      this.updateVideos = true; // Set flag true when video file remove
    } else if (files == this.pdfFiles) {
      this.updatePdfs = true; // Set flag true when pdf file remove
    }
    console.log(event);
    files.splice(files.indexOf(event), 1); // Remove file
  }

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // Feature chips add
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Check if the value already exists in the array
    const duplicate = this.featuresAndFacilities.some(
      (feature) => feature.name === value
    );

    if (value && !duplicate) {
      // Add the feature if it doesn't already exist
      this.featuresAndFacilities.push({ name: value });
    } else if (duplicate) {
      // Show a warning message if the feature is a duplicate
      this._toastService.showMessage(
        `Feature "${value}" is already added.`,
        'warning'
      );
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
    if (this.checkUrlString() === 'service') {
      this.serviceResourceForm = new FormGroup({
        serviceName: new FormControl(null, Validators.required),
        serviceCategory: new FormControl(null, Validators.required),
        serviceDescription: new FormControl(null, Validators.required),
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
    } else {
      this.serviceResourceForm = new FormGroup({
        resourceName: new FormControl(null, Validators.required),
        resourceCategory: new FormControl(null, Validators.required),
        resourceDescription: new FormControl(null, Validators.required),
        resourceMaxCapacity: new FormControl(
          0,
          Validators.pattern('^-?(0|[1-9][0-9]*)$')
        ),
        resourceFeatures: new FormControl([]),
        resourceLocations: new FormArray([
          new FormGroup({
            country: new FormControl(null),
            stateProvinceRegion: new FormControl(null),
            district: new FormControl(null),
            cityTownArea: new FormControl(null),
            houseNoStreetRoad: new FormControl(null),
          }),
        ]),
        resourcePricePackages: new FormArray([
          new FormGroup({
            packageName: new FormControl(null),
            priceModel: new FormControl(null),
            basePrice: new FormControl(null),
          }),
        ]),
        images: new FormControl([]),
        videos: new FormControl([]),
        manuals: new FormControl([]),
      });
    }

    // Enable update button when form is valid
    this.serviceResourceForm.valueChanges.subscribe(() => {
      if (this.serviceResourceForm.valid) {
        this.updateButton.disable = false;
      }
    });
  }

  // Location management
  addLocation() {
    const control = this.serviceResourceForm.get(
      this.checkUrlString() + 'Locations'
    ) as FormArray;
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
    const control = this.serviceResourceForm.get(
      this.checkUrlString() + 'Locations'
    ) as FormArray;
    control.removeAt(index);
  }

  // Package management
  addPackage() {
    const control = this.serviceResourceForm.get(
      this.checkUrlString() + 'PricePackages'
    ) as FormArray;
    control.push(
      new FormGroup({
        packageName: new FormControl(null),
        priceModel: new FormControl(null),
        basePrice: new FormControl(null),
      })
    );
  }

  removePackage(index: any) {
    const control = this.serviceResourceForm.get(
      this.checkUrlString() + 'PricePackages'
    ) as FormArray;
    control.removeAt(index);
  }

  checkForDuplicateItems(arrayName: string): boolean {
    const array = this.serviceResourceForm.get(
      this.checkUrlString() + arrayName
    ) as FormArray;

    const values = array.value.map((item: any) => JSON.stringify(item));
    const uniqueValues = new Set(values);

    return values.length !== uniqueValues.size;
  }

  // Helper functions for accessing form controls
  getControls(arrayName: string) {
    return (this.serviceResourceForm.get(arrayName) as FormArray).controls;
  }

  // Method to get a specific form control within the sub-array
  getArrayControls(index: number, arrayName: string, controlName: string) {
    const control = (this.serviceResourceForm.get(arrayName) as FormArray)
      .at(index)
      .get(controlName);
    return control;
  }

  // Submit form
  async updateForm(mouseEvent: MouseEvent) {
    console.log(mouseEvent);
    this.isLoading = true;
    if (this.imageFiles.length < 5) {
      this._toastService.showMessage(
        'Minimum 5 images should be uploaded.',
        'warning'
      );
      this.isLoading = false;
      return;
    }
    if (this.checkForDuplicateItems('Locations')) {
      this._toastService.showMessage(
        'Duplicate locations detected! Please remove duplicates before updating.',
        'warning'
      );
      this.isLoading = false;
      return;
    }

    // Check for duplicate packages before submitting the form
    if (this.checkForDuplicateItems('PricePackages')) {
      this._toastService.showMessage(
        'Duplicate packages detected! Please remove duplicates before updating.',
        'warning'
      );
      this.isLoading = false;
      return;
    }
    if (this.checkUrlString() === 'service') {
      if (
        this.serviceResourceForm.pristine &&
        !this.updateImages &&
        !this.updateVideos
      ) {
        this._toastService.showMessage('No changes found.', 'warning');
        this.isLoading = false;
        return;
      }
    } else {
      if (
        this.serviceResourceForm.pristine &&
        !this.updateImages &&
        !this.updateVideos &&
        !this.updatePdfs
      ) {
        this._toastService.showMessage('No changes found.', 'warning');
        this.isLoading = false;
        return;
      }
    }

    //when update the form add featuresAndFacilities array to serviceResourceForm
    this.serviceResourceForm
      .get(this.checkUrlString() + 'Features')
      ?.setValue(this.featuresAndFacilities);

    if (this.updateImages) {
      // If image is edited delete current image from firebase
      await this.deleteFiles(this.imageUrls);
      this.imageUrls = [];

      // Upload new images to firebase and get image Url
      await this.getFirebaseLink(this.imageFiles, this.imageUrls, 'images');
      this._toastService.showMessage('Images uploaded successfully.', 'info');
    }

    this.serviceResourceForm.get('images')?.setValue(this.imageUrls);

    if (this.updateVideos) {
      // If video is edited delete current image from firebase
      await this.deleteFiles(this.videoUrls);
      this.videoUrls = [];

      // Upload new videos to firebase and get video Url
      await this.getFirebaseLink(this.videoFiles, this.videoUrls, 'videos');
      this._toastService.showMessage('Videos uploaded successfully.', 'info');
    }

    this.serviceResourceForm.get('videos')?.setValue(this.videoUrls);

    if (this.updatePdfs) {
      // If manual is edited delete current manual from firebase
      await this.deleteFiles(this.pdfUrls);
      this.pdfUrls = [];

      // Upload new pdfs to firebase and get pdf Url
      await this.getFirebaseLink(this.pdfFiles, this.pdfUrls, 'manuals');
      this._toastService.showMessage(
        'User manuals uploaded successfully.',
        'info'
      );
    }

    this.serviceResourceForm.get('manuals')?.setValue(this.pdfUrls);

    console.log(this.serviceResourceForm.value);

    this.updateServiceResource(this.serviceResourceForm.value);
    this._router.navigate([`/vendor/${this.checkUrlString()}s/all`]); // Navigate the the service/resource page
    this.isLoading = false;
  }

  // Reset form to initial state
  resetForm() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.formHandle(); // Reset form
    this.serviceResourceForm.reset();
    this.serviceResourceForm.markAsUntouched();
    this.serviceResourceForm.markAsPristine();
    this.featuresAndFacilities = []; // Clear features
    this.imageFiles = []; // Clear images
    this.videoFiles = []; // Clear videos
    this.pdfFiles = []; // Clear manuals
    this._toastService.showMessage('Form reset successfully.', 'info');
  }

  // Fetch categories from service/resource
  getCategories() {
    this._serviceAndResource.getCategoriesList().subscribe({
      next: (res: any) => {
        // Map response to category array
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName:
            this.checkUrlString() === 'service'
              ? item.serviceCategoryName
              : item.resourceCategoryName,
        }));
      },
      error: (err: any) => {
        console.error(err);
        this._toastService.showMessage(
          'Failed to fetch categories. Please try again later.',
          'error'
        );
      },
    });
  }

  // Fetch price models from service/resource
  getPriceModels() {
    this._serviceAndResource.getPriceModelsList().subscribe({
      next: (res: any) => {
        // Map response to pricing model array
        this.pricingModels = res.map((item: any) => ({
          id: item.modelId,
          priceModelName: item.modelName,
        }));
      },
      error: (err: any) => {
        console.error(err);
        this._toastService.showMessage(
          'Failed to fetch price models. Please try again later.',
          'error'
        );
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
        const path = `${this.checkUrlString()}-${fileContent}/${file.name}`;
        const uploadTask = await this._fireStorage.upload(path, file);
        const url = await uploadTask.ref.getDownloadURL();
        fileUrls.push(url); // Push URL to array
      }
    }
  }

  // Delete file from firebase
  async deleteFiles(filePaths: string[]) {
    try {
      // Loop through each file path in the array
      for (const filePath of filePaths) {
        // Delete the file
        await this._fireStorage.storage.refFromURL(filePath).delete();
        console.log('file deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting files:', error);
    }
  }

  /**
   * Downloads images asynchronously from the provided array of image URLs.
   * @param fileUrls An array of image URLs to download.
   * @returns A Promise that resolves to an array of downloaded File objects.
   */
  async downloadFiles(fileUrls: string[], mimeType: string): Promise<File[]> {
    try {
      // Use Promise.all() to asynchronously download all files
      const files: File[] = await Promise.all(
        fileUrls.map(async (url) => {
          try {
            // Fetch the file data from the URL
            const response = await this._http
              .get(url, { responseType: 'blob' })
              .toPromise();
            // Check if response is valid
            if (!response) {
              throw new Error('Failed to fetch file');
            }
            // Convert the received data to Blob
            const blob = response as Blob;
            // Convert Blob to File
            return new File([blob], this.getFileName(url), { type: mimeType });
          } catch (error) {
            // Handle errors during file fetch
            console.error('Error fetching file:', error);
            // Re-throw the error to propagate it to the caller
            throw error;
          }
        })
      );

      // Return the array of downloaded files
      return files;
    } catch (error) {
      // Handle errors during file download
      console.error('Error downloading files:', error);
      // Return an empty array if there is an error
      return [];
    }
  }

  /**
   * Extracts the filename from a URL.
   * @param url The URL from which to extract the filename.
   * @returns The extracted filename.
   */
  getFileName(url: string): string {
    // Regular expression to extract text between %2F and .
    const regex = /%2F([^?]*)\?/;
    // Match the regex pattern against the URL
    const match = url.match(regex);

    // Check if a match is found
    if (match && match.length >= 2) {
      // Extract the text between symbols and decode URI components
      const textBetweenSymbols = decodeURIComponent(
        match[1].replace(/\+/g, ' ')
      );
      return textBetweenSymbols;
    } else {
      // Log message if no match is found
      console.log('No match found.');
      return '';
    }
  }

  /**
   * Retrieves details of a service/resource.
   */
  getServiceResourceDetails() {
    // Set loading indicator to true
    this.isLoading = true;
    this.imageLoading = true;
    this.videoLoading = true;
    this.pdfLoading = true;

    // Retrieve service/resource details from the service
    this._serviceAndResource
      .getServiceAndResourceDetailsForClient(this.soRId)
      .subscribe({
        next: (res: any) => {
          // Extract the first element from the response array
          res = res[0];
          if (this.checkUrlString() === 'service') {
            // Populate the form fields with the service details
            this.serviceResourceForm.patchValue({
              serviceName: res.name,
              serviceCategory: res.serviceCategory.categoryId,
              serviceDescription: res.description,
              serviceMaxCapacity: res.capacity,
              serviceLocations: res.location.map((location: any) => ({
                country: location.country,
                stateProvinceRegion: location.state,
                cityTownArea: location.area,
                district: location.district,
                houseNoStreetRoad: location.houseNo,
              })),
              servicePricePackages: res.price.map((price: any) => ({
                packageName: price.name,
                priceModel: price.modelId,
                basePrice: price.value,
              })),
              images: [],
              videos: [],
            });
          } else {
            // Populate the form fields with the resource details
            this.serviceResourceForm.patchValue({
              resourceName: res.name,
              resourceCategory: res.resourceCategory.categoryId,
              resourceDescription: res.description,
              resourceMaxCapacity: res.capacity,
              resourceLocations: res.location.map((location: any) => ({
                country: location.country,
                stateProvinceRegion: location.state,
                cityTownArea: location.area,
                district: location.district,
                houseNoStreetRoad: location.houseNo,
              })),
              resourcePricePackages: res.price.map((price: any) => ({
                packageName: price.name,
                priceModel: price.modelId,
                basePrice: price.value,
              })),
              images: [],
              videos: [],
              manuals: [],
            });
          }

          // Populate features and facilities
          this.featuresAndFacilities = res.featureAndFacility.map(
            (feature: any) => ({
              name: feature,
            })
          );

          // Add additional service/resource locations to the form if there are more than one
          if (res.location.length > 1) {
            for (let i = 1; i < res.location.length; i++) {
              const control = this.serviceResourceForm.get(
                this.checkUrlString() + 'Locations'
              ) as FormArray;
              control.push(
                new FormGroup({
                  country: new FormControl(res.location[i].country),
                  stateProvinceRegion: new FormControl(res.location[i].state),
                  cityTownArea: new FormControl(res.location[i].area),
                  district: new FormControl(res.location[i].district),
                  houseNoStreetRoad: new FormControl(res.location[i].houseNo),
                })
              );
            }
          }

          // Add additional price packages to the form if there are more than one
          if (res.price.length > 1) {
            for (let i = 1; i < res.price.length; i++) {
              const control = this.serviceResourceForm.get(
                this.checkUrlString() + 'PricePackages'
              ) as FormArray;
              control.push(
                new FormGroup({
                  packageName: new FormControl(res.price[i].name),
                  priceModel: new FormControl(res.price[i].modelId),
                  basePrice: new FormControl(res.price[i].value),
                })
              );
            }
          }

          // Store image URLs
          this.imageUrls = res.images;

          // Download and store image files
          this.downloadFiles(res.images, 'image/jpeg')
            .then((files) => {
              this.imageFiles = files;
              this.imageLoading = false;
            })
            .catch((error) => {
              console.error('Error downloading images:', error);
              // Handle the error if necessary
              this._toastService.showMessage(
                'Failed to download image files. Please try again later.',
                'error'
              );
            });

          // Store video URLs
          this.videoUrls = res.videos;
          // Download and store video files
          this.downloadFiles(res.videos, 'video/mp4')
            .then((files) => {
              this.videoFiles = files;
              this.videoLoading = false;
            })
            .catch((error) => {
              console.error('Error downloading videos:', error);
              // Handle the error if necessary
              this._toastService.showMessage(
                'Failed to download video files. Please try again later.',
                'error'
              );
            });

          // Store PDF URLs
          this.pdfUrls = res.manuals;
          // Download and store PDF files
          this.downloadFiles(res.manuals, 'application/pdf')
            .then((files) => {
              this.pdfFiles = files;
              this.pdfLoading = false;
            })
            .catch((error) => {
              console.error('Error downloading PDFs:', error);
              this._toastService.showMessage(
                'Failed to download pdf files. Please try again later.',
                'error'
              );
              // Handle the error if necessary
            });

          // Set loading indicator to false
          this.isLoading = false;
        },
        error: (err: any) => {
          // Handle errors
          console.log(err);
          this._toastService.showMessage(
            `Failed to fetch ${this.checkUrlString()} details. Please try again later.`,
            'error'
          );
        },
      });
  }

  // Update service/resource using service
  updateServiceResource(formData: any) {
    this._serviceAndResource
      .updateServiceAndResource(this.vendorId, this.soRId, formData)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this._toastService.showMessage('Update successful', 'success');
        },
        error: (err: any) => {
          console.log(err);
          if (err instanceof HttpErrorResponse && err.status === 0) {
            // Handle connection loss
            this._toastService.showMessage(
              'Connection lost. Please check your internet connection and try again.',
              'error'
            );
          } else {
            // Handle other errors
            this._toastService.showMessage(
              `Failed to update ${this.checkUrlString()}.`,
              'error'
            );
          }
        },
      });
  }

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}
