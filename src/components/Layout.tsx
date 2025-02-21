import { SidebarProvider } from "./ui/sidebar";
import { ThemeProvider } from "./ui/theme-provider";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "./ui/theme-provider";
import {
  Handshake,
  Swords,
  Home,
  CircleUserRound,
  Settings,
  Users,
  HelpCircle,
  Send,
  ChevronDown,
  History,
} from "lucide-react";

export default function Layout({role}) {
  const { theme } = useTheme();
  // const role = "admin";
  let sidebarItems = {
    topItems: [
      {
        title: "Home",
        url: "/home",
        icon: Home,
      },
      {
        title: "Matches",
        url: "/matches",
        icon: Swords,
      },
      {
        title: "Match History",
        url: "/match-history",
        icon: History,
      },
      // {
      //   title: "Groups",
      //   url: "/groups",
      //   icon: Users,
      // },
      {
        title: "Friends",
        url: "/friends",
        icon: Users,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
    ],
    helpItems: [
      {
        title: "Support",
        url: "/support",
        icon: HelpCircle,
      },
      {
        title: "Feedback",
        url: "/feedback",
        icon: Send,
      },
    ],
    footerItems: [
      {
        title: "My Profile",
        url: "/my-profile",
        icon: CircleUserRound,
      },
    ],
  };
  if (role == "admin") {
    sidebarItems = {
      topItems: [
        {
          title: "Dashboard",
          url: "/admin-dashboard",
          icon: Handshake
        },
        {
          title: "Matches",
          url: "/admin-matches",
          icon: Swords,
        },
        {
          title: "Teams",
          url: "/admin-teams",
          icon: Users,
        },
        {
          title: "Players",
          url: "/admin-players",
          icon: CircleUserRound,
        }
      ],
      helpItems: [
        {
          title: "Support",
          url: "/support",
          icon: HelpCircle,
        },
        {
          title: "Feedback",
          url: "/feedback",
          icon: Send,
        },
      ],
      footerItems: [
        {
          title: "My Profile",
          url: "/my-profile",
          icon: CircleUserRound,
        },
      ],
    };
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider className="h-screen flex w-[100%]">
        <div className="flex flex-col h-screen w-[100%]">
          <Header />

          {/* Sidebar and Main Content Wrapper */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar on the left (fixed width) */}
            <div>
              <AppSidebar sidebarItems={sidebarItems} />
            </div>

            {/* Main content updates dynamically */}
            <main
              className={`flex-1 overflow-auto scrollbar-thin ${theme === "dark"
                ? "scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                : theme === "system"
                  ? "scrollbar-thumb-gray-600 scrollbar-track-gray-900"
                  : "scrollbar-thumb-gray-500 scrollbar-track-gray-200"
                } scrollbar-thumb-rounded-md scrollbar-track-rounded-md`}
            >
              <Outlet /> {/* Dynamic content will be rendered here */}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
