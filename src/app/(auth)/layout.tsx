"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
// ----------------------------------------------------------------------

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const isSignupPage = pathname === "/sign-up";
  const isResetPasswordPage = pathname === "/reset-password";

  let buttonText = "Registration";
  let routeTo = "/sign-up";

  if (isSignupPage) {
    buttonText = "Login";
    routeTo = "/login";
  } else if (isResetPasswordPage) {
    buttonText = "Back to login";
    routeTo = "/login";
  }

  const handleClick = () => {
    router.push(routeTo);
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {!isResetPasswordPage && (
        <Link
          href={routeTo}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
          onClick={handleClick}
        >
          {buttonText}
        </Link>
      )}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-slate-200" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            className="dark w-auto h-10 -mt-2"
            src="/images/logo.png"
            width={140}
            height={100}
            alt="MLR Logo"
          />
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">{children}</div>
          {isResetPasswordPage && (
            <div className="text-center">
              <Link href="/login" className="text-sm text-blue-600 hover:underline">
                Back to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
