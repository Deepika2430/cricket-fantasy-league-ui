import { SidebarProvider } from "./ui/sidebar";
import { ThemeProvider } from "./ui/theme-provider";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider className="h-screen flex w-[100%]">
        <div className="flex flex-col h-screen w-[100%]">
          <Header />

          {/* Sidebar and Main Content Wrapper */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar on the left (fixed width) */}
            <div>
              <AppSidebar />
            </div>

            {/* Main content updates dynamically */}
            <main className="flex-1 overflow-auto">
              <Outlet /> {/* Dynamic content will be rendered here */}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
