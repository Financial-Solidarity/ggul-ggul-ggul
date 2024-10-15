import { messaging } from '../../../config/firebaseConfig.js';

import { postFcmToken } from '@/modules/user/apis/login.js';

export const requestPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    try {
      const token = await messaging.getToken({
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      console.log('Token generated:', token);
      postFcmToken(token);
    } catch {
      (error) => window.alert(error);
    }
  } else if (permission === 'denied') {
    // alert('알림을 거절당했습니다.');
  }
};

messaging.onMessage((payload) => {
  console.log('payload:', payload);
  console.log('payload data:', payload?.data);
});
