import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../lib/firebase';
import type { Feedback } from '../types';

export function FeedbackDashboard() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  useEffect(() => {
    const feedbackRef = ref(db, 'feedback');
    onValue(feedbackRef, (snapshot) => {
      const feedback = snapshot.val();
      if (!feedback) return;

      const feedbackArray = Object.entries(feedback).map(([id, data]) => ({
        id,
        ...(data as Omit<Feedback, 'id'>),
      }));

      setFeedbackList(
        feedbackArray.sort((a, b) => b.timestamp - a.timestamp)
      );
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Feedback Dashboard</h1>
      <div className="space-y-4">
        {feedbackList.map((feedback) => (
          <div key={feedback.id} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700">{feedback.message}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(feedback.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
        {feedbackList.length === 0 && (
          <p className="text-center text-gray-600">No feedback submitted yet.</p>
        )}
      </div>
    </div>
  );
}