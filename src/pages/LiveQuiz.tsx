import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../lib/firebase';
import { QuizOption } from '../components/QuizOption';
import { QuizResults } from '../components/QuizResults';
import { useQuizSubmission } from '../hooks/useQuizSubmission';

interface Quiz {
  id: string;
  question: string;
  options: string[];
}

export function LiveQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { submitAnswer, subscribeToAnswers, votes, isSubmitting, error } = useQuizSubmission();
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
        if (quizList.length > 0) {
          subscribeToAnswers(quizList[0].options);
        }
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async () => {
    if (!selectedAnswer || !quizzes[currentIndex]) return;
    
    try {
      await submitAnswer({
        answer: selectedAnswer,
        quizId: quizzes[currentIndex].id
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit answer:', err);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
      subscribeToAnswers(quizzes[currentIndex + 1].options);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading quizzes...</div>;
  }

  if (!quizzes.length) {
    return <div className="text-center py-4">No quizzes available</div>;
  }

  const currentQuiz = quizzes[currentIndex];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">
          Quiz {currentIndex + 1} of {quizzes.length}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {currentQuiz.question}
        </h1>
        <p className="text-gray-600">Select your answer to see live results</p>
      </div>

      <div className="space-y-4">
        {currentQuiz.options.map((option) => (
          <QuizOption
            key={option}
            label={option}
            selected={selectedAnswer === option}
            onClick={() => !submitted && setSelectedAnswer(option)}
            disabled={submitted}
          />
        ))}
      </div>

      {error && (
        <div className="text-red-600 text-center">
          {error}
        </div>
      )}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || isSubmitting}
          className="w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium 
                   disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 
                   transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Answer'}
        </button>
      )}

      {submitted && (
        <div className="space-y-4">
          <QuizResults options={currentQuiz.options} votes={votes} />
          {currentIndex < quizzes.length - 1 && (
            <button
              onClick={handleNext}
              className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-medium 
                       hover:bg-green-700 transition-colors"
            >
              Next Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
}