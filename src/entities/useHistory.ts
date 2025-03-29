'use client';

import Storage from '~/utils/storage';

const storage = new Storage();

export interface HistoryRecord {
  date: number;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
}

const pushHistory = (record: HistoryRecord) => storage.push('history', record);
const getHistory = () => storage.get<HistoryRecord[]>('history');

export default function useHistory() {
  return { pushHistory, getHistory };
}
