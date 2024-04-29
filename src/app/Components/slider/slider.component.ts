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
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnChanges, OnInit {
  // Properties
  maxPrice: number = 0;
  minValue: number = 0;
  maxValue: number = 0;
  priceModels: PriceModel[] = [];
  selectedPriceModel: any = 'All';
  priceModelSelected: boolean = false;
  originalDataSource: any = [];
  selectedModel: any;

  // Inputs and Outputs
  @Input() dataSource: any = [];
  @Output() priceFilteredDataSource: any = new EventEmitter<any>();

  constructor(private _serviceAndResource: ServiceAndResourceService) {}

  ngOnInit(): void {
    // Lifecycle hook
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Lifecycle hook for input changes
    if (this.originalDataSource.length === 0) {
      this.originalDataSource = this.dataSource;
    }
    if (this.priceModels.length === 0) {
      this.getPriceModel();
    }
  }

  // Methods

  // Initialize the slider step
  calculateStep(maxPrice: any) {
    return Math.ceil(maxPrice / 100);
  }

  // Fetch price models from the service
  getPriceModel() {
    this._serviceAndResource.getPriceModelsList().subscribe({
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

  // Filter price models based on the data source
  filterPriceModels(): void {
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

    this.priceModels = this.priceModels.filter((priceModel: PriceModel) => {
      return priceModelNames.includes(priceModel.priceModelName);
    });

    this.onPriceModelChange();
  }

  // Handle change in selected price model
  onPriceModelChange(): void {
    this.priceModelSelected = this.selectedPriceModel !== 'All';

    if (this.selectedPriceModel !== 'All') {
      this.selectedModel = this.priceModels.find(
        (model) => model.id === parseInt(this.selectedPriceModel)
      );

      if (this.selectedModel) {
        this.getMaxPrice(this.selectedModel);
      }
    } else {
      this.dataSource = [...this.originalDataSource];
      this.priceFilteredDataSource.emit(this.dataSource);
    }
  }

  // Filter data based on selected model
  filter(selectedModel: any) {
    this.dataSource = this.originalDataSource.filter((service: any) => {
      return service.price.some((priceModel: any) => {
        const priceValue = priceModel.value;
        const isInRange =
          priceValue >= this.minValue && priceValue <= this.maxValue;
        return (
          priceModel.priceModelName === selectedModel.priceModelName &&
          isInRange
        );
      });
    });
    this.priceFilteredDataSource.emit(this.dataSource);
  }

  // Get max price for the selected model
  getMaxPrice(model: any) {
    this._serviceAndResource.getMaxPriceOfService(model.id).subscribe({
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

  // Update slider value
  updateSliderValue() {
    this.filter(this.selectedModel);
  }
}
