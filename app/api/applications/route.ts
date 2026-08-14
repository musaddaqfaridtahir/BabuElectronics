import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    const applications = await prisma.installmentApplication.findMany({
      where,
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      cnic,
      phone,
      address,
      productId,
      selectedDownpayment,
      selectedTenure,
      guarantorName,
      guarantorPhone,
    } = body;

    if (!customerName || !cnic || !phone || !address || !productId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const application = await prisma.installmentApplication.create({
      data: {
        customerName,
        cnic,
        phone,
        address,
        productId,
        selectedDownpayment: Number(selectedDownpayment) || 0,
        selectedTenure: Number(selectedTenure) || 12,
        guarantorName: guarantorName || '',
        guarantorPhone: guarantorPhone || '',
        status: 'PENDING',
      },
      include: { product: true },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
  }
}
