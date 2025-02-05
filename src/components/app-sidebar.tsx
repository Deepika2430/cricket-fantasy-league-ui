import { useState, useEffect } from "react";
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
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useTheme } from "./ui/theme-provider";
import { useSidebar } from "./ui/sidebar";
import { useLocation } from "react-router-dom";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "My Profile",
    url: "/profile",
    icon: Profile,
  },
  {
    title: "Matches",
    url: "/matches",
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
    title:"Friends",
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
  const { theme } = useTheme();
  const { state } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = items.find((item) => item.url === currentPath);
    if (activeMenuItem) {
      setActiveItem(activeMenuItem.title);
    }
  }, [location]);

  const handleItemClick = (title: string) => {
    setActiveItem(title);
  };

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className={`w-[var(--sidebar-width)] ${
        state === "collapsed" ? "transition-width duration-300" : ""
      } ${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"} overflow-hidden border-r-2 ${theme === "dark" ? "border-gray-800" : "border-gray-400"}`}
    >
      <SidebarHeader className="p-4"></SidebarHeader>
      <SidebarContent className="overflow-hidden hover:overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel
            className={`left-0 text-lg font-bold p-8 mt-4 duration-700 ${
              theme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
            }`}
          >
          Fantasy League
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`flex items-center p-2 transition-colors duration-200 ${
                    activeItem === item.title
                      ? theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-300"
                      : theme === "dark"
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-200"
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
                          <item.icon className="mr-2 text-2xl" />
                          <span className="ml-2">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      align="center"
                      hidden={state !== "collapsed"}
                      className={`${
                        theme === "dark" ? "bg-white text-black" : "bg-black text-white"
                      }`}
                    >
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {state !== "collapsed" && (
          <Collapsible defaultOpen className="group text-center justify-center items-center">
            <SidebarGroup>
              <SidebarGroupLabel asChild className="flex items-center cursor-pointer text-lg justify-center">
                <CollapsibleTrigger className="flex items-center w-full justify-center">
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
                        className={`flex items-center p-2 transition-colors duration-200 ${
                          activeItem === item.title
                            ? theme === "dark"
                              ? "bg-gray-700"
                              : "bg-gray-300"
                            : theme === "dark"
                            ? "hover:bg-gray-800"
                            : "hover:bg-gray-200"
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
                                <item.icon className="mr-2 text-2xl" />
                                <span className="ml-2">{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            align="center"
                            hidden={state !== "collapsed"}
                            className={`${
                              theme === "dark" ? "bg-white text-black" : "bg-black text-white"
                            }`}
                          >
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
        )}
      </SidebarContent>
      <SidebarFooter
        className={`p-2 transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className={`flex items-center p-2 transition-colors duration-200 ${
                activeItem === item.title
                  ? theme === "dark"
                    ? "bg-gray-700"
                    : "bg-gray-300"
                  : theme === "dark"
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-200"
              }`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild className="flex items-center w-full text-inherit no-underline text-lg">
                    <a href={item.url} onClick={() => handleItemClick(item.title)} className="flex items-center w-full">
                      <item.icon className="mr-2 text-2xl" />
                      <span className="ml-2">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  align="center"
                  hidden={state !== "collapsed"}
                  className={`${
                    theme === "dark" ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
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
