import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
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
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';

@Component({
  selector: 'app-vendor-update-service',
  templateUrl: './vendor-update-serviceAndResource.component.html',
  styleUrls: ['./vendor-update-serviceAndResource.component.scss'],
})
export class VendorUpdateServiceAndResourceComponent implements OnInit, AfterContentInit {
  constructor(
    private _announcer: LiveAnnouncer, // Service for announcing messages for accessibility
    private _serviceAndResource: ServiceAndResourceService,
    private _fireStorage: AngularFireStorage, // Service for interacting with Firebase Storage
    private _router: Router,
    private _route: ActivatedRoute,
    private _http: HttpClient
  ) {}

  addOnBlur = true; // MatChipInputAddOnBlur
  isLoading: boolean = false; // Indicates whether data is loading
  imageLoading: boolean = false;
  videoLoading: boolean = false;
  updateImages: boolean = false;
  updateVideos: boolean = false;
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
  soRId: number = 0;

  updateButton: Button = {
    // Save button configuration
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

    // Get the service data
    this.getServiceDetails();
  }

  ngAfterContentInit(): void {
    // Initialize form and fetch categories and price models
    this.formHandle();
    this.getCategories();
    this.getPriceModels();
  }

  // Image and Video file upload handlers
  onSelect(event: any, files: File[]) {
    if (files == this.imageFiles) {
      this.updateImages = true; // Set flag true when image file add
    } else if (files == this.videoFiles) {
      this.updateVideos = true; // Set flag true when video file add
    }
    if (files.length < 5) {
      files.push(...event.addedFiles); // Add selected files
    }
    console.log(event);
  }

  onRemove(event: any, files: File[]) {
    if (files == this.imageFiles) {
      this.updateImages = true; // Set flag true when image file remove
    } else if (files == this.videoFiles) {
      this.updateVideos = true; // Set flag true when video file remove
    }
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

    // Enable update button when form is valid
    this.serviceForm.valueChanges.subscribe(() => {
      if (this.serviceForm.valid) {
        this.updateButton.disable = false;
      }
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
  async updateForm(mouseEvent: MouseEvent) {
    if (this.imageFiles.length < 5) {
      alert('Minimum 5 images should upload');
      return;
    }
    if (this.serviceForm.pristine && !this.updateImages && !this.updateVideos) {
      alert('Not any changes are found.');
      return;
    }
    console.log(mouseEvent);
    this.isLoading = true;

    //when update the form add featuresAndFacilities array to serviceForm
    this.serviceForm
      .get('serviceFeatures')
      ?.setValue(this.featuresAndFacilities);

    if (this.updateImages) {
      // If image is edited delete current image from firebase
      await this.deleteFiles(this.imageUrls);
      this.imageUrls = [];

      // Upload new images to firebase and get image Url
      await this.getFirebaseLink(this.imageFiles, this.imageUrls, 'images');
    }

    this.serviceForm.get('images')?.setValue(this.imageUrls);

    if (this.updateVideos) {
      // If video is edited delete current image from firebase
      await this.deleteFiles(this.videoUrls);
      this.videoUrls = [];

      // Upload new videos to firebase and get video Url
      await this.getFirebaseLink(this.videoFiles, this.videoUrls, 'videos');
    }

    this.serviceForm.get('videos')?.setValue(this.videoUrls);

    console.log(this.serviceForm.value);

    this.updateService(this.serviceForm.value);
    this._router.navigate(['/vendor/services/all']); // Navigate the the service page
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
    this._serviceAndResource.getCategoriesList().subscribe({
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
    this._serviceAndResource.getPriceModelsList().subscribe({
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
  async downloadImages(fileUrls: string[]): Promise<File[]> {
    try {
      // Use Promise.all() to asynchronously download all images
      const Files: File[] = await Promise.all(
        fileUrls.map(async (url) => {
          try {
            // Fetch the image data from the URL
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
            return new File([blob], this.getFileName(url), { type: blob.type });
          } catch (error) {
            // Handle errors during file fetch
            console.error('Error fetching file:', error);
            // Re-throw the error to propagate it to the caller
            throw error;
          }
        })
      );

      // Return the array of downloaded files
      return Files;
    } catch (error) {
      // Handle errors during image download
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
      // Extract the text between symbols
      const textBetweenSymbols = match[1];
      return textBetweenSymbols;
    } else {
      // Log message if no match is found
      console.log('No match found.');
      return '';
    }
  }

  /**
   * Retrieves details of a service.
   */
  getServiceDetails() {
    // Set loading indicator to true
    this.isLoading = true;

    // Retrieve service details from the service
    this._serviceAndResource.getServiceAndResourceDetailsForClient(this.soRId).subscribe({
      next: (res: any) => {
        // Extract the first element from the response array
        res = res[0];
        console.log(res);

        // Populate the form fields with the service details
        this.serviceForm.patchValue({
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

        // Populate features and facilities
        this.featuresAndFacilities = res.featureAndFacility.map(
          (feature: any) => ({
            name: feature,
          })
        );

        // Add additional service locations to the form if there are more than one
        if (res.location.length > 1) {
          for (let i = 1; i < res.location.length; i++) {
            const control = this.serviceForm.get(
              'serviceLocations'
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
            const control = this.serviceForm.get(
              'servicePricePackages'
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
        this.imageLoading = true;
        this.videoLoading = true;

        this.downloadImages(res.images)
          .then((files) => {
            this.imageFiles = files;
            this.imageLoading = false;
          })
          .catch((error) => {
            console.error('Error downloading images:', error);
            // Handle the error if necessary
          });

        // Store video URLs
        this.videoUrls = res.videos;
        // Download and store video files
        this.downloadImages(res.videos)
          .then((files) => {
            this.videoFiles = files;
            this.videoLoading = false;
          })
          .catch((error) => {
            console.error('Error downloading videos:', error);
            // Handle the error if necessary
          });

        // Set loading indicator to false
        this.isLoading = false;
      },
      error: (err: any) => {
        // Handle errors
        console.log(err);
      },
    });
  }

  // Update service using service
  updateService(formData: any) {
    this._serviceAndResource.updateServiceAndResource(this.vendorId, this.soRId, formData).subscribe({
      next: (res: any) => {
        console.log(res);
        window.alert('Update successfully');
        location.reload();
      },
      error: (err: any) => {
        console.log(err);
        alert('Service update failed');
      },
    });
  }
}
