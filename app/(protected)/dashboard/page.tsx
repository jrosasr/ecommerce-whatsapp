"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eraser } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { EditPromotionModal } from "./components/edit-promotion-modal";
import {
  getPromotionalCodes,
  getPromotionalCodeUsages,
  createPromotionalCode,
  updatePromotionalCode,
  deletePromotionalCode,
} from "@/lib/api";
import { BarChartCustom } from "./BarChart";
import {
  PromotionalCode,
  PromotionalCodeUsagesHistory,
} from "@/types/promotional-code";

export default function DashboardPage() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [promotions, setPromotions] = useState<PromotionalCode[]>([]);
  const [usages, setUsages] = useState<PromotionalCodeUsagesHistory[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<PromotionalCode>();
  const [newPromotionModalOpen, setNewPromotionModalOpen] = useState(false);
  const [searchCode, setSearchCode] = useState("");

  useEffect(() => {
    fetchPromotionUsages();
    fetchPromotions();
  }, [startDate, endDate, searchCode]);

  const fetchPromotionUsages = async () => {
    try {
      const usages = await getPromotionalCodeUsages(
        startDate?.toISOString(),
        endDate?.toISOString(),
        searchCode
      );
      setUsages(usages);
    } catch (error) {
      console.error("Failed to fetch promotional code usages:", error);
    }
  };
  const fetchPromotions = async () => {
    try {
      const codes = await getPromotionalCodes(
        startDate?.toISOString(),
        endDate?.toISOString(),
        searchCode
      );
      setPromotions(codes);
    } catch (error) {
      console.error("Failed to fetch promotional codes:", error);
    }
  };

  const handleDeletePromotion = async (id: string | number) => {
    try {
      await deletePromotionalCode(id);
      await fetchPromotionUsages();
      await fetchPromotions();
    } catch (error) {
      console.error("Failed to delete promotional code:", error);
    }
  };

  const handleEditPromotion = (promotion: PromotionalCode) => {
    setSelectedPromotion(promotion);
    setEditModalOpen(true);
  };

  const handleNewPromotion = () => {
    setSelectedPromotion(undefined);
    setNewPromotionModalOpen(true);
  };

  const handleSavePromotion = async (
    updatedPromotion: Partial<PromotionalCode>
  ) => {
    try {
      if (selectedPromotion) {
        await updatePromotionalCode(selectedPromotion.id!, updatedPromotion);
      } else {
        await createPromotionalCode(updatedPromotion);
      }
      await fetchPromotionUsages();
      await fetchPromotions();
      setNewPromotionModalOpen(false);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Failed to save promotional code:", error);
    }
  };

  return (
    <div className="space-y-8 py-6 container">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg"></h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="top-2.5 left-2.5 absolute w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-8 min-w-[12rem]"
            placeholder="Buscar..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {startDate
                ? format(startDate, "PP", { locale: es })
                : "Fecha Inicial"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-auto">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {endDate ? format(endDate, "PP", { locale: es }) : "Fecha Final"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-auto">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {/* Reset Button */}
        <Button
          onClick={() => {
            setStartDate(undefined);
            setEndDate(undefined);
            setSearchCode("");
          }}
        >
          <Eraser className="w-4 h-4" />
        </Button>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad de Promociones</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          {/* <ResponsiveContainer width="100%" height={350}> */}
          <BarChartCustom data={usages} />
          {/* </ResponsiveContainer> */}
        </CardContent>
      </Card>

      {/* Data Table */}
      <div className="p-4 border rounded-lg">
        <DataTable
          columns={columns}
          data={promotions}
          onDelete={handleDeletePromotion}
          onEdit={handleEditPromotion}
          onNewPromotion={handleNewPromotion}
        />
      </div>

      {/* Edit Promotion Modal */}
      <EditPromotionModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        promotion={selectedPromotion}
        onSave={handleSavePromotion}
      />

      {/* New Promotion Modal */}
      <EditPromotionModal
        open={newPromotionModalOpen}
        onOpenChange={setNewPromotionModalOpen}
        onSave={handleSavePromotion}
      />
    </div>
  );
}
