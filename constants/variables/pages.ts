export const PAGES = {
  home: {
    link: "/",
    value: "home",
    label: "Home",
  },
  app: {
    link: "/app",
    value: "app",
    label: "App",
  },
};

export const MAIN_NAVLINKS = [{ ...PAGES.app }];

export const APP_NAVLINKS = [{ ...PAGES.home }];

export const FOOTER_INKS = [{ ...PAGES.app }];
