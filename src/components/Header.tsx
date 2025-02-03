export function Header() {
  return (
    <header className="flex items-center justify-between h-16 bg-gray-800 p-4 transition-colors duration-300 hover:bg-gray-700">
      <div className="flex items-center gap-x-4">
        <a href="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc6_t3ve2CECe9DUpoG7xdyh5xYDFP6B8kJQ&s"
            alt="Logo"
            className="h-10 border-2 border-gray-200 rounded-full"
          />
        </a>
      </div>
    </header>
  );
}
