import { Product, Option } from '../types';

const cupOptions: Option[] = [
  { id: 'small', name: 'Small', price: 0 },
  { id: 'medium', name: 'Medium', price: 0.5 },
  { id: 'large', name: 'Large', price: 1 },
];

const temperatureOptions: Option[] = [
  { id: 'hot', name: 'Hot', price: 0 },
  { id: 'iced', name: 'Iced', price: 0 },
];

const iceOptions: Option[] = [
  { id: 'no-ice', name: 'No Ice', price: 0 },
  { id: 'light-ice', name: 'Light Ice', price: 0 },
  { id: 'regular-ice', name: 'Regular Ice', price: 0 },
  { id: 'extra-ice', name: 'Extra Ice', price: 0 },
];

const espressoCustomizations = [
  {
    id: 'roast-options',
    name: 'Roast Options',
    options: [
      { id: 'light', name: 'Light Roast', price: 0 },
      { id: 'medium', name: 'Medium Roast', price: 0 },
      { id: 'dark', name: 'Dark Roast', price: 0 },
    ],
  },
  {
    id: 'extraction-options',
    name: 'Extraction Options',
    options: [
      { id: 'ristretto', name: 'Ristretto', price: 0 },
      { id: 'normale', name: 'Normale', price: 0 },
      { id: 'lungo', name: 'Lungo', price: 0 },
    ],
  },
  {
    id: 'shot',
    name: 'Shot',
    options: [
      { id: 'single', name: 'Single Shot', price: 0 },
      { id: 'double', name: 'Double Shot', price: 0.5 },
      { id: 'triple', name: 'Triple Shot', price: 1 },
    ],
  },
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

const syrupCustomizations = [
  {
    id: 'syrup',
    name: 'Syrup',
    multiSelect: true,
    options: [
      { id: 'vanilla', name: 'Vanilla', price: 0.5 },
      { id: 'caramel', name: 'Caramel', price: 0.5 },
      { id: 'hazelnut', name: 'Hazelnut', price: 0.5 },
      { id: 'mocha', name: 'Mocha', price: 0.5 },
    ],
  },
];

const toppingCustomizations = [
  {
    id: 'toppings',
    name: 'Toppings',
    multiSelect: true,
    options: [
      { id: 'whipped-cream', name: 'Whipped Cream', price: 0.5 },
      { id: 'cocoa-powder', name: 'Cocoa Powder', price: 0.3 },
      { id: 'cinnamon', name: 'Cinnamon', price: 0.3 },
    ],
  },
];

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
    customizations: [...espressoCustomizations, ...syrupCustomizations],
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
    customizations: [...espressoCustomizations, ...milkCustomizations, ...syrupCustomizations],
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
    customizations: [...espressoCustomizations, ...milkCustomizations, ...syrupCustomizations, ...toppingCustomizations],
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
    customizations: [...espressoCustomizations, ...milkCustomizations, ...toppingCustomizations],
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
    customizations: [...espressoCustomizations, ...syrupCustomizations],
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
    customizations: [...espressoCustomizations, ...milkCustomizations, ...syrupCustomizations],
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
    customizations: [...espressoCustomizations, ...milkCustomizations, ...toppingCustomizations],
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
    customizations: [...espressoCustomizations, ...milkCustomizations, ...toppingCustomizations],
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
    customizations: [...espressoCustomizations, ...milkCustomizations, ...toppingCustomizations],
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
    customizations: [...espressoCustomizations, ...milkCustomizations, ...toppingCustomizations],
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
    customizations: [...milkCustomizations, ...syrupCustomizations],
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
    customizations: [...milkCustomizations, ...toppingCustomizations],
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
    customizations: [...milkCustomizations, ...syrupCustomizations, ...toppingCustomizations],
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
    customizations: [...milkCustomizations, ...toppingCustomizations],
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
    customizations: [...milkCustomizations, ...toppingCustomizations],
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
    customizations: [...milkCustomizations, ...toppingCustomizations],
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
