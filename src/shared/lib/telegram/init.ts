import {
  setDebug,
  backButton,
  initData,
  init as initSDK,
  miniApp,
  viewport,
  mockTelegramEnv,
  type ThemeParams,
  themeParams,
  retrieveLaunchParams,
  emitEvent,
} from '@tma.js/sdk-react';

export async function init(options: {
  debug: boolean;
  eruda: boolean;
  mockForMacOS: boolean;
}): Promise<void> {
  setDebug(options.debug);
  initSDK();

  if (options.eruda) {
    void import('eruda').then(({ default: eruda }) => {
      eruda.init();
      eruda.position({ x: window.innerWidth - 50, y: 0 });
    });
  }

  if (options.mockForMacOS) {
    let firstThemeSent = false;

    mockTelegramEnv({
      onEvent(event, next) {
        if (event.name === 'web_app_request_theme') {
          let tp: Partial<ThemeParams> = {};

          if (firstThemeSent) {
            tp = themeParams.state as Partial<ThemeParams>;
          } else {
            firstThemeSent = true;
            const lp = retrieveLaunchParams();
            tp = (lp.tgWebAppThemeParams || {}) as Partial<ThemeParams>;
          }

          return emitEvent('theme_changed', { theme_params: tp as never });
        }

        if (event.name === 'web_app_request_safe_area') {
          return emitEvent('safe_area_changed', {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          });
        }

        next();
      },
    });
  }

  backButton.mount();
  initData.restore();

  try {
    miniApp.mount();
    themeParams.bindCssVars();
  } catch {}

  try {
    await viewport.mount();
    viewport.bindCssVars();
  } catch {}
}
