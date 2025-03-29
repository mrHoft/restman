'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Storage from '~/utils/storage';

const storage = new Storage();
export type TLanguage = 'en' | 'ru';
export const supportedlanguages: TLanguage[] = ['en', 'ru'];
const defaultLanguage = 'en';

/** loc: Returns internalized value of given name
 *
 * setLocale: Sets localization object (need to be set before using loc)
 *
 * language: Current language
 *
 * setLanguage: Saves user preferred language
 */
export const useLanguage = () => {
  const [language, setLanguage] = React.useState(defaultLanguage);
  const [locale, setLocale] = React.useState<Record<string, string>>({});
  const pathname = usePathname();
  const router = useRouter();

  const loc = React.useCallback(
    (name: string) => {
      return locale[name] ? locale[name] : name;
    },
    [locale]
  );

  const changeLanguage = React.useCallback(
    (lang: TLanguage) => {
      if (!supportedlanguages.includes(lang)) throw new Error(`${lang} is not supported`);

      setLanguage(lang);
      const cur = pathname.split('/')[0] as TLanguage;
      if (lang !== cur) {
        const url = pathname.split('/').slice(1).join('/');
        router.push(`/${lang}/${url}`);
      }
    },
    [pathname, router]
  );

  React.useEffect(() => {
    const lang = storage.get<TLanguage>('language') ?? defaultLanguage;
    changeLanguage(lang);
  }, [changeLanguage]);

  return { loc, setLocale, language, setLanguage: changeLanguage };
};
