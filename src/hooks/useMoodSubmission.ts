import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../lib/firebase';
import type { Mood } from '../types';

export function useMoodSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitMood = async (mood: Mood['mood']) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const moodData: Omit<Mood, 'id'> = {
        mood,
        timestamp: Date.now(),
      };

      await push(ref(db, 'moods'), moodData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit mood');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitMood, isSubmitting, error };
}