import { NextResponse } from 'next/server';
import { getTieredMarkupRate } from '@/lib/installments';

export async function GET() {
  const tenures = [6, 8, 10, 12, 14, 16];
  
  const standardTiers = tenures.map((m) => ({
    tenureMonths: m,
    markupPercentage: Math.round(getTieredMarkupRate(m, false) * 100),
    markupRate: getTieredMarkupRate(m, false),
    category: 'Standard / High-Ticket (> Rs. 100,000)',
  }));

  const smallTicketTiers = tenures.map((m) => ({
    tenureMonths: m,
    markupPercentage: Math.round(getTieredMarkupRate(m, true) * 100),
    markupRate: getTieredMarkupRate(m, true),
    category: 'Small Ticket (< Rs. 100,000)',
  }));

  return NextResponse.json({
    success: true,
    store: 'Babu Electronics Pakpattan',
    showroom: 'Sahiwal Road, Pakpattan',
    contact: {
      phone: '0300-4191281',
      whatsapp: '0300-1122782',
    },
    tenures,
    standardTiers,
    smallTicketTiers,
  });
}
