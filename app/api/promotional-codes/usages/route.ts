import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Usage = {
  date: string
  usages: number
  codeDetails: {
    code: string
    count: number
  }[]
}

type promotionalCodeUsage = {
  id: string
  code: string
  usedAt: Date
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const code = searchParams.get('code')

let whereClause: any = {}

if (startDate || endDate) {
  whereClause.usedAt = {}
  if (startDate) {
    whereClause.usedAt.gte = new Date(startDate)
  }
  if (endDate) {
    // Add one day to the end date to include the entire last day
    const adjustedEndDate = new Date(endDate)
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1)
    whereClause.usedAt.lt = adjustedEndDate
  }
}

if (code) {
  whereClause.code = { contains: code }
}

  const promotionalCodeUsages = await prisma.promotionalCodeUsage.findMany({
    where: whereClause,
  })

  // Group usages by date and calculate cumulative usage
  const groupedUsages = promotionalCodeUsages.reduce((acc: Usage[], usage) => {
    const date = usage.usedAt.toISOString().split('T')[0];
    const existingEntry = acc.find((entry) => entry.date === date);

    if (existingEntry) {
      existingEntry.usages += 1;
      const codeDetail = existingEntry.codeDetails.find(detail => detail.code === usage.code);
      if (codeDetail) {
        codeDetail.count += 1;
      } else {
        existingEntry.codeDetails.push({ code: usage.code, count: 1 });
      }
    } else {
      acc.push({
        date,
        usages: 1,
        codeDetails: [{ code: usage.code, count: 1 }]
      });
    }

    return acc;
  }, []);

  // Sort the grouped usages by date
  groupedUsages.sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()));

  return NextResponse.json(groupedUsages)
}

