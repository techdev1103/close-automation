"use client";

import Link from "next/link";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { useAuthContext } from "@/auth/hooks";
import { useLoadingCallback } from "react-loading-hook";
import { signInWithPassword } from "@/auth/context";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
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

import { LoginFormSchema, LoginFormValues } from "@/types/zod";
// ----------------------------------------------------------------------

export function LoginPage() {
  const [hasLogged, setHasLogged] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();
  const { checkUserSession } = useAuthContext();

  const defaultValues: Partial<LoginFormValues> = {
    email: "",
    password: "",
  };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues,
  });

  const [handleLoginWithEmailAndPassword] = useLoadingCallback(
    async ({
      email: userEmail,
      password: userPassword,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        setHasLogged(false);

        const { error } = await signInWithPassword({
          email: userEmail,
          password: userPassword,
        });

        if (!error) {
          await checkUserSession?.();
          router.refresh();
        } else {
          toast({
            variant: "destructive",
            title: typeof error === "string" ? error : error.message,
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: typeof error === "string" ? error : error.message,
        });
      }
    }
  );

  const onSubmit = async (data: LoginFormValues) => {
    const { email, password } = data;

    setIsLoading(true);
    await handleLoginWithEmailAndPassword({ email, password });
    setIsLoading(false);
  };

  return (
    <>
      {!hasLogged && (
        <Card className="mx-auto max-w-md bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to log in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6 text-left">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-2">
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
                      Login
                    </LoadingButton>
                  </div>
                </form>
              </Form>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href={paths.auth.signUp} className="underline">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
