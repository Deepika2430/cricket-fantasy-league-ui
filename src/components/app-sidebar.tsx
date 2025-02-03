import { useState } from "react";
import {
  Handshake,
  Swords,
  Home,
  LogOut,
  CircleUserRound,
  Search,
  Settings,
  User as Profile,
  ChevronDown,
  HelpCircle,
  Info,
  Users,
  Send,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "My Profile",
    url: "#",
    icon: Profile,
  },
  {
    title: "Matches",
    url: "#",
    icon: Swords,
  },
  {
    title: "Teams",
    url: "#",
    icon: Handshake,
  },
  {
    title: "Groups",
    url: "#",
    icon: Users,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const helpItems = [
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
];

const footerItems = [
  {
    title: "Account",
    url: "/account",
    icon: CircleUserRound,
  },
  {
    title: "Sign Out",
    url: "/signout",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (title: string) => {
    setActiveItem(title);
  };

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="sidebar"
    >
      <SidebarHeader className="sidebar-header">
        <a href="/" className="flex items-center justify-center h-16 w-11">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc6_t3ve2CECe9DUpoG7xdyh5xYDFP6B8kJQ&s"
            alt="Logo"
          />
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-group-label">Fantasy League</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`sidebar-menu-item ${activeItem === item.title ? "isActive" : ""}`}
                >
                  <SidebarMenuButton asChild className="sidebar-menu-button">
                    <a
                      href={item.url}
                      onClick={() => handleItemClick(item.title)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild className="collapsible-trigger">
              <CollapsibleTrigger>
                Help
                <ChevronDown className="chevron-down" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {helpItems.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className={`sidebar-menu-item ${activeItem === item.title ? "isActive" : ""}`}
                    >
                      <SidebarMenuButton asChild className="sidebar-menu-button">
                        <a
                          href={item.url}
                          onClick={() => handleItemClick(item.title)}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter className="sidebar-footer">
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className={`sidebar-menu-item ${activeItem === item.title ? "isActive" : ""}`}
            >
              <SidebarMenuButton asChild className="sidebar-menu-button">
                <a href={item.url} onClick={() => handleItemClick(item.title)}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
