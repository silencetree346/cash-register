export interface Option {
  id: string;
  name: string;
  price?: number;
}

export interface CustomizationGroup {
  id: string;
  name: string;
  options: Option[];
  multiSelect?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  defaultOptions: {
    cupOptions: Option[];
    temperature: Option[];
    ice: Option[];
  };
  customizations: CustomizationGroup[];
}

export interface CartItem {
  product: Product;
  selectedCupOption: Option;
  selectedTemperature: Option;
  selectedIce: Option;
  customizations: {
    [groupId: string]: Option[];
  };
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'credit' | 'cash';
  cashReceived?: number;
  change?: number;
  timestamp: Date;
}

export type PaymentMethod = 'credit' | 'cash';
