import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, code = '', amount } = await req.json();

    if (!name || !amount) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    let promoCode = null;
    let discountedAmount = amount;

    if (code) {
      promoCode = await prisma.promotionalCode.findUnique({
        where: { code },
      });

      if (!promoCode) {
        return NextResponse.json({ error: 'Código promocional no válido' }, { status: 400 });
      }

      if (!promoCode.isActive) {
        return NextResponse.json({ error: 'El código promocional no está activo' }, { status: 400 });
      }

      const now = new Date();
      if (now < promoCode.startDate || now > promoCode.endDate) {
        return NextResponse.json({ error: 'El código promocional no es válido en este momento.' }, { status: 400 });
      }

      if(promoCode.maxUses !== null && promoCode.uses >= promoCode.maxUses) {
        // Code has reached its usage limit
        return NextResponse.json({ error: 'El código promocional ha alcanzado su límite de uso' }, { status: 400 });
      }

      if (promoCode.maxUses === null) {
        // Code can be used infinitely
        await prisma.promotionalCode.update({
          where: { id: promoCode.id },
          data: { uses: { increment: 1 } },
        });

      } else if (promoCode.uses < promoCode.maxUses) {
        // Code can still be used
        await prisma.promotionalCode.update({
          where: { id: promoCode.id },
          data: { uses: { increment: 1 } },
        });
      }

      if (promoCode.discountType === 'percentage') {
        discountedAmount = amount * (1 - promoCode.discountValue / 100);
      } else {
        discountedAmount = Math.max(0, amount - promoCode.discountValue);
      }

      await prisma.promotionalCodeUsage.create({
        data: {
          code,
        },
      })
    }

    return NextResponse.json({
      discountType: promoCode ? promoCode.discountType : 'none',
      discountValue: promoCode ? promoCode.discountValue : 0,
      originalAmount: amount,
      discountedAmount: discountedAmount,
    });

  } catch (error) {
    console.error('Error al aplicar el código promocional:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

