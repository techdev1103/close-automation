import { GuestGuard } from "@/auth/guard";

import { RegisterPage } from "./register-page";

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <GuestGuard>
      <RegisterPage />
    </GuestGuard>
  );
}
