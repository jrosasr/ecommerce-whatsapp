"use client";

import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return <div onClick={handleClick} className="flex items-center gap-2">
    <DoorOpen />
    Cerrar sesión
  </div>;
};
export default LogoutButton;
