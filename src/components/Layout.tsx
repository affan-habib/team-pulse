import { Link } from 'react-router-dom';
import { BarChart3, MessageSquare, SmilePlus, Brain, Home } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center space-x-8">
              <Link to="/" className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Home className="w-5 h-5 mr-2" />
                <span>Home</span>
              </Link>
              <Link to="/check-in" className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                <SmilePlus className="w-5 h-5 mr-2" />
                <span>Mood Check-In</span>
              </Link>
              <Link to="/quiz" className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Brain className="w-5 h-5 mr-2" />
                <span>Live Quiz</span>
              </Link>
              <Link to="/dashboard" className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                <BarChart3 className="w-5 h-5 mr-2" />
                <span>Dashboard</span>
              </Link>
              <Link to="/feedback" className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                <MessageSquare className="w-5 h-5 mr-2" />
                <span>Feedback</span>
              </Link>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}