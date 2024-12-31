import { useState, useEffect } from 'react';
import { QuizOption } from '../components/QuizOption';
import { QuizResults } from '../components/QuizResults';
import { useQuizSubmission } from '../hooks/useQuizSubmission';

const QUIZ_QUESTION = "What's your preferred way of receiving feedback?";
const QUIZ_OPTIONS = [
  "One-on-one meetings",
  "Written reports",
  "Group discussions",
  "Anonymous feedback"
];

export function LiveQuiz() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { submitAnswer, subscribeToAnswers, votes, isSubmitting, error } = useQuizSubmission();

  useEffect(() => {
    subscribeToAnswers(QUIZ_OPTIONS);
  }, []);

  const handleSubmit = async () => {
    if (!selectedAnswer) return;
    
    await submitAnswer(selectedAnswer);
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{QUIZ_QUESTION}</h1>
        <p className="text-gray-600">Select your answer to see live results</p>
      </div>

      <div className="space-y-4">
        {QUIZ_OPTIONS.map((option) => (
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

      {submitted && <QuizResults options={QUIZ_OPTIONS} votes={votes} />}
    </div>
  );
}