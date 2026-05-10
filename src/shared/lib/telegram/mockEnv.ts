import { emitEvent, isTMA, mockTelegramEnv } from '@tma.js/sdk-react';

export async function mockEnv(): Promise<void> {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const isTma = await isTMA('complete');

  if (isTma) {
    return;
  }

  const themeParams = {
    accent_text_color: '#1d4ed8',
    bg_color: '#0f172a',
    button_color: '#2563eb',
    button_text_color: '#f8fafc',
    destructive_text_color: '#ef4444',
    header_bg_color: '#0f172a',
    hint_color: '#94a3b8',
    link_color: '#60a5fa',
    secondary_bg_color: '#111827',
    section_bg_color: '#0f172a',
    section_header_text_color: '#93c5fd',
    subtitle_text_color: '#94a3b8',
    text_color: '#f8fafc',
  } as const;

  const noInsets = { left: 0, top: 0, right: 0, bottom: 0 } as const;

  mockTelegramEnv({
    onEvent(event, next) {
      if (event.name === 'web_app_request_theme') {
        return emitEvent('theme_changed', { theme_params: themeParams as never });
      }

      if (event.name === 'web_app_request_viewport') {
        return emitEvent('viewport_changed', {
          height: window.innerHeight,
          width: window.innerWidth,
          is_expanded: true,
          is_state_stable: true,
        });
      }

      if (event.name === 'web_app_request_content_safe_area') {
        return emitEvent('content_safe_area_changed', noInsets);
      }

      if (event.name === 'web_app_request_safe_area') {
        return emitEvent('safe_area_changed', noInsets);
      }

      next();
    },
    launchParams: new URLSearchParams([
      ['tgWebAppThemeParams', JSON.stringify(themeParams)],
      [
        'tgWebAppData',
        new URLSearchParams([
          ['auth_date', (Date.now() / 1000 | 0).toString()],
          ['hash', 'mock-hash'],
          ['signature', 'mock-signature'],
          [
            'user',
            JSON.stringify({
              id: 1,
              first_name: 'Demo',
              last_name: 'User',
              username: 'demo_user',
              language_code: 'en',
            }),
          ],
        ]).toString(),
      ],
      ['tgWebAppVersion', '8.4'],
      ['tgWebAppPlatform', 'tdesktop'],
    ]),
  });

  console.info(
    'Telegram environment was mocked for local development because the app is running outside Telegram.',
  );
}
