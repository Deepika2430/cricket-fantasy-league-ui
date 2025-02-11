import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./ui/theme-provider";

const blogs = [
  {
    id: 1,
    title: "Top 10 Cricket Moments of 2023",
    excerpt: "Relive the most exciting moments from the world of cricket in 2023...",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&q=80",
    date: "Mar 10, 2024",
    category: "Highlights"
  },
  {
    id: 2,
    title: "Rising Stars: Next Generation of Cricket",
    excerpt: "Meet the young talents who are set to take the cricket world by storm...",
    image: "https://images.unsplash.com/photo-1587385789097-0197a7fbd179?w=500&q=80",
    date: "Mar 8, 2024",
    category: "Players"
  }
];

const BlogSection = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  console.log(theme, isDarkMode);

  return (
    <section className={`py-20 transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text  bg-gradient-to-r ${theme === "dark" ? "from-blue-400 to-purple-500" : "from-primary to-purple-600"} mb-4`}>
            Latest Cricket Insights
          </h2>
          <p className={`max-w-2xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Stay updated with the latest news, analysis, and stories from the world of cricket
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`group rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300
                ${theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 text-sm font-medium rounded-full
                    ${theme === "dark" ? "bg-blue-500/90 text-white" : "bg-primary/90 text-white"}`}>
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className={`flex items-center gap-2 text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  <Calendar className="w-4 h-4" />
                  <span>{blog.date}</span>
                </div>

                <h3 className={`text-2xl font-bold mb-3 transition-colors duration-200
                  ${theme === "dark" ? "text-white group-hover:text-blue-400" : "text-gray-900 group-hover:text-primary"}`}>
                  {blog.title}
                </h3>

                <p className={`mb-6 line-clamp-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  {blog.excerpt}
                </p>

                <Button
                  variant="ghost"
                  className={`group/button flex items-center gap-2 transition-colors duration-200
                    ${theme === "dark" ? "text-gray-300 hover:text-blue-400" : "hover:text-primary"}`}
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
