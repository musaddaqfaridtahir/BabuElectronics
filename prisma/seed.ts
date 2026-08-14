import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding BabuElectronics database...');

  // Default Categories
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
      name: 'Refrigerators',
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
      name: 'Mobiles & Tablets',
      slug: 'mobiles',
      image: '/uploads/cat-mobile.jpg',
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
  const mobileCat = await prisma.category.findUnique({ where: { slug: 'mobiles' } });

  // Sample Products
  const productsData = [
    {
      title: 'Honda CG 125 Self Start 2025',
      slug: 'honda-cg-125-self-start-2025',
      categoryId: motorbikesCat!.id,
      cashPrice: 285000,
      installmentPrice: 320000,
      downpaymentBase: 50000,
      durationMonths: 12,
      imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ Engine: '125cc Euro 2', Transmission: '5 Speed', FuelCapacity: '9.2 Liters', Warranty: '3 Years' }),
      isFeatured: true,
      stock: 12,
    },
    {
      title: 'Crown Electric Scooter EV-1000W',
      slug: 'crown-electric-scooter-ev-1000w',
      categoryId: evCat!.id,
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
      categoryId: refrigCat!.id,
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
      categoryId: ledCat!.id,
      cashPrice: 128000,
      installmentPrice: 146000,
      downpaymentBase: 20000,
      durationMonths: 12,
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ ScreenSize: '55 Inch', Resolution: '4K Ultra HD', OS: 'Google TV', Audio: 'Dolby Atmos' }),
      isFeatured: false,
      stock: 10,
    },
    {
      title: 'Haier 1.5 Ton Inverter AC Heat & Cool (HSU-18HFR)',
      slug: 'haier-1-5-ton-inverter-ac-heat-cool',
      categoryId: acCat!.id,
      cashPrice: 175000,
      installmentPrice: 200000,
      downpaymentBase: 30000,
      durationMonths: 12,
      imageUrl: 'https://images.unsplash.com/photo-1631545498804-d558b9f1d0ca?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ Capacity: '1.5 Ton (18000 BTU)', Type: 'Heat & Cool Inverter', EER: '3.6 UPS Enabled', Warranty: '10 Years Compressor' }),
      isFeatured: true,
      stock: 7,
    },
    {
      title: 'Samsung Galaxy A55 5G (8GB / 256GB)',
      slug: 'samsung-galaxy-a55-5g',
      categoryId: mobileCat!.id,
      cashPrice: 132000,
      installmentPrice: 152000,
      downpaymentBase: 25000,
      durationMonths: 12,
      imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
      specsJson: JSON.stringify({ RAM: '8GB', Storage: '256GB', Camera: '50MP OIS Triple', Battery: '5000mAh 25W' }),
      isFeatured: false,
      stock: 20,
    },
  ];

  for (const prodData of productsData) {
    await prisma.product.upsert({
      where: { slug: prodData.slug },
      update: prodData,
      create: prodData,
    });
  }

  const hondaProduct = await prisma.product.findUnique({ where: { slug: 'honda-cg-125-self-start-2025' } });

  // Sample Installment Application
  if (hondaProduct) {
    await prisma.installmentApplication.create({
      data: {
        customerName: 'Muhammad Ali',
        cnic: '35202-1234567-1',
        phone: '0300-1234567',
        address: 'House #45, Block C, Model Town, Lahore',
        productId: hondaProduct.id,
        selectedDownpayment: 50000,
        selectedTenure: 12,
        guarantorName: 'Usman Tariq',
        guarantorPhone: '0321-7654321',
        status: 'PENDING',
      },
    });

    await prisma.installmentApplication.create({
      data: {
        customerName: 'Kamran Khan',
        cnic: '35201-9876543-3',
        phone: '0333-5554433',
        address: 'Shop #12, Main Bazaar, Rawalpindi',
        productId: hondaProduct.id,
        selectedDownpayment: 60000,
        selectedTenure: 6,
        guarantorName: 'Zubair Ahmed',
        guarantorPhone: '0345-1122334',
        status: 'APPROVED',
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
