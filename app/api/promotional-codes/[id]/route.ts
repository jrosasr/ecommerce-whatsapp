import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const promotionalCode = await prisma.promotionalCode.findUnique({
    where: { id: params.id },
  })
  return NextResponse.json(promotionalCode)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json()
  const promotionalCode = await prisma.promotionalCode.update({
    where: { id: params.id },
    data,
  })
  return NextResponse.json(promotionalCode)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.promotionalCode.delete({
    where: { id: params.id },
  })
  return NextResponse.json({ message: 'Promotional code deleted successfully' })
}

