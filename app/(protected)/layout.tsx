import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "../components/mode-toggle"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen overflow-auto">
        <SidebarTrigger />
        {/* <ModeToggle /> */}
        {children}
      </main>
    </SidebarProvider>
  )
}
