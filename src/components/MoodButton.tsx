import { SmilePlus, Meh, Frown } from 'lucide-react';

type MoodType = 'happy' | 'neutral' | 'sad';

interface MoodButtonProps {
  mood: MoodType;
  onClick: (mood: MoodType) => void;
  selected: boolean;
}

const moodIcons = {
  happy: SmilePlus,
  neutral: Meh,
  sad: Frown,
};

const moodLabels = {
  happy: 'Happy',
  neutral: 'Neutral',
  sad: 'Sad',
};

export function MoodButton({ mood, onClick, selected }: MoodButtonProps) {
  const Icon = moodIcons[mood];
  
  return (
    <button
      onClick={() => onClick(mood)}
      className={`flex flex-col items-center p-4 rounded-lg transition-all ${
        selected
          ? 'bg-indigo-100 border-2 border-indigo-500'
          : 'bg-white border-2 border-gray-200 hover:border-indigo-300'
      }`}
    >
      <Icon className={`w-12 h-12 ${selected ? 'text-indigo-500' : 'text-gray-600'}`} />
      <span className={`mt-2 font-medium ${selected ? 'text-indigo-500' : 'text-gray-600'}`}>
        {moodLabels[mood]}
      </span>
    </button>
  );
}