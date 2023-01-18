import { Meta, Footer } from "@/components";
import { NavType } from "interfaces";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Meta />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
