import { SidebarProvider } from "./ui/sidebar";
import { ThemeProvider } from "./ui/theme-provider";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./Header"; // Import the Header component

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider className="h-screen flex w-[100%]">
        <div className="flex flex-col h-screen w-[100%]">
          <Header />

          {/* Sidebar and Main Content Wrapper */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar on the left (fixed width) */}
            <div className="">
              <AppSidebar />
            </div>

            {/* Main content on the right */}
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
