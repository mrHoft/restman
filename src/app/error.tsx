'use client';

import { useEffect } from 'react';
import { Message } from '~/components/message/message';

export default function ErrorBoundary({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Message.show(`${error.name}: ${error.message}`, 'error');
  }, [error]);

  return;
}
