import { useState } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { db } from '../lib/firebase';
import type { QuizAnswer } from '../types';

export function useQuizSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [votes, setVotes] = useState<number[]>([0, 0, 0, 0]);

  const submitAnswer = async (answer: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const answerData: Omit<QuizAnswer, 'id'> = {
        answer,
        timestamp: Date.now(),
      };

      await push(ref(db, 'quiz-answers'), answerData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const subscribeToAnswers = (options: string[]) => {
    const answersRef = ref(db, 'quiz-answers');
    
    onValue(answersRef, (snapshot) => {
      const answers = snapshot.val();
      if (!answers) return;

      const voteCounts = options.map(option => 
        Object.values(answers).filter((a: QuizAnswer) => a.answer === option).length
      );
      
      setVotes(voteCounts);
    });
  };

  return { submitAnswer, subscribeToAnswers, votes, isSubmitting, error };
}