import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-start gap-4 home-wrapper">
      <Sidebar />
      <div className="p-4 w-full home-content max-h-screen overflow-hidden">
        <Header />
        {children}
      </div>
    </main>
  );
}
