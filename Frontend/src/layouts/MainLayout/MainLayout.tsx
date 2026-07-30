import { ReactNode } from "react";
import { Sidebar } from "../../components";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F5F2EE]">
      <Sidebar />

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}