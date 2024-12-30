import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const code = searchParams.get('code')

  let whereClause: any = {}

  if (startDate) {
    whereClause.startDate = { gte: new Date(startDate) }
  }
  if (endDate) {
    whereClause.endDate = { lte: new Date(endDate) }
  }
  if (code) {
    whereClause.code = { contains: code }
  }

  const promotionalCodes = await prisma.promotionalCode.findMany({
    where: whereClause,
  })

  return NextResponse.json(promotionalCodes)
}

export async function POST(request: Request) {
  const data = await request.json()
  const promotionalCode = await prisma.promotionalCode.create({
    data,
  })
  return NextResponse.json(promotionalCode)
}

