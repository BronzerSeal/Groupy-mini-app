'use client';

import { useEffect } from 'react';
import { initData, miniApp, useSignal } from '@tma.js/sdk-react';

export function TelegramThemeSync() {
  const isDark = useSignal(miniApp.isDark);
  const user = useSignal(initData.user);

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.theme = isDark ? 'dark' : 'light';
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  useEffect(() => {
    if (user?.language_code) {
      document.documentElement.lang = user.language_code;
    }
  }, [user]);

  return null;
}
