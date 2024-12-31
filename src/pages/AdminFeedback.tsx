import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../lib/firebase';

export function AdminFeedback() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const feedbackData = {
        message: message.trim(),
        timestamp: Date.now(),
      };

      await push(ref(db, 'feedback'), feedbackData);
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit Feedback</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
            Feedback Message
          </label>
          <textarea
            id="feedback"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter feedback message"
          />
        </div>

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
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>
    </div>
  );
}