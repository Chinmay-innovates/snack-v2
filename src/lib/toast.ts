import React from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { toast } from 'sonner';

type ToastType = 'success' | 'error';

interface ToastOptions {
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  icon?: React.ReactNode;
}

export const showToast = ({
  message,
  description,
  type = 'success',
  duration = 5000,
  icon,
}: ToastOptions) => {
  const baseStyles = {
    background: '#1a1a1a',
    border: '1px solid',
    color: type === 'error' ? '#f87171' : '#ffffff',
    borderColor: type === 'error' ? '#ff4d4d' : '#ffffff',
  };

  toast(message, {
    description,
    icon:
      icon ??
      (type === 'error' ? React.createElement(BsExclamationCircleFill, { size: 18 }) : '🎉'),
    duration,
    style: baseStyles,
  });
};
