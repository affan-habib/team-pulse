import { Link } from 'react-router-dom';
import { SmilePlus, Brain, MessageSquare, BarChart3, MessageCircle } from 'lucide-react';

interface QuickLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

function QuickLink({ to, icon, text }: QuickLinkProps) {
  return (
    <Link 
      to={to} 
      className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
    >
      <span className="text-indigo-600 dark:text-indigo-400">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}

export function QuickLinks() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
        <div className="space-y-2">
          <QuickLink to="/check-in" icon={<SmilePlus className="w-5 h-5" />} text="Mood Check-In" />
          <QuickLink to="/quiz" icon={<Brain className="w-5 h-5" />} text="Live Quiz" />
          <QuickLink to="/feedback" icon={<MessageSquare className="w-5 h-5" />} text="Anonymous Feedback" />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Dashboard Access</h2>
        <div className="space-y-2">
          <QuickLink to="/dashboard" icon={<BarChart3 className="w-5 h-5" />} text="Sentiment Dashboard" />
          <QuickLink to="/feedback-dashboard" icon={<MessageCircle className="w-5 h-5" />} text="Feedback Dashboard" />
        </div>
      </div>
    </div>
  );
}