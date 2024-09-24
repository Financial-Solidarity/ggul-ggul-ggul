import { BellIcon } from '@heroicons/react/24/outline';

interface NotificationButtonProps {
  color?: 'black' | 'primary';
}

// 추후 fcm과 연동하여 로직 구현 필요함
export const NotificationButton = ({ color }: NotificationButtonProps) => {
  const onClick = () => alert('알림 클릭됨');

  return (
    <button className={`w-7 text-${color ? color : 'white'}`} onClick={onClick}>
      <BellIcon />
    </button>
  );
};
