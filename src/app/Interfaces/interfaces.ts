export interface Category {
  id: string;
  categoryName: string;
}

export interface ExtendedCategory extends Category {
  checked: boolean;
}
  
  export interface PriceModel {
    id: number,
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

  export interface servicesCard {
      soRId:number,
      name:string,
      rating:{
        rate:number,
        count:number
      },
      vendor:string,
      description:string,
      image:string
    }

  export interface ServiceDetails {
    name:string,
    vendor: {
      vendorId:string,
      companyName:string
    },
    capacity:number,
    serviceCategory:string,
    description:string,
    reviewAndRating: ReviewAndRating[],
    featureAndFacility:string[],
    location: Location[]
    price: Price[],
    images: string[]
    videos: string[]
  }

  interface Price {
    value: number;
    model: string;
    modelId: string;
    name: string;
  }

  interface Location {
    houseNo: string,
    area: string,
    district: string,
    country: string,
    state: string
  }

  interface ReviewAndRating {
    avatar:string,
    name:string,
    rate:number,
    comment:string
  }

  export interface Rating {
    rate:number,
    count:number
  }