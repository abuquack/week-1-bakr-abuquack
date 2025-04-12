import { Footer, Header } from "../components/common";
import { Outlet } from "react-router-dom";

export const MainLayouts = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
