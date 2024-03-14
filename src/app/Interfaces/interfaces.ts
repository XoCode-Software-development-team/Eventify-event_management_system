export interface Category {
    id: string;
    categoryName: string;
  }
  
  export interface PriceModel {
    id: string,
    priceModelName: string
  }
  
  export interface FeatureAndFacility {
    name: string;
  }
  
  export interface Button {
    url: string,
    type: string,
    text: string,
    icon: string,
    class: string[],
    disable: boolean
  }