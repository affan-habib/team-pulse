interface QuizOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function QuizOption({ label, selected, onClick, disabled }: QuizOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 rounded-lg text-left transition-all ${
        selected
          ? 'bg-indigo-100 border-2 border-indigo-500 text-indigo-700'
          : 'bg-white border-2 border-gray-200 hover:border-indigo-300 text-gray-700'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <span className="font-medium">{label}</span>
    </button>
  );
}