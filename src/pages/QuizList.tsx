import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../lib/firebase';

interface Quiz {
  id: string;
  question: string;
  options: string[];
  createdAt: string;
}

export const QuizList = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const quizzesRef = ref(db, 'quizzes');
    
    onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const quizList = Object.entries(data).map(([id, quiz]: [string, any]) => ({
          id,
          ...quiz
        }));
        setQuizzes(quizList);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading quizzes...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Quiz List</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {quizzes.map((quiz) => (
          <div 
            key={quiz.id} 
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="font-semibold mb-2">{quiz.question}</h2>
            <div className="space-y-1">
              {quiz.options.map((option, index) => (
                <div key={index} className="text-sm text-gray-600">
                  • {option}
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Created: {new Date(quiz.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};