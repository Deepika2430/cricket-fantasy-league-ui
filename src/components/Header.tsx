import { ModeToggle } from "./ui/mode-toogle";
import { useTheme } from "./ui/theme-provider";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  const { theme } = useTheme();

  return (
    <header
      className={`flex items-center justify-between h-16 p-4 transition-colors duration-300 z-50 ${
        theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      <div className="flex items-center gap-x-4">
        <SidebarTrigger className={`left-0 ${theme === "dark" ? "text-white" : "text-black"}`} />
        <a href="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc6_t3ve2CECe9DUpoG7xdyh5xYDFP6B8kJQ&s"
            alt="Logo"
            className="h-10 border-2 border-gray-200 rounded-full"
          />
        </a>
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>Cricket Fantasy League</h1>
      </div>
      <ModeToggle />
    </header>
  );
}
