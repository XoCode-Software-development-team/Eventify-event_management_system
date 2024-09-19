import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PriceModel } from './../../Interfaces/interfaces';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  maxPrice: number | null = null;
  minValue: number | null = null;
  maxValue: number | null = null;
  priceModels: PriceModel[] = [];
  selectedPriceModel: any = 'All';
  modelId: number | null = null;
  priceModelSelected: boolean = false;
  selectedModel: any;
  priceModelLoading:boolean = false;

  @Output() priceFilteredDataSource: any = new EventEmitter<any>();

  constructor(private _serviceAndResource: ServiceAndResourceService, private _toastService: ToastService) {}

  ngOnInit(): void {
    if (this.priceModels.length === 0) {
      this.getPriceModel();
    }
  }

  calculateStep(maxPrice: any) {
    return Math.ceil(maxPrice / 100);
  }

  getPriceModel() {
    this.priceModelLoading = true;
    this._serviceAndResource.getPriceModelsListOfServicesAndResources().subscribe({
      next: (res: any) => {
        this.priceModels = res.map((item: any) => ({
          id: item.modelId,
          priceModelName: item.modelName,
        }));
        this.priceModelLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching price models:', err);
        this._toastService.showMessage('Error fetching price models', 'error');
      },
    });
  }

  onPriceModelChange(): void {
    this.priceModelSelected = this.selectedPriceModel !== 'All';

    if (this.selectedPriceModel !== 'All') {
      this.selectedModel = this.priceModels.find(
        (model) => model.id === parseInt(this.selectedPriceModel)
      );
      this.modelId = this.selectedModel.id;


      if (this.selectedModel) {
        this.getMaxPrice(this.selectedModel);
      }
    } else {
      this.maxPrice = null;
      this.minValue = null;
      this.maxValue = null;
      this.modelId = null;
    }
    this.emitPriceFilter();
  }

  getMaxPrice(model: any) {
    this._serviceAndResource.getMaxPriceOfServiceAndResource(model.id).subscribe({
      next: (res: any) => {
        this.maxPrice = res;
        this.minValue = 0;
        this.maxValue = res;
        this.emitPriceFilter();
      },
      error: (err: any) => {
        console.error('Error fetching max price:', err);
        this._toastService.showMessage('Error fetching max price', 'error');
      },
    });
  }

  updateSliderValue() {
    this.emitPriceFilter();
  }

  emitPriceFilter() {
    this.priceFilteredDataSource.emit({
      priceModelId: this.modelId,
      minValue: this.minValue,
      maxValue: this.maxValue
    });
  }
}
