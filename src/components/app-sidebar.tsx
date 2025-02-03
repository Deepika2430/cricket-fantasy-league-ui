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
  SidebarTrigger,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

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
      className="bg-gray-900 text-gray-300 w-[var(--sidebar-width)] transition-width duration-300"
    >
      <SidebarHeader className="flex  justify-center h-16 bg-gray-800 transition-colors duration-300 hover:bg-gray-700">
        <div className="flex ">
          <SidebarTrigger className="text-white left-0" />
          {/* <a href="/" className="flex items-center justify-center h-16 w-11">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc6_t3ve2CECe9DUpoG7xdyh5xYDFP6B8kJQ&s"
              alt="Logo"
              className="h-10"
            />
          </a> */}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-bold text-gray-400 p-4 transition-colors duration-300 hover:text-gray-200">
            Fantasy League
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`flex items-center p-2 transition-colors duration-200 hover:bg-gray-800 ${
                    activeItem === item.title ? "bg-gray-700" : ""
                  }`}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild className="flex items-center w-full text-inherit no-underline text-lg">
                        <a
                          href={item.url}
                          onClick={() => handleItemClick(item.title)}
                          className="flex items-center w-full"
                        >
                          <item.icon className="mr-2 text-2xl" /> {/* Increased icon size */}
                          <span className="ml-2">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="start">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Collapsible defaultOpen className="group">
          <SidebarGroup>
            <SidebarGroupLabel asChild className="flex items-center cursor-pointer">
              <CollapsibleTrigger className="flex items-center w-full">
                Help
                <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {helpItems.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className={`flex items-center p-2 transition-colors duration-200 hover:bg-gray-800 ${
                        activeItem === item.title ? "bg-gray-700" : ""
                      }`}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton asChild className="flex items-center w-full text-inherit no-underline text-lg">
                            <a
                              href={item.url}
                              onClick={() => handleItemClick(item.title)}
                              className="flex items-center w-full"
                            >
                              <item.icon className="mr-2 text-2xl" /> {/* Increased icon size */}
                              <span className="ml-2">{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" align="start">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter className="p-2 bg-gray-800 transition-colors duration-300 hover:bg-gray-700">
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className={`flex items-center p-2 transition-colors duration-200 hover:bg-gray-800 ${
                activeItem === item.title ? "bg-gray-700" : ""
              }`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild className="flex items-center w-full text-inherit no-underline text-lg">
                    <a href={item.url} onClick={() => handleItemClick(item.title)} className="flex items-center w-full">
                      <item.icon className="mr-2 text-2xl" /> {/* Increased icon size */}
                      <span className="ml-2">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="start">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
