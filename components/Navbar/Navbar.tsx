import { MAIN_NAVLINKS, APP_NAVLINKS, NAV_TYPE } from "@/constants";
import { NavType } from "interfaces";
import SideNavbar from "./SideNavbar";
import MainNavbar from "./MainNavbar";

interface Props {
  type?: NavType;
}

const Navbar = ({ type = NAV_TYPE.MAIN }: Props) => {
  const displayContent = {
    main: {
      section: "",
      showSidebar: false,
      showTopBar: true,
      navLinks: MAIN_NAVLINKS,
    },
    app: {
      section: "",
      showSidebar: true,
      showTopBar: false,
      navLinks: APP_NAVLINKS,
    },
  };

  const data = displayContent[type];

  if (data.showTopBar) return <MainNavbar navLinks={data.navLinks} />;
  if (data.showSidebar) return <SideNavbar navLinks={data.navLinks} />;
};

export default Navbar;
