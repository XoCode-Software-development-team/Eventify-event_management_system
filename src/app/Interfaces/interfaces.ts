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
    iconClass:string[],
    disable: boolean
  }

  export interface servicesAndResourcesCard {
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

  export interface ServiceResourceDetails {
    name:string,
    vendor: {
      vendorId:string,
      companyName:string
    },
    capacity:number,
    category:category,
    description:string,
    reviewAndRating: ReviewAndRating[],
    featureAndFacility:string[],
    location: Location[],
    price: Price[],
    images: string[],
    videos: string[],
    Manuals: string[]
  }

  interface category {
    categoryId:number;
    categoryName:string;
  }

  interface Price {
    value: number;
    model: string;
    modelId: string;
    name: string;
  }

  export interface Location {
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

  export interface Notification {
    notificationId:number,
    message:string,
    timeStamp:Date,
    read:boolean
  }

  export interface CompareList {
    soRId: number;
    name: string;
    categoryId:number;
  }

  export interface Checklist {
    date: Date;
    title: string;
    description: string;
    tasks: Task[];
  }
  
  export interface Task {
    checked: boolean;
    taskName: string;
    taskDescription: string;
  }

  export interface Agenda {
    date: Date;
    title: string;
    description: string;
    tasks: AgendaTask[];
  }
  
  export interface AgendaTask {
    time: string;
    taskName: string;
    taskDescription: string;
  }

  export interface Event {
    eventId: number;
    name: string;
    isInVendorSr: boolean;
    isPending: boolean;
  }