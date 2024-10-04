import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  color?: 'black' | 'primary';
  circular?: boolean;
}

export const BackButton = ({ color, circular = false }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      className={`${
        circular
          ? 'flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg'
          : `w-7 text-${color || 'white'}`
      }`}
      onClick={() => navigate(-1)}
    >
      <ChevronLeftIcon
        className={circular ? 'h-6 w-6 text-purple-700' : 'h-full w-full'}
      />
    </button>
  );
};
