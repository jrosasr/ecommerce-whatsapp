export type PromotionalCode = {
  id?: string | number;
  code: string;
  description: string;
  startDate: Date;
  endDate: Date;
  uses: number;
  maxUses: number | null;
  discountType: string;
  discountValue: number;
  isActive: Boolean;
  isNew?: Boolean;
};

export type PromotionalCodeUsagesHistory = {
  date: Date;
  usages: number;
}
