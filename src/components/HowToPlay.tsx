import { Trophy, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ui/theme-provider";

const HowToPlay = () => {
  const { theme } = useTheme();
  const steps = [
    {
      icon: Users,
      title: "Create Your Dream Team",
      description: "Select 11 players strategically within your 100 credit budget. Choose a balanced mix of batsmen, bowlers, and all-rounders.",
      color: theme === "dark" ? "from-blue-500/20 to-blue-600/20" : "from-blue-700/20 to-blue-800/20"
    },
    {
      icon: Trophy,
      title: "Join Exciting Contests",
      description: "Enter multiple contests with different entry fees. Compete with millions of players for big prizes and glory.",
      color: theme === "dark" ? "from-purple-500/20 to-purple-600/20" : "from-purple-300/20 to-purple-400/20"
    },
    {
      icon: DollarSign,
      title: "Win Big Rewards",
      description: "Earn points based on your players' real-match performance. Top performers win exciting cash prizes and rewards.",
      color: theme === "dark" ? "from-green-500/20 to-green-600/20" : "from-green-300/20 to-green-400/20"
    }
  ];

  return (
    <div className={`py-16 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${theme === "dark" ? "from-[#9b87f5] to-blue-500" : "from-purple-500 to-blue-400"} inline-block text-transparent bg-clip-text`}>
            How to Play
          </h2>
          <p className={`max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Join millions of cricket fans and start your fantasy cricket journey in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className={`
                p-8 rounded-2xl backdrop-blur-sm
                bg-gradient-to-br ${step.color}
                border ${theme === "dark" ? "border-white/10 hover:border-white/20" : "border-gray-300 hover:border-gray-400"}
                transition-all duration-300 flex flex-col items-center text-center h-full
              `}>
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <div className={`absolute inset-0 ${theme === "dark" ? "bg-[#9b87f5]" : "bg-purple-400"} blur-lg opacity-50 rounded-full`}></div>
                    <div className={`relative ${theme === "dark" ? "bg-[#9b87f5]" : "bg-purple-500"} p-4 rounded-full`}>
                      <step.icon size={32} className="text-white" />
                    </div>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {step.title}
                </h3>

                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                  {step.description}
                </p>

                <div className="absolute -top-4 -left-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${theme === "dark" ? "bg-[#9b87f5] text-white" : "bg-purple-500 text-white"} font-bold`}>
                    {index + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
