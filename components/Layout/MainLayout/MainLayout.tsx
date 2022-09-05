import { Meta, Navbar, Footer } from "@/components";
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
      <Navbar type={navType} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
