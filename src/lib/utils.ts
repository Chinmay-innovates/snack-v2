import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getChannelMessageEvent(channelId: string | string[]) {
  return `channel:${channelId}:channel-messages`;
}
export function getChannelMessageUpdateEvent(channelId: string) {
  return `channel:${channelId}:channel-messages:update`;
}

export function format(date: Date, formatStr: string): string {
  const pad = (n: number): string => n.toString().padStart(2, '0');

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const replacements: Record<string, string> = {
    dd: date.getDate().toString(),
    MM: months[date.getMonth()],
    yyyy: date.getFullYear().toString(),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
  };

  return formatStr.replace(/dd|MM|yyyy|HH|mm/g, (token) => replacements[token]);
}

export function getPagination(page: number, size: number) {
  const limit = size ? +size : 10;
  const from = page ? page * limit : 0;
  const to = page ? from + limit - 1 : limit - 1;

  return { from, to };
}
