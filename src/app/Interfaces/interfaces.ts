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
    description:string,
    reviewAndRating: reviewAndRating[],
    featureAndFacility:string[],
    price: Price[],
    images: string[]
    videos: string[]
  }

  interface Price {
    value: number;
    model: string;
  }

  interface reviewAndRating {
    avatar:string,
    name:string,
    rate:number,
    comment:string
  }

  export interface Rating {
    rate:number,
    count:number
  }