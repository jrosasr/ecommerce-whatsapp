"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2, Infinity, Trash2 } from 'lucide-react'
import { PromotionalCode } from "@/types/promotional-code"

export type Promotion = {
  id: number
  description: string
  code: string
  startDate: string
  endDate: string
  uses: string
  maxUses: string
  isNew: boolean
}

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }
  return new Date(date).toLocaleDateString("es-ES", options)
}

export const columns: ColumnDef<PromotionalCode>[] = [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const isNew = row.original.isNew
      return (
        <div className="flex flex-col items-start gap-2">
          {isNew && (
            <Badge variant="secondary" className="bg-purple-600 text-white">
              NUEVO
            </Badge>
          )}
          {row.getValue("description")}
        </div>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: "Fecha",
    cell: ({ row }) => {
      return `${formatDate(row.original.startDate)} - ${formatDate(row.original.endDate)}`
    },
  },
  {
    accessorKey: "uses",
    header: "Usos",
    cell: ({ row }) => {
      if (row.original.maxUses === null) {
        return <Infinity className="w-4 h-4" />
      }
      return `${row.original.uses}/${row.original.maxUses}`
    }
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row, table }) => {
      const meta = table.options.meta as { 
        deletePromotion: (id: number) => void
        editPromotion: (promotion: PromotionalCode) => void 
      }
      
      return (
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => meta.editPromotion(row.original)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => meta.deletePromotion(row.original.id! as number)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    },
  },
]

