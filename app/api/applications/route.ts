import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { customerName: { contains: search } },
        { cnic: { contains: search } },
        { phone: { contains: search } },
        { guarantorName: { contains: search } },
        { product: { title: { contains: search } } },
      ];
    }

    const applications = await prisma.installmentApplication.findMany({
      where,
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
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

    if (!customerName || !cnic || !phone || !productId) {
      return NextResponse.json({ error: 'Missing required customer details' }, { status: 400 });
    }

    const application = await prisma.installmentApplication.create({
      data: {
        customerName,
        cnic,
        phone,
        address: address || '',
        productId,
        selectedDownpayment: parseFloat(selectedDownpayment || 0),
        selectedTenure: parseInt(selectedTenure || 12),
        guarantorName: guarantorName || '',
        guarantorPhone: guarantorPhone || '',
        status: 'PENDING',
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error: any) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: 'Failed to submit installment application' }, { status: 500 });
  }
}
