import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="h-screen bg-[#0E141C]">
      <SidebarProvider>
        <SidebarTrigger />
        <AppSidebar />
      </SidebarProvider>
    </div>
  );
}
