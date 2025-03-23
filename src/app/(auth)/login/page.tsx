import { GuestGuard } from "@/auth/guard/guest-guard";

import { LoginPage as ClientLoginPage } from "./login-page";

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <GuestGuard>
      <ClientLoginPage />
    </GuestGuard>
  );
}
