import { PRODUCTS } from "./products";

const PAGES = {
    home: {
        link: "/",
        value: "home",
        label: "Home"
    },
    contactUs: {
        link: "/contact",
        value: "contact",
        label: "Contact"
    },
    about: {
        link: "/about",
        value: "about",
        label: "About"
    },
    store: {
        link: "/store",
        value: "store",
        label: "store"
    },
    logIn: {
        link: "/auth/login",
        value: "login",
        label: "Log In"
    },
    signUp: {
        link: "/auth/signup",
        value: "signup",
        label: "Sign Up"
    },
    orchids: {
        link: "/" + PRODUCTS.orchids.value,
        value: PRODUCTS.orchids.value,
        label:  PRODUCTS.orchids.label,
    },
    venusFlytrap: {
        link: "/" + PRODUCTS.venusFlytrap.value,
        value: PRODUCTS.venusFlytrap.value,
        label:  PRODUCTS.venusFlytrap.label,
    },
    hydroponic: {
        link: "/" + PRODUCTS.hydroponic.value,
        value: PRODUCTS.hydroponic.value,
        label:  PRODUCTS.hydroponic.label,
    },
    soil: {
        link: "/store/" + PRODUCTS.soil.value,
        value: PRODUCTS.soil.value,
        label:  PRODUCTS.soil.label,
    },
    fertilizer: {
        link: "/store/" + PRODUCTS.fertilizer.value,
        value: PRODUCTS.fertilizer.value,
        label:  PRODUCTS.fertilizer.label,
    },
    containers: {
        link: "/store/" + PRODUCTS.containers.value,
        value: PRODUCTS.containers.value,
        label:  PRODUCTS.containers.label,
    },
    books: {
        link: "/store/" + PRODUCTS.books.value,
        value: PRODUCTS.books.value,
        label:  PRODUCTS.books.label,
    },
};

const PRODUCT_NAVLINKS = [
    {...PAGES.orchids},
    {...PAGES.venusFlytrap},
    {...PAGES.hydroponic},
]

const STORE_NAVLINKS = [
    {...PAGES.soil},
    {...PAGES.fertilizer},
    {...PAGES.containers},
    {...PAGES.books},
]

const FOOTER_INKS = [
    {...PAGES.about},
    {...PAGES.contactUs},
]


export { PAGES, PRODUCT_NAVLINKS, STORE_NAVLINKS, FOOTER_INKS }
