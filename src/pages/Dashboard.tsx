import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../lib/firebase';
import { Bar } from 'react-chartjs-2';
import type { Mood } from '../types';

export function Dashboard() {
  const [moodData, setMoodData] = useState({ happy: 0, neutral: 0, sad: 0 });

  useEffect(() => {
    const moodsRef = ref(db, 'moods');
    onValue(moodsRef, (snapshot) => {
      const moods = snapshot.val();
      if (!moods) return;

      const counts = Object.values(moods as Record<string, Mood>).reduce(
        (acc, { mood }) => ({ ...acc, [mood]: acc[mood] + 1 }),
        { happy: 0, neutral: 0, sad: 0 }
      );

      setMoodData(counts);
    });
  }, []);

  const data = {
    labels: ['Happy', 'Neutral', 'Sad'],
    datasets: [{
      data: Object.values(moodData),
      backgroundColor: [
        'rgba(34, 197, 94, 0.5)',
        'rgba(234, 179, 8, 0.5)',
        'rgba(239, 68, 68, 0.5)',
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(234, 179, 8)',
        'rgb(239, 68, 68)',
      ],
      borderWidth: 1,
    }],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Team Sentiment Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Bar data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}