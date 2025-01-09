import { useState } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { db } from '../lib/firebase';
import type { QuizAnswer } from '../types';

export function useQuizSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [votes, setVotes] = useState<number[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);

  const fetchLatestQuiz = () => {
    const quizRef = ref(db, 'quizzes');
    onValue(quizRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const quizzes = Object.values(data);
        const latest = quizzes[quizzes.length - 1];
        setCurrentQuiz(latest);
        setVotes(new Array(latest.options.length).fill(0));
      }
    });
  };

  const submitAnswer = async (answer: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const answerData: Omit<QuizAnswer, 'id'> = {
        answer,
        timestamp: Date.now(),
        quizId: currentQuiz.id
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
      const data = snapshot.val();
      if (data) {
        const newVotes = new Array(options.length).fill(0);
        Object.values(data).forEach((answer: any) => {
          if (answer.quizId === currentQuiz?.id) {
            const index = options.indexOf(answer.answer);
            if (index !== -1) newVotes[index]++;
          }
        });
        setVotes(newVotes);
      }
    });
  };

  return {
    submitAnswer,
    subscribeToAnswers,
    votes,
    isSubmitting,
    error,
    currentQuiz,
    fetchLatestQuiz
  };
}