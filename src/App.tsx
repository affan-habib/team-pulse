import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MoodCheckIn } from './pages/MoodCheckIn';
import { LiveQuiz } from './pages/LiveQuiz';
import { Dashboard } from './pages/Dashboard';
import { Feedback } from './pages/Feedback';
import { FeedbackDashboard } from './pages/FeedbackDashboard';
import { AdminQuiz } from './pages/AdminQuiz';
import { AdminFeedback } from './pages/AdminFeedback';
import { QuizList } from './pages/QuizList';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/check-in" element={<MoodCheckIn />} />
          <Route path="/quiz" element={<LiveQuiz />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/feedback-dashboard" element={<FeedbackDashboard />} />
          <Route path="/admin/quiz" element={<AdminQuiz />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/admin/feedback" element={<AdminFeedback />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;