export interface Product {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  category?: {
    name: string;
    slug: string;
  };
  cashPrice: number;
  installmentPrice: number;
  downpaymentBase: number;
  durationMonths: number;
  imageUrl: string;
  specsJson?: string;
  isFeatured: boolean;
  stock: number;
}

export const fallbackProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Honda CG 125 Self Start 2025 Model',
    slug: 'honda-cg-125-self-start-2025',
    categoryId: 'motorbikes',
    category: { name: 'Motorbikes', slug: 'motorbikes' },
    cashPrice: 285000,
    installmentPrice: 325000,
    downpaymentBase: 50000,
    durationMonths: 12,
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
    specsJson: JSON.stringify({ Engine: '125cc 4-Stroke', Starter: 'Self & Kick', Warranty: '3 Years Company' }),
    isFeatured: true,
    stock: 10,
  },
  {
    id: 'prod-2',
    title: 'Haier Inverter Refrigerator 438 Liters (HRF-438)',
    slug: 'haier-inverter-refrigerator-438l',
    categoryId: 'refrigerators',
    category: { name: 'Refrigerators', slug: 'refrigerators' },
    cashPrice: 138000,
    installmentPrice: 158000,
    downpaymentBase: 25000,
    durationMonths: 12,
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    specsJson: JSON.stringify({ Capacity: '16 Cu Ft', Technology: 'Digital Inverter', Warranty: '10 Years Compressor' }),
    isFeatured: true,
    stock: 12,
  },
  {
    id: 'prod-3',
    title: 'Dawlance Fully Automatic Washing Machine (DWM-9120)',
    slug: 'dawlance-automatic-washing-machine-9120',
    categoryId: 'washing-machines',
    category: { name: 'Washing Machines', slug: 'washing-machines' },
    cashPrice: 85000,
    installmentPrice: 98000,
    downpaymentBase: 15000,
    durationMonths: 12,
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80',
    specsJson: JSON.stringify({ Capacity: '9.5 KG', SpinSpeed: '700 RPM', Tub: 'Stainless Steel' }),
    isFeatured: false,
    stock: 8,
  },
  {
    id: 'prod-4',
    title: 'Orient 43" 4K UHD Smart Android LED TV',
    slug: 'orient-43-4k-uhd-smart-led-tv',
    categoryId: 'leds',
    category: { name: 'LEDs & TVs', slug: 'leds' },
    cashPrice: 76000,
    installmentPrice: 88000,
    downpaymentBase: 12000,
    durationMonths: 12,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
    specsJson: JSON.stringify({ Display: '4K Ultra HD', OS: 'Android 11', Audio: 'Dolby Digital' }),
    isFeatured: true,
    stock: 15,
  },
  {
    id: 'prod-5',
    title: 'Crown Electric Scooter EV-1000W (Graphene Battery)',
    slug: 'crown-electric-scooter-ev-1000w',
    categoryId: 'electric-vehicles',
    category: { name: 'Electric Bikes', slug: 'electric-vehicles' },
    cashPrice: 215000,
    installmentPrice: 245000,
    downpaymentBase: 40000,
    durationMonths: 12,
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80',
    specsJson: JSON.stringify({ Motor: '1000W Brushless', Range: '75 KM per charge', ChargeTime: '4 Hours' }),
    isFeatured: true,
    stock: 6,
  },
  {
    id: 'prod-6',
    title: 'Gree 1.5 Ton Inverter AC Heat & Cool (GWH-18)',
    slug: 'gree-1-5-ton-inverter-ac',
    categoryId: 'acs',
    category: { name: 'Air Conditioners', slug: 'acs' },
    cashPrice: 172000,
    installmentPrice: 196000,
    downpaymentBase: 30000,
    durationMonths: 12,
    imageUrl: 'https://images.unsplash.com/photo-1631545498804-d558b9f1d0ca?auto=format&fit=crop&w=600&q=80',
    specsJson: JSON.stringify({ Capacity: '1.5 Ton', Inverter: 'T3 Climate Inverter', Energy: '60% Power Saving' }),
    isFeatured: false,
    stock: 9,
  },
  {
    id: 'prod-7',
    title: 'Samsung Galaxy A55 5G (8GB / 256GB Official PTA)',
    slug: 'samsung-galaxy-a55-5g',
    categoryId: 'mobiles',
    category: { name: 'Mobiles & Tablets', slug: 'mobiles' },
    cashPrice: 132000,
    installmentPrice: 152000,
    downpaymentBase: 25000,
    durationMonths: 12,
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    specsJson: JSON.stringify({ RAM: '8GB', Storage: '256GB', Approval: '100% Official PTA' }),
    isFeatured: false,
    stock: 14,
  },
  {
    id: 'prod-8',
    title: 'Super Star 70cc Motorcycle 2025 Model',
    slug: 'super-star-70cc-motorcycle-2025',
    categoryId: 'motorbikes',
    category: { name: 'Motorbikes', slug: 'motorbikes' },
    cashPrice: 115000,
    installmentPrice: 132000,
    downpaymentBase: 20000,
    durationMonths: 12,
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
    specsJson: JSON.stringify({ Engine: '70cc Euro 2', Mileage: '55 KM/L', Warranty: '2 Years' }),
    isFeatured: false,
    stock: 11,
  },
];
