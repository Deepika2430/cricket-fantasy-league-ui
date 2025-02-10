import React, { useState, useRef } from 'react';
import { Trophy, Users, DollarSign, Ticket as Cricket, Award, ArrowRight, Menu, X, Mail, Phone, MapPin, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 64; // height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const login = () => {
    const token = Cookies.get('authToken');
    if (token) {
      navigate('/home')
    }
    navigate('/login')
    }

  const menuItems = ['home', 'about', 'contact'];

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Cricket className="w-8 h-8 text-indigo-600" />
            <span className="font-bold text-xl">CricketFantasy</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize ${
                  activeSection === item
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-indigo-600'
                } transition-colors`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => login()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" /> Login
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fadeIn">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollToSection(item);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 capitalize hover:bg-gray-100 rounded-lg"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                setShowLogin(true);
                setIsOpen(false);
              }}
              className="w-full mt-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" /> Login
            </button>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Login</h2>
              <button onClick={() => setShowLogin(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

function AboutSection() {
  return (
    <div id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Cricket Stadium"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Our Story</h3>
            <p className="text-gray-600">
              Founded in 2024, CricketFantasy Premier League has grown to become one of the most trusted fantasy cricket
              platforms. We provide cricket enthusiasts with an immersive gaming experience while ensuring fair play
              and security.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h4 className="font-semibold mb-2">Our Mission</h4>
                <p className="text-sm text-gray-600">To create the most engaging fantasy cricket experience</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h4 className="font-semibold mb-2">Our Vision</h4>
                <p className="text-sm text-gray-600">To become the world's leading fantasy sports platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div id="contact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-gray-600">support@cricketfantasy.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Call Us</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Visit Us</h3>
                <p className="text-gray-600">123 Fantasy Lane, Cricket City, CC 12345</p>
              </div>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your message"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-16"> {/* Add padding top to account for fixed header */}
        <div
          id="home"
          className="relative bg-cover bg-center h-[600px]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <Cricket className="w-16 h-16 text-white mb-6 animate-bounce" />
            <h1 className="text-5xl font-bold text-white mb-6 animate-fadeIn">
              CricketFantasy Premier League
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl animate-fadeIn">
              Build your dream team, compete with friends, and win big prizes in the ultimate cricket fantasy experience
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Start Playing Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How to Participate</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of cricket enthusiasts and showcase your team selection skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Users}
              title="Create Your Account"
              description="Sign up for free and join our growing community of cricket fantasy enthusiasts"
            />
            <FeatureCard
              icon={Cricket}
              title="Pick Your Team"
              description="Select 11 players within the budget cap and create your dream team"
            />
            <FeatureCard
              icon={Trophy}
              title="Join Contests"
              description="Enter various contests and compete with players worldwide"
            />
            <FeatureCard
              icon={Award}
              title="Score Points"
              description="Earn points based on your players' real-life performance in matches"
            />
            <FeatureCard
              icon={DollarSign}
              title="Win Prizes"
              description="Top performers win exciting cash prizes and exclusive rewards"
            />
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-xl text-white transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">Ready to Begin?</h3>
              <p className="mb-4">Start your fantasy cricket journey today and experience the thrill of the game!</p>
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>

        <AboutSection />
        <ContactSection />

        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-gray-400">Experience the best in fantasy cricket gaming</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold mb-2">1M+</div>
                <p className="text-gray-400">Active Players</p>
              </div>
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold mb-2">₹10Cr+</div>
                <p className="text-gray-400">Prizes Won</p>
              </div>
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-gray-400">Secure Gaming</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-gray-800 text-gray-300 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>© 2024 CricketFantasy Premier League. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;