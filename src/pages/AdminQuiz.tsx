import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../lib/firebase';

export function AdminQuiz() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!question.trim() || options.some(option => !option.trim())) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const quizData = {
        question: question.trim(),
        options: options.map(option => option.trim()),
        timestamp: Date.now(),
      };

      await push(ref(db, 'quizzes'), quizData);
      setQuestion('');
      setOptions(['', '', '', '']);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Live Quiz</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Question
          </label>
          <input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter quiz question"
          />
        </div>

        {options.map((option, index) => (
          <div key={index}>
            <label htmlFor={`option-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Option {index + 1}
            </label>
            <input
              id={`option-${index}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder={`Enter option ${index + 1}`}
            />
          </div>
        ))}

        {error && (
          <div className="text-red-600 text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium 
                   disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 
                   transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Create Quiz'}
        </button>
      </div>
    </div>
  );
}