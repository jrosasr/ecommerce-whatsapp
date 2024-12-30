"use client";

import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Eye, EyeOff } from 'lucide-react';
import ButtonSocial from "@/components/button-social";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FormLoginProps {
  isVerified: boolean;
  OAuthAccountNotLinked: boolean;
}

const FormLogin = ({ isVerified, OAuthAccountNotLinked }: FormLoginProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);
    startTransition(async () => {
      const response = await loginAction(values);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/dashboard");
      }
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-bold text-2xl text-center">Iniciar Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        {isVerified && (
          <p className="mb-4 text-center text-green-500 text-sm">
            Correo electrónico verificado, ahora puedes iniciar sesión
          </p>
        )}
        {OAuthAccountNotLinked && (
          <p className="mb-4 text-center text-red-500 text-sm">
            Para confirmar tu identidad, inicia sesión con la misma cuenta que usaste originalmente.
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa tu correo electrónico" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Ingresa tu contraseña"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormMessage>{error}</FormMessage>}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </Form>
        {/* <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-blue-600 text-sm hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div> */}
        <Separator className="my-4" />
        {/* <div className="space-y-2">
          <ButtonSocial provider="github" className="w-full">
            <FaGithub className="mr-2 w-4 h-4" />
            <span>Iniciar sesión con Github</span>
          </ButtonSocial>
          <ButtonSocial provider="google" className="w-full">
            <FaGoogle className="mr-2 w-4 h-4" />
            <span>Iniciar sesión con Google</span>
          </ButtonSocial>
        </div> */}
      </CardContent>
      <CardFooter>
        {/* <p className="w-full text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p> */}
      </CardFooter>
    </Card>
  );
};

export default FormLogin;

