import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="w-7 text-white" onClick={() => navigate(-1)}>
      <ChevronLeftIcon />
    </button>
  );
};
