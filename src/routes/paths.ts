// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "",
};

// ----------------------------------------------------------------------

export const paths = {
  root: "/",
  home: "/home",
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    verify: `${ROOTS.AUTH}/verify`,
    signUp: `${ROOTS.AUTH}/sign-up`,
    updatePassword: `${ROOTS.AUTH}/update-password`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
  },
  terms: "/terms",
  privacy: "/privacy",
};
