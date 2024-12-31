export interface Mood {
  id: string;
  mood: 'happy' | 'neutral' | 'sad';
  timestamp: number;
}

export interface QuizAnswer {
  id: string;
  answer: string;
  timestamp: number;
}

export interface Feedback {
  id: string;
  message: string;
  timestamp: number;
}