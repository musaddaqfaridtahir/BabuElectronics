const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding BabuElectronics database with updated categories & products...');

  // Updated Categories List
  const categoriesData = [
    {
      name: 'Motorbikes',
      slug: 'motorbikes',
      image: '/uploads/cat-motorbike.jpg',
    },
    {
      name: 'Electric Vehicles',
      slug: 'electric-vehicles',
      image: '/uploads/cat-ev.jpg',
    },
    {
      name: 'Refrigerators & Freezers',
      slug: 'refrigerators',
      image: '/uploads/cat-refrigerator.jpg',
    },
    {
      name: 'LEDs & Smart TVs',
      slug: 'leds',
      image: '/uploads/cat-led.jpg',
    },
    {
      name: 'Air Conditioners',
      slug: 'acs',
      image: '/uploads/cat-ac.jpg',
    },
    {
      name: 'Washing Machines',
      slug: 'washing-machines',
      image: '/uploads/cat-washer.jpg',
    },
    {
      name: 'Mobiles & Tablets',
      slug: 'mobiles',
      image: '/uploads/cat-mobile.jpg',
    },
    {
      name: 'Microwave Ovens',
      slug: 'microwave-ovens',
      image: '/uploads/cat-microwave.jpg',
    },
    {
      name: 'Water Dispensers',
      slug: 'water-dispensers',
      image: '/uploads/cat-dispenser.jpg',
    },
    {
      name: 'Kitchen & Home Appliances',
      slug: 'home-appliances',
      image: '/uploads/cat-appliances.jpg',
    },
  ];

  for (const catData of categoriesData) {
    await prisma.category.upsert({
      where: { slug: catData.slug },
      update: catData,
      create: catData,
    });
  }

  const motorbikesCat = await prisma.category.findUnique({ where: { slug: 'motorbikes' } });
  const evCat = await prisma.category.findUnique({ where: { slug: 'electric-vehicles' } });
  const refrigCat = await prisma.category.findUnique({ where: { slug: 'refrigerators' } });
  const ledCat = await prisma.category.findUnique({ where: { slug: 'leds' } });
  const acCat = await prisma.category.findUnique({ where: { slug: 'acs' } });
  const washerCat = await prisma.category.findUnique({ where: { slug: 'washing-machines' } });
  const mobileCat = await prisma.category.findUnique({ where: { slug: 'mobiles' } });
  const microwaveCat = await prisma.category.findUnique({ where: { slug: 'microwave-ovens' } });
  const dispenserCat = await prisma.category.findUnique({ where: { slug: 'water-dispensers' } });
  const appliancesCat = await prisma.category.findUnique({ where: { slug: 'home-appliances' } });

  // Sample Products with 6 to 16 Month Installment Plans
  const productsData = [
    {
      title: 'Honda CG 125 Self Start 2025',
      slug: 'honda-cg-125-self-start-2025',
      categoryId: motorbikesCat.id,
      cashPrice: 285000,
      installmentPrice: 320000,
      downpaymentBase: 50000,
      durationMonths: 16,
      imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ Engine: '125cc Euro 2', Transmission: '5 Speed', FuelCapacity: '9.2 Liters', Warranty: '3 Years' }),
      isFeatured: true,
      stock: 12,
    },
    {
      title: 'Crown Electric Scooter EV-1000W',
      slug: 'crown-electric-scooter-ev-1000w',
      categoryId: evCat.id,
      cashPrice: 215000,
      installmentPrice: 245000,
      downpaymentBase: 40000,
      durationMonths: 12,
      imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ Motor: '1000W Brushless', Range: '80 km/charge', TopSpeed: '60 km/h', Battery: 'Graphene 72V 20Ah' }),
      isFeatured: true,
      stock: 8,
    },
    {
      title: 'Dawlance Inverter Refrigerator 91999 Avante',
      slug: 'dawlance-inverter-refrigerator-91999-avante',
      categoryId: refrigCat.id,
      cashPrice: 145000,
      installmentPrice: 168000,
      downpaymentBase: 25000,
      durationMonths: 12,
      imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ Capacity: '18 Cu Ft', Technology: 'Inverter Pro', Color: 'Ruby Red', Warranty: '12 Years Compressor' }),
      isFeatured: true,
      stock: 15,
    },
    {
      title: 'TCL 55" 4K UHD Smart Google TV (55P735)',
      slug: 'tcl-55-4k-uhd-smart-google-tv',
      categoryId: ledCat.id,
      cashPrice: 128000,
      installmentPrice: 146000,
      downpaymentBase: 20000,
      durationMonths: 10,
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ ScreenSize: '55 Inch', Resolution: '4K Ultra HD', OS: 'Google TV', Audio: 'Dolby Atmos' }),
      isFeatured: false,
      stock: 10,
    },
    {
      title: 'Haier 1.5 Ton Inverter AC Heat & Cool (HSU-18HFR)',
      slug: 'haier-1-5-ton-inverter-ac-heat-cool',
      categoryId: acCat.id,
      cashPrice: 175000,
      installmentPrice: 200000,
      downpaymentBase: 30000,
      durationMonths: 14,
      imageUrl: 'https://images.unsplash.com/photo-1631545498804-d558b9f1d0ca?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ Capacity: '1.5 Ton (18000 BTU)', Type: 'Heat & Cool Inverter', EER: '3.6 UPS Enabled', Warranty: '10 Years Compressor' }),
      isFeatured: true,
      stock: 7,
    },
    {
      title: 'Samsung Galaxy A55 5G (8GB / 256GB)',
      slug: 'samsung-galaxy-a55-5g',
      categoryId: mobileCat.id,
      cashPrice: 132000,
      installmentPrice: 152000,
      downpaymentBase: 25000,
      durationMonths: 8,
      imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ RAM: '8GB', Storage: '256GB', Camera: '50MP OIS Triple', Battery: '5000mAh 25W' }),
      isFeatured: false,
      stock: 20,
    },
    {
      title: 'Dawlance Microwave Oven DW-131-G Grill',
      slug: 'dawlance-microwave-oven-dw-131-g',
      categoryId: microwaveCat.id,
      cashPrice: 34000,
      installmentPrice: 39500,
      downpaymentBase: 8000,
      durationMonths: 6,
      imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ Capacity: '30 Liters', Type: 'Grill & Convection', Power: '1000W', Control: 'Digital Touch' }),
      isFeatured: true,
      stock: 14,
    },
    {
      title: 'Orient Water Dispenser OWD-529 Glass Door',
      slug: 'orient-water-dispenser-owd-529',
      categoryId: dispenserCat.id,
      cashPrice: 38500,
      installmentPrice: 44000,
      downpaymentBase: 9000,
      durationMonths: 6,
      imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ Taps: '3 Taps (Hot, Normal, Cold)', Cabinet: 'Refrigerator Cabinet', Compressor: 'High Efficiency' }),
      isFeatured: false,
      stock: 10,
    },
    {
      title: 'Anex 7-in-1 Food Factory Juicer & Blender (AG-3040)',
      slug: 'anex-7-in-1-food-factory-ag-3040',
      categoryId: appliancesCat.id,
      cashPrice: 22500,
      installmentPrice: 26000,
      downpaymentBase: 5000,
      durationMonths: 6,
      imageUrl: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ Motor: '800W Copper', Functions: 'Juicer, Chopper, Blender, Grinder, Slicing', Warranty: '2 Years' }),
      isFeatured: true,
      stock: 25,
    },
  ];

  for (const prodData of productsData) {
    await prisma.product.upsert({
      where: { slug: prodData.slug },
      update: prodData,
      create: prodData,
    });
  }

  console.log('BabuElectronics database updated successfully!');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
