'use client';

import { useEffect } from 'react';
import { backButton } from '@tma.js/sdk-react';
import { useRouter } from 'next/navigation';

export function BackButtonHandler({ enabled = true }: { enabled?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (enabled) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    return backButton.onClick(() => {
      router.back();
    });
  }, [enabled, router]);

  return null;
}
