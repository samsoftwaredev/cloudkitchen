export const PAGES = {
  home: {
    link: "/",
    value: "home",
    label: "Home",
  },
  contactUs: {
    link: "/contact",
    value: "contact",
    label: "Contact",
  },
  about: {
    link: "/about",
    value: "about",
    label: "About",
  },
  logIn: {
    link: "/auth/login",
    value: "login",
    label: "Log In",
  },
  logOut: {
    link: "/auth/logout",
    value: "logout",
    label: "Logout",
  },
  signUp: {
    link: "/auth/signup",
    value: "signup",
    label: "Sign Up",
  },
};

export const MAIN_NAVLINKS = [{ ...PAGES.contactUs }, { ...PAGES.about }];

export const APP_NAVLINKS = [{ ...PAGES.logOut }];

export const FOOTER_INKS = [{ ...PAGES.about }, { ...PAGES.contactUs }];
