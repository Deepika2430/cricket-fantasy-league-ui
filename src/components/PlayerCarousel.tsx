import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "./ui/carousel";

import { useTheme } from './ui/theme-provider';
  const players = [
    {
      id: 1,
      name: "Virat Kohli",
      role: "Batsman",
      team: "India",
      rating: 95,
      image: "https://cdn.britannica.com/48/252748-050-C514EFDB/Virat-Kohli-India-celebrates-50th-century-Cricket-November-15-2023.jpg",
      stats: {
        matches: 492,
        average: 57.32,
        strikeRate: 93.62,
      },
    },
    {
      id: 2,
      name: "Steve Smith",
      role: "Batsman",
      team: "Australia",
      rating: 92,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsy6QEPYEW7CqUVbsQ7NfdAPkJPixojhM-sA&s",
      stats: {
        matches: 456,
        average: 54.12,
        strikeRate: 87.45,
      },
    },
    {
      id: 3,
      name: "Ben Stokes",
      role: "All-rounder",
      team: "England",
      rating: 90,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKP2_fsm7PYAJ0hP73Y8Sdb4fI5A053rwu5Q&s",
      stats: {
        matches: 378,
        average: 42.34,
        strikeRate: 95.07,
      },
    },
    {
        id: 4,
        name: "Rohit Sharma",
        role: "Batsman",
        team: "India",
        rating: 90,
        image: "https://ichef.bbci.co.uk/ace/standard/2560/cpsprodpb/a58b/live/65908fc0-e6fa-11ef-a39a-7b0f4e03d69d.jpg",
        stats: {
          matches: 377,
          average: 41.34,
          strikeRate: 90.07,
        },
      },
  ];

  const StatBar = ({ value, maxValue, label }: { value: number; maxValue: number; label: string }) => {
    const {theme} = useTheme();
    return (
    <div className={`mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
      <div className="flex justify-between text-sm mb-1">
        <span className="">{label}</span>
        <span className="text-primary-light">{value}</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${(value / maxValue) * 100}%` }}
        />
      </div>
    </div>
  )
};

  const PlayerCarousel = () => {
    const {theme} = useTheme();
    return (
      <div className={`py-16 px-16 bg-gradient-to-br ${theme === "dark"? "text-white bg-gray-900" : "text-black bg-gray-100"} `}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold mb-12 ${theme === "dark"? "text-white" : "text-black"} text-center`}>
            Featured Players
          </h2>
          <Carousel className={`w-full` }>
            <CarouselContent>
              {players.map((player) => (
                <CarouselItem key={player.id} className="md:basis-1/2 lg:basis-1/3 p-4">
                  <div className="bg-card-gradient rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
                    <div className="relative">
                      <img
                        src={player.image}
                        alt={player.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className={`text-2xl font-bold text-white mb-1 `}>{player.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300">{player.role}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-300">{player.team}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`p-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
                      <div className={`mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>Player Rating</span>
                          <span className="text-2xl font-bold text-primary">
                            {player.rating}
                          </span>
                        </div>
                        <StatBar value={player.stats.average} maxValue={100} label="Batting Average" />
                        <StatBar value={player.stats.strikeRate} maxValue={150} label="Strike Rate" />
                        <StatBar value={player.stats.matches} maxValue={500} label="Matches" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={`bg-primary/20 hover:bg-primary/30 ${theme === "dark" ? "text-white" : "text-black"} border-none`} />
            <CarouselNext className={`bg-primary/20 hover:bg-primary/30 ${theme === "dark" ? "text-white" : "text-black"} border-none`} />
          </Carousel>
        </div>
      </div>
    );
  };

  export default PlayerCarousel;