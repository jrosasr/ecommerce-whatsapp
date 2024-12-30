"use client";
import { useState } from "react";
import WhatsApp from "@/components/icons/Whatsapp";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";

type Plan = {
  id: string;
  duration: number;
  price: number;
  savings: { type: "amount" | "months"; value: number } | null;
};

const plans: Plan[] = [
  { id: "1-month", duration: 1, price: 5.99, savings: null },
  {
    id: "2-month",
    duration: 2,
    price: 9.99,
    savings: { type: "amount", value: 1.99 },
  },
  {
    id: "3-month",
    duration: 3,
    price: 13.99,
    savings: { type: "amount", value: 3.98 },
  },
  {
    id: "6-month",
    duration: 6,
    price: 29.95,
    savings: { type: "months", value: 1 },
  },
  {
    id: "12-month",
    duration: 12,
    price: 59.9,
    savings: { type: "months", value: 2 },
  },
];

export function CallToAction() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);

function formatMessageForWhatsApp({
  name,
  code,
  discountType,
  originalAmount,
  discountedAmount,
  discountAmount,
  discountValue,
  planDuration,
}: {
  name: string;
  code: string;
  discountType: string;
  originalAmount: string | number;
  discountedAmount: string | number;
  discountAmount: string | number;
  discountValue: string | number;
  planDuration: number;
}) {
  let mensaje = `Saludos 👋, me llamo *${name}* y deseo adquirir una cuenta de Luna TV. 💎`;

  mensaje += `\n\nPlan seleccionado: *${planDuration} ${planDuration > 1 ? "meses" : "mes"}*`;
  mensaje += `\nSubtotal: *$${originalAmount}*`;
  if (code) {
    mensaje += `\nCÓDIGO APLICADO( *${code}* ): *$${parseFloat(discountAmount.toString()).toFixed(2)}*`;
  }
  mensaje += `\nTotal: *$${parseFloat(discountedAmount.toString()).toFixed(2)}*\n`;

  if (code) {
    mensaje += `\n🎁Código: *${code}*🎁`;
    mensaje += `\n\Descuento aplicado: *${
      discountType === "fixed" ? `$${discountValue}` : `${discountValue}%`
    }*`;
  }

  const mensajeCodificado = encodeURIComponent(mensaje);
  const urlCompleta =
    "https://api.whatsapp.com/send?phone=15128459099&text=" +
    mensajeCodificado;

  window.open(urlCompleta, "_blank");
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/apply-promo-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name, 
          code, 
          amount: selectedPlan.price,
        }),
      });

      const data = await response.json();

      let discountAmount = 0;
      if (data.discountType === "percentage") {
        discountAmount = parseFloat(
          (data.originalAmount * (data.discountValue / 100)).toFixed(2)
        );
      } else if (data.discountType === "fixed") {
        discountAmount = data.discountValue;
      }

      if (response.ok) {
        formatMessageForWhatsApp({
          name,
          code,
          discountType: data.discountType,
          originalAmount: data.originalAmount,
          discountedAmount: data.discountedAmount,
          discountAmount: discountAmount,
          discountValue: data.discountValue,
          planDuration: selectedPlan.duration,
        });
      }

      if (!response.ok) {
        throw new Error(data.error || "Se produjo un error");
      }

      setResult(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlanId = e.target.value;
    const newSelectedPlan = plans.find((plan) => plan.id === selectedPlanId);
    if (newSelectedPlan) {
      setSelectedPlan(newSelectedPlan);
    }
  };

  const formatPlanText = (plan: Plan) => {
    return `${plan.duration} ${plan.duration > 1 ? "meses" : "mes"} - $${
      plan.price
    }`;
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 mx-auto w-full max-w-4xl">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-4">
          <div className="col-span-2 w-full">
            <Select
              label="Seleccione un plan"
              size="sm"
              defaultSelectedKeys={["1-month"]}
              onChange={handlePlanChange}
            >
              {plans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {formatPlanText(plan)}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex justify-center md:justify-start items-center w-full">
            <div className="flex items-center md:ml-auto text-white">
              <span className="font-bold text-4xl">${selectedPlan.price}</span>
              {selectedPlan?.savings && (
                <div className="bg-gradient-to-r from-transparent to-cyan-700 shadow-lg px-4 py-2 rounded-full text-white transform transition-transform">
                  <p className="font-bold text-lg">
                    {" "}
                    {selectedPlan.savings.type === "amount"
                      ? `Ahorra: $${selectedPlan.savings.value}`
                      : `${selectedPlan.savings.value} ${
                          selectedPlan.savings.value > 1 ? "meses" : "mes"
                        } Gratis`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          <div className="w-full">
            <Input
              type="text"
              size="sm"
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <Input
              type="text"
              size="sm"
              label="Código (opcional)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="w-full">
            <RainbowButton
              type="submit"
              className="gap-2 w-full transition ease-in-out hover:scale-105"
            >
              <WhatsApp className="-mt-[3px] mr-1 w-5 h-5" />
              Suscribirse
            </RainbowButton>
          </div>
        </div>
      </form>
      {error && <div className="mt-4 w-full text-red-500">{error}</div>}
    </div>
  );
}

