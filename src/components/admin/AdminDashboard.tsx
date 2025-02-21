import { useTheme } from "../ui/theme-provider"
import { Card } from "../ui/card"
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Settings,
  Bell,
  User,
  Moon,
  Sun
} from "lucide-react"
import { Button } from "../ui/button"

function AdminDashboard() {
  const { theme } = useTheme()

  const stats = [
    {
      title: "Total Users",
      value: "24,563",
      icon: Users,
      trend: "+12.5%",
    },
    {
      title: "Active Leagues",
      value: "156",
      icon: Trophy,
      trend: "+5.2%",
    },
    {
      title: "Revenue",
      value: "$45,678",
      icon: TrendingUp,
      trend: "+8.4%",
    },
    {
      title: "Upcoming Matches",
      value: "23",
      icon: Calendar,
      trend: "+3.1%",
    },
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Header */}
      <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Trophy className={`h-8 w-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h1 className={`ml-2 text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Cricket Fantasy Admin
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button> */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card 
              key={stat.title}
              className={`${
                theme === 'dark' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-900'
              } p-6 hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-center">
                <div className={`${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'
                } p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div className="ml-4">
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {stat.title}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="ml-2 text-sm text-green-500">{stat.trend}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className={`mt-8 ${
          theme === 'dark' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-900'
        } p-6`}>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                      <User className={`h-5 w-5 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">User Registration</p>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        New user joined Fantasy League
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    2 minutes ago
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}

export default AdminDashboard;