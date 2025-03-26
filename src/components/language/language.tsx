import { Select } from '../select/select';

export default function LanguageSelector() {
  return <Select options={['en', 'ru']} name="language" placeholder="Language" />;
}
