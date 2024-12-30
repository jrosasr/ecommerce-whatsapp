import { PromotionalCode, PromotionalCodeUsagesHistory } from "@/types/promotional-code"

export async function getPromotionalCodes(startDate?: string, endDate?: string, code?: string): Promise<PromotionalCode[]> {
  const params = new URLSearchParams()
  if (startDate) params.append('startDate', startDate)
  if (endDate) params.append('endDate', endDate)
  if (code) params.append('code', code)

  const response = await fetch(`/api/promotional-codes?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch promotional codes')
  }
  return response.json()
}

export async function getPromotionalCodeUsages(startDate?: string, endDate?: string, code?: string): Promise<PromotionalCodeUsagesHistory[]> {
  const params = new URLSearchParams()
  if (startDate) params.append('startDate', startDate)
  if (endDate) params.append('endDate', endDate)
  if (code) params.append('code', code)

  const response = await fetch(`/api/promotional-codes/usages?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch promotional codes')
  }
  return response.json()
}

export async function createPromotionalCode(data: Partial<PromotionalCode>): Promise<PromotionalCode> {
  const response = await fetch('/api/promotional-codes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create promotional code')
  }
  return response.json()
}

export async function updatePromotionalCode(id: string | number, data: Partial<PromotionalCode>): Promise<PromotionalCode> {
  const response = await fetch(`/api/promotional-codes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update promotional code')
  }
  return response.json()
}

export async function deletePromotionalCode(id: string | number): Promise<void> {
  const response = await fetch(`/api/promotional-codes/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete promotional code')
  }
}

