import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

interface QuizResultsProps {
  options: string[];
  votes: number[];
}

export function QuizResults({ options, votes }: QuizResultsProps) {
  const data = {
    labels: options,
    datasets: [
      {
        data: votes,
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  };

  const options_ = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Live Results',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <Bar data={data} options={options_} />
    </div>
  );
}