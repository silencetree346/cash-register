import { Product, Option, CustomizationGroup } from '../types';

export const cupOptions: Option[] = [
  { id: 'small', name: 'Small', price: 0 },
  { id: 'medium', name: 'Medium', price: 0.5 },
  { id: 'large', name: 'Large', price: 1 },
];

export const temperatureOptions: Option[] = [
  { id: 'hot', name: 'Hot', price: 0 },
  { id: 'iced', name: 'Iced', price: 0 },
];

export const iceOptions: Option[] = [
  { id: 'no-ice', name: 'No Ice', price: 0 },
  { id: 'light-ice', name: 'Light Ice', price: 0 },
  { id: 'regular-ice', name: 'Regular Ice', price: 0 },
  { id: 'extra-ice', name: 'Extra Ice', price: 0 },
];

const milkCustomizations = [
  {
    id: 'milk-base',
    name: 'Milk Base',
    options: [
      { id: 'whole', name: 'Whole Milk', price: 0 },
      { id: 'skim', name: 'Skim Milk', price: 0 },
      { id: 'oat', name: 'Oat Milk', price: 0.5 },
      { id: 'almond', name: 'Almond Milk', price: 0.5 },
      { id: 'soy', name: 'Soy Milk', price: 0.5 },
      { id: 'coconut', name: 'Coconut Milk', price: 0.5 },
    ],
  },
];

export const modalSyrupGroup: CustomizationGroup = {
  id: 'modal-syrup',
  name: 'Syrup',
  multiSelect: true,
  options: [
    { id: 'ms-vanilla', name: 'Vanilla', price: 0.5 },
    { id: 'ms-caramel', name: 'Caramel', price: 0.5 },
    { id: 'ms-hazelnut', name: 'Hazelnut', price: 0.5 },
    { id: 'ms-mocha', name: 'Mocha', price: 0.5 },
    { id: 'ms-brown-sugar', name: 'Brown Sugar', price: 0.5 },
    { id: 'ms-toffee-nut', name: 'Toffee Nut', price: 0.5 },
    { id: 'ms-peppermint', name: 'Peppermint', price: 0.5 },
    { id: 'ms-sf-vanilla', name: 'Sugar Free Vanilla', price: 0.5 },
    { id: 'ms-honey', name: 'Honey', price: 0.5 },
  ],
};

export const modalCreamGroup: CustomizationGroup = {
  id: 'modal-cream',
  name: 'Cream',
  multiSelect: true,
  options: [
    { id: 'mc-whipped', name: 'Whipped Cream', price: 0.5 },
    { id: 'mc-cold-foam', name: 'Cold Foam', price: 0.5 },
    { id: 'mc-sweet-cream', name: 'Sweet Cream', price: 0.5 },
    { id: 'mc-vanilla-sweet-cream', name: 'Vanilla Sweet Cream', price: 0.5 },
    { id: 'mc-heavy-cream', name: 'Heavy Cream', price: 0.5 },
    { id: 'mc-half-half', name: 'Half & Half', price: 0 },
  ],
};

export const modalPowdersGroup: CustomizationGroup = {
  id: 'modal-powders',
  name: 'Powders',
  multiSelect: true,
  options: [
    { id: 'mp-cocoa', name: 'Cocoa Powder', price: 0.3 },
    { id: 'mp-cinnamon', name: 'Cinnamon', price: 0.3 },
    { id: 'mp-matcha-dust', name: 'Matcha Powder', price: 0.5 },
    { id: 'mp-vanilla-powder', name: 'Vanilla Powder', price: 0.3 },
    { id: 'mp-cinnamon-dolce', name: 'Cinnamon Dolce', price: 0.3 },
    { id: 'mp-nutmeg', name: 'Nutmeg', price: 0.3 },
  ],
};

export const modalEspressoSubGroups: CustomizationGroup[] = [
  {
    id: 'modal-espresso-roast',
    name: 'Roast',
    options: [
      { id: 'mer-light', name: 'Light Roast', price: 0 },
      { id: 'mer-medium', name: 'Medium Roast', price: 0 },
      { id: 'mer-dark', name: 'Dark Roast', price: 0 },
    ],
  },
  {
    id: 'modal-espresso-extraction',
    name: 'Extraction',
    options: [
      { id: 'mee-ristretto', name: 'Ristretto', price: 0 },
      { id: 'mee-normale', name: 'Normale', price: 0 },
      { id: 'mee-lungo', name: 'Lungo', price: 0 },
    ],
  },
  {
    id: 'modal-espresso-shot',
    name: 'Shot',
    options: [
      { id: 'mes-single', name: 'Single Shot', price: 0 },
      { id: 'mes-double', name: 'Double Shot', price: 0.5 },
      { id: 'mes-triple', name: 'Triple Shot', price: 1 },
    ],
  },
];

export function getCustomizeModalProductExtras(product: Product): CustomizationGroup[] {
  return product.customizations;
}

export const products: Product[] = [
  {
    id: 'iced-americano',
    name: 'Iced Americano',
    price: 3.5,
    category: 'Iced Coffee',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [],
  },
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    price: 4.5,
    category: 'Iced Coffee',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'iced-coconut-latte',
    name: 'Iced Coconut Latte',
    price: 5.0,
    category: 'Iced Coffee',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'iced-caramel-macchiato',
    name: 'Iced Caramel Macchiato',
    price: 5.5,
    category: 'Iced Coffee',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'hot-americano',
    name: 'Hot Americano',
    price: 3.0,
    category: 'Hot Coffee',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [],
  },
  {
    id: 'hot-latte',
    name: 'Hot Latte',
    price: 4.0,
    category: 'Hot Coffee',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'hot-cappuccino',
    name: 'Hot Cappuccino',
    price: 4.0,
    category: 'Hot Coffee',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'hot-mocha',
    name: 'Hot Mocha',
    price: 5.0,
    category: 'Hot Coffee',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'signature-vanilla-latte',
    name: 'Signature Vanilla Latte',
    price: 5.5,
    category: 'Signature Coffee',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'signature-caramel-cloud',
    name: 'Signature Caramel Cloud',
    price: 6.0,
    category: 'Signature Coffee',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'cold-brew-original',
    name: 'Cold Brew Original',
    price: 4.0,
    category: 'Cold Brew',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'cold-brew-vanilla',
    name: 'Cold Brew Vanilla',
    price: 4.5,
    category: 'Cold Brew',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    price: 5.0,
    category: 'Matcha',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'matcha-frappe',
    name: 'Matcha Frappe',
    price: 5.5,
    category: 'Matcha',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'caramel-frappe',
    name: 'Caramel Frappe',
    price: 5.5,
    category: 'Frappe',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
  {
    id: 'mocha-frappe',
    name: 'Mocha Frappe',
    price: 5.5,
    category: 'Frappe',
    defaultOptions: {
      cupOptions,
      temperature: temperatureOptions,
      ice: iceOptions,
    },
    customizations: [...milkCustomizations],
  },
];

export const categories = [
  'Iced Coffee',
  'Hot Coffee',
  'Signature Coffee',
  'Cold Brew',
  'Matcha',
  'Frappe',
];
