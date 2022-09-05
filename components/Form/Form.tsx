import { Meta, MainNavbar, Footer } from "@/components";
import { NavType } from "interfaces";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  navType?: NavType;
}

const MainLayout = ({ children, navType }: Props) => {
  return (
    <div>
      <Meta />
      <MainNavbar type={navType} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
