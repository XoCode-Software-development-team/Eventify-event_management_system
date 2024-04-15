import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PriceModel } from './../../Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnChanges, OnInit {
  maxPrice: number = 0;
  minValue: number = 0;
  maxValue: number = 0;
  @Input() dataSource: any = [];
  @Output() priceFilteredDataSource: any = new EventEmitter<any>();
  priceModels: PriceModel[] = [];
  selectedPriceModel: any = 'All'; // Initialize with 'All'
  priceModelSelected: boolean = false;
  originalDataSource: any = [];
  selectedModel: any;

  constructor(private _service: ServiceService) {}

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.originalDataSource.length === 0) {
      this.originalDataSource = this.dataSource;
    }
    if (this.priceModels.length === 0) {
      this.getPriceModel();
    }
  }

  calculateStep(maxPrice: any) {
    return Math.ceil(maxPrice / 100);
  }

  getPriceModel() {
      this._service.getPriceModelsList().subscribe({
        next: (res: any) => {
          this.priceModels = res.map((item: any) => ({
            id: item.modelId,
            priceModelName: item.modelName,
          }));
          this.filterPriceModels();
        },
        error: (err: any) => {
          console.log('Error fetching price models:', err);
        },
      });

  }

  filterPriceModels(): void {
    // Extract unique price model names from the services in dataSource
    const priceModelNames = this.originalDataSource.reduce(
      (acc: string[], service: any) => {
        service.price.forEach((priceModel: any) => {
          if (!acc.includes(priceModel.priceModelName)) {
            acc.push(priceModel.priceModelName);
          }
        });
        return acc;
      },
      []
    );

    // Filter price models that match the extracted price model names
    this.priceModels = this.priceModels.filter((priceModel: PriceModel) => {
      return priceModelNames.includes(priceModel.priceModelName);
    });

    this.onPriceModelChange();
  }

  onPriceModelChange(): void {
    // console.log('Price model changed:', this.selectedPriceModel);
    // Update slider disable state
    this.priceModelSelected = this.selectedPriceModel !== 'All';

    if (this.selectedPriceModel !== 'All') {
      // Find the selected price model object using its ID
      this.selectedModel = this.priceModels.find(
        (model) => model.id === parseInt(this.selectedPriceModel)
      );

      // console.log('Selected model:', this.selectedModel);

      if (this.selectedModel) {
        // Call getMaxPrice with the ID of the selected price model
        this.getMaxPrice(this.selectedModel);
        // Filter the data source based on the selected price model and price range defined by the slider
      }
    } else {
      this.dataSource = [...this.originalDataSource];
      // console.log('Reset to original data:', this.dataSource);
      this.priceFilteredDataSource.emit(this.dataSource);
    }
  }

  filter(selectedModel: any) {
    this.dataSource = this.originalDataSource.filter((service: any) => {
      return service.price.some((priceModel: any) => {
        const priceValue = priceModel.value; // Assuming the price value is stored in 'value'
        // console.log('min ' + this.minValue + ' max ' + this.maxValue);
        const isInRange =
          priceValue >= this.minValue && priceValue <= this.maxValue;
        // console.log('Service:', service);
        // console.log('Price model:', priceModel);
        // console.log('Is in range:', isInRange);
        return (
          priceModel.priceModelName === selectedModel.priceModelName &&
          isInRange
        );
      });
    });
    // console.log('Filtered data:', this.dataSource);
    this.priceFilteredDataSource.emit(this.dataSource);
  }

  getMaxPrice(model: any) {
    this._service.getMaxPriceOfService(model.id).subscribe({
      next: (res: any) => {
        this.maxPrice = res;
        this.minValue = 0;
        this.maxValue = res;
        this.filter(model);
      },
      error: (err: any) => {
        console.log('Error fetching max price:', err);
      },
    });
  }

  updateSliderValue() {
    // console.log(this.selectedPriceModel)
    this.filter(this.selectedModel);
  }
}
