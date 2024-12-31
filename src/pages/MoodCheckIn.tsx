import { useState } from 'react';
import type { Mood } from '../types';
import { MoodButton } from '../components/MoodButton';
import { useMoodSubmission } from '../hooks/useMoodSubmission';

export function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState<Mood['mood'] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { submitMood, isSubmitting, error } = useMoodSubmission();

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    await submitMood(selectedMood);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900">Thank you for your feedback!</h2>
        <p className="text-gray-600">Your mood has been recorded.</p>
        <button
          onClick={() => {
            setSelectedMood(null);
            setSubmitted(false);
          }}
          className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">How are you feeling today?</h1>
        <p className="text-gray-600">Select the emoji that best matches your current mood</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {(['happy', 'neutral', 'sad'] as const).map((mood) => (
          <MoodButton
            key={mood}
            mood={mood}
            selected={selectedMood === mood}
            onClick={setSelectedMood}
          />
        ))}
      </div>

      {error && (
        <div className="text-red-600 text-center mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedMood || isSubmitting}
        className="w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium 
                 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 
                 transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Mood'}
      </button>
    </div>
  );
}