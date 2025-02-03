import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Header } from "./Header" // Import the Header component

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="h-screen flex w-[100%]">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  )
}