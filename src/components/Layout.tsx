import { SidebarProvider } from "./ui/sidebar";
import { ThemeProvider } from "./ui/theme-provider";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "./ui/theme-provider";

export default function Layout() {
  const { theme } = useTheme();
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
            <main className={`flex-1 overflow-auto scrollbar-thin ${theme === "dark" ? "scrollbar-thumb-gray-600 scrollbar-track-gray-800" : (theme === "system"? "scrollbar-thumb-gray-600 scrollbar-track-gray-900": "scrollbar-thumb-gray-500 scrollbar-track-gray-200") } scrollbar-thumb-rounded-md scrollbar-track-rounded-md`}>
              <Outlet /> {/* Dynamic content will be rendered here */}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
