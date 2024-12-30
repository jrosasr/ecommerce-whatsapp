"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { CalendarIcon } from 'lucide-react';
import { DateRange } from "react-day-picker";

import { es } from "date-fns/locale";
import { type Promotion } from "../columns";
import { PromotionalCode } from "@/types/promotional-code";
import { cn } from "@/lib/utils";

interface EditPromotionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion?: PromotionalCode;
  onSave: (promotion: Partial<PromotionalCode>) => void;
}

export function EditPromotionModal({
  open,
  onOpenChange,
  promotion,
  onSave,
}: EditPromotionModalProps) {

  const [startDate, setStartDate] = useState<Date | undefined>(
    promotion?.startDate ? new Date(promotion.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    promotion?.endDate ? new Date(promotion.endDate) : undefined
  );
  
  const [quotaType, setQuotaType] = useState(
    promotion?.maxUses && promotion.maxUses !== null ? "limited" : "unlimited"
  );
  const [discountType, setDiscountType] = useState("fixed");

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const [code, setCode] = useState(promotion?.code || '');
  const [description, setDescription] = useState(promotion?.description || '');
  const [quota, setQuota] = useState(promotion?.maxUses?.toString() || '30');
  const [discount, setDiscount] = useState(promotion?.discountValue?.toString() || '0');

  useEffect(() => {
    if (open) {
      if (promotion) {
        setStartDate(promotion.startDate ? new Date(promotion.startDate) : undefined);
        setEndDate(promotion.endDate ? new Date(promotion.endDate) : undefined);
        setQuotaType(promotion.maxUses && promotion.maxUses !== null ? "limited" : "unlimited");
        setDiscountType(promotion.discountType || "fixed");
        setDate({
          from: promotion.startDate ? new Date(promotion.startDate) : new Date(),
          to: promotion.endDate ? new Date(promotion.endDate) : addDays(new Date(), 30),
        });
        setCode(promotion.code || '');
        setDescription(promotion.description || '');
        setQuota(promotion.maxUses?.toString() || '30');
        setDiscount(promotion.discountValue?.toString() || '0');
      } else {
        setStartDate(undefined);
        setEndDate(undefined);
        setQuotaType('limited');
        setDiscountType('fixed');
        setDate({
          from: new Date(),
          to: addDays(new Date(), 30),
        });
        setCode('');
        setDescription('');
        setQuota('30');
        setDiscount('0');
      }
    }
  }, [open, promotion]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    onSave({
      id: promotion?.id,
      code: code,
      description: description,
      startDate: date?.from,
      endDate: date?.to,
      uses: 0,
      maxUses: quotaType === "limited" ? parseInt(quota) : null,
      discountType: discountType,
      discountValue: parseInt(discount),
      isActive: true,
      isNew: false,
    });

    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="border-b">
          <DrawerTitle>
            {promotion ? "Editar código" : "Registrar nuevo código"}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código</Label>
              <Input
                id="code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={promotion !== undefined}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción del código</Label>
              <Input
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={promotion !== undefined}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Fecha de vigencia</Label>
              <div className="gap-2 grid">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-auto" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cupos</Label>
              <RadioGroup
                value={quotaType}
                onValueChange={setQuotaType}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="limited" id="limited" />
                  <Label htmlFor="limited">Limitados</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unlimited" id="unlimited" />
                  <Label htmlFor="unlimited">Ilimitados</Label>
                </div>
              </RadioGroup>
            </div>

            {quotaType === "limited" && (
              <div className="space-y-2">
                <Label htmlFor="quota">Cupos Disponibles</Label>
                <Input
                  id="quota"
                  name="quota"
                  type="number"
                  min="1"
                  value={quota}
                  onChange={(e) => setQuota(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Tipo de descuento</Label>
              <RadioGroup
                value={discountType}
                onValueChange={setDiscountType}
                className="flex gap-4"
                disabled={promotion !== undefined}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage">% de descuento</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed">Monto fijo</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Descuento</Label>
              <div className="relative">
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  min="0"
                  step={discountType === "percentage" ? "0.01" : "1"}
                  className="pr-12"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  disabled={promotion !== undefined}
                />
                <span className="top-2 right-3 absolute text-muted-foreground">
                  {discountType === "percentage" ? "%" : "USD"}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-purple-700 text-white"
              >
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

