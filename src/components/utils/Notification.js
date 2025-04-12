'use client';
import { notification } from 'antd';
import { useEffect } from 'react';

const Notification = () => {
  const [api, contextHolder] = notification.useNotification();

  // Make the notification API available globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.showNotification = ({ type, message, description, duration = 4.5 }) => {
        api[type]({
          message,
          description,
          duration,
        });
      };
    }
  }, [api]);

  return contextHolder;
};

export const showNotification = ({ type, message, description, duration }) => {
  if (typeof window !== 'undefined' && window.showNotification) {
    window.showNotification({ type, message, description, duration });
  } else {
    console.warn('Notification system not initialized yet');
  }
};

export default Notification;