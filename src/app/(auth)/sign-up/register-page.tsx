"use client";

import Link from "next/link";
import * as React from "react";
import { paths } from "@/routes/paths";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/routes/hooks";
import { signUp } from "@/auth/context";
import { useLoadingCallback } from "react-loading-hook";
import { PasswordInput } from "@/components/custom/password-input";
import { LoadingButton } from "@/components/custom/loading-button";
import { toast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterFormSchema, RegisterFormVaues } from "@/types/zod";
// ----------------------------------------------------------------------

export function RegisterPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const defaultValues: Partial<RegisterFormVaues> = {
    name: "",
    email: "",
    password: "",
  };

  const form = useForm<RegisterFormVaues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues,
  });

  const [registerWithEmailAndPassword] = useLoadingCallback(
    async ({ name, email, password }: { name: string; email: string; password: string }) => {
      await signUp({
        name,
        email,
        password,
      });
      router.push(paths.auth.login);
    }
  );

  const onSubmit = async (data: RegisterFormVaues) => {
    setIsLoading(true);

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      await registerWithEmailAndPassword(userData);
      setIsLoading(false);
       
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: error?.message || "An error occurred while registering",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your information below to create your account
        </p>
      </div>
      <div className="flex flex-col gap-6 text-left">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        placeholder="email"
                        {...field}
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        showPasswordToggle={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton loading={isLoading} type="submit">
                Create an account
              </LoadingButton>
            </div>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href={paths.terms} className="underline underline-offset-4 hover:text-primary">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link href={paths.privacy} className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </>
  );
}
