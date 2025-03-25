import Storage from '~/utils/storage';

const storage = new Storage();
const setLastSearch = (value?: string) => storage.set('lastSearch', value);
const getLastSearch = () => storage.get<string>('lastSearch');

export default function useStorage() {
  return { setLastSearch, getLastSearch };
}
