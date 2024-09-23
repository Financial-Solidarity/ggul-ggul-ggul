import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  color?: 'black';
}

export const BackButton = ({ color }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      className={`w-7 text-${color ? color : 'white'}`}
      onClick={() => navigate(-1)}
    >
      <ChevronLeftIcon />
    </button>
  );
};
